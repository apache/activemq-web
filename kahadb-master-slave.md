      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- KahaDB Master Slave 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") ™ [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Clustering](clustering.html) > [MasterSlave](masterslave.html) > [KahaDB Master Slave](kahadb-master-slave.html)

[Download](download.html "Download") | [JavaDocs](http://activemq.apache.org/maven/5.8.0/apidocs/index.html) [More...](javadocs.html "JavaDocs") | [Source](source.html "Source") | [Forums](discussion-forums.html "Discussion Forums") | [Support](support.html "Support")

![](https://cwiki.apache.org/confluence/images/icons/emoticons/forbidden.gif)

**Note**  
This is under review - and not currently supported.

Overview
--------

The new KahaDB store supports a very fast and flexible replication system. It features:

*   Journal level replication (The translates into lower overhead to the master to replicate records).
*   Support for multiple slaves.
*   Support to dynamically add slaves at runtime.
*   Uses multiple concurrent data transfer sessions to do an initial slave synchronization.
*   Big slave synchronizations can be resumed so synchronization progress is not lost if a slave is restarted.
*   A configurable minimum number of replicas allows you to pause processing until the data has been guaranteed to be replicated enough times.

Master Election
---------------

KahaDB supports a pluggable Master Election algorithm but the only current implementation is one based on [ZooKeeper](http://hadoop.apache.org/zookeeper).

ZooKeeper is used to implement the master election algorithm. ZooKeeper is a very fast, replicated, in memory database with features that make it easy to implement cluster control algorithms. It is an Apache project which you can [freely download](http://hadoop.apache.org/zookeeper/releases.html). You must installed and have at least one ZooKeeper server running before setting up a KahaDB Master Slave configuration.

Configuring a Broker:
---------------------

The ActiveMQ binary distribution includes a KahaDB HA broker configuration at **$ACTIVEMQ_HOME/conf/ha.xml**.

It it setup to look for a ZooKeeper 3.0.0 server on localhost at port 2181. Edit the configuration if this is not where you are running your ZooKeeper server.

Start the configuation up by running:

<!\[CDATA\[ prompt&gt; $ACTIVEMQ_HOME/bin/activemq xbean:ha.xml \]\]>

The actual contents of the configuration file follows:

Error formatting macro: snippet: java.lang.IndexOutOfBoundsException: Index: 20, Size: 20

Understanding the kahadbReplication XML element
-----------------------------------------------

### The brokerURI Attribute

Notice that the the brokerURI attribute points at another broker configuration file. The ha-broker.xml contains the actual broker configuration that the broker uses when the node take over as master. The ha-broker.xml configuration file is a standard broker configuration except in these aspects:

*   It MUST set the start="false" attribute on the broker element.
*   It MUST not configure a persistenceAdapter.

The above rules allows the replication system to inject the replicated KahaDB store into the Master when it's starting up.

### The minimumReplicas Attribute

The minimumReplicas specifies how many copies of the database are required before synchronous update operations are deemed successful. Setting this to 0 allows a broker to continue operating even if there are no slaves attached. If the value is set to 1 or greater, and there are no slaves attached, the brokers persistent message processing will be suspended until the minimum number of slaves are attached and the data synchronized.

### The uri Attribute

The uri attribute should always be configured with a **kdbr://** based URI. KDBR stands for 'KahaDB Replication' and this is the replication protocol used between the masters and the slaves. The master binds the specified port with slaves subsequently connect to and establish replication sessions. The host name in the uri MUST get updated to the actual machine's host name since this is also used to identify the nodes in the cluster.

### The directory Attribute

This is the data directory where the KahaDB will store it's persistence files.

### [Overview](overview.html "Overview")

*   [Index](index.html "Index")
*   [News](news.html "News")
*   [New Features](new-features.html "New Features")
*   [Getting Started](getting-started.html "Getting Started")
*   [FAQ](faq.html "FAQ")
*   [Articles](articles.html "Articles")
*   [Books](books.html "Books")
*   [Download](download.html "Download")
*   [License](http://www.apache.org/licenses/)

### Search

    
  

### Sub Projects

*   [Apollo](http://activemq.apache.org/apollo "ActiveMQ Apollo")
*   [CMS](http://activemq.apache.org/cms/ "The C++ API for Messaging")
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [Camel](http://camel.apache.org/ "POJO based Enterprise Integration Patterns with a typesafe Java DSL")

### [Community](community.html "Community")

*   [Support](support.html "Support")
*   [Contributing](contributing.html "Contributing")
*   [Discussion Forums](discussion-forums.html "Discussion Forums")
*   [Mailing Lists](mailing-lists.html "Mailing Lists")
*   [IRC](irc://irc.codehaus.org/activemq)
*   [IRC Log](http://servlet.uwyn.com/drone/log/hausbot/activemq)
*   [Site](site.html "Site")
*   [Sponsorship](http://www.apache.org/foundation/sponsorship.html)
*   [Projects Using ActiveMQ](projects-using-activemq.html "Projects Using ActiveMQ")
*   [Users](users.html "Users")
*   [Team](team.html "Team")
*   [Thanks](http://www.apache.org/foundation/thanks.html)

### [Features](features.html "Features")

*   [Advisory Message](advisory-message.html "Advisory Message")
*   [Clustering](clustering.html "Clustering")
*   [Cross Language Clients](cross-language-clients.html "Cross Language Clients")
*   [Enterprise Integration Patterns](enterprise-integration-patterns.html "Enterprise Integration Patterns")
*   [JMX](jmx.html "JMX")
*   [JMS to JMS Bridge](jms-to-jms-bridge.html "JMS to JMS Bridge")
*   [MasterSlave](masterslave.html "MasterSlave")
*   [Message Groups](message-groups.html "Message Groups")
*   [Networks of Brokers](networks-of-brokers.html "Networks of Brokers")
*   [Performance](performance.html "Performance")
*   [Persistence](persistence.html "Persistence")
*   [Security](security.html "Security")
*   [Virtual Destinations](virtual-destinations.html "Virtual Destinations")
*   [Visualisation](visualisation.html "Visualisation")
*   [More ...](features.html "Features")

### [Connectivity](connectivity.html "Connectivity")

*   [Ajax](ajax.html "Ajax")
*   [AMQP](amqp.html "AMQP")
*   [Axis and CXF Support](axis-and-cxf-support.html "Axis and CXF Support")
*   [C Integration](c-integration.html "C Integration")
*   [C++](activemq-c-clients.html "ActiveMQ C++ Clients")
*   [C# and .Net Integration](http://activemq.apache.org/nms/)
*   [CMS](http://activemq.apache.org/cms/)
*   [J2EE](j2ee.html "J2EE")
*   [JBoss Integration](jboss-integration.html "JBoss Integration")
*   [Jetty](http://docs.codehaus.org/display/JETTY/Integrating+with+ActiveMQ)
*   [JNDI Support](jndi-support.html "JNDI Support")
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [REST](rest.html "REST")
*   [RSS and Atom](rss-and-atom.html "RSS and Atom")
*   [Spring Support](spring-support.html "Spring Support")
*   [Stomp](stomp.html "Stomp")
*   [Tomcat](tomcat.html "Tomcat")
*   [Unix Service](unix-service.html "Unix Service")
*   [WebLogic Integration](weblogic-integration.html "WebLogic Integration")
*   [XMPP](xmpp.html "XMPP")
*   [More ...](connectivity.html "Connectivity")

### [Using ActiveMQ 5](using-activemq-5.html "Using ActiveMQ 5")

*   [Getting Started](version-5-getting-started.html "Version 5 Getting Started")
*   [Initial Configuration](version-5-initial-configuration.html "Version 5 Initial Configuration")
*   [Running a Broker](version-5-run-broker.html "Version 5 Run Broker")
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html "How do I embed a Broker inside a Connection")
*   [Command Line Tools](activemq-command-line-tools-reference.html "ActiveMQ Command Line Tools Reference")
*   [Configuring Transports](configuring-version-5-transports.html "Configuring Version 5 Transports")
*   [Examples](version-5-examples.html "Version 5 Examples")
*   [Web Samples](version-5-web-samples.html "Version 5 Web Samples")
*   [Monitoring the Broker](how-can-i-monitor-activemq.html "How can I monitor ActiveMQ")
*   [Xml Configuration](version-5-xml-configuration.html "Version 5 XML Configuration")
*   [Xml Reference](xml-reference.html "Xml Reference")
*   [More ...](using-activemq-5.html "Using ActiveMQ 5")

### [Using ActiveMQ 4](using-activemq.html "Using ActiveMQ")

*   [Getting Started](getting-started.html "Getting Started")
*   [Initial Configuration](initial-configuration.html "Initial Configuration")
*   [Running a Broker](run-broker.html "Run Broker")
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html "How do I embed a Broker inside a Connection")
*   [Command Line Tools](activemq-command-line-tools-reference.html "ActiveMQ Command Line Tools Reference")
*   [Configuring Transports](configuring-transports.html "Configuring Transports")
*   [Examples](examples.html "Examples")
*   [Web Samples](web-samples.html "Web Samples")
*   [Monitoring the Broker](how-can-i-monitor-activemq.html "How can I monitor ActiveMQ")
*   [Xml Configuration](xml-configuration.html "Xml Configuration")
*   [Xml Reference](xml-reference.html "Xml Reference")
*   [More ...](using-activemq.html "Using ActiveMQ")

### [Tools](tools.html "Tools")

*   [Web Console](web-console.html "Web Console")
*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html "ActiveMQ Performance Module Users Manual")

### [External Tools](tools.html "Tools")

*   [hawtio](http://hawt.io "HTML5 console for monitoring Apache ActiveMQ and Apache Camel")
*   [Hermes Jms](hermes-jms.html "Hermes Jms")
*   [JMeter](http://jakarta.apache.org/jmeter)

### [Support](support.html "Support")

*   [Issues](http://issues.apache.org/jira/browse/AMQ)
*   [Roadmap](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:roadmap-panel)
*   [Change log](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:changelog-panel)

### Related Projects

*   [Apache ServiceMix](http://incubator.apache.org/servicemix/ "Distributed Enterprise Service Bus based on JBI")
*   [Lingo](http://lingo.codehaus.org/ "POJO Remoting using JMS")
*   [Jencks](http://jencks.codehaus.org/ "Message Driven POJOs and pooling for JMS and JDBC")
*   [Stomp](http://stomp.codehaus.org/ "A simple protocol for messaging middleware interop and the easy development of custom clients")
*   [Spring](http://www.springframework.org/)
*   [OpenEJB](http://openejb.apache.org)
*   [Geronimo](http://geronimo.apache.org/)

### [Developers](developers.html "Developers")

*   [Source](source.html "Source")
*   [Building](building.html "Building")
*   [Developer Guide](developer-guide.html "Developer Guide")
*   [Becoming a committer](becoming-a-committer.html "Becoming a committer")
*   [Code Overview](code-overview.html "Code Overview")
*   [Wire Protocol](wire-protocol.html "Wire Protocol")
*   [Release Guide](release-guide.html "Release Guide")

### Tests

*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html "ActiveMQ Performance Module Users Manual")
*   [Benchmark Tests](benchmark-tests.html "Benchmark Tests")
*   [JMeter System Tests](jmeter-system-tests.html "JMeter System Tests")
*   [JMeter Performance Tests](jmeter-performance-tests.html "JMeter Performance Tests")
*   [Integration Tests](integration-tests.html "Integration Tests")

### Project Reports

*   [JUnit Reports](junit-reports.html "JUnit Reports")
*   [Source XRef](source-xref.html "Source XRef")
*   [Test Source XRef](test-source-xref.html "Test Source XRef")
*   [Xml Reference](xml-reference.html "Xml Reference")

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=103076))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();