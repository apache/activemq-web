      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- How To Unit Test JMS Code 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [JMS](jms.html) > [How To Unit Test JMS Code](how-to-unit-test-jms-code.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

When unit testing code with JMS you'll typically want to avoid the overhead of running separate proceses; plus you'll want to increase startup time as fast as possible as you tend to run unit tests often and want immediate feedback. Also persistence can often cause problems - as previous test case results can adversely affect future test case runs - so you often need to purge queues on startup.

So when unit testing JMS code we recommend the following

*   Use [an embedded broker](how-do-i-embed-a-broker-inside-a-connection.html) to avoid a separate broker process being required.
*   Disable [broker persistence](broker-configuration-uri.html) so that no queue purging is required before/after tests.
*   It's often simpler and faster to just use Java code to create the broker via an XML configuration file using Spring etc.

You can do all of this using the following Java code to create your JMS **`ConnectionFactory`** which will also automatically create an embedded broker

ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("vm://localhost?broker.persistent=false");

For more configuration options see the [VM Transport Reference](vm-transport-reference.html) and the [Broker Configuration URI](broker-configuration-uri.html)

Or if you really would rather be more explicit you can create the broker first using the following Java code

BrokerService broker = new BrokerService();
broker.setPersistent(false);
broker.start();

or you could use [Spring Support.](spring-support.html)

### Using JNDI

If your application code is using JNDI to lookup the JMS **`ConnectionFactory`** and **`Destination`**'s to use, then you could use the [JNDI Support](jndi-support.html) in ActiveMQ.

Add the following **`jndi.properties`** to your classpath, e.g., in **`src/test/resources`**, if you are using maven:

java.naming.factory.initial = org.apache.activemq.jndi.ActiveMQInitialContextFactory
java.naming.provider.url = vm://localhost?broker.persistent=false

You should then consider using [Dynamic destinations in JNDI](jndi-support.html) so that your code looks up destinations via

context.lookup("dynamicQueues/FOO.BAR");

### Using The `EmbeddedActiveMQBroker` JUnit Rule (ActiveMQ 5.13)

If your test code is using JUnit, then you could use the **`EmbeddedActiveMQBroker`** JUnit Rule provided in the **`activemq-junit`** library. Add the **`activemq-junit`** library along with the **`activemq-broker`** libraries for the version of ActiveMQ you want to test with.  The rule will use whatever version of ActiveMQ it finds in the classpath, so the ActiveMQ libraries need to be specified if they are not already there.

If you are using Maven, add the following to your **`pom.xml`**:

<dependency>
    <groupId>org.apache.activemq.tooling</groupId>
    <artifactId>activemq-junit</artifactId>
    <version>${activemq-junit-version}</version>
    <scope>test</scope>
</dependency> 

<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>activemq-broker</artifactId>
    <version>${activemq-version}</version>
    <scope>test</scope>
</dependency>

 Then add the **`EmbeddedActiveMQBroker`** JUnit Rule to your test, and JUnit will start the embedded broker at the beginning of each test and stop the broker at the end of the test.

**Use The ActiveMQ JUnit Rule**

@Rule
public EmbeddedActiveMQBroker broker = new EmbeddedActiveMQBroker();

By default, the **`EmbeddedActiveMQBroker`** will configure the broker as non-persistent, and the only transport available will be the VM transport. To customize this configuration, either extend the **`EmbeddedActiveMQBroker`** class and override the **`configure()`** method, or use an XML configuration for the broker.  

**Note**: to configure an **`EmbeddedActiveMQBroker`** using XML configuration, you may need to add additional libraries to the classpath to support XBean configuration of ActiveMQ.

**Customizing An EmbeddedActiveMQBroker Using Java**

@Rule
EmbeddedActiveMQBroker customizedBroker = new EmbeddedActiveMQBroker() {
    @Override
    protected void configure() {
        // Perform additional configuration here...
    }
}

  

**Customizing An EmbeddedActiveMQBroker Using XML Configuration**

@Rule
EmbeddedActiveMQBroker customizedBroker = new EmbeddedActiveMQBroker("bean:customize-activemq.xml");

Note that to use the XML configuration, you may need to add additional libraries on the classpath to support the XBean configuration of ActiveMQ.  The versions of the **`spring-context`** library should correspond with the version used by your selected version of ActiveMQ.

**Maven Configuration For XBean Configuration**

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>Appropriate version for activemq-version</version>
</dependency>

<dependency>
    <groupId>org.apache.activemq</groupId>
    <artifactId>activemq-spring</artifactId>
    <version>${activemq-version></version>
</dependency>

Then you can use the VM URI to connect with the broker

ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("vm://embedded-broker?create=false");

You can also get a connection factory from the **`EmbeddedActiveMQBroker`**:

ConnectionFactory connectionFactory = embeddedBroker.createConnectionFactory();

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36076))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();