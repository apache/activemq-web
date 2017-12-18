      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- JMeter Performance Tests 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [JMeter Performance Tests](jmeter-performance-tests.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### JMeter performance test

You can use JMeter to test the performance of your ActiveMQ Server. Please refer to the [JMeter site](http://jakarta.apache.org/jmeter/) for detailed instructions on using this software.

### Downloading the JMeter Performance Test Binary

You can download the latest activemq-jmeter-*.zip distribution from the following

*   [Apache ActiveMQ versions](http://people.apache.org/repository/incubator-activemq/distributions/)
*   [3.x versions of ActiveMQ](http://dist.codehaus.org/activemq/distributions/).

### Building the JMeter Performance Test from source

1\. Check out the latest head version of ActiveMQ from [Source](source.html). Build from source.

2\. Run maven from the JMeter directory. This will build JMeter into the target directory.

3\. Run JMeter.bat from the \\bin directory to start JMeter.

4\. There are sample Test Plans located at \\bin\\testfiles directory that you could open to test ActiveMQ.

### Building a Test Plan

For a Producer Sampler  
1\. Add a Thread Group.  
2\. Add the producer sampler "Producer Sampler" from the Sampler menu.  
3\. Highlight the Producer Sampler then right click to add the producer listener "View Producer Results" from the Listener menu.  
4\. Go to the Thread Group element and set the Number of Threads, Ramp-Up Period and Loop Count to 1.

For a Consumer Sampler  
1\. Add a Thread Group.  
2\. Add the consumer sampler "Consumer Sampler" from the Sampler menu.  
3\. Highlight the Consumer Sampler then right click to add the consumer listener "View Consumer Results" from the Listener menu.  
4\. Go to the Thread Group element and set the Number of Threads, Ramp-Up Period and Loop Count to 1.

### The JMeter Performance Test Module consists of:

1\. JMeter Producer Sampler

*   A JMeter Sampler tells JMeter to send requests to the server. Pluggable Samplers allow unlimited testing capabilities.

*   The Producer Sampler will send messages to an ActiveMQ Server.

The Producer Sampler has the following parameters:

*   Server URL - defines the server url i.e. tcp://localhost:61616
*   Duration (min) - the duration of the test.
*   Ramp Up (min) - the time in which the Producer will reach it's stable/peak state.
*   No. of Producer - The number of Producer that would be sending the message.
*   No. of Subject - The number of Subject that would be created then send. Note that the number of Subject should be less than or equal to the No. of Producer.
*   Message Size (bytes) - The size of the message to send.
*   Delivery Mode - Default is Non-Persistent.
*   Messaging Domain - Default is Topic
*   Message Interval - Default/Custom Interval. When Custom Interval was Selected user must provide Interval Value (mins).
*   Message Queue Servers - List of available MQ Servers.

2\. JMeter Producer Listener

*   Listeners provide access to the information JMeter gathers about the test cases while JMeter runs.
*   The Producer Listener would provide statistics with the number of messages sent and average messages per second.

3\. JMeter Consumer Sampler

The Consumer Sampler has the following parameters:

*   Server URL - defines the server url i.e. tcp://localhost:61616
*   Duration (min) - the duration of the test.
*   Ramp Up (min) - the time in which the Producer will reach it's stable/peak state.
*   No. of Consumer - The number of Consumer that would be sending the message.
*   No. of Subject - The number of Subject that would be created then send. Note that the number of Subject should be less than or equal to the No. of Consumer.
*   Delivery Mode - Default is non-Durable.
*   Messaging Domain - Default is Topic.
*   Message Queue Servers - List of available MQ Servers.

4\. JMeter Consumer Listener

*   The Consumer Listener would provide statistics with the number of messages received and average messages per second.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36232))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();