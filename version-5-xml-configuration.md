      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Version 5 XML Configuration 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ 5](using-activemq-5.html) > [Version 5 XML Configuration](version-5-xml-configuration.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

*   transport connectors which consist of transport channels and wire formats TODO: add a link to a page explaining what transport connectors are how to configure and use them.
*   network connectors using network channels or discovery TODO: add a link to a page explaining what network connectors are how to configure and use them.
*   discovery agents TODO: add a link to a page explaining what discovery agents are how to configure and use them.
*   persistence providers & locations TODO: add a link to a page explaining what persistence providers are how to configure and use them.
*   custom message containers (such as last image caching etc)

We use [XBean](http://xbean.org/) to perform the XML configuration.

For details of the XML see the [Xml Reference](xml-reference.html)

Be careful with broker names and URIs

Make sure you do not use any strange characters in the names of brokers as they are converted to URIs which [do not allow things like underscores](http://java.sun.com/j2se/1.4.2/docs/api/java/net/URI.html) in them etc.

Examples
--------

The default ActiveMQ configuration: [current default config](http://svn.apache.org/repos/asf/activemq/trunk/assembly/src/release/conf/activemq.xml).

xml<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd"> <!-- Allows us to use system properties as variables in this configuration file --> <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"> <property name="locations"> <value>file:${activemq.conf}/credentials.properties</value> </property> </bean> <!-- Allows accessing the server log --> <bean id="logQuery" class="io.fabric8.insight.log.log4j.Log4jLogQuery" lazy-init="false" scope="singleton" init-method="start" destroy-method="stop"> </bean> <!-- The <broker> element is used to configure the ActiveMQ broker. --> <broker xmlns="http://activemq.apache.org/schema/core" brokerName="localhost" dataDirectory="${activemq.data}"> <destinationPolicy> <policyMap> <policyEntries> <policyEntry topic=">" > <!-- The constantPendingMessageLimitStrategy is used to prevent slow topic consumers to block producers and affect other consumers by limiting the number of messages that are retained For more information, see: http://activemq.apache.org/slow-consumer-handling.html --> <pendingMessageLimitStrategy> <constantPendingMessageLimitStrategy limit="1000"/> </pendingMessageLimitStrategy> </policyEntry> </policyEntries> </policyMap> </destinationPolicy> <!-- The managementContext is used to configure how ActiveMQ is exposed in JMX. By default, ActiveMQ uses the MBean server that is started by the JVM. For more information, see: http://activemq.apache.org/jmx.html --> <managementContext> <managementContext createConnector="false"/> </managementContext> <!-- Configure message persistence for the broker. The default persistence mechanism is the KahaDB store (identified by the kahaDB tag). For more information, see: http://activemq.apache.org/persistence.html --> <persistenceAdapter> <kahaDB directory="${activemq.data}/kahadb"/> </persistenceAdapter> <!-- The systemUsage controls the maximum amount of space the broker will use before disabling caching and/or slowing down producers. For more information, see: http://activemq.apache.org/producer-flow-control.html --> <systemUsage> <systemUsage> <memoryUsage> <memoryUsage percentOfJvmHeap="70" /> </memoryUsage> <storeUsage> <storeUsage limit="100 gb"/> </storeUsage> <tempUsage> <tempUsage limit="50 gb"/> </tempUsage> </systemUsage> </systemUsage> <!-- The transport connectors expose ActiveMQ over a given protocol to clients and other brokers. For more information, see: http://activemq.apache.org/configuring-transports.html --> <transportConnectors> <!-- DOS protection, limit concurrent connections to 1000 and frame size to 100MB --> <transportConnector name="openwire" uri="tcp://0.0.0.0:61616?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> <transportConnector name="amqp" uri="amqp://0.0.0.0:5672?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> <transportConnector name="stomp" uri="stomp://0.0.0.0:61613?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> <transportConnector name="mqtt" uri="mqtt://0.0.0.0:1883?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> <transportConnector name="ws" uri="ws://0.0.0.0:61614?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> </transportConnectors> <!-- destroy the spring context on shutdown to stop jetty --> <shutdownHooks> <bean xmlns="http://www.springframework.org/schema/beans" class="org.apache.activemq.hooks.SpringContextHook" /> </shutdownHooks> </broker> <!-- Enable web consoles, REST and Ajax APIs and demos The web consoles requires by default login, you can disable this in the jetty.xml file Take a look at ${ACTIVEMQ_HOME}/conf/jetty.xml for more details --> <import resource="jetty.xml"/> </beans>

From a binary distribution there is an _activemq_ script allowing you to run a Message Broker as a stand alone process from the command line easily providing the $ACTIVEMQ_HOME/bin directory is on your PATH.

Configuring embedded brokers
----------------------------

You can also use the XML Configuration to configure [embedded brokers](how-do-i-embed-a-broker-inside-a-connection.html). For example using the JNDI configuration mechanism you can do the following  
[BrokerXmlConfigFromJNDITest](http://svn.apache.org/repos/asf/activemq/trunk/assembly/src/test/java/org/apache/activemq/config/BrokerXmlConfigFromJNDITest.java)  
Or of you want to explicitly configure the embedded broker via Java code you can do the following  
[BrokerXmlConfigTest](http://svn.apache.org/repos/asf/activemq/trunk/assembly/src/test/java/org/apache/activemq/config/BrokerXmlConfigTest.java)

User Submitted Configurations
-----------------------------

We have a page which allows users to submit details of their configurations.

*   [User Submitted Configurations](user-submitted-configurations.html)

Background
----------

Since ActiveMQ has so many strategy pattern plugins for transports, wire formats, persistence and many other things, we wanted to leave the configuration format open so that you the developer can configure and extend ActiveMQ in any direction you wish.

So we use the [Spring XML](http://static.springframework.org/spring/docs/2.5.x/reference/beans.html#beans-basics) configuration file format, which allows any beans / POJOs to be wired together and configured. However often Spring's XML can be kinda verbose at times, so we have implemented an ActiveMQ extension to the Spring XML which knows about the common, standard ActiveMQ things you're likely to do (e.g. tags like connector, wireFormat, serverTransport, persistence) - but at any time you can fall back to the normal Spring way of doing things (with tags like bean, property etc).

To see documentation of the XML file we use or to get access to the XSD/DTD see the [Xml Reference](xml-reference.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=71197))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();