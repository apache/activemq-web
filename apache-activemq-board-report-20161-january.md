      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Apache ActiveMQ Board Report - 2016.1 (January) 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") ™ [ASF](http://www.apache.org "The Apache Software Foundation")

[Index](index.html) > [Apache ActiveMQ Board Reports](apache-activemq-board-reports.html) > [Apache ActiveMQ Board Report - 2015.10 (October)](apache-activemq-board-report-201510-october.html) > [Apache ActiveMQ Board Report - 2016.1 (January)](apache-activemq-board-report-20161-january.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

**Description**

Apache ActiveMQ is a popular and powerful open source messaging server. Apache ActiveMQ is fast, supports many cross language clients and protocols, comes with easy to use enterprise integration patterns and many advanced features while fully supporting JMS 1.1, J2EE 1.4, AMQP 1.0.

**Activity**

*   Apache.NMS added a new provider implementation **Apache.NMS.XMS** for connecting to IBM WebSphere MQSeries.  This was contributed by the user community, and based on the existing Apache.NMS provider implementation for TIBCO EMS.  There are now eight NMS provider implementations.
    
*   ActiveMQ 5.x added several new features in version 5.13.0
    *   There is now support for automatic wire protocol detection (OpenWire, STOMP, MQTT, and AMQP) using the new [auto transport](auto.html).
    *   Improved metrics as the broker now keeps track of the memory size of pending messages.
    *   A pure Java API for runtime configuration changes to the broker.  Previously only changes could be done in XML.
    *   There is now support for [dynamic network demand](networks-of-brokers.html) based on the existence of Virtual Consumers.
    *   Support was added for sending scheduled message using message annotations when using AMQP.
    *   The ability to dynamically shrink and regrow the store size at runtime based on available disk space.

**PMC changes**

*   Currently 20 PMC members
    
*   No new PMC members added in the last 3 months
    
*   Last PMC addition was Arthur Naseef on Mon Feb 09 2015
    

**Committer base changes**

*   Currently 54 committers
    
*   No new committers added in the last 3 months
    
*   Last committer addition was Christopher L. Shannon at Thu Jul 30 2015
    

**Releases**

*   Activemq-CPP v3.9.1 was released on Thu Dec 03 2015
    
*   5.11.3 was released on Sun Nov 01 2015
    
*   5.12.1 was released on Wed Oct 14 2015
    
*   5.12.2 was released on Sun Jan 10 2016
    
*   5.13.0 was released on Wed Dec 02 2015
    
*   ActiveMQ Artemis 1.2.0 was released on Thu Jan 07 2016
    

**Mailing list activity**

*   [users@activemq.apache.org](mailto:users@activemq.apache.org)
    
    *   716 subscribers (down -5 in the last 3 months)
    *   815 emails sent to list (712 in previous quarter)
*   [dev@activemq.apache.org](mailto:dev@activemq.apache.org)
    
    *   341 subscribers (up 7 in the last 3 months)
    *   742 emails sent to list (765 in previous quarter)
*   [issues@activemq.apache.org](mailto:issues@activemq.apache.org)
    
    *   31 subscribers (up 4 in the last 3 months)
    *   1890 emails sent to list (1763 in previous quarter)
*   [announce@activemq.apache.org](mailto:announce@activemq.apache.org)
    
    *   9 subscribers (up 1 in the last 3 months)

**JIRA activity**

*   214 JIRA tickets created in the last 3 months
    
*   227 JIRA tickets closed/resolved in the last 3 months
    

(Most of this information is pulled from [reporter.apache.org](https://reporter.apache.org/))

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=61335887))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();