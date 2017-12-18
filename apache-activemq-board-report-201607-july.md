      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Apache ActiveMQ Board Report - 2016.07 (July) 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Index](index.html) > [Apache ActiveMQ Board Reports](apache-activemq-board-reports.html) > [Apache ActiveMQ Board Report - 2016.07 (July)](apache-activemq-board-report-201607-july.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

**Description**

Apache ActiveMQ is a popular and powerful open source messaging server. Apache ActiveMQ is fast, supports many cross language clients and protocols, comes with easy to use enterprise integration patterns and many advanced features while fully supporting JMS 1.1, J2EE 1.4, AMQP 1.0.

**Activity**

*   The ActiveMQ Broker continues to see continued bug fixes and feature additions
    *   Support added for AMQP over WebSockets added for inclusion in 5.14.0
    *   Improvements to the KahaDB message store allowing for better store clean up.
    *   Important fixes continue to be ported to the 5.13.x branch and a new 5.13.4 release is nearing release readiness.

*   ActiveMQ Artemis continues working towards adding ActiveMQ 5.x equivalent features, client compatibility and improvements:

*   The OpenWire protocol implementation is now feature complete
    
*   The Database journal has been improved and support added for:
    
    *   MySQL
        
    *   PostgreSQL
        
*   Database storage for large messages has been added
    
*   HA using replication has been heavily tested and had several improvements
    
*   The AMQP protocol has had a lot of attention including many fixes and support for AMQP link drain and subscription addresses
    
*   MQTT protocol has been updated to support interceptors and cross protocol communication
    
*   Dual-authentication is now supported so SSL and non-SSL connections can be authenticated by different JAAS login modules.
    
*   The broker's SSL keystores can now be reloaded on demand without stopping the broker.
    
*   JMS topics are now auto-created by default when a producer sends a message or a client subscribes.
    
*   The name of the authenticated user can now be automatically added to the messages it sends.
    
*   STOMP clients can now have their authentication and authorization based on their SSL certificate.
    
*   Lots of smaller bug fixes and performance improvements  
    

  

**PMC changes**

*   Currently 23 PMC members
*   Martyn Taylor was added to the PMC on Sun Jul 10 2016
*   Last PMC addition: Sun Jul 10 2016 (Martyn Taylor)

  
**Committer base changes**

*   Currently 56 committers
*   No new committers added in the last 3 months
*   Last committer addition was Matt Richard Hogstrom at Thu Jan 28 2016

  
**Releases**

*   5.13.3 was released on Sun May 01 2016
*   ActiveMQ Artemis 1.3.0 was released on Tue Jun 14 2016
*   Apache.NMS.ActiveMQ v1.7.2 was released on Wed Apr 06 2016

**Mailing list activity**

*   [users@activemq.apache.org](mailto:users@activemq.apache.org)
    *   741 subscribers (up 14 in the last 3 months)
    *   638 emails sent to list (837 in previous quarter)

*   [dev@activemq.apache.org](mailto:dev@activemq.apache.org)
    *   367 subscribers (up 14 in the last 3 months)
    *   909 emails sent to list (653 in previous quarter)

*   [announce@activemq.apache.org](mailto:announce@activemq.apache.org)
    *   [](mailto:announce@activemq.apache.org)9 subscribers (up 0 in the last 3 months)

*   [issues@activemq.apache.org](mailto:issues@activemq.apache.org)
    *   43 subscribers (up 3 in the last 3 months)
    *   2159 emails sent to list (1698 in previous quarter)

**JIRA activity**

*   261 JIRA tickets created in the last 3 months
*   262 JIRA tickets closed/resolved in the last 3 months

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=65145183))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();