      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- How do distributed queues work 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do distributed queues work](how-do-distributed-queues-work.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

There are various [Topologies](topologies.html) that you can employ with ActiveMQ, where clients are connected to message brokers in various ways like

*   peer based
*   client server
*   hub and spoke

Each client communicates with a broker using some kind of [client library and network protocol](cross-language-clients.html).

To create distributed queues or topics we need to have the message brokers communicate with each other. There are two different types of broker to broker communication...

Master/Slave for High Availability
----------------------------------

A [Master/Slave Cluster](masterslave.html) is used for [HA](ha.html). Basically it means that all messages are replicated across each broker in the master/slave cluster. If the Master goes down, the clients can automatically failover to a slave which will have all the messages already, so each message is highly available. The Slave(s) provide a hot standby broker which will always be in sync ready to take over if the master goes away due to hardware failure etc.

Master/Slave works by having some form of replication; each message is owned by every broker in the logical cluster. A master/slave cluster then acts as one logical message broker which could then be connected via store and forward to other brokers (as we'll see in the next section).

### Distributed Queues and Topics

In Master/Slave, queues and topics are all replicated between each broker in the cluster (so often to a master and maybe a single slave). So each broker in the cluster has exactly the same messages available at any time so if a master fails, clients failover to a slave and you don't loose a message.

Store and forward networks of brokers
-------------------------------------

A [Store and Forward Network of Brokers](networks-of-brokers.html) means the messages travel from broker to broker until they reach a consumer; with each message being owned by a single broker at any point in time. When a JMS producer sends a message to a JMS consumer, it may travel through several brokers to reach its final destination. ActiveMQ uses [Consumer Priority](consumer-priority.html) so that local JMS consumers are always higher priority than remote brokers in a store and forward network.

Note though that a store and forward network is not a solution for message [HA](ha.html); if a broker fails in a Store and Forward network, the messages owned by that broker remain inside the broker's persistent store until the broker comes back online. If you need [HA](ha.html) of messages then you need to use Master/Slave described above.

Store and forward is often used in large networks where producers are on one LAN and consumers are on another LAN and you wish to use a broker on each LAN as a kind of network concentrator to minimise chattiness over the WAN between them (and to minimise the number of connections required across the WAN too). Similar uses of store and forward can be found when using firewalls or SSL across certain networks etc. One other use case for store and forward networks is if your OS does not support many sockets (and you can't reconfigure that) you could use a store and forward network to connect massive numbers of clients together in one logical network.

### Distributed Queues in Store/Forward

When we publish a message on a queue, it is stored in the persistent store of the broker that the publisher is communicating. Then if that broker is configured to store/foward to other brokers and clients, the broker will send it to _one_ of these clients (which could be a node or a broker depending on the dispatch algorithm). This dispatch algorithm continues until the message is finally dispatched and consumed by a client.

At any point in time the message will only exist in one broker's store until its consumed. Note that messages are only distributed onto other brokers if there is a consumer on those brokers.

e.g. if we had broker A, B, C and a publisher on a queue on A. If we have consumers on the queue on A and B then messages for the queue will be spread across both brokers A and B; some messages going to B, some being consumed on A, none going to C. If a consumer on the queue starts  
on C, then messages will flow there too. If the consumer stops then no more messages will be dispatched to C.

Distributed Topics in Store/Forward
-----------------------------------

For topics the above algorithm is followed except, every interested client receives a copy of the message - plus ActiveMQ will check for loops (to avoid a message flowing infinitely around a ring of brokers).

### See Also

*   [How do I configure distributed queues or topics](how-do-i-configure-distributed-queues-or-topics.html)
*   [MasterSlave](masterslave.html)
*   [Networks of Brokers](networks-of-brokers.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36217))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();