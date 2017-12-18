      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Interceptors 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Interceptors](interceptors.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ has a sophisticated _interceptor stack_ so that you can attach whatever functionality you require into the broker in an easy way without complicating all of the other broker code. This has really helped us keep the code clean and modular while offering powerful extension points.

For an example of the kinds of things you can do with interceptors see the following pages

*   [Logging Interceptor](logging-interceptor.html)
*   [Security](security.html)
*   [Visualisation](visualisation.html)
*   [TimeStamp on the Broker](timestampplugin.html)
*   [Get Statistics via Messages](statisticsplugin.html)
*   [Destinations Plugin](destinations-plugin.html)

### How plugins work

A plugin is an instance of the interface [BrokerPlugin](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/BrokerPlugin.html) which allows a plugin to add itself into the broker interceptor chain, typically using the [BrokerFilter](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/BrokerFilter.html) as a base class to allow only certain operations to be customized.

The object that implements the BrokerPlugin interface is called out as a plugin in the message broker's XML configuration file (see example below). Your plugin can then optionally reference other beans that are defined in the XML file.

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:amq="http://activemq.org/config/1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans-2.0.xsd http://activemq.org/config/1.0 
http://activemq.apache.org/schema/activemq-core.xsd http://activemq.apache.org/camel/schema/spring  http://activemq.apache.org/camel/schema/spring/camel-spring.xsd">

<!\-\- Allows us to use system properties as variables in this configuration file -->
<bean  class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer" />

 <broker xmlns="http://activemq.org/config/1.0" brokerName="localhost" dataDirectory="${activemq.base}/data" plugins="#myPlugin">

   <!\-\- The transport connectors ActiveMQ will listen to -->
   <transportConnectors>
     <transportConnector name="openwire" uri="tcp://localhost:61616" />
   </transportConnectors>

  </broker>

  <bean id="myPlugin" class="org.myorg.MyPlugin">
             <!\-\- You can reference one or more Spring beans in this file -->
             <property name="myMgr" ref="myManager"/>		 
  </bean>

  <bean id="myManager" class="org.myorg.MyManager">
             <property name="fooList">
	      <list>
		<value>foo</value>
                <value>foo2</value>
	     </list>
            </property>
 </bean>

</beans>

You can also define plugins from within the <plugin> element as this example illustrates.

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:amq="http://activemq.org/config/1.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans-2.0.xsd http://activemq.org/config/1.0 
http://activemq.apache.org/schema/activemq-core.xsd http://activemq.apache.org/camel/schema/spring
http://activemq.apache.org/camel/schema/spring/camel-spring.xsd">

 <!\-\- Allows us to use system properties as variables in this configuration file -->
 <bean  class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer" />

 <broker xmlns="http://activemq.org/config/1.0" brokerName="localhost" dataDirectory="${activemq.base}/data">

  <!\-\- The transport connectors ActiveMQ will listen to -->
  <transportConnectors>
     <transportConnector name="openwire" uri="tcp://localhost:61616" />
  </transportConnectors>

  <plugins>
      <bean xmlns="http://www.springframework.org/schema/beans" id="myPlugin" class="org.myorg.MyPlugin"/>    
  </plugins>

 </broker>
 
</beans>

At startup, the main or core broker calls your plugin's installPlugin() method. This method creates and returns an object that typically extends [BrokerFilter](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/BrokerFilter.html).

import org.apache.activemq.broker.Broker;
import org.apache.activemq.broker.BrokerPlugin;

public class MyPlugin implements BrokerPlugin {	
        
        public Broker installPlugin(Broker broker) throws Exception {            
             return new MyBroker(broker);
        }	

}

The BrokerFilter class is a convenience class that implements the [Broker](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/Broker.html) interface. This interface defines all the main operations (e.g., addConnection, addSession, etc.) that your implementation can intercept. The class that extends BrokerFilter overrides any of the methods that are defined in the Broker interface so that it can intercept the corresponding core engine's operations. Here's an example of a class that extends BrokerFilter and intercepts/overrides the addConnection() and addSession() Broker methods/operations.

import org.apache.activemq.broker.Broker;
import org.apache.activemq.broker.BrokerFilter;
import org.apache.activemq.broker.ConnectionContext;
import org.apache.activemq.command.ConnectionInfo;

public class MyBroker extends BrokerFilter {
    
     public MyBroker(Broker next) {
        super(next);                
    }

    public void addConnection(ConnectionContext context, ConnectionInfo info) 
            throws Exception {       
        
         // Your code goes here 

        // Then call your parent
        super.addConnection(context, info);
    }   

    public void addSession(ConnectionContext context, SessionInfo info) 
            throws Exception {       
        
         //  Your code goes here...

         // Then call your parent
         super.addSession(context, info);
    }	
}

For more details see [Developing Plugins](developing-plugins.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36062))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();