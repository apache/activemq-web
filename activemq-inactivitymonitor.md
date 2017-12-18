      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ InactivityMonitor 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ InactivityMonitor](activemq-inactivitymonitor.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ InactivityMonitor
==========================

The ActiveMQ InactivityMonitor is an active thread that checks the connection is still active and if it suspects the connection is not functioning correctly, it closes the connection.

Connections are monitored by:

*   Ensuring data is read from the connection during the specified time period (Max Inactivity Duration).
*   Writing a **`KeepAliveInfo`** message to the connection if no **normal** activemq traffic is sent across the connection during the specified time period.

Each connection has two InactivityMonitors associated, one on each end of the connection. The InactivityMonitor expects to receive data on the connection during a specified time period. If **normal** ActiveMQ traffic has not been sent across the connection during that period, it expects to receive a **`KeepAliveInfo`** message sent by the InactivityMonitor on the other end of the connection.

Using the default values; if no data has been written or read from the connection for 30 seconds, the InactivityMonitor kicks in. The InactivityMonitor throws an **`InactivityIOException`** and shuts down the transport associated with the connection. This results in the following **`DEBUG`** logging:

2012-06-26 17:13:55,712 | DEBUG | 30000 ms elapsed since last read check. | org.apache.activemq.transport.AbstractInactivityMonitor | InactivityMonitor ReadCheck
2012-06-26 17:13:55,712 | DEBUG | No message received since last read check for tcp:///127.0.0.1:52659! Throwing InactivityIOException. | org.apache.activemq.transport.AbstractInactivityMonitor | InactivityMonitor ReadCheck
2012-06-26 17:13:55,714 | DEBUG | Transport Connection to: tcp://127.0.0.1:52659 failed: 
org.apache.activemq.transport.InactivityIOException: Channel was inactive for too (>30000) long: tcp://127.0.0.1:52659 |
org.apache.activemq.broker.TransportConnection.Transport | InactivityMonitor Async Task: 
java.util.concurrent.ThreadPoolExecutor$Worker@6a346239
org.apache.activemq.transport.InactivityIOException: Channel was inactive for too (>30000) long: tcp://127.0.0.1:52659
    at org.apache.activemq.transport.AbstractInactivityMonitor$4.run(AbstractInactivityMonitor.java:187)
    at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
    at java.lang.Thread.run(Thread.java:680)

### Advanced InactivityMonitor Configuration

There are some configuration options to further fine tune the `InactivityMonitor`. Note, for most use cases the default values are just fine.

Parameter

Default Value

Description

`wireFormat.maxInactivityDuration`

`30000`

Timeout, in milliseconds, after which the connection is closed by the broker if no data has been received.

`wireFormat.maxInactivityDurationInitalDelay`

`10000`

Specifies the maximum delay, in milliseconds, before connection inactivity monitoring is started.

This can prove useful if a broker is under load with many connections being created concurrently.

`transport.useInactivityMonitor`

`true`

A value of **`false`** disables the `InactivityMonitor` completely and connections will never time out.

`transport.useKeepAlive`

`true`

Determines if a **`KeepAliveInfo`** message should be sent on an idle connection to prevent it from timing out.

Disabling the keep alive will still make connections time out when no data was received on the connection for the specified amount of time.

These parameters can be specified directly on the client side connection URL, e.g. **`tcp://localhost:61616?wireFormat.maxInactivityDuration=30000`,** or on the broker's transport connector URL:

<transportConnectors>
  <transportConnector name="openwire" uri="tcp://0.0.0.0:61616?wireFormat.maxInactivityDuration=30000&amp;wireFormat.maxInactivityDurationInitalDelay=10000"/>
</transportConnectors>

### What happens if the `maxInactivityDuration` and `maxInactivityDurationInitalDelay` are set to different values on either side of the same connection?

At startup the InactivityMonitor negotiates the appropriate **`maxInactivityDuration`** and **`maxInactivityDurationInitalDelay`**. The shortest duration is taken for the connection.

### Can the InactivityMonitor on a connection be disabled?

Setting **`transport.useInactivityMonitor=false`** will disable the InactivityMonitor**.** Configuring **`wireFormat.maxInactivityDuration=0`** will achieve the same result.

### Potential Issues

[slow-networks-drop-large-messages](slow-networks-drop-large-messages.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=27850984))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();