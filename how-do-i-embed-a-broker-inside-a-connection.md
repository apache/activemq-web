      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- How do I embed a Broker inside a Connection 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I embed a Broker inside a Connection](how-do-i-embed-a-broker-inside-a-connection.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

In many messaging topologies there are JMS Brokers (server side) and a JMS client side. Often it makes sense to deploy a broker within your JVM. This allows you to optimise away a network hop; making the networking of JMS as efficient as pure RMI, but with all the usual JMS features of location independence, reliability, load balancing etc.

There are various ways to embed a broker in ActiveMQ depending on if you are using Java, Spring, XBean or using the ActiveMQConnectionFactory .

### Using explicit Java code

The following Java code will create an embedded broker

BrokerService broker = new BrokerService();

// configure the broker
broker.addConnector("tcp://localhost:61616");

broker.start();

If you want to lazily bind the transport connector as part of start(), useful when start() will block pending a store lock (as in a slave start), you can use the following code

BrokerService broker = new BrokerService();

TransportConnector connector = new TransportConnector();
connector.setUri(new URI("tcp://localhost:61616"));
broker.addConnector(connector);
broker.start();

In the same JVM clients can then use the [vm:// transport](vm-transport-reference.html) to connect to the embedded broker - whilst external clients can use the [tcp:// protocol](tcp-transport-reference.html)

If you have more than one embedded broker, ensure that you give them a unique name and - e.g.

BrokerService broker = new BrokerService();
// configure the broker
broker.setBrokerName("fred");
broker.addConnector("tcp://localhost:61616");
broker.start();

Then if you want to connect to the broker named 'fred' from within the same JVM, you can by using the uri **vm://fred**

It is possible to fully configure a broker through application code e.g.

BrokerService broker = new BrokerService();
broker.setBrokerName("fred");
broker.setUseShutdownHook(false);
//Add plugin
broker.setPlugins(new BrokerPlugin\[\]{new JaasAuthenticationPlugin()});
//Add a network connection
NetworkConnector connector = answer.addNetworkConnector("static://"+"tcp://somehost:61616");
connector.setDuplex(true);
broker.addConnector("tcp://localhost:61616");
broker.start();

Please note that you should add plugins before connectors or they will not be initialized

For more details on the available properties you can specify, see the [BrokerService javadoc](http://activemq.apache.org/maven/5.11.0/apidocs/org/apache/activemq/broker/BrokerService.html)

### Using the BrokerFactory

There is a helper class called [BrokerFactory](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/broker/BrokerFactory.html) which can be used to create a broker via URI for configuration.

BrokerService broker = BrokerFactory.createBroker(new URI(someURI));

The available values of the URI are

URI scheme

Example

Description

xbean:

xbean:activemq.xml

Searches the classpath (and file system) for an XML document with the given URI (activemq.xml in this case) which will then be used as the [Xml Configuration](xml-configuration.html)

broker:

broker:tcp://localhost:61616

Uses the [Broker Configuration URI](broker-configuration-uri.html) to confgure the broker

### Using Spring

There is a factory bean that can refer to an external ActiveMQ XML configuration file

<bean id="broker" class="org.apache.activemq.xbean.BrokerFactoryBean">
    <property name="config" value="classpath:org/apache/activemq/xbean/activemq.xml" />
    <property name="start" value="true" />
  </bean>

In this case the usual Spring 'classpath:org/apache/activemq/xbean/activemq.xml' resource mechanism is being used so that the activemq.xml file would be found on the classpath by looking inside all the directories on the classpath then looking for 'org/apache/activemq/xbean/activemq.xml'. You can of course change this to any value you like. e.g. use classpath:activemq.xml if you just want to drop it in a directory that is in the classpath; like WEB-INF/classes in a web application.

If you wish you can use a URL instead using the **file:* or *http:** prefixes. For more details see how [Spring deals with resources](http://static.springframework.org/spring/docs/1.2.x/reference/beans.html#context-functionality-resources)

### Using XBean

If you are already using [XBean](http://geronimo.apache.org/xbean/) then you can just mix and match your Spring/XBean [XML configuration](https://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-core/src/test/resources/org/apache/activemq/xbean/activemq.xml) with ActiveMQ's configuration.

<beans 
  xmlns="http://www.springframework.org/schema/beans" 
  xmlns:amq="http://activemq.apache.org/schema/core"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
  http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd">

  <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"/>

  <broker useJmx="true" xmlns="http://activemq.apache.org/schema/core">

    <persistenceFactory>
      <kahaDB directory="${basedir}/target" />
    </persistenceFactory>

    <transportConnectors>
      <transportConnector uri="tcp://localhost:61636" />
    </transportConnectors>

  </broker>
</beans>

### Using Spring 2.0

If you are using Spring 2.0 and ActiveMQ 4.1 or later (and xbean-spring 2.5 or later) you can embed the ActiveMQ broker XML inside any regular Spring.xml file without requiring the above factory bean. e.g. here is an [example](http://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-core/src/test/resources/spring-embedded-xbean.xml) of a regular Spring XML file in Spring 2.0 which also configures a broker.

<beans 
  xmlns="http://www.springframework.org/schema/beans" 
  xmlns:amq="http://activemq.apache.org/schema/core"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
  http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd">
  
  <!\-\-  lets create an embedded ActiveMQ Broker -->
  <amq:broker useJmx="false" persistent="false">
    <amq:transportConnectors>
      <amq:transportConnector uri="tcp://localhost:0" />
    </amq:transportConnectors>
  </amq:broker>

   <!\-\-  ActiveMQ destinations to use  -->
  <amq:queue id="destination"  physicalName="org.apache.activemq.spring.Test.spring.embedded"/>

  <!\-\- JMS ConnectionFactory to use, configuring the embedded broker using XML -->
  <amq:connectionFactory id="jmsFactory" brokerURL="vm://localhost"/>
  

  <!\-\- Spring JMS Template -->
  <bean id="myJmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory">
      <!\-\- lets wrap in a pool to avoid creating a connection per send -->
      <bean class="org.springframework.jms.connection.SingleConnectionFactory">
        <property name="targetConnectionFactory">
          <ref local="jmsFactory" />
        </property>
      </bean>
    </property>
  </bean>

  <bean id="consumerJmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory" ref="jmsFactory"/>
  </bean>

  <!\-\- a sample POJO which uses a Spring JmsTemplate -->
  <bean id="producer" class="org.apache.activemq.spring.SpringProducer">
    <property name="template">
      <ref bean="myJmsTemplate"></ref>
    </property>

    <property name="destination">
      <ref bean="destination" />
    </property>

    <property name="messageCount">
      <value>10</value>
    </property>
  </bean>

  <!\-\- a sample POJO consumer -->
  <bean id="consumer" class="org.apache.activemq.spring.SpringConsumer">
    <property name="template" ref="consumerJmsTemplate"/>
    <property name="destination" ref="destination"/>
  </bean>

</beans>

### Using ActiveMQConnectionFactory

An embedded broker can also be created using an ActiveMQConnectionFactory and using a vm connector as a uri. e.g.

ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory("vm://localhost?broker.persistent=false");

Use the query parameters "broker.<property>" to configure the broker, where <property> matches the bean properties on the BrokerService.

The broker will be created upon creation of the first connection.

You can turn off auto creation by setting the create property on the VM Transport to false:

ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory("vm://localhost?create=false");

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36150))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();