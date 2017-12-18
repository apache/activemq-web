      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Broker Camel Component 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Broker Camel Component](broker-camel-component.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Broker Camel Component
----------------------

**Available as of ActiveMQ 5.9**

Embedding Apache Camel inside the ActiveMQ broker provides great flexibility for extending the message broker with the integration power of Camel. Apache Camel routes also benefit in that you can avoid the serialization and network costs of connecting to ActiveMQ remotely - if you use the [activemq component](http://camel.apache.org/activemq.html).

If however, you want to change the behavior of messages flowing through the ActiveMQ message broker itself you will be limited to the shipped set of ActiveMQ broker [Interceptors](http://activemq.apache.org/interceptors.html) \- or develop your own [Broker plugin](http://activemq.apache.org/developing-plugins.html) and then introduce that as a jar on to the class path for the ActiveMQ broker. The **`broker`** Camel component makes this even easier. It intercepts messages as they move through the broker itself, allowing them to be modified and manipulated before they are persisted to the message store or delivered to end consumers.

For example [by defining a CamelContext to run inside the broker's JVM](http://activemq.apache.org/how-should-i-package-applications-using-camel-and-activemq.html) the **`broker`** component can intercept all messages published to a Topic, say, and publish them to a Queue instead, changing their priority along the way:

<route id="setPriority">
   <from uri="broker:topic:test.broker.>"/>
      <setHeader headerName="JMSPriority">
         <constant>9</constant>
      </setHeader>
   <to uri="broker:queue:test.broker.component.queue"/>
</route>

Notes:

*   A broker component only adds an intercept into the broker if its started - so the broker component will not add any overhead to the running broker until its used - and then the overhead will be trivial.
*   Messages are intercepted by the broker component when they have been received by the broker - but before they are processed (persisted or routed to a destination).
*   The **`IN`** message on the Exchange is a **`CamelMessage`**, but also a JMS Message (messages routed through ActiveMQ from STOMP/MQTT/AMQP etc. are always translated into JMS messages).
*   W[ildcards](http://activemq.apache.org/wildcards.html) can be used on a destination to intercept messages from destinations matching the wildcard.
*   After the intercept, you have to explicitly send the message back to the broker component - this allows you to either drop select messages (by not sending) - or, like in the above case - re-route the message to a different destination.  
      
    

There is one deliberate caveat though, only intercepted messages can be sent to a **`broker`** component. For example, routing a Camel message from another Component e.g. **`file`**, will result in an error.

Extra classes that have been added to the **`activemq-broker`** package to support the **`broker`** component. They allow the state of the running broker to be interrogated without using JMX. These classes are:

*   [org.apache.activemq.broker.view.MessageBrokerView](http://activemq.apache.org/maven/5.9.0/apidocs/org/apache/activemq/broker/view/MessageBrokerView.html) \- provides methods to retrieve statistics on a the broker
*   From the **`org.apache.activemq.broker.view.MessageBrokerView`** \- you can retrieve a [org.apache.activemq.broker.view.BrokerDestinationView](http://activemq.apache.org/maven/5.9.0/apidocs/org/apache/activemq/broker/view/BrokerDestinationView.html) for a particular destination.

### Example

How to route messages when a destination's queue depth has reached a certain limit:

<camelContext id="camel" trace="false" xmlns="http://camel.apache.org/schema/spring">
  <route id="routeAboveQueueLimitTest">
    <from uri="broker:queue:test.broker.queue"/>
    <choice>
      <when>
        <spel>#{@destinationView.queueSize >= 100}</spel>
        <to uri="broker:queue:test.broker.processLater"/>
      </when>
      <otherwise>
        <to uri="broker:queue:test.broker.queue"/>
      </otherwise>
    </choice>
  </route>
</camelContext>

<bean id="brokerView" class="org.apache.activemq.broker.view.MessageBrokerView">
  <constructor-arg value="testBroker"/>
</bean>

<bean id="destinationView" factory-bean="brokerView" factory-method="getDestinationView">
  <constructor-arg value="test.broker.component.route"/>
</bean>

This is using the Camel Message Router pattern. Note the use of the Spring expression language **`spel`** in the **`when`** clause.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=34837593))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();