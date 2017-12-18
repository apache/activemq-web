      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- JmsTemplate Gotchas 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Spring Support](spring-support.html) > [JmsTemplate Gotchas](jmstemplate-gotchas.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The thing to remember is JmsTemplate is designed for use in EJBs using the EJB containers JMS pooling abstraction. So every method will typically create a connection, session, producer or consumer, do something, then close them all down again. The idea being that this will use the J2EE containers pooling mechanism to pool the JMS resources under the covers. Without using a pooled JMS provider from the EJB container this is the worst possible way of working with JMS; since typically each create/close of a connection, producer/consumer results in a request-response with the JMS broker.

User Story

We had a bug once in ActiveMQ where if you created 65535 MessageProducer instances within the space of a few seconds, we'd get an exception thrown in the broker. Its a kinda silly thing to do, to create that many producers in a small space of time (one for each message to be sent) - JMS is designed for resources like producers and consumers to be created up front and reused across many message exchanges. The bug was highlighted by a user using JmsTemplate without a JMS pool underneath. Well at least it helped find our bug which I'm glad to say is now fixed, but it didn't help their performance too much ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png)

You should only use JmsTemplate with a pooled JMS provider. In J2EE 1.4 or later that typically means a JCA based JMS ConnectionFactory. If you are in an EJB then make sure you use your J2EE containers ConnectionFactory, never a plain-old-connection factory. If you are not inside an EJB Then you should use our [PooledConnectionFactory](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/pool/PooledConnectionFactory.html), then things will be nicely pooled. If you need to take part in XA transactions then look into our spring based [JCA Container](jca-container.html).

Another gotcha I've seen folks do is to create a MessageConsumer inside one of the SessionCallback methods then wonder why messages are not being received. After the SessionCallback is called, the session will be closed; which will close your consumers too ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png). So if you want to create a MessageConsumer you should create a connection, session and consumer yourself.

Another problem I've seen is folks using the JmsTemplate.receive() method; as I've said above if you're not in an EJB using the J2EE containers ConnnectionFactory, a connection, session & consumer will be create and closed for each receive() method. This is all fine and well - if painfully slow unless you are using pooling - but be aware that this mechanism, without pooling, may well miss messages. If you are consuming on a topic which has messages sent with NON_PERSISTENT delivery mode then chances are you will miss messages, since each receive() call is a brand new consumer which will not receive any messages sent before the consumer existed. To receive messages efficiently you should use Spring's [MessageListenerContainer](http://static.springsource.org/spring/docs/2.5.x/reference/jms.html#jms-mdp).

New in 4.x

In ActiveMQ [4.x](changes-in-40.html) we have a new feature called [Subscription Recovery Policy](subscription-recovery-policy.html) which even in non-durable delivery mode allows a new consumer to go back in time and receive messages delivered within a window (a fixed amount of RAM or time window). e.g. if your broker dies you have 2 minutes to reconnect to another broker and not miss any messages - even without durable delivery.

### Recommendations for using JmsTemplate

*   Never use a regular ConnectionFactory unless you are totally sure it does all the pooling you need
*   If using in an EJB ensure you use the EJB containers ConnectionFactory
*   If you are only publishing messages and you are not in an EJB container and you are using ActiveMQ, then you can use either the [PooledConnectionFactory](http://activemq.codehaus.org/maven/apidocs/org/activemq/pool/PooledConnectionFactory.html) or the [Spring CachingConnectionFactory](http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/jms/connection/CachingConnectionFactory.html)
*   If you are consuming messages its probably simpler & more efficient & less likely to lose messages to avoid using the receive() method and use Spring's [MessageListenerContainer](http://static.springsource.org/spring/docs/2.5.x/reference/jms.html#jms-mdp) instead
*   See also [Using Spring to Send JMS Messages](http://bsnyderblog.blogspot.com/2010/02/using-spring-jmstemplate-to-send-jms.html) and [Using Spring to Receive JMS Messages](http://bsnyderblog.blogspot.com/2010/02/using-spring-to-receive-jms-messages.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35962))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();