      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- WebSockets 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [WebSockets](websockets.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Introduction
============

Besides [Ajax](ajax.html) API, starting with version **5.4.0** onwards, you can use HTML5 [WebSockets](http://dev.w3.org/html5/websockets/) to exchange messages with the broker from your browser.

HTML 5 introduced web sockets, as a standardized way to communicate asynchronously with the server from a web page. This is practically an ideal channel for implementing asynchronous messaging for web pages. Since JavaScript easily handles text and JSON formatted data, [Stomp](http://activemq.apache.org/stomp/) protocol is a good choice for the wire protocol to be used over web sockets. Since version **5.9.0**, we also support efficient binary MQTT protocol over Web sockets.

This solution should bring better messaging capabilities to JavaScript clients then simple Ajax API, as implementing Stomp or MQTT in JavaScript brings much more messaging-oriented API and features such as transactions, for example.

Configuration
=============

ActiveMQ comes with _WebSocket_ transport which implements Stomp over WebSockets functionality.

To configure it, you need to place something like this to your ActiveMQ configuration file

<transportConnectors>
  <transportConnector name="websocket" uri="ws://0.0.0.0:61614"/>
</transportConnectors>

One thing worth noting is that web sockets (just as Ajax) implements the _same origin policy_, so you can access only brokers running on the same host as the web application running the client.

Secure Web Sockets
==================

Version 5.7.0 introduced _Secure Web Socket_ transport. To configure it you need two things. First, you need to configure a new transport connector like this

<transportConnectors>
  <transportConnector name="secure_websocket" uri="wss://0.0.0.0:61614"/>
</transportConnectors>

Note that we use _wss_ url prefix to denote a secured version of the protocol. Next you need to provide SSL context for this transport. You can do that by providing _sslContext_ in your broker configuration in a similar fashion as you'd do for _ssl_ or _https_ transports.

<sslContext>
    <sslContext keyStore="file:${activemq.conf}/broker.ks"
                keyStorePassword="password" trustStore="file:${activemq.conf}/broker.ts"
                trustStorePassword="password"
    />
</sslContext>

That's it, your secure websocket transport is ready. Take a look at the next section to see how to use a demo to test it out.

Demos
=====

As of version 5.6.0, an adapted demo of [stomp-websocket](http://github.com/jmesnil/stomp-websocket) library is integrated with ActiveMQ web demo application.  
As of version 5.9.0, we have a similar demo using MQTT and [Eclipse Paho client](http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.javascript.git)

To see demos:

*   Start the broker with `ws` transport (you can use activemq-demo.xml configuration for that)
*   Go to [http://localhost:8161/demo/websocket](http://localhost:8161/demo/websocket) to check Stomp example
*   Go to [http://localhost:8161/demo/mqtt](http://localhost:8161/demo/mqtt) to check MQTT example

Clients
=======

*   [Stomple](http://github.com/krukow/stomple) by [Karl Krukow](http://blog.higher-order.net/)
*   [stomp-websocket](http://github.com/jmesnil/stomp-websocket) by [Jeff Mesnil](http://jmesnil.net/weblog/)
*   [Eclipse Paho MQTT JavaScript client](http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.javascript.git)

More Resources
==============

*   [ActiveMQ 5.4: Stomp over Web Sockets](http://www.nighttale.net/activemq/activemq-54-stomp-over-web-sockets.html)
*   [Stomple RC1: Combining WebSockets and Reliable Messaging](http://blog.higher-order.net/2010/06/01/stomple-rc1-combining-websockets-and-reliable-messaging/)
*   [Stomp On Web Sockets](http://jmesnil.net/stomp-websocket/doc/)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=23334463))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();