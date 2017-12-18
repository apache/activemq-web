      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- TCP Transport Reference 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ Connection URIs](activemq-connection-uris.html) > [TCP Transport Reference](tcp-transport-reference.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### The TCP Transport

The TCP transport allows clients to connect to a remote ActiveMQ broker using a TCP socket. These configuration options can be used to tune the underlying TCP transport on either the client-side using the JMS client's connection URI string or on a broker's transport connector URI.

Use Correct Prefix!

The options below should be prefixed with `**transport.***` when used on a broker's transport connector definition. On the client-side, however, the **`transport.*`** prefix _must_ be omitted.

#### Configuration Syntax

`**tcp://hostname:port?key=value**`

##### Examples

Broker side (in **`TransportConnector`**):

tcp://localhost:61616?transport.threadName&transport.trace=false&transport.soTimeout=60000

Client side (in **`brokerURL`**):

tcp://localhost:61616?threadName&trace=false&soTimeout=60000

##### Transport Options

Option Name

Default Value

Description

`backlog`

`5000`

Specifies the maximum number of connections waiting to be accepted by the transport server socket.

`closeAsync`

`true`

If **`true`** the socket close call happens asynchronously. This parameter should be set to **`false`** for protocols like STOMP, that are commonly used in situations where a new connection is created for each read or write. Doing so ensures the socket close call happens synchronously. A synchronous close prevents the broker from running out of available sockets owing to the rapid cycling of connections. 

`connectionTimeout`

`30000`

If **`>=1`** the value sets the connection timeout in milliseconds. A value of **`0`** denotes no timeout. Negative values are ignored.

`daemon`

`false`

If **`true`** the transport thread will run in daemon mode. Set this parameter to **`true`** when embedding the broker in a Spring container or a web container to allow the container to shut down correctly.

`diffServ`

`0`

(Client only) The preferred Differentiated Services traffic class to be set on outgoing packets, as described in RFC 2475. Valid integer values: **`[0,64]`**. Valid string values: **`EF`, `AF[1-3][1-4]`** or **`CS[0-7]`**.

With JDK 6, only works when the JVM uses the IPv4 stack. To use the IPv4 stack set the system property **`[java.net](http://java.net).preferIPv4Stack=true`**.

**Note**: it's invalid to specify both **`diffServ`** and **`typeOfService`** at the same time as they share the same position in the TCP/IP packet headers.

`dynamicManagement`

`false`

If **`true`** the **`TransportLogger`** can be managed by JMX.

`ioBufferSize`

`8 * 1024`

Specifies the size of the buffer to be used between the TCP layer and the OpenWire layer where **`wireFormat`** based marshaling occurs.

`jmxPort`

`1099`

(Client Only)

Specifies the port that will be used by the JMX server to manage the **`TransportLoggers`**. This should only be set, via URI, by either a client producer or consumer as the broker creates its own JMX server.

Specifying an alternate JMX port is useful for developers that test a broker and client on the same machine and need to control both via JMX.

`keepAlive`

`false`

If **`true`,** enables [TCP KeepAlive](http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html) on the broker connection to prevent connections from timing out at the TCP level.

This should _not_ be confused with **`KeepAliveInfo`** messages as used by the **`InactivityMonitor`.**

`logWriterName`

`default`

Sets the name of the **`org.apache.activemq.transport.LogWriter`** implementation to use.

Names are mapped to classes in the **`resources/META-INF/services/org/apache/activemq/transport/logwriters`** directory.

`maximumConnections`

`Integer.MAX_VALUE`

The maximum number of sockets allowed for this broker.

`minmumWireFormatVersion`

`0`

The minimum remote **`wireFormat`** version that will be accepted (note the misspelling).

**Note**: when the remote **`wireFormat`** version is lower than the configured minimum acceptable version an exception will be thrown and the connection attempt will be refused.

A value of `**0**` denotes no checking of the remote **`wireFormat`** version.

`socketBufferSize`

`64 * 1024`

Sets the size, in bytes, for the accepted socket's read and write buffers.

`soLinger`

`Integer.MIN_VALUE`

Sets the socket's option **`soLinger`** when the value is **`> -1`**.

When set to **`-1`** the **`soLinger`** socket option is disabled.

`soTimeout`

`0`

Sets the socket's read timeout in milliseconds.

A value of `**0**` denotes no timeout.

`soWriteTimeout`

`0`

Sets the socket's write timeout in milliseconds. If the socket write operation does not complete before the specified timeout, the socket will be closed.

A value of **0** denotes no timeout.

`stackSize`

`0`

Set the stack size of the transport's background reading thread. Must be specified in multiples of **`128K`**.

A value of `**0**` indicates that this parameter is ignored.

`startLogging`

`true`

If **`true`** the **`TransportLogger`** object of the Transport stack will initially write messages to the log.

This parameter is ignored unless **`trace=true`**.

`tcpNoDelay`

`false`

If **`true`** the socket's option **`TCP_NODELAY`** is set. This disables Nagle's algorithm for small packet transmission.

`threadName`

`N/A`

When this parameter is specified the name of the thread is modified during the invocation of a transport. The remote address is appended so that a call stuck in a transport method will have the destination information in the thread name. This is extremely useful when using thread dumps for degugging.

`trace`

`false`

Causes all commands that are sent over the transport to be logged.

To view the logged output define the **`Log4j`** logger: **`log4j.logger.org.apache.activemq.transport.TransportLogger=DEBUG`**.

`trafficClass`

`0`

The Traffic Class to be set on the socket.

`typeOfService`

`0`

(Client only) The preferred Type of Service value to be set on outgoing packets. Valid integer values: **`[0,256]`**.

With JDK 6, only works when the JVM is configured to use the IPv4 stack. To use the IPv4 stack set the system property **`[java.net](http://java.net).preferIPv4Stack=true`**.

**Note**: it's invalid to specify both **`diffServ`** and **`typeOfService`** at the same time as they share the same position in the TCP/IP packet headers.

`useInactivityMonitor`

`true`

When **`false`** the `**InactivityMonitor**` is disabled and connections will never time out.

`useKeepAlive`

`true`

When **`true` `KeepAliveInfo`** messages are sent on an idle connection to prevent it from timing out.

If this parameter is **`false`** connections will still timeout if no data was received on the connection for the specified amount of time.

`useLocalHost`

`false`

When **`true`** local connections will be made using the value **`localhost`** instead of the actual local host name.

On some operating systems, such as **`OS X`**, it's not possible to connect as the local host name so **`localhost`** is better.

`useQueueForAccept`

`true`

When **`true`** accepted sockets are placed onto a queue for asynchronous processing using a separate thread.

`wireFormat`

`default`

The name of the **`wireFormat`** factory to use.

`wireFormat.*`

`N/A`

Properties with this prefix are used to configure the **`wireFormat`**.

See [Configuring Wire Formats](configuring-wire-formats.html) for more information.

##### Differentiated Services or Types of Service

There is support for setting Differentiated Services - as outlined in [IETF RCF 2475](http://tools.ietf.org/html/rfc2475). In order to configure the broker so that all outgoing packets from the broker match the DSCP values set on incoming packets - you will need to apply IP Tables scripts - found [here](tcp-transport-reference.data/brokerConfig.tar.gz?version=1&modificationDate=1273219000000&api=v2).

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35993))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();