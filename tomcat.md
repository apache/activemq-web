      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Tomcat 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Tomcat](tomcat.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

#### Configuration issues for Tomcat 7 and later

Tomcat needs to be configured to ignore Jetty SCI annotations so that the Jetty WebSocket ServerContainerInitializer class is not inadvertently picked up by Tomcat. For more information on this problem see [AMQ-6154](https://issues.apache.org/jira/browse/AMQ-6154) and [https://wiki.apache.org/tomcat/HowTo/FasterStartUp](https://wiki.apache.org/tomcat/HowTo/FasterStartUp) and consult the Tomcat documentation for the version you are using to properly exclude the Jetty jar files from being scanned by Tomcat.

Pre-integrated Tomcat with ActiveMQ
-----------------------------------

Apache TomEE is a distribution of [Tomcat with fully integrated ActiveMQ](http://tomee.apache.org/tomcat-jms.html). All integration steps detailed here have already been done. The stack supports injection of Topic, Queue and ConnectionFactory references as well as transactional sending and delivery.

Something like the following works out of the box with no configuration:

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.jms.Topic;
import javax.jms.Queue;
import javax.jms.ConnectionFactory;

public class MyServet extends HttpServlet {

    @Resource(name = "foo")
    private Topic fooTopic;

    @Resource(name = "bar")
    private Queue barQueue;

    @Resource
    private ConnectionFactory connectionFactory;

Manually integrating Tomcat and ActiveMQ
----------------------------------------

Note, manually integrating ActiveMQ with Tomcat does allow for Topic, Queue, and ConnectionFactory injection but does not support transactional sending and delivery.

You should go to Tomcat documentation and read JNDI Resources HOW-TO, especially part: Configure Tomcat's Resource Factory.

ActiveMQ has ready JNDI resource factory for all its administered objects: ConnectionFactory and destinations.

You must provide it as a parameter factory for your resources:

<Context ...>
  ...
  <Resource name="jms/ConnectionFactory" auth="Container"
            type="org.apache.activemq.ActiveMQConnectionFactory"/>
  <ResourceParams name="jms/ConnectionFactory">
    <parameter>
      <name>factory</name>
      <value>org.activemq.jndi.JNDIReferenceFactory</value>
    </parameter>
    <parameter>
      <name>brokerURL</name>
      <value>vm://localhost</value>
    </parameter>
    <parameter>
      <name>brokerName</name>
      <value>LocalActiveMQBroker</value>
    </parameter>
    <parameter>
      <name>useEmbeddedBroker</name>
      <value>true</value>
    </parameter>
  </ResourceParams>
  ...
</Context>

If you are using Tomcat 5.5 or later then try this instead...

<Context>
    ...
  <Resource name="jms/ConnectionFactory" auth="Container" type="org.apache.activemq.ActiveMQConnectionFactory" description="JMS Connection Factory"
        factory="org.apache.activemq.jndi.JNDIReferenceFactory" brokerURL="vm://localhost" brokerName="LocalActiveMQBroker"/>
    ....
</Context>

Also, don't forget to put ActiveMQ and dependent jars to tomcat shared lib directory.

### Creating destinations in Tomcat 5.5 or later

This is completely untested but should work ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png)

<Context>
    ...
  <Resource name="jms/someTopic" auth="Container" type="org.apache.activemq.command.ActiveMQTopic" description="my Topic"
        factory="org.apache.activemq.jndi.JNDIReferenceFactory" physicalName="FOO.BAR"/>

  <Resource name="jms/aQueue" auth="Container" type="org.apache.activemq.command.ActiveMQQueue" description="my Queue"
        factory="org.apache.activemq.jndi.JNDIReferenceFactory" physicalName="FOO.BAR"/>
    ....
</Context>

JMX Tip when working with Tomcat

If you want to use JMX with Tomcat and then connect via JConsole to view the [JMX](jmx.html) MBeans of the server then set the following

CATALINA\_OPTS="$CATALINA\_OPTS -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=1099 \
    -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36215))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();