      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Configuring ActiveMQ CPP 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Cross Language Clients](cross-language-clients.html) > [ActiveMQ C++ Clients](activemq-c-clients.html) > [Configuring ActiveMQ CPP](configuring-activemq-cpp.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The configuration of ActiveMQ is so slick, we decided to take a similar approach with ActiveMQ-CPP. All configuration is achieved via URI-encoded parameters, either on the connection or destinations. Through the URIs, you can configure virtually every facet of your ActiveMQ-CPP client. The tables below show the comprehensive set of parameters.

**Connection URI Parameters**
-----------------------------

#### Example Configuration

cf = new ActiveMQConnectionFactory(
    "tcp://localhost:61616?wireFormat=openwire&wireFormat.tightEncodingEnabled=true");

### **Socket Options**

Option Name

Default

Description

inputBufferSize

10000

The number of bytes in the buffered input stream's buffer

outputBufferSize

10000

The number of bytes in the buffered output stream's buffer

soLinger

0

Socket SOLinger value

soKeepAlive

false

Socket SOKeepAlive value

soReceiveBufferSize

-1

Socket receive buffer. If -1, use OS default.

soSendBufferSize

-1

Socket send buffer. If -1, use OS default.

### **Transport Options**

Option Name

Default

Description

commandTracingEnabled

false

If true, enables tracing of incoming and outgoing transport commands

tcpTracingEnabled

false

If true, enables tracing of raw network IO (in hex)

useAsyncSend

false

If true, enables asynchronous sending of messages.

### **Transaction Options**

Option Name

Default

Description

transaction.maxRedeliveryCount

5

Maximum number of redelivery attempts.

### **Wire Format Protocol Options**

Option Name

Default

Description

wireFormat

openwire

Selects the wire format to use. Out of the box, can be either stomp or openwire.

wireFormat.stackTraceEnabled

false

Should the stack trace of exception that occur on the broker be sent to the client? Only used by openwire protocol.

wireFormat.cacheEnabled

false

Should commonly repeated values be cached so that less marshalling occurs? Only used by openwire protocol.

wireFormat.tcpNoDelayEnabled

false

Does not affect the wire format, but provides a hint to the peer that TCP nodelay should be enabled on the communications Socket. Only used by openwire protocol.

wireFormat.sizePrefixDisabled

false

Should serialized messages include a payload length prefix? Only used by openwire protocol.

wireFormat.tightEncodingEnabled

false

Should wire size be optimized over CPU usage? Only used by the openwire protocol.

**Destination URI Parameters**
------------------------------

#### Example Configuration

d = session->createTopic("com.foo?consumer.prefetchSize=2000&consumer.noLocal=true");

### **General Options**

Option Name

Default

Description

consumer.prefetchSize

1000

The number of message the consumer will [prefetch](what-is-the-prefetch-limit-for.html).

consumer.maximumPendingMessageLimit

0

Use to control if messages are dropped if a [slow consumer](slow-consumer-handling.html) situation exists.

consumer.noLocal

false

Same as the noLocal flag on a Topic consumer. Exposed here so that it can be used with a queue.

consumer.dispatchAsync

false

Should the broker [dispatch messages asynchronously](consumer-dispatch-async.html) to the consumer.

consumer.retroactive

false

Is this a [Retroactive Consumer](retroactive-consumer.html).

consumer.selector

null

JMS Selector used with the consumer.

consumer.exclusive

false

Is this an [Exclusive Consumer](exclusive-consumer.html).

consumer.priority

0

Allows you to configure a [Consumer Priority](consumer-priority.html).

### **OpenWire-only Options**

Option Name

Default

Description

consumer.browser

false

consumer.networkSubscription

false

consumer.optimizedAcknowledge

false

Enables an optimised acknowledgement mode where messages are acknowledged in batches rather than individually. Alternatively, you could use Session.DUPS\_OK\_ACKNOWLEDGE acknowledgement mode for the consumers which can often be faster. **WARNING** enabling this issue could cause some issues with auto-acknowledgement on reconnection

consumer.noRangeAcks

false

consumer.retroactive

false

Sets whether or not retroactive consumers are enabled. Retroactive consumers allow non-durable topic subscribers to receive old messages that were published before the non-durable subscriber started.

producer.dispatchAsyc

false

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=48407))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();