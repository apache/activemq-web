      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- JCA Container 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [JCA Container](jca-container.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The JCA Container is moving

We will continune to support the ActiveMQ JCA Container up until ActiveMQ 3.1.

After that point we will be moving to [Jencks](http://jencks.codehaus.org/) which is a migration of the ActiveMQ codebase together with code [Geronimo](http://geronimo.apache.org) and from some other contributors.

Jencks is completely logically equivalent to the ActiveMQ JCA Container and migrating to it is pretty simple (mostly just a class name change for the JCA container) - though the benefits of Jencks are that it supports full XA recovery and works well with Geronimo's TransactionManager and WorkManager.

So we do recommend you migrate to [Jencks](http://jencks.codehaus.org/) whenever its easy for you to do so; projects such as [Lingo](http://lingo.codehaus.org/) and [ServiceMix](http://servicemix.org/) already have and it was an easy migration.

We have a lightweight, easily embeddable Spring based JCA container which allows us to provide MDB like functionality inside any Java application without requiring a full EJB container.

This allows us to support _message driven pojos_ using dependency injection for efficient JMS consumption together with pooling of the pojos using lightweight containers rather than relying on EJB.

The JCA container also makes it easy to programatically at runtime create new message driven pojos rather than relying on the fixed deployment-time only option with EJB.

Example
-------

Here is [an example](http://docs.codehaus.org/download/attachments/23776/spring.xml) of the Spring XML to deploy a pojo (EchoBean) on an inbound JMS subscription, on a topic in this particular example.

Firstly we can create as many JCAContainer instances as we need; currently we create one per JCA [Resource Adapter](resource-adapter.html) (i.e. JMS provider). The JCAContainer also uses a WorkManager which is JCA speak for a bunch of thread pools. We can share the WorkManager across JCAContainer instances or create one per JCAContainer.

Once we have a JCAContainer we can add as many JCAConnector instances to it, via the **addConnector** factory method, each one representing a JMS subscription and providing a pool of POJOs to process the message. The subscription details are specified by an activationSpec property which is a bean typically dependent on the JMS provider; this allows providers to add new extensions while leaving your application code pure JMS.

Notice that the regular Spring pooling mechanism, the **targetSource** property, is used to pool the actual POJO and that Spring uses Dependency Injection to construct instances of the POJO.

**Note** you must set the **singleton** flag to false for the POJOs if they are not thread safe.

Requirements
------------

To be able to use the JCA container, you just need the following jars on your classpath

*   [required ActiveMQ jars](initial-configuration.html) if you are using ActiveMQ as your JMS provider - or your provider's jars if not
*   activemq-container.jar
*   spring.jar
*   J2EE.jar (for the JCA APIs). If you are inside Tomcat, it doesn't like j2ee.jar on the classpath, so use the individual jars from Geronimo - e.g. geronimo-spec-j2ee-connector-*.jar for the JCA APIs
*   commons-collections.jar
*   commons-pool.jar
*   aopalliance.jar (a temporary dependency introduced by Spring's use of the TargetSource, we should be able to remove this dependency later on).

**Note** the classes and resources in activemq-container.jar are not included in activemq.jar

To use the JCA Container please use the 2.x code release. Several problems were found and fixed with the 1.x branch of code.

Things to watch
---------------

By default the ActiveMQ [Resource Adapter](resource-adapter.html) will try to connect to a remote broker (ie. tcp://localhost:61616). Also if you want to set how the broker is configured via XML then try the _brokerXmlConfig_ property.

_Note:_ In AMQ 3.x the default behavior is the ActiveMQ resource adapter will create an embedded broker

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35896))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();