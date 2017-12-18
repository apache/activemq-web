      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Developing Plugins 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [Developer Guide](developer-guide.html) > [Developing Plugins](developing-plugins.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Apache ActiveMQ is based on the model of POJOs and _Dependency Injection_. If you are developing [Interceptors](interceptors.html) or additional components or plugins for ActiveMQ then the first thing you should do is develop the code as if you are writing any other Spring component, using dependency injection.

### Dependency Injection

Some folks favour using constructor based injection as it removes the need to have a separate lifecycle _start()_ method - others find using property based injection is a little more flexible and easier to map to XML configuration files. We'll leave that choice up to you. For complex to create objects you could consider writing a FactoryBean. For more details on writing POJOs with Spring see their [documentation](http://www.springframework.org/documentation).

### Custom XML

With ActiveMQ you can use regular Spring.xml syntax to configure things. However to produce neater XML that is easier to read and edit we use [XBean](http://geronimo.apache.org/xbean/) to autogenerate support for [Custom XML](http://geronimo.apache.org/xbean/custom-xml.html).

If you wish your POJO to have its own custom XML you may wish to follow the following source examples for working nicely with XBean. Basically you add an XBean annotation in the javadoc comments to tell XBean how to map the POJO to custom XML. This should look something like

/\*\*
 \* @org.apache.xbean.XBean element="foo"
 */
public class MyExtension {
...
}

You can omit the element configuration. For more details on the available annotation options see [here](http://geronimo.apache.org/xbean/xbean-ant-task.html)

If you are submitting your plugin to the ActiveMQ project then it will end up being included in the maven build step to create the XBean artifacts as part of the jar (in the META-INF/services area).

However if you are writing an external plugin to ActiveMQ then you will need to add the maven-xbean-plugin to your Maven 2 build. Refer to the [activemq-spring/pom.xml](http://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-spring/pom.xml) as an example of using this plugin.

### Configuring plugins without custom XML

If you want to configure plugins that does not implement custom XML, you can define plugins as "regular" Spring beans and reference them in broker's `plugins` attribute. For example,

<broker useJmx="true" xmlns="http://activemq.apache.org/schema/core" plugins="#loggingPlugin">
 ...
</broker>

<bean id="loggingPlugin" 
      class="org.apache.activemq.broker.util.LoggingBrokerPlugin"
/>

Not that this mechanism will not work in case that you have some XBean plugins configured inside the `<plugins/>` tag. In that case you must define the plugin inside that tag as well (with the appropriate schema definition). For example,

<plugins>
    <simpleAuthenticationPlugin>
      <users>
        <authenticationUser username="system" password="manager"
          groups="users,admins"/>
        <authenticationUser username="user" password="password"
          groups="users"/>
        <authenticationUser username="guest" password="password" groups="guests"/>
      </users>
    </simpleAuthenticationPlugin>  
    <bean xmlns="http://www.springframework.org/schema/beans" 
          id="loggingPlugin" 
          class="org.apache.activemq.broker.util.LoggingBrokerPlugin"
    />
</plugins>  

### Examples

The easiest way to get a feel for how to extend ActiveMQ is maybe to look at some concrete examples of features and how those are implemented and configured. Here are some examples

*   [XBeanBrokerService](http://svn.apache.org/repos/asf/activemq/trunk/activemq-spring/src/main/java/org/apache/activemq/xbean/XBeanBrokerService.java) deals with most of the core configuration of the <broker> tag in the XML
*   [Security](security.html) has an [example](http://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/security/jaas-broker.xml) XML configuration file using the [AuthorizationPlugin](http://svn.apache.org/repos/asf/activemq/trunk/activemq-broker/src/main/java/org/apache/activemq/security/AuthorizationPlugin.java)
*   The [Discarding DLQ Plugin](message-redelivery-and-dlq-handling.html) is used to discard messages from the DLQ.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36045))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();