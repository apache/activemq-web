      .maincontent { overflow:hidden; }          SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Producer Flow Control 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Message Dispatching Features](message-dispatching-features.html) > [Producer Flow Control](producer-flow-control.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Producer Flow Control
---------------------

In ActiveMQ 4.x flow control was implemented using TCP flow control. The underlying network connection of throttled consumers was suspended to enforce flow control limits. This strategy is very efficient but can lead to deadlocks if there are multiple producers and consumers sharing the same connection.

As of ActiveMQ 5.0, we can now individually flow control each producer on a shared connection without having to suspend the entire connection. By 'flow control' we mean that if the broker detects that the memory limit for the destination, or the temp- or file-store limits for the broker, have been exceeded, then the flow of messages can be slowed down. The producer will be either blocked until resources are available _or_ will receive a JMSException: this behaviour is configurable and described in the section below on `<systemUsage>`.

It's worth noting that the default `<systemUsage>` settings will cause the producer to _block_ when the `memoryLimit` or `<systemUsage>` limits are reached: this blocking behaviour is sometimes misinterpreted as a 'hung producer', when in fact the producer is simply diligently waiting until space is available.

*   Messages that are sent synchronously will automatically use per producer flow control; this applies generally to persistent messages which are sent synchronously _unless_ you enable the `useAsyncSend` flag.

*   Producers that use [Async Sends](async-sends.html) \- generally speaking, producers of non-persistent messages - don't bother waiting for any acknowledgement from the broker; so, if a memory limit has been exceeded, you will _not_ get notfied. If you do want to be aware of broker limits being exceeded, you will need to configure the ProducerWindowSize connection option so that even async messages are flow controlled per producer.

ActiveMQConnectionFactory connctionFactory = ...
connctionFactory.setProducerWindowSize(1024000);

The ProducerWindowSize is the maximum number of bytes of data that a producer will transmit to a broker before waiting for acknowledgment messages from the broker that it has accepted the previously sent messages.

Alternatively, if you're sending non-persisted messages (which are by default sent async), and want to be informed if the queue or topic's memory limit has been breached, then you can simply configure the connection factory to 'alwaysSyncSend'. While this is going to be slower, it will ensure that your message producer is informed immediately of memory issues.

If you like, you can disable flow control for specific JMS queues and topics on the broker by setting the `producerFlowControl` flag to false on the appropriate destination policy in the Broker configuration - e.g.

<destinationPolicy>
  <policyMap>
    <policyEntries>
      <policyEntry topic="FOO.>" producerFlowControl="false"/>
    </policyEntries>
  </policyMap>
</destinationPolicy>

see [Broker Configuration](xml-configuration.html).

Note that, since the introduction of the new file cursor in ActiveMQ 5.x, non-persisted messages are shunted into the temporary file store to reduce the amount of memory used for non-persistent messaging. As a result, you may find that a queue's memoryLimit is never reached, as the cursor doesn't use very much memory. If you really do want to keep all your non-persistent messages in memory, and stop producers when the limit is reached, you should configure the `<vmQueueCursor>`.

<policyEntry queue=">" producerFlowControl="true" memoryLimit="1mb">    
  <pendingQueuePolicy>
    <vmQueueCursor/>
  </pendingQueuePolicy>
</policyEntry>

The fragment above will ensure that all non-persistent queue messages are kept in memory, with each queue having a limit of 1Mb.

### How Producer Flow Control works

If you are sending a persistent message (so that a response of the [OpenWire](openwire.html) Message is expected then the broker will send the producer a [ProducerAck](http://activemq.apache.org/maven/5.9.0/apidocs/index.html) message. This informs the producer that the previous sending window has been processed, so that it can now send another window. Its kinda like consumer acks but in reverse.

#### Advantage

So a nice producer might wait for a producer ack before sending more data, to avoid flooding the broker (and forcing the broker to block the entire connection if a slow consumer occurs). To see how this works in source code, check out the [ActiveMQMessageProducer](http://activemq.apache.org/maven/5.9.0/apidocs/index.html) code.

Though a client can ignore the producer ACKs altogether and the broker should just stall the transport if it has to for slow consumer handling; though this does mean it'll stall the entire connection.

### Configure Client-Side Exceptions

An alternative to the indefinite blocking of the `send()` operation when no space is free on the broker is to instead configure that an exception to be thrown on the client-side. By configuring the `sendFailIfNoSpace` property to `true`, the broker will cause the `send()` operation to fail with a `javax.jms.ResourceAllocationException`, which will propagate to the client. Below is an example of this configuration:

<systemUsage>
 <systemUsage sendFailIfNoSpace="true">
   <memoryUsage>
     <memoryUsage limit="20 mb"/>
   </memoryUsage>
 </systemUsage>
</systemUsage>

The advantage of this property is that the client can catch the `javax.jms.ResourceAllocationException`, wait a bit and retry the `send()` operation instead of just hanging indefinitely.

Starting in version 5.3.1 the `sendFailIfNoSpaceAfterTimeout` property has been added. This property causes the `send()` operation to fail with an exception on the client-side, but only after waiting the given amount of time. If space on the broker is still not freed after the configured amount of time, only then does the `send()` operation fail with an exception to the client-side. Below is an example:

<systemUsage>
 <systemUsage sendFailIfNoSpaceAfterTimeout="3000">
   <memoryUsage>
     <memoryUsage limit="20 mb"/>
   </memoryUsage>
 </systemUsage>
</systemUsage>

The timeout is defined in milliseconds so the example above waits for three seconds before failing the `send()` operation with an exception to the client-side. The advantage of this property is that it will block for the configured amount of time instead of failing immediately or blocking indefinitely. This property offers not only an improvement on the broker-side, but also an improvement for the client so it can catch the exception, wait a bit and retry the `send()` operation.

Starting in version 5.16.0 the `sendFailIfNoSpace` and `sendFailIfNoSpaceAfterTimeout` can be configured on a per destination basis via [destination policies](per-destination-policies.html).

Disabling Flow Control
----------------------

A common requirement is to disable flow control so that message dispatching continues until all available disk is used up by pending messages (whether persistent or non persistent messaging is configured). To do this enable [Message Cursors](message-cursors.html).

System usage
------------

You can also slow down producers via some attributes on the `<systemUsage>` element. Take a look at the following example:

<systemUsage>
  <systemUsage>
    <memoryUsage>
      <memoryUsage limit="64 mb" />
    </memoryUsage>
    <storeUsage>
      <storeUsage limit="100 gb" />
    </storeUsage>
    <tempUsage>
      <tempUsage limit="10 gb" />
    </tempUsage>
  </systemUsage>
</systemUsage>

You can set limits of memory for `NON_PERSISTENT` messages, disk storage for `PERSITENT` messages and total usage for temporary messages, the broker will use before it slowdown producers. _Using the default settings shown above, the broker will block the `send()` call until some messages are consumed and space becomes available on the broker._ The default values are shown above, you will probably need to increase these values for your environment.

PercentUsage

 Both StoreUsage and TempUsage support a percentLimit attribute where the limit is determined as a percentage of the total available. From version 5.15.x there is an additional related total attribute that can be used to explicitly set the total available such that the file system is not queried. This is useful in the case that only part of a disk partition is available to the broker or where the underlying file store reports > Long.MAX_VALUE available capacity (e.g: EFS) which will overflow the long return value of [java.io](http://java.io).File#getTotalSpace. Note that when a total is specified, that actual data available will not be validated agains the file system, just the store usage relative to that absolute total.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=48909))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();