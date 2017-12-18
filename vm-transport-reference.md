      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- VM Transport Reference 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ Connection URIs](activemq-connection-uris.html) > [VM Transport Reference](vm-transport-reference.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### The VM Transport

The VM transport allows clients to connect to each other inside the VM without the overhead of the network communication. The connection used is not a socket connection but use direct method invocations which enables a high performance embedded messaging system.

The first client to use the VM connection will boot an embedded broker. Subsequent connections will attach that the same broker. Once all VM connections to the broker have been closed, the embedded broker will automatically shutdown.

#### Simple Broker Configuration Syntax

This is the normal syntax for a VM connection. It's simple, but provides only a limited amount of configuration of the embedded broker.

**vm://brokerName?transportOptions**

If you want to connect to an already instantiated, embedded broker (e.g. as in case the case of Apache ServiceMix), make sure the brokerName used in the **vm://brokerName** url matches the brokerName of the already running broker.

##### Transport Options

Option Name

Default Value

Description

marshal

false

If true, forces each command sent over the transport to be marshalled and unmarshalled using a WireFormat

wireFormat

default

The name of the WireFormat to use

wireFormat.*

All the properties with this prefix are used to configure the wireFormat

create

true

If the broker should be created on demand if it does not already exist.

waitForStart

-1

If > 0, indicates the timeout in milliseconds to wait for a broker to start. Values -1 and 0 mean don't wait. Only supported in ActiveMQ 5.2+

broker.*

All the properties with this prefix are used to configure the broker. See [Configuring Wire Formats](configuring-wire-formats.html) for more information

##### Example URI

vm://broker1?marshal=false&broker.persistent=false

Be careful with embedded brokers

If you are using the VM transport and wish to explicitly configure an [Embedded Broker](how-do-i-embed-a-broker-inside-a-connection.html) there is a chance that you could create the JMS connections first before the broker starts up. Currently ActiveMQ will auto-create a broker if you use the VM transport and there is not one already configured. (In 5.2 it is possible to use the waitForStart and create=false options for the connection uri)

So to work around this if you are using Spring you may wish to use the **depends-on** attribute so that your JMS ConnectionFactory depends on the embedded broker to avoid this happening. e.g.

<bean id="broker" class="org.apache.activemq.xbean.BrokerFactoryBean">
    <property name="config" value="classpath:org/apache/activemq/xbean/activemq.xml" />
    <property name="start" value="true" />
  </bean>

  <bean id="connectionFactory" class="org.apache.activemq.ActiveMQConnectionFactory" depends-on="broker">
    <property name="brokerURL" value="vm://localhost"/>
  </bean>

#### Advanced Broker Configuration Syntax

This is the advanced syntax for a VM connection. It's allows you configure the broker more extensively using a [Broker Configuration URI](broker-configuration-uri.html).

**vm:(broker:(tcp://localhost)?brokerOptions)?transportOptions**  
or  
**vm:broker:(tcp://localhost)?brokerOptions**

##### Transport Options

Option Name

Default Value

Description

marshal

false

If true, forces each command sent over the transport to be marshalled and unmarshalled using a WireFormat

wireFormat

default

The name of the WireFormat to use

wireFormat.*

All the properties with this prefix are used to configure the wireFormat

There are [more options](how-should-i-use-the-vm-transport.html) on optimising the use of the VM transport.

##### Example URI

vm:(broker:(tcp://localhost:6000)?persistent=false)?marshal=false

#### Configuring an Embedded Broker Using an External Config File

 To start an embedded broker using the vm transport and configure it using an external configuration file (i.e. activemq.xml), use the following URI:

 vm://localhost?brokerConfig=xbean:activemq.xml 

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36000))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();