      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Changes in 4.0 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [New Features](new-features.html) > [Changes in 4.0](changes-in-40.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### New Features in 4.0

*   [MasterSlave](masterslave.html) provides support for continuous availability and fault tolerance of brokers to be able to handle catastrophic hardware failure and not loose a message (or get duplicates).
*   A new [Exclusive Consumer](exclusive-consumer.html) feature allows you to pin message processing to a single consumer in a cluser of consumers.
*   A new [Message Groups](message-groups.html) feaure allows you load balance messages accross a set of consumers but also garantee the message order for messages within a message group.
*   A new [Total Ordering](total-ordering.html) feature to allow all consumers on a topic to see messages in the same order.
*   New [JMX Management](how-can-i-monitor-activemq.html) and monitoring capabilities. You can now see statistics for each broker, destination, connector and connection!
*   Improved [Security](security.html) plugin which provides JAAS support for authentication along with a pluggable strategy for authorization together with a default XML based implementation.
*   A new [OpenWire C Client](openwire-c-client.html) is now available. This client talks the same wire protocol that the standard java client uses so every messaging broker feature available to the java client is available to the c client.
*   An experimental [OpenWire dotNet](https://cwiki.apache.org/confluence/display/NMS) is available, written in pure C# along with a JMS-like API for working on the .Net platform with ActiveMQ
*   Queues can now be loaded up with persistent messages without locking up the broker. Persistent messages are now swapped out of memory when no consumer needs it soon.
*   A new [Consumer Priority](consumer-priority.html) feature allows you to build location affinity by assignin a priority to consumers. The broker can then dispatch messages to higher priority consumers before dispatching to lower priority consumers.
*   A configurable per [Consumer Dispatch Async](consumer-dispatch-async.html) flag which allows you to configure how messages are sent by the broker to a consumer. This controls if the broker uses [SEDA](seda.html) or [STP](#) style dispaching.
*   A new plug-able topic [Subscription Recovery Policy](subscription-recovery-policy.html) which allows you to configure how many transient messages are replayed when a [Retroactive Consumer](retroactive-consumer.html) is created.
*   A new [Retroactive Consumer](retroactive-consumer.html) feature allows topic consumers to "go back in time" so that it receives old messages when the subscription is activated. If the consumer is a durable consumer, he recover all the messages that are still in the persistent store.
*   [Per Destination Policies](per-destination-policies.html) allow you configure the behavior of destinations.
*   The broker now supports per destination plugable [Dispatch Policies](dispatch-policies.html) so that you can choose the distribution algorithm used to send messages to a consumer.
*   The broker now supports two new types of connectors:
    *   [The JMS Connector](the-jms-connector.html) is used to establish connection to external JMS providers so that messages can be bridged between the system.
    *   [The Proxy Connector](the-proxy-connector.html). Is used to proxy connections to another broker.
*   [Slow Consumer Handling](slow-consumer-handling.html) allows you to discard old messages for slow consumers on non-durable topics to avoid slowing down fast consumers
*   You can now specify [Destination Options](destination-options.html) that allow you to do extend configuration of consumers.
*   Conumsers now use [Optimized Acknowledgement](optimized-acknowledgement.html) by default to which results in increased performance.

### API/Configuration chanages

*   as part of the move to Apache, the package name is now **org.apache.activemq** and not **org.activemq**.
*   the [Xml Configuration](xml-configuration.html) has changed a little; mostly its now in the ActiveMQ namespace and has a generated XSD and documentation.
*   the _reliable_ transport has been renamed to _failover_ to make it more clear what it does; we're working on a separate DR mechanism to provide data centre resilliance. So if you wish to connect to one of a number of URIs try
    
    failover:tcp://host1:port1,tcp://host2:port2
    
*   The configuration options of transports have changed. See [ActiveMQ Connection URIs](activemq-connection-uris.html) for a detailed guide of of all the options.
*   The spring package has gone; we now use [XBean](http://xbean.org) to configure ActiveMQ. See the org.activemq.xbean.BrokerFactoryBean if you want a factory bean to use in regular spring instead of the org.activemq.spring.BrokerFactoryBean. See [Configuring Brokers](configuring-brokers.html) for more information on the new XML syntax.
*   ActiveMQTopic and ActiveMQQueue are now in the org.activemq.command package.
*   If you were creating a broker in Java code, the BrokerContainer has been replaced with BrokerService which is easier to use now.
*   The connection URL options have changed slightly to provided more persise configuration options of the transport and wireformat and to allow validation of the options.
*   [Message Redelivery and DLQ Handling](message-redelivery-and-dlq-handling.html) has been re-implemnted. Currently all messages sent poison messages are sent to a single DQL.
*   The [JMS Streams](jms-streams.html) API has changed.

### General Changes

*   The JDBC persistence adapter now uses JDBC statement batching to increase it's performance with the database. This should reduce the amount of time a checkpoint takes.
*   QueueBrowsers now play nicely with a queue that is currently being consumed from. It gives you a true snapshot of what the queue looked like when you created the browser and it does not affect the dispatching of messages to active consumers.
*   we no longer have hand-crafted marshalling code any more; its all based on [OpenWire](openwire.html) and autogenerated from the open wire commands in the org.activemq.command package
*   The network bridges used for broker to broker messaging now use a lower level ActiveMQ command and transport API instead of the JMS API, this allows them to use more optimizations and have a lower per bridge resource consumption while letting the JMS client API implementation reduce it's complexity.
*   Two types of network bridges are now supported:
    *   A simple forwardng bridge - sends all messages as soon as possible to the remote broker. Great you know the usage patterns up front and allways want to do store and forward to a central broker.
    *   A demand based forwarding bridge (same type of bridge that was using in ActiveMQ 3.x) which detects consumer demand on the remote broker and only forwards messages as needed.
*   The demand based forwarding bridge now take advantage of the [Consumer Priority](consumer-priority.html) to avoid forwarding messages to a remote broker if there is a local consumer consuming it's messages.
*   Message fragmentation is no longer done. Fragmented messages add yet another level of complexity when you introduce broker networks. Large objects/streams should be transfered using the [JMS Streams](jms-streams.html).
*   JMS clients marshall fewer messages on the wire on for a rollback.
*   JMS clients marshall fewer messages when sessions/consumers/producers are closed.
*   The client and the broker make more extensive use of Thread Pools to avoid allocating idle threads that are not being used.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36004))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();