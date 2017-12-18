      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- MQTT 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Protocols](protocols.html) > [MQTT](mqtt.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ supports the [MQTT](http://mqtt.org/) protocol and will automatically map between JMS/NMS and MQTT clients. MQTT is a machine-to-machine (M2M) publish/subscribe messaging transport.

Please see the [MQTT site](http://mqtt.org/) for more details

### Enabling the ActiveMQ Broker for MQTT

Its very easy to enable ActiveMQ for MQTT. Just add a connector to the broker using the MQTT URL.

<transportConnectors>
   <transportConnector name="mqtt" uri="mqtt://localhost:1883"/>
</transportConnectors>

### The MQTT Wire Format

MQTT uses a compact binary format that can be configured with the following options.  All options can be configured on a Brokers transport bind URI.

Parameter Name

Default Value

Description

maxFrameSize

268435456

(v5.12.0) Maximum frame size that can be sent. The protocol limit is 256 megabytes and his value cannot be set higher. Can help help prevent OOM DOS attacks

All options must be prepended with `wireFormat` in order to take effect. Without this proper formatting, the option will have zero effect.

#### Example Wire Format Configuration  
 

     <transportConnector name="mqtt" uri="mqtt://localhost:61612?wireFormat.maxFrameSize=100000"/>

### Security

The ActiveMQ MQTT Transport implementation fully supports an [ActiveMQ security](security.html) mechanism. Also, the authorization policies will be applied when you try to access (read/write) certain destinations.

### Enabling MQTT over NIO

For better scalability (and performance) you might want to run the MQTT protocol over NIO transport. To do that just use `mqtt+nio` transport prefix instead of `matt`. For example, add the following transport configuration in your XML file

     <transportConnector name="mqtt+nio" uri="mqtt+nio://localhost:1883"/>

This transport use [NIO transport](http://activemq.apache.org/configuring-transports.html#ConfiguringTransports-TheNIOTransport) underneath and will generally use much less threads than standard connector.

### Enabling MQTT over NIO + SSL

The MQTT transport also supports using NIO and SSL. To enable this option, use the mqtt+nio+ssl protocol - e.g.

     <transportConnector name="mqtt+nio" uri="mqtt+nio+ssl://localhost:1883"/>

*   For more details on using SSL with ActiveMQ see the following article ([How do I use SSL](http://activemq.apache.org/how-do-i-use-ssl.html)).

### Working with Destinations with MQTT

MQTT supports hierarchies and wildcards, though the delimiters and characters are different: - Here's the mapping:

function

ActiveMQ

MQTT

separator

`.`

`/`

element

`*`

`+  
`

sub tree

`>`

`#  
`

These values are automatically transposed between clients using JMS/NMS/Stomp and clients using MQTTT. For example - a client subscribing to "foo/#/bar" would receive messages published on a JMS Topic of foo.blah.bar.

### Message transformations

MQTT messages are transformed into an JMS ByteMessage. Conversely, the body of any JMS Message is converted to a byte buffer to be the payload of an MQTT message.

### Keep Alive

When a client connects, it will send a keep-alive duration, usually defaulting to 10s. ActiveMQ will honor the keep-alive duration by setting up an Inactivity Monitor that allows a grace period of 1.5 * duration. After that grace period duration elapses a connection could be closed if there is no activity. A broker receiving a PINGREQ and sending PINGRESP is considered activity to keep the connection opened.

If a client sends a keep-alive value of 0, ActiveMQ will not set up an [Inactivity Monitor](http://activemq.apache.org/activemq-inactivitymonitor.html) and connections will not be auto-shutdown due to inactivity. This however can lead to potentially leaky connections, so a default keep alive can be set on the server side (by an admin, for example) to not allow inactive connections to hang. This default keep alive would only be used if specified and if the client requests a keep-alive value of 0. The unit for the keep-alive value is milliseconds.

To enable a default, server-side MQTT keep alive:

<transportConnector name="mqtt" uri="mqtt://localhost:1883?transport.defaultKeepAlive=60000"/>

### Message Prefetch

When MQTT client connects, it locally create JMS-like consumer to the broker. In older versions this consumer was created with the prefetch size of 1 (message prefetching is explained [here](what-is-the-prefetch-limit-for.html) in more details). Starting with 5.11.0 release, the prefetch size is adjusted to the default value for the appropriate JMS subscription. QoS=0 subscriptions have default prefetch of regular non-persistent topic subscriptions, while QoS=1 and QoS=2 are assigned prefetch size of durable subscribers or the queue subscriptions depending on the subscription strategy used (see the next section for more details). Default prefetch values are listed [here](what-is-the-prefetch-limit-for.html).

To change default value of the prefetch size, you can use _activeMQSubscriptionPrefetch_ transport option, like

<transportConnector name="mqtt" uri="mqtt://localhost:1883?transport.activeMQSubscriptionPrefetch=32766"/>

### Subscription Strategy

ActiveMQ is a JMS broker in its core, so there needs to be some mapping between MQTT subscriptions and JMS semantics. Subscriptions with QoS=0 (At Most Once) are directly mapped to plain JMS non-persistent topics. For reliable messaging, QoS=1 and QoS=2, by default subscriptions are transformed to JMS durable topic subscribers. This behaviour is desired in most scenarios. For some use cases, it is useful to map these subscriptions to [virtual topics](virtual-destinations.html). Virtual topics provide a better scalability and are generally better solution if you want to use you MQTT subscribers over network of brokers. To change subscription strategy to use virtual topic, use the following settings:

<transportConnector name="mqtt" uri="mqtt://localhost:1883?transport.subscriptionStrategy=mqtt-virtual-topic-subscriptions"/>

### Retained Messages

If a message has been published with the _retain_ flag set, then the message will be 'remembered' by the topic so that if a new subscription arrives, the last retained message is sent to the subscription. Underneath, the broker uses [retained message subscription recovery policy](subscription-recovery-policy.html) to retain messages with _ActiveMQ.Retain_ property set. During the message conversion, MQTT messages with retain flag become JMS message with the _ActiveMQ.Retain _property set and retained by the broker.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=27848164))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();