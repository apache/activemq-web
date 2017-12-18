      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Wire Protocol 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [Wire Protocol](wire-protocol.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

This page describes the logical [OpenWire](openwire.html) protocol for users developing clients in other languages than Java such as C# or C native clients. Note that OpenWire is designed for maximum performance and features; its the protocol used inside ActiveMQ. If you want a simpler protocol to work with to get started with a cross language client then try [Stomp](stomp.html) which is designed for ease-of-implementation so its easy to support many clients.

Protocol overview
=================

A client of ActiveMQ will exchange Command objects (following the _Command Pattern_). We'll describe how these commands are exchanged...

The protocol uses mostly one way messaging (fire and forget) for most kinds of commands - but there are times when RPCs (request, response) messaging is used. We'll indiciate the RPC scenarios clearly.

Establishing connections
------------------------

The client must send a ConnectionInfo command with details of the machine, host name, user name, password and most importantly the unique clientId the client wishes to use and then wait for a valid Response before continuing. The clientId must be generated using a unique string generator.

Sending messages
----------------

Once you've established a connection, you need to create a logical MessageProducer. This involves sending a ProducerInfo command with a unique producerId, sessionId and the clientId (connection ID).

From that point on you can send a Message command any time you like, provided you adorn the message with the clientId, sessionId, producerId along with a transactionId if required (see below on transactions).

Consuming messages
------------------

Commands are delivered on your inbound socket for consumption. Some of these will be Responses of previous RPCs, the rest will be incoming Messages for dispatch.

To start consuming messages you must send a ConsumerInfo command with details of the clientId, sessionId and a unique consumerId. From this point on you will receive inbound messages which contain the consumerId for which they are destined for.

To acknowledge a message send a MessageAck to the server (one way). Fill in the MessageAck with details of the consumerId, sessionId, clientId and any transactionIds.

Working with Responses
----------------------

When you create a connection, a producer and a consumer you will receive a Response to indicate the status of the request (such as did it work or fail). Since the protocol is asynchronous you can receive Response commands out of order; you could have multiple threads using the same connection/socket sending commands in parallel.

So its usual in multi-threaded clients to have some kind of correlation Map to match Command ids with Response Ids so that you can know which operation in what thread worked or failed etc. See the Transport implementations in Java to see how we do that. e.g. see [ResponseCorrelator](https://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-core/src/main/java/org/apache/activemq/transport/ResponseCorrelator.java)

IDs
---

It is currently a requirement of the client to automatically generate client, session, producer and consumer IDs which are typically Strings and indended to be globally unique. Similarly each Command has its own integer counter ID which is used for the client to correlate requests to responses; the client will typically use an incrementing rolling counter for these.

Closing producers, consumers, sessions, connections
---------------------------------------------------

To close a resource send a RemoveInfo command with the correct objectId for the producer, consumer, session, connection etc.

JMS Transactions
----------------

Each transacted session generates a unique transaction ID which is passed along on any transaction message. To start, commit or rollback the client should send a TransactionInfo command oneway (no Response is generated).

After a commit or rollback a new transaction ID should be generated and a new start TransactionInfo sent.

Any messages sent or message acknowledgements made should also propogate the transaction Id.

XA Transactions
---------------

As above but using the XATransactionInfo. Also we pass an XAid rather than a transactionID.

Final thoughts
==============

If in doubt about a piece of the protocol, the easiest way to figure out what happens is to check the JMS client code. In particular check out the code of [ActiveMQSession](http://activemq.codehaus.org/maven/xref/org/activemq/ActiveMQSession.html) which contains pretty much all the above logic. Pay particular attention to calls to **syncSendCommand()** and **asyncSendCommand()** when Commands are sent to the Message Broker

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35992))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();