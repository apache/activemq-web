      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Redelivery Policy 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Consumer Features](consumer-features.html) > [Redelivery Policy](redelivery-policy.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Redelivery Policy
-----------------

Detail on when messages are redelivered to a client can be found in the [Message Redelivery and DLQ Handling](message-redelivery-and-dlq-handling.html) section. You can configure the [RedeliveryPolicy](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/RedeliveryPolicy.java?view=markup) on your [ActiveMQConnectionFactory](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/ActiveMQConnectionFactory.java?view=markup) or [ActiveMQConnection](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/ActiveMQConnection.java?view=markup) to customize exactly how you want the redelivery to work.

You can use Java code, Spring or the [Connection Configuration URI](connection-configuration-uri.html) to customize this.

### Available Properties

Property

Default Value

Description

`backOffMultiplier`

`5`

The back-off multiplier.

`collisionAvoidanceFactor`

`0.15`

The percentage of range of collision avoidance if enabled.

`initialRedeliveryDelay`

`1000L`

The initial redelivery delay in milliseconds.

`maximumRedeliveries`

`6`

Sets the maximum number of times a message will be redelivered before it is considered a **poisoned pill** and returned to the broker so it can go to a Dead Letter Queue.

Set to **`-1`** for unlimited redeliveries.

`maximumRedeliveryDelay`

`-1`

Sets the maximum delivery delay that will be applied if the **`useExponentialBackOff`** option is set. (use value **`-1`** to define that no maximum be applied) (v5.5).

`redeliveryDelay`

`1000L`

The delivery delay if **`initialRedeliveryDelay=0`** (v5.4).

`useCollisionAvoidance`

`false`

Should the redelivery policy use collision avoidance.

`useExponentialBackOff`

`false`

Should exponential back-off be used, i.e., to exponentially increase the timeout.

RedeliveryPolicy per Destination
--------------------------------

As of ActiveMQ v5.7.0 you can now configure a [RedeliveryPolicy](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/RedeliveryPolicy.java?view=markup) on a per-destination bases. The **`ActiveMQConnection`** factory class now exposes a [RedeliveryPolicyMap](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/broker/region/policy/RedeliveryPolicyMap.java?view=markup) property that allows to assign a RedeliveryPolicy using named destinations or using destination wildcards. The code snipped below shows how to configure a different [RedeliveryPolicy](http://svn.apache.org/viewvc/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/RedeliveryPolicy.java?view=markup) for Topics and Queues.

    ActiveMQConnection connection ...  // Create a connection

    RedeliveryPolicy queuePolicy = new RedeliveryPolicy();
    queuePolicy.setInitialRedeliveryDelay(0);
    queuePolicy.setRedeliveryDelay(1000);
    queuePolicy.setUseExponentialBackOff(false);
    queuePolicy.setMaximumRedeliveries(2);

    RedeliveryPolicy topicPolicy = new RedeliveryPolicy();
    topicPolicy.setInitialRedeliveryDelay(0);
    topicPolicy.setRedeliveryDelay(1000);
    topicPolicy.setUseExponentialBackOff(false);
    topicPolicy.setMaximumRedeliveries(3);

    // Receive a message with the JMS API
    RedeliveryPolicyMap map = connection.getRedeliveryPolicyMap();
    map.put(new ActiveMQTopic(">"), topicPolicy);
    map.put(new ActiveMQQueue(">"), queuePolicy);

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=48290))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();