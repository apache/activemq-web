      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Slow Consumers 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [Developer Guide](developer-guide.html) > [Design Documents](design-documents.html) > [Slow Consumers](slow-consumers.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Blocked Transport
-----------------

when using TCP there can be occasions when a network outage can result in a blocked write. This can cause the entire broker to freeze - and the socket may never be unblocked. Currently we have a Thread that checks for blocked sockets - using a sweep protocol to detect if there are connections that are blocked writing for more than a configurable period. This can work but there is no way to unblock the calling thread that is associated with the send down the socket (which will be the publishing thread in non-durable topics).

Need to check if closing out the socket unblock the send.

TCP transports also use the InactivityMontor class as TransportFilter which detects dead sockets by forcing KeepAliveInfo commands periodically through the transport when it is idle. Therefore, the InactivityMontor can assume that if packets are not being received periodically, it means that the transport is dead and transport exception is generated.

Blocked Consumer
----------------

This is slightly different from above - The Consumer is blocked or very slow in processing a message. On the Client side the limit to how many messages a connection can hold is limited by the pre-fetch (which for non-durable topics is in the thousands).

Background on Slow Consumers
----------------------------

Slow consumers can cause problems in the broker. Here's the various things we can do.

In general slow consumers don't affect queues that much as consumers compete for messages; so a slow consumer just gets less than the others.

### Non-Durable Topics

Non-durable topics are the scenario which is most affected by slow consumers since the messages are not persistent and messages generally go to all consumers (who have a valid selector)

Here are the various things we can do

*   block/slow the producer
*   drop the slow consumer
*   spool messages to disk
*   discard messages for the slow consumer

These will be exposed as a pluggable policy for the user. It might be worth doing one on a destination by destination basis?

### Durable Topics

We can drop messages from RAM since they are persistent so we can deal with slow consumers well (assuming you have enough disk).  
If consumers get too far behind we could consider killing consumers; but I think thats more of a background operator issue?

### Durable queues

Since all messages are persisted, they can be evicted from memory.

### Non-durable queues

A slow consumer is not really an issue with queues. But all of the consumers being slow is. In this case we eventually block the producer until messages are consumed.

Other options could be to

*   spool messages to disk
*   discard messages

Implementation Solutions
------------------------

For persistent messages: Introduce a different dispatching model where we have a thread per destination with it's own memory allocation. This would allow us more control over dispatching, and allow us to set different priorities to different destinations.

For non-persistent messages - it's important to introduce an optional level of indirection between the producer broker thread and the write to the consumer's socket. This will allow us to plug-in writing to disk, throwing away messages and kill a blocked socket without affecting any other connections in the broker.

Our current default is to block producers until the slow consumer catches up (for non-durable topics here).

Another option that should be possible is, if a consumer is marked as a _slow consumer_ then we can discard messages being delivered to it until it stops being a slow consumer. This should be fairly easy to do if we have a way of marking a Subscription object as being slow.

More advanced variants will be introduced over time. This may include:

*   Only activating a slow consumer policy based on the percentage of slow consumers - e.g. if all the consumers are slow, you may wish to block the publisher, but if onlt one or two are slow, you may wish to take some action
*   Closing a slow consumer
*   Writing a finite amount of messages to disk
*   customized discard polices - you may wish to discard messages based on pre-set patterns or selectors
*   Combinations of the above ...

### Slow Consumer Detector

We need a good way of detecting that a consumer is slow - together with knowing when the consumer speeds up again

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35933))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();