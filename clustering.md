      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Clustering 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Clustering](clustering.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Clustering is a large topic and often means different things to different people. We'll try to list the various aspects of clustering and how they relate to ActiveMQ

Queue consumer clusters
-----------------------

ActiveMQ supports reliable high performance load balancing of messages on a queue across consumers. In enterprise integration, this scenario is known as the [competing consumers](http://www.eaipatterns.com/CompetingConsumers.html) pattern. The following figure illustrates the concept:

![](clustering.data/competing-consumers.png)

This solution receives the messages sent by the producers, enqueues them and distributes them between all the registered consumers. This has a number of benefits:

*   The load is distributed in a very dynamic fashion. Additional consumers could be provisioned and attached to the queue in high load periods, without modifying any configuration in the queue, as the new consumer would behave as just another competing consumer.
*   Better availability than systems using a load balancer. Load balancers usually rely on a monitorization system to find out which real-servers are unavailable. With competing consumers, a failed consumer won't be competing for messages and therefore messages won't be delivered to it even without monitorization.
*   High reliability, if a consumer fails, any unacknowledged messages are redelivered to other consumers on the queue.

On the downside, this pattern might not be ideal in systems where the order processing is required. To mitigate this problem while maintaining the benefits, the competing consumers pattern should be used in conjunction with other ActiveMQ [features](features.html) like the [exclusive consumers](exclusive-consumer.html) and the [message groups](message-groups.html) as stated in the [ActiveMQ's FAQ](how-do-i-preserve-order-of-messages.html).

Broker clusters
---------------

The most common mental model of clustering in a JMS context is that there is a collection of JMS brokers and a JMS client will connect to one of them; then if the JMS broker goes down, it will auto-reconnect to another broker.

We implement this using the **failover://** protocol in the JMS client. See the [Failover Transport Reference](failover-transport-reference.html) page for details of how to configure the failover protocol. _Note:_ The reliable:// protocol in ActiveMQ 3.x has now been changed to the failover:// protocol

If we just run multiple brokers on a network and tell the clients about them using either [static discovery](http://incubator.apache.org/activemq/static-transport-reference.html) or [dynamic discovery](http://incubator.apache.org/activemq/discovery-transport-reference.html), then clients can easily failover from one broker to another. However, stand alone brokers don't know about consumers on other brokers; so if there are no consumers on a certain broker, messages could just pile up without being consumed. We have an outstanding [feature request](http://issues.apache.org/activemq/browse/AMQ-816) to tackle this on the client side - but currently the solution to this problem is to create a Network of brokers to store and forward messages between brokers.

Discovery of brokers
--------------------

We support [auto-discovery](discovery.html) of brokers using [static discovery](http://incubator.apache.org/activemq/static-transport-reference.html) or [dynamic discovery](http://incubator.apache.org/activemq/discovery-transport-reference.html), so clients can automatically detect and connect to a broker out of a logical group of brokers as well for brokers to discover and connect to other brokers to form large networks.

Networks of brokers
-------------------

If you are using [client/server or hub/spoke style topology](topologies.html) and you have many clients and many brokers, there is a chance that one broker has producers but no consumers, so that messages pile up without being processed. To avoid this, ActiveMQ supports a [Networks of Brokers](networks-of-brokers.html) which provides _store and forward_ to move messages from brokers with producers to brokers with consumers which allows us to support [distributed queues and topics](how-do-distributed-queues-work.html) across a network of brokers.

This allows a client to connect to any broker - and fail over to another broker if there is a failure - providing a cluster of brokers from the clients perspective.

Networks of brokers also allows us to scale up to a massive number of clients in a network as we can run as many brokers as we need.

You can think of this as a cluster of clients connecting with a cluster of brokers with auto-failover and discovery, making a simple and easy to use messaging fabric.

Master Slave
------------

The problem with running lots of stand alone brokers or brokers in a network is that messages are owned by a single physical broker at any point in time. If that broker goes down, you have to wait for it to be restarted before the message can be delivered. (If you are using non-persistent messaging and a broker goes down you generally lose your message).

The idea behind [MasterSlave](masterslave.html) is that messages are replicated to a slave broker so that even if you have a catastrophic hardware failure of the master's machine, file system or data centre, you get immediate failover to the slave with no message loss.

Replicated Message Stores
-------------------------

An alternative to [MasterSlave](masterslave.html) is to have some way to replicate the message store; so for the disk files to be shared in some way. For example using a SAN or shared network drive you can share the files of a broker so that if it fails another broker can take over straight away.

So by supporting a [Replicated Message Store](replicated-message-store.html) you can reduce the risk of message loss to provide either a HA backup or a full [DR](dr.html) solution capable of surviving a data centre failure.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35981))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();