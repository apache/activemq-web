      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Resource Adapter Properties 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Resource Adapter](resource-adapter.html) > [Resource Adapter Properties](resource-adapter-properties.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The ActiveMQ Resource Adapter allows you to configure several properties that:

*   sets the options used for connection used for inbound message delivery
*   sets the default options used for the outbound connection factory objects.

The properties that can be configured are:

Property Name

Required

Default Value

Description

ServerUrl

no

tcp://localhost:61616

The URI to connect to the broker on

UserName

no

defaultUser

User name

Password

no

defaultPassword

Password

Clientid

no

null

The JMS client ID to use

UseInboundSession

no

false

BrokerXmlConfig

no

The ActiveMQ XML config file to use to deploy an embedded broker. E.g. to configure via an XML configuration file then use **xbean:activemq.xml** or to configure via a [Broker Configuration URI](broker-configuration-uri.html) (to avoid using Spring, XBean and XML) then use **broker:(tcp://localhost:61616)**

#### Performance related settings

Property Name

Required

Default Value

Description

AllPrefetchValues

no

Sets all the prefetch values in one setting

DurableTopicPrefetch

no

100

The maximum number of messages sent to a consumer on a durable topic until acknowledgements are received

QueuePrefetch

no

1000

The maximum number of messages sent to a consumer on a queue until acknowledgements are received

InputStreamPrefetch

no

100

The maximum number of messages sent to a consumer on a JMS stream until acknowledgements are received

TopicPrefetch

no

Short.MAX_VALUE - 1

The maximum number of messages sent to a consumer on a non-durable topic until acknowledgements are received

#### Redelivery properties

Property Name

Required

Default Value

Description

InitialRedeliveryDelay

no

1000

The delay before redeliveries start. Also configurable on the ActivationSpec.

MaximumRedeliveries

no

5

The maximum number of redeliveries or -1 for no maximum. Also configurable on the ActivationSpec.

RedeliveryBackOffMultiplier

no

5

The multiplier to use if exponential back off is enabled. Also configurable on the ActivationSpec.

RedeliveryUseExponentialBackOff

no

false

To enable exponential backoff. Also configurable on the ActivationSpec.

#### ServerUrl

The URL to the ActiveMQ server that you want this connection to connect to. If using an embedded broker, this value should be 'vm://localhost' if using the auto-created embedded broker, otherwise if you explicitly create a broker (e.g. using one of the [embedded broker](how-do-i-embed-a-broker-inside-a-connection.html) techniques), then this value should be 'vm://brokerName', where brokerName is replaced by the broker's name.

#### UserName

The default user name that will be used to establish connections to the ActiveMQ server.

#### Password

The default password that will be used to log the default user into the ActiveMQ server.

#### Clientid

The client id that will be set on the connection that is established to the ActiveMQ server.

#### UseInboundSession

Boolean to configure if outbound connections should reuse the inbound connection's session for sending messages.

#### BrokerXmlConfig

Sets the XML configuration file used to configure the embedded ActiveMQ broker via Spring if using embedded mode. If this property is omitted then no embedded broker is used and you must [run the broker](run-broker.html) in a separate process or deployment unit.

BrokerXmlConfig is the filename which is assumed to be on the classpath unless a URL is specified. So a value of foo/bar.xml would be assumed to be on the classpath whereas file:dir/file.xml would use the file system. Any valid URL string is supported.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36206))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();