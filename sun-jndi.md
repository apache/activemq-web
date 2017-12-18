      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Sun JNDI 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Sun JNDI](sun-jndi.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

here's an example jndi.properties file:

java.naming.factory.initial = com.sun.jndi.fscontext.RefFSContextFactory

Here's an example .bindind file:

For ActiveMQ 4.x its

Archive/ClassName=org.apache.activemq.command.ActiveMQQueue
Archive/FactoryName=org.apache.activemq.jndi.JNDIReferenceFactory
Archive/RefAddr/0/Type=physicalName
Archive/RefAddr/0/Content=Archive
Archive/RefAddr/0/Encoding=String

GateIn/ClassName=org.apache.activemq.command.ActiveMQQueue
GateIn/FactoryName=org.apache.activemq.jndi.JNDIReferenceFactory
GateIn/RefAddr/0/Type=physicalName
GateIn/RefAddr/0/Content=GateIn
GateIn/RefAddr/0/Encoding=String

ProviderIn/ClassName=org.apache.activemq.command.ActiveMQQueue
ProviderIn/FactoryName=org.apache.activemq.jndi.JNDIReferenceFactory
ProviderIn/RefAddr/0/Type=physicalName
ProviderIn/RefAddr/0/Content=ProviderIn
ProviderIn/RefAddr/0/Encoding=String

ProviderOut/ClassName=org.apache.activemq.command.ActiveMQQueue
ProviderOut/FactoryName=org.apache.activemq.jndi.JNDIReferenceFactory
ProviderOut/RefAddr/0/Type=physicalName
ProviderOut/RefAddr/0/Content=ProviderOut
ProviderOut/RefAddr/0/Encoding=String

QueueConnectionFactory/ClassName=org.apache.activemq.ActiveMQConnectionFactory
QueueConnectionFactory/FactoryName=org.apache.activemq.jndi.JNDIReferenceFactory
QueueConnectionFactory/RefAddr/0/Type=brokerURL
QueueConnectionFactory/RefAddr/0/Content=vm\\://localhost
QueueConnectionFactory/RefAddr/0/Encoding=String
QueueConnectionFactory/RefAddr/1/Type=brokerName
QueueConnectionFactory/RefAddr/1/Content=ID\\:zdv-1189-1098562819250-0\\:0
QueueConnectionFactory/RefAddr/1/Encoding=String
QueueConnectionFactory/RefAddr/2/Type=password
QueueConnectionFactory/RefAddr/2/Content=defaultPassword
QueueConnectionFactory/RefAddr/2/Encoding=String
QueueConnectionFactory/RefAddr/3/Type=userName
QueueConnectionFactory/RefAddr/3/Content=defaultUser
QueueConnectionFactory/RefAddr/3/Encoding=String

For ActiveMQ 3.x it is

Archive/ClassName=org.activemq.message.ActiveMQQueue
Archive/FactoryName=org.activemq.jndi.JNDIReferenceFactory
Archive/RefAddr/0/Type=physicalName
Archive/RefAddr/0/Content=Archive
Archive/RefAddr/0/Encoding=String

GateIn/ClassName=org.activemq.message.ActiveMQQueue
GateIn/FactoryName=org.activemq.jndi.JNDIReferenceFactory
GateIn/RefAddr/0/Type=physicalName
GateIn/RefAddr/0/Content=GateIn
GateIn/RefAddr/0/Encoding=String

ProviderIn/ClassName=org.activemq.message.ActiveMQQueue
ProviderIn/FactoryName=org.activemq.jndi.JNDIReferenceFactory
ProviderIn/RefAddr/0/Type=physicalName
ProviderIn/RefAddr/0/Content=ProviderIn
ProviderIn/RefAddr/0/Encoding=String

ProviderOut/ClassName=org.activemq.message.ActiveMQQueue
ProviderOut/FactoryName=org.activemq.jndi.JNDIReferenceFactory
ProviderOut/RefAddr/0/Type=physicalName
ProviderOut/RefAddr/0/Content=ProviderOut
ProviderOut/RefAddr/0/Encoding=String

QueueConnectionFactory/ClassName=org.activemq.ActiveMQConnectionFactory
QueueConnectionFactory/FactoryName=org.activemq.jndi.JNDIReferenceFactory
QueueConnectionFactory/RefAddr/0/Type=brokerURL
QueueConnectionFactory/RefAddr/0/Content=vm\\://localhost
QueueConnectionFactory/RefAddr/0/Encoding=String
QueueConnectionFactory/RefAddr/1/Type=brokerName
QueueConnectionFactory/RefAddr/1/Content=ID\\:zdv-1189-1098562819250-0\\:0
QueueConnectionFactory/RefAddr/1/Encoding=String
QueueConnectionFactory/RefAddr/2/Type=password
QueueConnectionFactory/RefAddr/2/Content=defaultPassword
QueueConnectionFactory/RefAddr/2/Encoding=String
QueueConnectionFactory/RefAddr/3/Type=useEmbeddedBroker
QueueConnectionFactory/RefAddr/3/Content=true
QueueConnectionFactory/RefAddr/3/Encoding=String
QueueConnectionFactory/RefAddr/4/Type=userName
QueueConnectionFactory/RefAddr/4/Content=defaultUser
QueueConnectionFactory/RefAddr/4/Encoding=String
QueueConnectionFactory/RefAddr/5/Type=useAsyncSend
QueueConnectionFactory/RefAddr/5/Content=true
QueueConnectionFactory/RefAddr/5/Encoding=String

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36117))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();