      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Topologies 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Topologies](topologies.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ supports a wide range of different deployment topologies as well as [protocols](uri-protocols.html) & wire formats. The following diagram shows a federated network of brokers with a few different kinds of topology.

[![](topologies.data/BrokerTopology-1.png)](http://activemq.org/BrokerTopology.pdf)

Which topology you choose is up to you. We'll now describe a few of these protocols in a little more detail.

In VM
-----

A useful option when unit testing is to limit JMS communication to within a single JVM. For this use the protocol

vm://localhost

You can segment the VM protocol to different groups - e.g. if you want to have logically different JMS networks within the same JVM, you can group networks using different URIs. e.g.

vm://localhost/foo

This will ensure that different segments do not interfere with one another. Though typically we use unique topic and queue destinations so that all traffic can coexist happily on the same logical network.

Client-Server
-------------

This is probably the most efficient and fastest solution for large numbers of clients requiring a diverse range of communication options from publish / subscribe to queue based communication. Typically the clients will connect with a Message Broker using a protocol, typically TCP or SSL but this could be NIO or other protocols.

We can load balance clients across brokers and provide broker failover so that we have a logical cluster of brokers with [HA](ha.html).

e.g.

tcp://somehost:port

Or for SSL

ssl://somehost:port

You can use [Discovery](discovery.html) to find the brokers available that you can connect to which makes it easier to seamlessly connect to a cluster of brokers.

Embedded Broker
---------------

This is logically equivalent to Client-Server but some (or all) clients contain a locally embedded broker. So communcation between the client and server (broker) are all within the same JVM and so do not use real networking - though brokers may communicate with other brokers or clients connected to it.

This can avoid the extra hop required to go from producer to broker to consumer - which is a great optimisation for RMI / RPC style situations, where you want the performance benefits (reduced latency) of point to point networking but with the scalabilty of a flexible messaging fabric.

Embedded Brokers can also simplify deployment options as well, its one less process to run.

Another use case for embedded brokers is to provide store and forward isolation from each service - so that the remote brokers can fail quite happily without affecting the service with the embedded broker. e.g. the entire network could fail, but a service could continue publishing messages to its embedded broker.

You can find out how to [configure an embedded broker here](how-do-i-embed-a-broker-inside-a-connection.html)

Peer to Peer
------------

This allows peer based clusters to be created where there is no server - just clients connecting together.  
There are various ways to implement a peer to peer JMS network. One easy way is just to use a multicast transport for communication; then all nodes on the same multicast address will receive all messages and the local embedded message broker will route messages to the necessary MessageConsumers.

We currently have 3 choices for multicast protocols

*   multicast
*   jgroups: uses the JGroups library to implement reliable multicast
*   jrms: uses Sun's JRMS library to implement reliable multicast

Multicast is great in development though often you might want to disable this feature in production and have well known servers fixed on specific machines. Often socket based communication (using pointcast) is much faster & better for heavy-lifting - particularly on Java - so we tend to recommend to use multicast mostly for discovery and use TCP / SSL for your heavy duty messaging.

Often we can use the peer to peer topology as a bootstrap to create a cluster of clients & brokers and then autodeploy servers into the cluster for a true grid style network.

So you can get the effect of a peer based network using [Discovery](discovery.html) together with either stand alone Brokers or using embedded brokers.

### JXTA

We have a JXTA transport which will use the full JXTA stack for negotiating NAT and across firewalls and so forth for creating a true peer based JMS network.

jxta://hostname:port

Currently you need to run one server which everyone connects to via JXTA. We've not yet created a pure peer network with JXTA

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35975))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();