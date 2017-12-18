      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Inbound Communication 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [JBoss Integration](jboss-integration.html) > [Inbound Communication](inbound-communication.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Configuring an MDB to receive messages from ActiveMQ
----------------------------------------------------

There are three MDBs declared in the [ejb-jar.xml](inbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) deployment descriptor. For this example, I will be explaining how to configure the `TopicDurableMDB` to be invoked by JBoss when a message is received on an ActiveMQ Topic.

### The Bean

In the [ejb-jar.xml](inbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) deployment descriptor, the `TopicDurableMDB` is declared as follows:

**ejb-jar.xml**

 
<message-driven>
   ...
   <ejb-name>TopicDurableMDB</ejb-name>
   <ejb-class>com.panacya.platform.service.bus.mdb.SimpleMessageReceiverBean</ejb-class>
   <messaging-type>javax.jms.MessageListener</messaging-type>
   ...
   <activation-config>
      <activation-config-property>
         <activation-config-property-name>Destination</activation-config-property-name>
         <activation-config-property-value>topic.testTopic</activation-config-property-value>
      </activation-config-property>
      <activation-config-property>
         <activation-config-property-name>DestinationType</activation-config-property-name>
         <activation-config-property-value>javax.jms.Topic</activation-config-property-value>
      </activation-config-property>
      ...
   </activation-config>
   ...
</message-driven>

The `activation-config` element and it's child element, `activation-config-property`, are new elements for EJBs, so you might not be familiar with them. I won't go into to much detail about them, but it is important to understand that this is the first mechanism you use to link an MDB to a JCA.

### The Connector

The two `activation-config-properties` shown above link to the following elements in the [ra.xml](http://activemq.codehaus.org/checkout/activemq/modules/ra/src/rar/META-INF/ra.xml) file, which is contained within the [activemq-ra-1.2.rar](jboss-integration.html) file:

**ra.xml**

<inbound-resourceadapter>
      ...
         <activationspec>
            <activationspec-class>org.activemq.ra.ActiveMQActivationSpec</activationspec-class>
            <required-config-property>
               <config-property-name>Destination</config-property-name>
            </required-config-property>
            <required-config-property>
               <config-property-name>DestinationType</config-property-name>
            </required-config-property>
         </activationspec>
      ...
</inbound-resourceadapter>

In the [ejb-jar.xml](inbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) file section shown above, the value of the `Destination` property is set to `topic.testTopic`. This value is the physical name of the ActiveMQ destination the `TopicDurableMDB` will be receiving messages from and not a JNDI name. In other words, the value of the `Destination` property has no meaning to JBoss. It is purely an ActiveMQ setting.

### The Glue

In JBoss, the thing which connects an inbound JMS destination to an MDB is a JBoss container. To use ActiveMQ as the inbound message source for the `TopicDurableMDB` we must configure a new JBoss container. We do this in the [jboss.xml](inbound-communication.data/jboss.xml?version=3&modificationDate=1117021488000&api=v2) file.

Three things are needed in the [jboss.xml](inbound-communication.data/jboss.xml?version=3&modificationDate=1117021488000&api=v2) file in order to tie an MDB to a connector. They are:

1.  Configure a new `invoker-proxy-binding` that declares `JBossMessageEndpointFactory` as the `proxy-factory`
2.  Configure a new MDB container which uses the new `invoker-proxy-binding`
3.  Declare which MDBs should go into the new container

This first snippet configures a new `invoker-proxy-binding`:

**jboss.xml – invoker-proxy-binding**

<invoker-proxy-binding>
   <name>activemq-message-driven-bean</name>
   <invoker-mbean>default</invoker-mbean>
   <proxy-factory>org.jboss.ejb.plugins.inflow.JBossMessageEndpointFactory</proxy-factory>
   ...
</invoker-proxy-binding>

This second snippet configures a new MDB container which uses the `invoker-proxy-binding` configured above:

**jboss.xml – container-configuration**

<container-configuration>
   <container-name>ActiveMQ Message Driven Bean</container-name>
   <call-logging>false</call-logging>
   <invoker-proxy-binding-name>activemq-message-driven-bean</invoker-proxy-binding-name>
   ...
</container-configuration>

This third snippet links the `TopicDurableMDB` to the [activemq-ra-1.2.rar](jboss-integration.html) connector and tells JBoss to put instances of `TopicDurableMDB` into the new MDB container declared above:

**jboss.xml – TopicDurableMDB**

<message-driven>
   <ejb-name>TopicDurableMDB</ejb-name>
   <resource-adapter-name>activemq-ra-1.2-SNAPSHOT.rar</resource-adapter-name>
   <configuration-name>ActiveMQ Message Driven Bean</configuration-name>
</message-driven>

The above examples highlight the key configuration settings needed to enable MDBs deployed in JBoss to process messages from an ActiveMQ destination.

You can try the above example, plus a few more, by downloading the [activemq-jboss-test.zip](inbound-communication.data/activemq-jboss-test.zip?version=3&modificationDate=1117021355000&api=v2) file which contains the complete sample project.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36014))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();