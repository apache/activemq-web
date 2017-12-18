      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Spring Support 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Spring Support](spring-support.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

We fully support Spring for configuration of the JMS client side as well as for configuring the JMS Message Broker.  
There is a great [article](http://codedependents.com/2009/10/16/efficient-lightweight-jms-with-spring-and-activemq/) on using Spring with ActiveMQ - I'd recommend reading it first.

Configuring the JMS client
--------------------------

To configure an ActiveMQ JMS client in Spring it is just a simple matter of configuring an instance of ActiveMQConnectionFactory within a standard Spring XML configuration file like any other bean. There are [several examples and test cases](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/java/org/apache/activemq/spring/) available and [this one](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/xbean/spring.xml) shows how to construct an ActiveMQConnectionFactory in Spring which is then passed into a Spring JmsTemplate for use by some POJOs.

e.g. the following fragment of XML shows us creating a JMS connection factory for ActiveMQ connecting to a remote broker on a specific host name and port.

<bean id="jmsFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
    <property name="brokerURL">
      <value>tcp://localhost:61616</value>
    </property>
  </bean>

The following shows how to use Zeroconf to discover the available brokers to connect to.

<bean id="jmsFactory" class="org.apache.activemq.ActiveMQConnectionFactory">
    <property name="brokerURL">
      <value>zeroconf://_activemq.broker.development.</value>
    </property>
  </bean>

From 1.1 of ActiveMQ onwards you can also use JNDI to configure ActiveMQ within Spring. [This example](http://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/spring-jndi.xml) shows how to configure Spring using ActiveMQ's [JNDI Support](jndi-support.html).

### Using Spring

If you are using the new [XML Schema-based configuration](http://static.springframework.org/spring/docs/2.0.x/reference/xsd-config.html) of Spring 2.0 you can embed the ActiveMQ broker XML inside any regular Spring.xml file without requiring the above factory bean. e.g. here is an example of a regular Spring XML file in Spring 2.0 which also configures a broker.

<beans 
  xmlns="http://www.springframework.org/schema/beans" 
  xmlns:amq="http://activemq.apache.org/schema/core"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd
  http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd">

  <amq:broker useJmx="false" persistent="false">
    <amq:transportConnectors>
      <amq:transportConnector uri="tcp://localhost:0" />
    </amq:transportConnectors>
  </amq:broker>

  <amq:connectionFactory id="jmsFactory" brokerURL="vm://localhost"/>
</beans>

This allows you to configure JMS artifacts like destinations and connection factories together with the entire broker.

Working with Spring's JmsTemplate
---------------------------------

Spring supports a handy abstraction, JmsTemplate, which allows you to hide some of the lower level JMS details when sending messages etc.

Please be aware that there are a number of [JmsTemplate Gotchas](jmstemplate-gotchas.html) to be careful of.

One thing to bear in mind with JmsTemplate is that by default it will create a new connection, session, producer for each message sent - then close them all down again. This is very inefficient! It is done like this to work in EJB containers which tend to use a special ConnectionFactory which does pooling.

If you are not using a JCA container to manage your JMS connections, we recommend you use our pooling JMS connection provider, (org.apache.activemq.pool.PooledConnectionFactory) from the `activemq-pool` library, which will pool the JMS resources to work efficiently with Spring's JmsTemplate or with EJBs.

e.g.

<!\-\- a pooling based JMS provider -->
  <bean id="jmsFactory" class="org.apache.activemq.pool.PooledConnectionFactory" destroy-method="stop">
    <property name="connectionFactory">
      <bean class="org.apache.activemq.ActiveMQConnectionFactory">
        <property name="brokerURL">
          <value>tcp://localhost:61616</value>
        </property>
      </bean>
    </property>
  </bean>

  <!\-\- Spring JMS Template -->
  <bean id="myJmsTemplate" class="org.springframework.jms.core.JmsTemplate">
    <property name="connectionFactory">
      <ref local="jmsFactory"/>
    </property>
  </bean>

The `PooledConnectionFactory` supports the pooling of Connection, Session and MessageProducer instances so it can be used with tools like [Camel](http://camel.apache.org/activemq.html) and Spring's [JmsTemplate and MessagListenerContainer](http://activemq.apache.org/spring-support.html) . Connections, sessions and producers are returned to a pool after use so that they can be reused later without having to undergo the cost of creating them again.

Note: while the `PooledConnectionFactory` does allow the creation of a collection of active consumers, it does not 'pool' consumers. Pooling makes sense for connections, sessions and producers, which can be seldom-used resources, are expensive to create and can remain idle a minimal cost. Consumers, on the other hand, are usually just created at startup and left going, handling incoming messages as they come. When a consumer is complete, it's preferred to shut down it down rather than leave it idle and return it to a pool for later reuse: this is because, even if the consumer is idle, ActiveMQ will keep delivering messages to the consumer's prefetch buffer, where they'll get held up until the consumer is active again.

If you are creating a collection of consumers (for example, for multi-threaded message consumption), you should consider keeping a low prefetch value (e.g. 10 or 20), to ensure that all messages don't end up going to just one of the consumers.

We do also have a pooling JMS ConnectionFactory for use inside a JCA / MDB container (org.apache.activemq.ra.InboundConnectionProxyFactory), when using our JCA Resource Adapter which will reuse the same JMS connection/session which is being used for inbound messages.

Consuming JMS from inside Spring
--------------------------------

Spring's [MessagListenerContainer](http://static.springsource.org/spring/docs/2.5.x/reference/jms.html#jms-mdp) should be used for message consumption. This provides all the power of MDBs - efficient JMS consumption and pooling of the message listeners - but without requiring a full EJB container.

You can use the `activemq-pool` `org.apache.activemq.pool.PooledConnectionFactory` for efficient pooling of the connections and sessions for your collection of consumers, or you can use the Spring JMS `org.springframework.jms.connection.CachingConnectionFactory` to achieve the same effect.

More Information
----------------

Also check out the following blogs for information about using Spring JMS with ActiveMQ:

*   [Synchronous Request Response with ActiveMQ and Spring](http://codedependents.com/2010/03/04/synchronous-request-response-with-activemq-and-spring/)
*   [Using Spring to Send JMS Messages](http://bsnyderblog.blogspot.com/2010/02/using-spring-jmstemplate-to-send-jms.html)
*   [Using Spring to Receive JMS Messages](http://bsnyderblog.blogspot.com/2010/02/using-spring-to-receive-jms-messages.html)
*   [Tuning JMS Message Consumption In Spring](http://bsnyderblog.blogspot.com/2010/05/tuning-jms-message-consumption-in.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35878))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();