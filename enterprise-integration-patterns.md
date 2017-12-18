      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Enterprise Integration Patterns 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Enterprise Integration Patterns](enterprise-integration-patterns.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Enterprise Integration Patterns
-------------------------------

Version 5.0 onwards of Apache ActiveMQ comes complete with full support for the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/toc.html) (from the excellent book by [Gregor Hohpe](http://www.amazon.com/exec/obidos/search-handle-url/105-9796798-8100401?%5Fencoding=UTF8&search-type=ss&index=books&field-author=Gregor%20Hohpe) and [Bobby Woolf](http://www.amazon.com/exec/obidos/search-handle-url/105-9796798-8100401?%5Fencoding=UTF8&search-type=ss&index=books&field-author=Bobby%20Woolf)) via the [Apache Camel library](http://activemq.apache.org/camel/).

You can easily add any of the supported [Enterprise Integration Patterns](http://activemq.apache.org/camel/enterprise-integration-patterns.html) into ActiveMQ (either on the JMS client or in the broker process) to support smart routing, transformation and a whole host of other powerful patterns. You can of course just embed [Camel library](http://activemq.apache.org/camel/) directly into your application, such as via [Spring](http://activemq.apache.org/camel/spring.html) as well..

This also means you can cleanly integrate all of the [Camel Components](http://activemq.apache.org/camel/components.html) into ActiveMQ so you can easily integrate with [CXF](http://activemq.apache.org/camel/cxf.html), [Files](http://activemq.apache.org/camel/file.html), [JBI](http://activemq.apache.org/camel/jbi.html), [JPA](http://activemq.apache.org/camel/jpa.html), [Mail](http://activemq.apache.org/camel/mail.html), [MINA](http://activemq.apache.org/camel/mina.html), [Quartz](http://activemq.apache.org/camel/quartz.html), [XMPP](http://activemq.apache.org/camel/xmpp.html) and [many other protocols and transports!](http://activemq.apache.org/camel/components.html)

### Using EIP in the ActiveMQ Broker

The broker's **activemq.xml** file comes already configured to support Camel; you just need to customize the routing rules.

#### Writing EIP rules using Java code

To use [Java code to write EIP routing rules](http://activemq.apache.org/camel/dsl.html), just put your classes on the classpath (such as in activemq/lib/myroutes/foo.jar). Then to get Camel to find your routes you need to edit the activemq.xml so that the **packages** attribute points to the package name (or a parent package name) to look for.

For example if all your routes are in the package org.acme.cheese; such as org.acme.cheese.whatnot.MyRouter then you could edit the XML to be...

<camelContext xmlns="http://activemq.apache.org/camel/schema/spring">
 <package>org.acme.cheese</package>
</camelContext>

#### Writing EIP rules using XML

To use XML its even easier, as you can just embed whatever routing rules inside the <camelContext> element using Camel's [Spring XML format](http://activemq.apache.org/camel/xml-configuration.html). Note that the XML is way more verbose than the [Java DSL](http://activemq.apache.org/camel/dsl.html) but it is a bit simpler to deploy. e.g. for a trivial route...

<camelContext xmlns="http://activemq.apache.org/camel/schema/spring">
  <route>
    <from uri="activemq:com.acme.MyQueue"/>
    <to uri="activemq:com.acme.SomeOtherQueue"/>
  </route>
</camelContext>

### Using EIP in the JMS client

You can use [Camel](http://activemq.apache.org/camel/) [Endpoints](http://activemq.apache.org/camel/endpoint.html) directly from your JMS client one of the following JMS destinations, depending on what JMS API you want it to use

*   [CamelDestination](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/camel/CamelDestination.html)
*   [CamelQueue](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/camel/CamelQueue.html)
*   [CamelTopic](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/camel/CamelTopic.html)

You can then use this destination like any other JMS destination when sending or receiving messages! This means you can use any of the [large number of Camel components](http://activemq.apache.org/camel/components.html) from your JMS code, by just changing the Destination object!

### See Also

*   [Enterprise Integration Patterns](http://activemq.apache.org/camel/enterprise-integration-patterns.html)
*   [Camel Components](http://activemq.apache.org/camel/components.html)
*   [Camel XML Reference](http://activemq.apache.org/camel/xml-reference.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=60892))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();