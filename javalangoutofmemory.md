      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- java.lang.OutOfMemory 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [Exceptions](exceptions.html) > [java.lang.OutOfMemory](javalangoutofmemory.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Ok, this is manageable. It is possible to configure just about all of the memory utilisation of ActiveMQ. The first thing to determine is what part of the system is running out of memory. Is it the JVM, the broker, the consumers or the producers?

This entry refers to ActiveMQ versions 5.1.x and greater.

#### Memory

##### JVM Memory

Try running the broker in a standalone JVM using `bin/activemq`. Note the default JVM heap size option that is passed to the Java executable by the script (the exact options may depend upon the JVM that you are using, the examples are for the Sun JVM).

*   -Xmx: If your OS has more available memory, consider increasing the total heap memory available to the broker JVM. Note that the JVM will require more memory than the -Xmx value. Thread stacks and the JMVs internal classes will consume additional memory.
*   -Xss: If you have [massive numbers of threads](javalangoutofmemory.html) in the Broker JVM, consider reducing the default JVM stack size of each thread with the -Xss option.

If you are running an embedded broker or in a third party container, ensure that the hosting JVM has appropriate values for the maximum heap and stack sizes.

##### Broker Memory

The memory that the broker is allowed to use is not determined by the amount of memory allocated to the JVM. Although the broker is constrained by the amount of memory given to the JVM, the broker manages its memory independently. That is, the broker does not just simply use up all of the memory in the JVM and then die with an OutOfMemory exception. This is where you need to understand the [systemUsage](producer-flow-control.html) memory limit and the per destination memory limit.

The memory in ActiveMQ works in a tiered fashion that flows from the JVM -> Broker -> broker features. E.g., the total amount of destination memory limits placed cannot exceed the memory limit of the broker.

#### Consumer

Along with message size, the [prefetch limit](what-is-the-prefetch-limit-for.html) is main reason a consumer will [run out of memory](what-is-the-prefetch-limit-for.html). Reducing the prefetch value will reduce the amount of messages queued/stored in memory on the Consumer.

#### Producer

Unless message size exceeds resource limits, a producer should not run out of memory. A producer may notice the effect of memory limit enforcement by the broker in the form of [blocking](my-producer-blocks.html).

#### Other

##### Spooling Messages to Disk

Fast dispatch of messages is only possible when messages are stored in memory. When consumers are slow or absent, memory can quickly become exhausted.  
The Broker (using [Message Cursors](message-cursors.html)) will spool non-persistent messages to disk when the default memory usage threshold for a destination is reached. This threshold value is specified to the Broker via the <memoryUsage> section of the <systemUsage> configuration in [activemq.xml](xml-configuration.html). This feature allows producers to continue sending messages when there are slow consumers without exhausting available memory or reverting to [producer flow control](producer-flow-control.html). In the case of multiple destinations, the combined default memory thresholds may be excessive and they may exceed available memory. In such a case it may make sense to reduce the memory usage 'limit' threshold at which messages are spooled to disk. An alternative option is to configure the 'precentUsage' rather than the absolute usage 'limit'. In this way, memory usage can be confined to a fixed percentage of available memory.

More specific per destination memoryUsage limits can be specified in [activemq.xml](xml-configuration.html) using [Per Destination Policies](per-destination-policies.html). Some further examples of <destinationPolicy> map entries can be found in the [Message Cursors](message-cursors.html) reference.

##### Number of Threads

By default, ActiveMQ uses a dedicated thread per destination. If there are large numbers of Destinations there will be a large number of threads and their associated memory resource usage. ActiveMQ can be configured to use a thread pool through the use of the system property: -Dorg.apache.activemq.UseDedicatedTaskRunner=false. This is currently specified in the activemq start script via ACTIVEMQ_OPTS. Using a thread pool can restrict the number of threads required by ActiveMQ and hence reduce memory usage.

##### Really Large Messages

When your message are really large such that you can only allow a few messages in memory at at time, the [Per Destination Policies](per-destination-policies.html) maxPageSize and lazyDispatch can help. maxPageSize controls the amount of messages that are paged into memory for dispatch while lazyDispatch augments that value using the prefetch capacity of the current consumer list. With a prefetch of 1, a single consumer and lazyDispatch, only one message at a time would be loaded into memory at a time.

##### Leaking JMS resources

This is the most obvious one for Consumers or Producers; repeatedly obtaining a Session or MessageProducer or MessageConsumer and not closing it. With a java.lang.OutOfMemory, verifying (again) that all not in use JMS resources are released, is worth the time. If you have multiple threads in your application, consider using the [PooledConnectionFactory](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/pool/PooledConnectionFactory.html) as this will allow JMS resource to be safely shared among threads that follow the pattern:

obtainJmsResource(); 

try 
{ 
    useJmsResource() 
} finally { 
    releaseJmsResource(); 
} 

If you are using ActiveMQ via [Spring Support](spring-support.html) or with JMSTemplates, be sure to check you are not falling for any of the [JmsTemplate Gotchas](jmstemplate-gotchas.html). It may also be worth recapping on [How do I use JMS efficiently](how-do-i-use-jms-efficiently.html).

### [Overview](overview.html)

*   [Index](index.html)
*   [News](news.html)
*   [New Features](new-features.html)
*   [Getting Started](getting-started.html)
*   [FAQ](faq.html)
*   [Articles](articles.html)
*   [Books](books.html)
*   [Download](download.html)
*   [License](http://www.apache.org/licenses/)

### Search

    
  

### Sub Projects

*   [Artemis](http://activemq.apache.org/artemis/)
*   [Apollo](http://activemq.apache.org/apollo "ActiveMQ Apollo")
*   [CMS](http://activemq.apache.org/cms/)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](contributing.html)
*   [Discussion Forums](discussion-forums.html)
*   [Mailing Lists](mailing-lists.html)
*   [IRC](irc.html)
*   [IRC Log](http://javabot.evanchooly.com/logs/%23apache-activemq/today)
*   [Security Advisories](security-advisories.html)
*   [Site](site.html)
*   [Sponsorship](http://www.apache.org/foundation/sponsorship.html)
*   [Projects Using ActiveMQ](projects-using-activemq.html)
*   [Users](users.html)
*   [Team](team.html)
*   [Thanks](thanks.html)

### [Features](features.html)

*   [Advisory Message](advisory-message.html)
*   [Clustering](clustering.html)
*   [Cross Language Clients](cross-language-clients.html)
*   [Enterprise Integration Patterns](enterprise-integration-patterns.html)
*   [JMX](jmx.html)
*   [JMS to JMS Bridge](jms-to-jms-bridge.html)
*   [MasterSlave](masterslave.html)
*   [Message Groups](message-groups.html)
*   [Networks of Brokers](networks-of-brokers.html)
*   [Performance](performance.html)
*   [Persistence](persistence.html)
*   [Security](security.html)
*   [Virtual Destinations](virtual-destinations.html)
*   [Visualisation](visualisation.html)
*   [More ...](features.html)

### [Connectivity](connectivity.html)

*   [Ajax](ajax.html)
*   [AMQP](amqp.html)
*   [Axis and CXF Support](axis-and-cxf-support.html)
*   [C Integration](c-integration.html)
*   [C++](activemq-c-clients.html)
*   [C# and .Net Integration](http://activemq.apache.org/nms/)
*   [CMS](http://activemq.apache.org/cms/)
*   [J2EE](j2ee.html)
*   [JBoss Integration](jboss-integration.html)
*   [Jetty](http://docs.codehaus.org/display/JETTY/Integrating+with+ActiveMQ)
*   [JNDI Support](jndi-support.html)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [REST](rest.html)
*   [RSS and Atom](rss-and-atom.html)
*   [Spring Support](spring-support.html)
*   [Stomp](stomp.html)
*   [Tomcat](tomcat.html)
*   [Unix Service](unix-service.html)
*   [WebLogic Integration](weblogic-integration.html)
*   [XMPP](xmpp.html)
*   [More ...](connectivity.html)

### [Using ActiveMQ 5](using-activemq-5.html)

*   [Getting Started](version-5-getting-started.html)
*   [Initial Configuration](version-5-initial-configuration.html)
*   [Running a Broker](version-5-run-broker.html)
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html)
*   [Command Line Tools](activemq-command-line-tools-reference.html)
*   [Configuring Transports](configuring-version-5-transports.html)
*   [Examples](version-5-examples.html)
*   [Web Samples](version-5-web-samples.html)
*   [Monitoring the Broker](how-can-i-monitor-activemq.html)
*   [Xml Configuration](version-5-xml-configuration.html)
*   [Xml Reference](xml-reference.html)
*   [More ...](using-activemq-5.html)

### [Tools](tools.html)

*   [Web Console](web-console.html)
*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)

### [Support](support.html)

*   [Issues](http://issues.apache.org/jira/browse/AMQ)
*   [Roadmap](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:roadmap-panel)
*   [Change log](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:changelog-panel)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)
*   [Developer Guide](developer-guide.html)
*   [Becoming a committer](becoming-a-committer.html)
*   [Code Overview](code-overview.html)
*   [Wire Protocol](wire-protocol.html)
*   [Release Guide](release-guide.html)

### Tests

*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)
*   [Benchmark Tests](benchmark-tests.html)
*   [JMeter System Tests](jmeter-system-tests.html)
*   [JMeter Performance Tests](jmeter-performance-tests.html)
*   [Integration Tests](integration-tests.html)

### Project Reports

*   [JUnit Reports](junit-reports.html)
*   [Source XRef](source-xref.html)
*   [Test Source XRef](test-source-xref.html)
*   [Xml Reference](xml-reference.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=95843))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();