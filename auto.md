      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- AUTO 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Protocols](protocols.html) > [AUTO](auto.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Starting with version 5.13.0, ActiveMQ supports wire format protocol detection.   OpenWire, STOMP, AMQP, and MQTT can be automatically detected.  This allows one transport to be shared for all 4 types of clients.

### Enabling AUTO over TCP

To configure ActiveMQ auto wire format detection over a TCP connection use the `auto` transport prefix. For example, add the following transport configuration in your XML file:

     <transportConnector name="auto" uri="auto://localhost:5671"/>

### Enabling AUTO over SSL

To configure ActiveMQ auto wire format detection over an SSL connection use the `auto+ssl` transport prefix. For example, add the following transport configuration in your XML file:

     <transportConnector name="auto+ssl" uri="auto+ssl://localhost:5671"/>

*   For more details on using SSL with ActiveMQ, see the following article ([How do I use SSL](http://activemq.apache.org/how-do-i-use-ssl.html)).

### Enabling AUTO over NIO

To configure ActiveMQ auto wire format detection over an NIO TCP connection use the `auto+nio`transport prefix. For example, add the following transport configuration in your XML file:

     <transportConnector name="auto+nio" uri="auto+nio://localhost:5671"/>

### Enabling AUTO over NIO SSL

To configure ActiveMQ auto wire format detection over an NIO SSL connection use the `auto+nio+ssl` transport prefix. For example, add the following transport configuration in your XML file:

     <transportConnector name="auto+nio+ssl" uri="auto+nio+ssl://localhost:5671"/>

### Configuring AUTO Transport Options

There are some configuration options that can be set.

Parameter Name

Default Value

Description

protocolDetectionTimeOut

30000

The time before a connection times out in milliseconds. This is similar to maxInactivityDuration. If a client makes a connection to but doesn't send data or enough data for the protocol to be detected then the thread will sit and wait for more data to come in over the socket. This will let the broker kill the connections if they do not complete the protocol initialization after a certain period of time. The default is 30 seconds. Set a default to <= 0 to disable this.

maxConnectionThreadPoolSize

MAX_INT

This option allows the configuration of the maximum size of the thread pool that handles connection attempts. Lowering this number can help prevent the broker from running out of threads if there are many different clients attempting to connect at the same time. By default it is turned off by setting to MAX_INT

  
An example that configures the transport with a maximum protocol detection time of 5 seconds:

     <transportConnector name="auto" uri="auto://localhost:5671?protocolDetectionTimeOut=5000"/>

### Configuring Wire Formats

OpenWire is the default Wire Format that ActiveMQ uses.  It provides a highly efficent binary format for high speed messaging.  OpenWire options can be configured on a JMS client's connection URI string or on a Brokers transport bind URI.

Parameter Prefix

Description

wireFormat.

Applies the option to all wire formats.

wireFormat.default.

Applies the option to the default format which is OpenWire

wireFormat.stomp.

Applies the option to the STOMP wire format

wireFormat.amqp.

Applies the option to the AMQP wire format

wireFormat.mqtt.

Applies the option to the MQTT wire format

An example of a property that applies to all formats:

     <transportConnector name="auto" uri="auto://localhost:5671?wireFormat.maxFrameSize=1000"/>

An example of a property only applied to OpenWire would be:

     <transportConnector name="auto" uri="auto://localhost:5671?wireFormat.default.maxFrameSize=1000"/>

### Configuring Enabled Wire Protocols

By default all wire protocols are available.  This can be configured to only enable certain formats by setting the property  auto`.protocols.` 

Value

Description

default

Enables OpenWire

amqp

Enables AMQP format

stomp

Enables STOMP format

mqtt

Enables MQTT format

An example showing only OpenWire and STOMP enabled:

     <transportConnector name="auto" uri="auto://localhost:5671?auto.protocols=default,stomp"/>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=61312068))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();