      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- URI Protocols 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [URI Protocols](uri-protocols.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ is designed to support mutliple different [topologies](topologies.html) and protocols. Which one you use depends on your messaging requirements, quality of service and network topology.

The following table describes the different network protocols available for JMS clients along with showing the connection URL string you use to enable this communication protocol. On the broker side there are additional [transports](configuring-transports.html) supported. You can specify the connection URL on an [ActiveMQConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html) (in a constructor or via the brokerURL property).

e.g. if you don't want to bother setting up JNDI and so forth and just wanna create a JMS connection you can do something like

ConnectionFactory factory = new ActiveMQConnectionFactory("tcp://somehost:61616");
Connection connection = factory.createConnection();

Protocol Summary
----------------

Protocol

Example

Description

Server?

VM

vm://host:port

Client connect to each other within the same JVM. This does use an asynchronous channel and a separate worker thread. You can enable sync sending using a query parameter, such as

vm://localhost?async=false

Yes

TCP

tcp://host:port

Client connects to the broker at the given URL

Yes

SSL

ssl://host:port

Client connects to the broker at the given URL

Yes

Failover

failover:(Uri1,Uri2,Uri3,...,UriN)

Provides a list of possible URIs to connect to and one is randomly chosen. If the connection fails then the transport auto-reconnects to a different one

Peer

peer://serviceName

Creates a pure peer to peer network of nodes of a given service name. In peer mode there is no server, nodes just automatically connect and make a peer network. The serviceName allows you to keep networks apart from each other, such as development, testing, UAT and production.

Discovery

discovery://host:port

Uses [Discovery](discovery.html) to connect to an available broker of the correct channel name. If multiple brokers can be found then one is chosen at random. If the connection fails then another broker is chosen, if available

Zeroconf

zeroconf:_activemq.broker.development.

Uses [Zeroconf](zeroconf.html) to connect to an available broker of the correct Zeroconf service name. If multiple brokers can be found then one is chosen at random. If the connection fails then another broker is chosen, if available

HTTP

http://host:port

Client connects to the broker using HTTP tunnelling, with XML payloads suitable for going through firewalls

Yes

UDP

udp://host:port

Client connects to the broker at the given URL

multicast

multicast://host:port

No server, though only works for pub/sub. A pure peer based network where all traffic is multicasted around and filtering is performed on the client.

The _Server?_ column above indiciates whether or not a protocol can be used in an ActiveMQ broker transport connector. All of the above protocols can be used in a JMS client to connect to the messaging fabric; only those protocols indicated can be used in a broker-side transport connector.

When connecting to an ActiveMQ broker, this could reside locally inside your JVM or be remote on another machine somewhere. If you want to enable the deployment of the ActiveMQ inside your JVM you can enable the useEmbeddedBroker property on the [ActiveMQConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html).

Please refer to the [topologies overview](topologies.html) to see how we can use ActiveMQ in many different topologies to suit your messaging needs.

### Specifying multiple URLs to connect to

If you want full [HA](ha.html) to provide failover and auto-reconnection you can use the _failover:_ prefix

failover:(tcp://foo:61699,tcp://bar:61617,tcp://whatnot:61698)

see [Configuring Transports](configuring-transports.html) for more details

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36094))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();