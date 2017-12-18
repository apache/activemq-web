      .maincontent { overflow:hidden; }          SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ Connection URIs 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ Connection URIs](activemq-connection-uris.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Transport configuration options
-------------------------------

One of the first kinds of URI you are likely to use is a transport URI to connect to a broker using a kind of transport. Generally TCP or VM are the first transports you'll use.

Be careful about whitespace

All of the following URI configurations are based on the java.net.URI class which does not allow whitespace to be used. So if you are using **`failover:`** or **`static:`** URIs, do not put any whitespace around the **`','`** symbol.

### The AUTO Transport

Starting with 5.13.0 ActiveMQ has support for automatic wire protocol detection over TCP, SSL, NIO, and NIO SSL.  OpenWire, STOMP, AMQP, and MQTT are supported.  For details see the [AUTO](auto.html) Transport Reference.

### The VM Transport

The VM transport allows clients to connect to each other inside the VM without the overhead of the network communication. The connection used is not that of a socket connection but instead uses direct method invocations to enable a high performance embedded messaging system.

The first client to use the VM connection will boot an embedded broker. Subsequent connections will attach that the same broker. Once all VM connections to the broker have been closed, the embedded broker will automatically shutdown.

For more information see the [VM Transport Reference](vm-transport-reference.html)

### The AMQP Transport

As of 5.8.0 ActiveMQ has support for AMQP. For details see the [AMQP](amqp.html) Transport Reference.

### The MQTT Transport

Starting with 5.6.0 ActiveMQ also supports [MQTT](http://mqtt.org/). Its a light weight publish/subscribe messaging transport. See the [MQTT](mqtt.html) Transport Reference for details.

### The TCP Transport

The TCP transport allows clients to connect a remote ActiveMQ using a a TCP socket.

For more information see the [TCP Transport Reference](tcp-transport-reference.html)

### The NIO Transport

Same as the TCP transport, except that the [New I/O (NIO)](http://en.wikipedia.org/wiki/New_I/O) package is used, which may provide better performance. The Java NIO package should not be confused with IBM's [AIO4J](http://java.sys-con.com/read/46658.htm) package.

To switch from TCP to NIO, simply change the scheme portion of the URI. Here's an example as defined within a broker's XML configuration file.

<broker>
  ...
  <transportConnectors>
    <transportConnector name="nio" uri="nio://0.0.0.0:61616"/>  
  </<transportConnectors>
  ...
</broker>

Trying to use nio transport url on the client side will instantiate the regular TCP transport. For more information see the [NIO Transport Reference](nio-transport-reference.html)

### The SSL Transport

This allows you to talk over TCP using SSL. For more information see the [SSL Transport Reference](ssl-transport-reference.html)

### The NIO SSL Transport

Availability

Available since 5.6

Implementing SSL transport over NIO. This allows you to connect large number of SSL clients to a single broker instance. It's server side transport-option only

<broker>
  ...
  <transportConnectors>
    <transportConnector name="nio+ssl" uri="nio+ssl://0.0.0.0:61616"/>  
  </<transportConnectors>
  ...
</broker>

Trying to use `nio+ssl` transport url on the client side will instantiate the regular SSL transport.

### The Peer Transport

The Peer transport provides a peer-to-peer network with ActiveMQ. What actually happens is the peer transport uses the VM transport to create and connect to a local embedded broker but which configures the embedded broker to establish network connections to other peer embedded brokers.

For more information see the [Peer Transport Reference](peer-transport-reference.html)

### The UDP Transport

This allows you to talk over UDP.

For more information see the [UDP Transport Reference](udp-transport-reference.html)

### The Multicast Transport

This allows you to talk over Multicast.

For more information see the [Multicast Transport Reference](multicast-transport-reference.html)

### The HTTP and HTTPS Transport

This allows the ActiveMQ client and broker to tunnel over HTTP. If the client is not JMS you might want to look at [REST](rest.html) or [Ajax](ajax.html) support instead.

For more information see the [HTTP and HTTPs Transports Reference](http-and-https-transports-reference.html)

### The WebSockets Transport

This transport uses the new HTML5 WebSockets to exchange messages with the broker. For more information see the [WebSockets](websockets.html) Transport Reference

### The Stomp Transport

A plain text transport that can be used with many languages. See [Stomp](stomp.html) for more details.

General Purpose URIs
--------------------

You can configure other features via the URI syntax as follows...

### Connection Configuration URI

Any Apache ActiveMQ JMS connection can be configured using the URL or explicitly setting properties on the [ActiveMQConnection](http://incubator.apache.org/activemq/maven/activemq-core/apidocs/org/apache/activemq/ActiveMQConnection.html) or [ActiveMQConnectionFactory](http://incubator.apache.org/activemq/maven/activemq-core/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html) objects themselves.

For more information see [Connection Configuration URI](connection-configuration-uri.html)

### Destination Options

You can configure various consumer related options using [Destination Options](destination-options.html) which allow you to configure destinations using URI syntax.

### Broker Configuration URI

You can use a [Broker Configuration URI](broker-configuration-uri.html) to configure an embedded broker, either using the BrokerFactory helper class from Java or using the activemq shell script. For more details see [How to Run a Broker](run-broker.html)

### Configuring Wire Formats

Any transport which involves marshalling messages onto some kind of network transport like TCP or UDP will typically use the [OpenWire](openwire.html) format. This is configurable to customize how things appear on the wire.

For more information see [Configuring Wire Formats](configuring-wire-formats.html)

High Level Protocol URIs
------------------------

The following higher level protocols can be configured via URI

### The Failover Transport

The Failover transport layers reconnect logic on top of any of the other transports. This is what used to be the Reliable transport in ActiveMQ 3. Its configuration syntax allows you to specify any number of composite URIs. The Failover transport randomly chooses one of the composite URIs and attempts to establish a connection to it. If it does not succeed or if it subsequently fails, a new connection is established to one of the other URIs in the list.

For more information see the [Failover Transport Reference](failover-transport-reference.html)

### The Fanout Transport

The Fanout transport layers reconnect and replicate logic on top of any of the other transports. It is used replicate commands to multiple brokers.

For more information see the [Fanout Transport Reference](fanout-transport-reference.html)

Using Discovery
---------------

Often when using transports like TCP you want to use [Discovery](discovery.html) to locate the available brokers. This is different from using, say, [Multicast](multicast-transport-reference.html) \- as the actual main communication is over TCP but multicast is purely used to discover the location of brokers.

### The Discovery Transport

The Discovery transport works just like the reliable transport, except that it uses a discovery agent to locate the list of URIs to connect to.

For more information see the [Discovery Transport Reference](discovery-transport-reference.html)

### The ZeroConf Transport

The ZeroConf transport provides [Discovery](discovery.html) and it works like the [Discovery Transport](discovery-transport-reference.html) but rather than using our own multicast based discovery mechanism (which allows you to configure the exact multicast address and port, etc.), the [ZeroConf](zeroconf.html) transport is used instead.

For more information see the [ZeroConf Transport Reference](zeroconf-transport-reference.html)

### Server side options

There are a number of options that can be used for changing behavior on the server for the **`TransportConnector`** in the ActiveMQ broker configuration. These are:

property name

default

description

`allowLinkStealing`  

`false`

This is enabled for default for MQTT transport.

Link Stealing is where the last of two or more connections with the same id (clientID for JMS) is deemed the valid connection and the older one is closed by the broker.

`discoveryURI`

`null`

If set, the multicast discovery address for client connections to find the broker.

`enableStatusMonitor`

`false`

Will monitor connections to determine if they are blocked.

`name`

`null`

The name of the **`TransportConnector`** instance.

`rebalanceClusterClients`

`false`

Will automatically re-balance clients across the cluster on changes of topology.

`updateClusterClients`

`false`

If enabled, will update client connections (if they use the **`failover://`** transport) of changes to the broker cluster.

`updateClusterClientsOnRemove`

`false`

Will update clients if a broker is removed from the cluster.

`updateClusterFilter`

`null`

Comma separated list of regular expressions. Brokers with a name matching the pattern will be included for client updates.

`uri`

`null`

The bind address for the transport.

**Note**: properties in red are version 5.10 (and higher) options only.

Example configuration:

<broker>
   <!\-\- ... -->

   <transportConnectors>
     <transportConnector name="openwire" uri="tcp://0.0.0.0:61616" enableStatusMonitor="true"/> 
   </<transportConnectors>

   <!\-\- ... -->
</broker>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36005))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();