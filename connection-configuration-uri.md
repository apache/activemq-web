      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Connection Configuration URI 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ Connection URIs](activemq-connection-uris.html) > [Connection Configuration URI](connection-configuration-uri.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Connection Configuration URI
----------------------------

An Apache ActiveMQ connection can be configured by explicitly setting properties on the [ActiveMQConnection](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnection.html) or [ActiveMQConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html) objects themselves via the bean properties or using the following URI syntax.

### Example

You set the property called **`jms.$PROPERTY`** on a regular connection URI. For example you can set the **`brokerURL`** on your [ActiveMQConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html) to the following value to enable [Async Sends](async-sends.html)

tcp://localhost:61616?jms.useAsyncSend=true

### Connection Options

Use the Correct Prefix!

The following options should be prefixed with **`jms.`** when used on a **`brokerURL`** or a broker's transport connector.

Option Name

Default Value

Description

`alwaysSessionAsync`

`true`

When **`true`** a separate thread is used for dispatching messages for each Session in the Connection.

A separate thread is always used when there's more than one session, or the session isn't in **`Session.AUTO_ACKNOWLEDGE`** or **`Session.DUPS_OK_ACKNOWLEDGE`** mode.

`alwaysSyncSend`

`false`

When **`true`** a **`MessageProducer`** will always use Sync sends when sending a Message even if it is not required for the Delivery Mode.

`auditDepth`

`2048`

The size of the message window that will be audited for duplicates and out of order messages.

`auditMaximumProducerNumber`

`64`

Maximum number of producers that will be audited.

`checkForDuplicates`

`true`

When **`true`** the consumer will check for duplicate messages and properly handle the message to make sure that it is not processed twice inadvertently.

`clientID`

`null`

Sets the JMS clientID to use for the connection.

`closeTimeout`

`15000`

Sets the timeout, in milliseconds, before a close is considered complete. Normally a **`close()`** on a connection waits for confirmation from the broker.

This allows the close operation to timeout preventing the client from hanging when no broker is available.

`consumerExpiryCheckEnabled`

`true`

Controls whether message expiration checking is done in each **`MessageConsumer`** prior to dispatching a message. Disabling this check can lead to consumption of expired messages. (since 5.11).

`copyMessageOnSend`

`true`

Should a JMS message be copied to a new JMS Message object as part of the **`send()`** method in JMS. This is enabled by default to be compliant with the JMS specification.

For a performance boost set to **`false`** if you do not mutate JMS messages after they are sent.

`disableTimeStampsByDefault`

`false`

Sets whether or not timestamps on messages should be disabled or not.

For a small performance boost set to **`false`**.

`dispatchAsync`

`false`

Should the broker [dispatch messages asynchronously](consumer-dispatch-async.html) to the consumer?

`nestedMapAndListEnabled`

`true`

Controls whether [Structured Message Properties and MapMessages](structured-message-properties-and-mapmessages.html) are supported so that Message properties and **`MapMessage`** entries can contain nested Map and List objects. Available from version 4.1.

`objectMessageSerializationDefered`

`false`

When an object is set on an **`ObjectMessage`** the JMS spec requires the object be serialized by that set method.

When **`true`** the object will not be serialized. The object may subsequently be serialized if the message needs to be sent over a socket or stored to disk.

`optimizeAcknowledge`

`false`

Enables an optimized acknowledgement mode where messages are acknowledged in batches rather than individually. Alternatively, you could use **`Session.DUPS_OK_ACKNOWLEDGE`** acknowledgement mode for the consumers which can often be faster.

**WARNING**: enabling this issue could cause some issues with auto-acknowledgement on reconnection.

`optimizeAcknowledgeTimeOut`

`300`

If > 0, specifies the max time, in milliseconds, between batch acknowledgements when **`optimizeAcknowledge`** is enabled. (since 5.6).

`optimizedAckScheduledAckInterval`

`0`

If > 0, specifies a time interval upon which all the outstanding ACKs are delivered when optimized acknowledge is used so that a long running consumer that doesn't receive any more messages will eventually ACK the last few un-ACK'ed messages (since 5.7).

`optimizedMessageDispatch`

`true`

If **`true`** a larger prefetch limit is used - only applicable for durable topic subscribers.

`useAsyncSend`

`false`

Forces the use of [Async Sends](async-sends.html) which adds a massive performance boost; but means that the **`send()`** method will return immediately whether the message has been sent or not which could lead to message loss.

`useCompression`

`false`

Enables the use of compression on the message's body.

`useRetroactiveConsumer`

`false`

Sets whether or not retroactive consumers are enabled. Retroactive consumers allow non-durable topic subscribers to receive old messages that were published before the non-durable subscriber started.

`warnAboutUnstartedConnectionTimeout`

`500`

The timeout, in milliseconds, from the time of connection creation to when a warning is generated if the connection is not properly started via [Connection.start()](http://java.sun.com/j2ee/1.4/docs/api/javax/jms/Connection.html#start()) and a message is received by a consumer. It is a very common gotcha to forget to [start the connection and then wonder why no messages are delivered](i-am-not-receiving-any-messages-what-is-wrong.html) so this option makes the default case to create a warning if the user forgets.

To disable the warning just set the value to **`< 0`**.

### Nested Options

You can also configure nested objects on the connection object using the given prefixes. See the javadoc for a breakdown of each individual property.

Option Name

Object configured

See Also

`jms.blobTransferPolicy.*`

[BlobTransferPolicy](http://activemq.apache.org/maven/apidocs/org/apache/activemq/blob/BlobTransferPolicy.html)

[Blob Message](#)

`jms.prefetchPolicy.*`

[ActiveMQPrefetchPolicy](http://http//activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQPrefetchPolicy.html)

[What is the Prefetch Limit For?](what-is-the-prefetch-limit-for.html)

`jms.redeliveryPolicy.*`

[RedeliveryPolicy](http://activemq.apache.org/maven/apidocs/org/apache/activemq/RedeliveryPolicy.html)

[Redelivery Policy](redelivery-policy.html)

For example you could set

tcp://localhost:61616?jms.prefetchPolicy.all=100&jms.redeliveryPolicy.maximumRedeliveries=5

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35986))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();