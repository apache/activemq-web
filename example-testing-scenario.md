      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Example Testing Scenario 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [Integration Tests](integration-tests.html) > [Example Testing Scenario](example-testing-scenario.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ Performance Module
---------------------------

*   [Users Manual](activemq-performance-module-users-manual.html)

Example Testing Scenario
------------------------

This page gives a simple example of the kinds of thing we wanna do.

Assuming that all the test code is within a single Maven POM for now (e.g. activemq-integration-test version 4.0) which will deal with all the classpath issues.

We'll try describe the different ways this could work and give each implementation style a name so we can start revving different ways to solve this...

### Headless build

In this version there is no 'controller'; each build is considered to be a totally separate build.

Each build knows what to do; each test case generates an XML file which becomes a named deployment artifact.

e.g. imagine the following builds (which are really just running Java executables within a POM for classpath)

Box

Description

Command line

hostB

Broker

java org.apache.activemq.broker.console.Main tcp://$hostA:61616

hostC

Consumer

java org.apache.activemq.test.ConsumerMain --message-count=5000 --queue=true --destination=org.foo.bar tcp://$hostA:61616

hostD

Producer

java org.apache.activemq.test.ProducerMain --message-count=5000 --queue=true --destination=org.foo.bar tcp://$hostA:61616

In the above example - each build has to kinda wait for other things to start up to some time period. e.g. the producer and consumer wanna keep around for say 5 minutes trying to connect to the broker as they can be started in any order.

Ideally we might wanna run this as 3 maven commands as follows...

mvn activemq:broker
mvn activemq:perf-producer -Dmessage-count=5000 -Dqueue=true -Ddestination=org.foo.bar -Durl=tcp://$hostA:61616
mvn activemq:perf-consumer -Dmessage-count=5000 -Dqueue=true -Ddestination=org.foo.bar -Durl=tcp://$hostA:61616

### Controller build

The idea with the controller version is one of the tests (which is spun off first to try help) tries to coordinate among the test nodes.

e.g. we could spin the controller first...

Box

Description

Command line

hostA

Controller

mvn test

Then the test case fires off these processes while communicating with them...

Box

Description

Command line

hostB

Broker

java org.apache.activemq.broker.console.Main tcp://$hostA:61616

hostC

Consumer

java org.apache.activemq.test.ConsumerMain --message-count=5000 --queue=true --destination=org.foo.bar tcp://$hostA:61616

hostD

Producer

java org.apache.activemq.test.ProducerMain --message-count=5000 --queue=true --destination=org.foo.bar tcp://$hostA:61616

### Controller factory build

Fairly soon we're gonna have tons of builds firing off. We may want a single project to build with a raft of different test suites. Each single distributed integration/system/performance test might have many sub-builds (processes) to run.

So we might want to run a single JUnit test case which fires off different remote builds/processes.

e.g.

public class PerformanceTestSuite {
   public void testSmallMessages() {
   	  buildQueue.start("broker", "");
   	  buildQueue.start("consumer", "--messageCount=1000");
   	  buildQueue.start("producer", "--messageCount=1000");
   	  buildQueue.join(5 * MINUTES);
   }

   public void testLargeMessages() {
   	  buildQueue.start("broker", "");
   	  buildQueue.start("consumer", "--messageCount=1000 --messageSize=1M");
   	  buildQueue.start("producer", "--messageCount=1000 --messageSize=1M");
   	  buildQueue.join(10 * MINUTES);
   }
}

So these 2 test cases in JUnit in the controller build will each start 3 separate remote builds on the queue and wait for them to complete - or terminate them

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36136))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();