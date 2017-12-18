      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Outbound Communication 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [JBoss Integration](jboss-integration.html) > [Outbound Communication](outbound-communication.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Configuring a Session Bean to send messages to ActiveMQ
-------------------------------------------------------

In the attached [example application](outbound-communication.data/activemq-jboss-test.zip?version=3&modificationDate=1117021355000&api=v2), the three MDBs use the `SenderEJB` to send JMS messages to an ActiveMQ queue. In this example, I will be explaining how to:

1.  Configure and deploy an ActiveMQ `Queue` to JBoss
2.  Configure and deploy an ActiveMQ `QueueConnectionFactory` to JBoss
3.  Configure an EJB, deployed to JBoss, to reference the above two.

### The Bean

In the [ejb-jar.xml](outbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) deployment descriptor, the `SenderEJB` is declared as follows:  

**ejb-jar.xml – session bean declaration**

 
<session>
   ...
   <ejb-name>SenderEJB</ejb-name>
   ...
   <ejb-class>com.panacya.platform.service.bus.sender.SenderBean</ejb-class>
   ...
   <resource-ref>
      <res-ref-name>jms/MyQueueConnectionFactory</res-ref-name>
      <res-type>javax.jms.QueueConnectionFactory</res-type>
      ...
   </resource-ref>
   <message-destination-ref>
      <message-destination-ref-name>jms/LogQueue</message-destination-ref-name>
      <message-destination-type>javax.jms.Queue</message-destination-type>
      ...
      <message-destination-link>LoggingQueue</message-destination-link>
   </message-destination-ref>
</session>

The `jms/MyQueueConnectionFactory` is the JNDI name the `SenderEJB` will use to lookup a `javax.jms.QueueConnectionFactory`. We will configure it to point to an ActiveMQ `QueueConnectionFactory`.

The `jms/LogQueue` is the JNDI name the `SenderEJB` will use to lookup the `javax.jms.Queue` it will send messages to. We use the `message-destination-link` element to refer to the `LoggingQueue` which is declared in the `assembly-descriptor` section of the [ejb-jar.xml](outbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) deployment descriptor as:  

**ejb-jar.xml – assembly descriptor section**

 
<assembly-descriptor>
   ...
   <message-destination>
      <message-destination-name>LoggingQueue</message-destination-name>
   </message-destination>
   ...
</assembly-descriptor>

This is a standard EJB deployment descriptor, nothing special.

### The Connector

The `resource-ref` element [shown above](outbound-communication.html), will be linked to the following element in the [ra.xml](http://activemq.codehaus.org/checkout/activemq/modules/ra/src/rar/META-INF/ra.xml) file, which is contained within the [activemq-ra-1.2.rar](jboss-integration.html) file:  

**ra.xml – The QueueConnectionFactory**

<outbound-resourceadapter>
   ...
   <connection-definition>
      ...
      <connectionfactory-interface>javax.jms.QueueConnectionFactory</connectionfactory-interface>
      <connectionfactory-impl-class>org.activemq.ra.ActiveMQConnectionFactory</connectionfactory-impl-class>
      <connection-interface>javax.jms.QueueConnection</connection-interface>
      ...
   </connection-definition>
   ...
</outbound-resourceadapter>

The `message-destination` element [shown above](outbound-communication.html), will be linked to the following element in the [ra.xml](http://activemq.codehaus.org/checkout/activemq/modules/ra/src/rar/META-INF/ra.xml) file:  

**ra.xml – The Queue**

<adminobject>
   <adminobject-interface>javax.jms.Queue</adminobject-interface>
   <adminobject-class>org.activemq.message.ActiveMQQueue</adminobject-class>
   <config-property>
      <config-property-name>PhysicalName</config-property-name>
      <config-property-type>java.lang.String</config-property-type>
   </config-property>
</adminobject>

### The Glue

In JBoss, connecting the resources needed by the [ejb-jar.xml](outbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2) file to resources provided by the [ra.xml](http://activemq.codehaus.org/checkout/activemq/modules/ra/src/rar/META-INF/ra.xml) file involves two additional files:

1.  **[panacya-jms-ds.xml](outbound-communication.data/panacya-jms-ds.xml?version=5&modificationDate=1117021448000&api=v2)** \- This is a JBoss data source file. It specifies which connector objects JBoss should instantiate and where in JNDI JBoss should place those objects.
2.  **[jboss.xml](outbound-communication.data/jboss.xml?version=3&modificationDate=1117021488000&api=v2)** \- This is a JBoss deployment descriptor which is contained within the [panacya-mdb-test-1.0.jar](jboss-integration.html) file. It links resources needed by the EJBs to the JNDI names of resources available in JBoss.

##### [panacya-jms-ds.xml](outbound-communication.data/panacya-jms-ds.xml?version=5&modificationDate=1117021448000&api=v2) – _The JBoss Data Source File_

This first snippet configures the `QueueConnectionFactory`, [declared above](outbound-communication.html), and places it in JNDI at `activemq/QueueConnectionFactory`:  

**panacya-jms-ds.xml – The QueueConnectionFactory**

<tx-connection-factory>
   <jndi-name>activemq/QueueConnectionFactory</jndi-name>
   <xa-transaction/>
   <rar-name>activemq-ra-1.2-SNAPSHOT.rar</rar-name>
   <connection-definition>javax.jms.QueueConnectionFactory</connection-definition>
   <security-domain-and-application>JmsXARealm</security-domain-and-application>
</tx-connection-factory>

This second snippet configures the `Queue`, [declared above](outbound-communication.html), and places it in JNDI at `activemq/queue/outbound`:  

**panacya-jms-ds.xml – The Queue**

<mbean code="org.jboss.resource.deployment.AdminObject" name="activemq.queue:name=outboundQueue">
   <attribute name="JNDIName">activemq/queue/outbound</attribute>
   <depends optional-attribute-name="RARName">jboss.jca:service=RARDeployment,name='activemq-ra-1.2-SNAPSHOT.rar'</depends>
   <attribute name="Type">javax.jms.Queue</attribute>
   <attribute name="Properties">
      PhysicalName=queue.outbound
   </attribute>
</mbean>

In the [panacya-jms-ds.xml](outbound-communication.data/panacya-jms-ds.xml?version=5&modificationDate=1117021448000&api=v2) file section shown above, the value of the `Properties` element is set to `PhysicalName=queue.outbound`. This value is the physical name of the ActiveMQ destination the `SenderEJB` will be sending messages to and not a JNDI name. In other words, the value of the `PhysicalName` property has no meaning to JBoss. It is purely an ActiveMQ setting.

##### [jboss.xml](outbound-communication.data/jboss.xml?version=3&modificationDate=1117021488000&api=v2) – _The JBoss Deployment Descriptor_

This first snippet links the `[jms/MyQueueConnectionFactory](outbound-communication.html)` JNDI name used by the `SenderEJB` to the resource name `queuefactoryref` which is local to the [jboss.xml](outbound-communication.data/jboss.xml?version=3&modificationDate=1117021488000&api=v2) file:  

**jboss.xml – The QueueConnectionFactory for the SenderEJB**

<enterprise-beans>
   <session>
      <ejb-name>SenderEJB</ejb-name>
      <resource-ref>
         <res-ref-name>jms/MyQueueConnectionFactory</res-ref-name>
         <resource-name>queuefactoryref</resource-name>
      </resource-ref>
   </session>
   ...
</enterprise-beans>

This second snippet links the local `queuefactoryref` name to the global JNDI name `java:/activemq/QueueConnectionFactory` which was [declared above](outbound-communication.html):  

**jboss.xml – Linking queuefactoryref to the global JNDI namespace**

<resource-managers>
   <resource-manager>
      <res-name>queuefactoryref</res-name>
      <res-jndi-name>java:/activemq/QueueConnectionFactory</res-jndi-name>
   </resource-manager>
   ...
</resource-managers>

This third snippet links the `LoggingQueue`, which was [declared](outbound-communication.html) in the `assembly-descriptor` section of the [ejb-jar.xml](outbound-communication.data/ejb-jar.xml?version=3&modificationDate=1117021488000&api=v2), to the global JNDI name `activemq/queue/outbound` which was [declared above](outbound-communication.html):  

**jboss.xml – Linking LoggingQueue to the global JNDI namespace**

<assembly-descriptor>
   <message-destination>
      <message-destination-name>LoggingQueue</message-destination-name>
      <jndi-name>activemq/queue/outbound</jndi-name>
   </message-destination>
</assembly-descriptor>

The above example highlights the key configuration settings needed to enable EJBs deployed in JBoss to send JMS messages to an ActiveMQ destination.

You can try the above example, plus a few more, by downloading the [activemq-jboss-test.zip](outbound-communication.data/activemq-jboss-test.zip?version=3&modificationDate=1117021355000&api=v2) file which contains the complete sample project.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36241))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();