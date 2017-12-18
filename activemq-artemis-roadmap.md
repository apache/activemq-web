      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- ActiveMQ Artemis Roadmap 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[ActiveMQ Artemis Roadmap](activemq-artemis-roadmap.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The goal of this page is to identify the outstanding issues that must be addressed by Artemis in order to achieve some level of feature parity with ActiveMQ 5.x. The overall objective for working toward feature parity between ActiveMQ 5.x and Artemis is for Artemis to eventually become ActiveMQ 6.x. This page exists so that we can work together as a group to achieve this goal.

/*<!\[CDATA\[*/ div.rbtoc1512602476746 {padding: 0px;} div.rbtoc1512602476746 ul {list-style: disc;margin-left: 0px;} div.rbtoc1512602476746 li {margin-left: 0px;padding-left: 0px;} /*\]\]>*/

*   [Using this page](#ActiveMQArtemisRoadmap-Usingthispage)
*   [Features/Scenarios](#ActiveMQArtemisRoadmap-Features/Scenarios)
    *   [Advisory Support](#ActiveMQArtemisRoadmap-AdvisorySupport)
    *   [Broker Clustering](#ActiveMQArtemisRoadmap-BrokerClustering)
    *   [Destination Interceptors](#ActiveMQArtemisRoadmap-DestinationInterceptors)
    *   [Destination Features](#ActiveMQArtemisRoadmap-DestinationFeatures)
    *   [Plugin Support](#ActiveMQArtemisRoadmap-PluginSupport)
    *   [Storage Backend](#ActiveMQArtemisRoadmap-StorageBackend)
*   [Migration](#ActiveMQArtemisRoadmap-Migration)
*   [Wishlist](#ActiveMQArtemisRoadmap-Wishlist)
    *   [Protocol features](#ActiveMQArtemisRoadmap-Protocolfeatures)
    *   [KahaDB Migration Tool](#ActiveMQArtemisRoadmap-KahaDBMigrationTool)
    *   [Over-the-wire migration tool](#ActiveMQArtemisRoadmap-Over-the-wiremigrationtool)

Work in Progress

This page is a work in progress and will be updated frequently.

Using this page
===============

Feature items can be listed, with links to JIRA tickets for longer conversation and hashing out specific feature details

Features/Scenarios
==================

This section should be used to identify all the ActiveMQ 5.x features that Artemis needs. This should include **all** Artemis features that we can identify, including those from ActiveMQ that Artemis has already implemented. This will help us to more clearly track everything that Artemis needs.

### Advisory Support

*   Support for broker state change advisories (master -> slave, slave -> master)
*   Support for connection advisories (connect, disconnect, unclean disconnect, authn fail, authz fail)
*   Support for consumer advisories (new consumer, closed, slow consumer)
*   Support for producer advisories (new producer, closed, fast producer, message size exceeded, memoryLimit reached, storage limit reached)
*   Support for destination advisories (new dest, deleted)

### Broker Clustering

*   Support full-duplex broker-to-broker cluster connections \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-838](https://issues.apache.org/jira/browse/ARTEMIS-838?src=confmacro) \]

### Destination Interceptors

*   Virtual Topic support \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-550](https://issues.apache.org/jira/browse/ARTEMIS-550?src=confmacro) \]

### Destination Features

*   Destination Policy: Garbage collection and advisory support for that activity \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-1148](https://issues.apache.org/jira/browse/ARTEMIS-1148?src=confmacro) \]
*   Exclusive consumer support \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-854](https://issues.apache.org/jira/browse/ARTEMIS-854?src=confmacro) \]
*   Exclusive consumer features: consumersBeforeDispatchStarts, timeBeforeDispatchStarts \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-856](https://issues.apache.org/jira/browse/ARTEMIS-856?src=confmacro) \]

### Plugin Support

*   Destination Policies (there is a slew of functionality in ActiveMQ 5.x dest policies that should be detailed out)

### Storage Backend

*   Support for multiple shared persistence stores similar to multi-kahadb (allow for storage across multiple disk volumes.. ie.  queue://ORDER.> on /mnt/order queue://BILLING.> on /mnt/billing, etc) \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-839](https://issues.apache.org/jira/browse/ARTEMIS-839?src=confmacro) \]

Migration
=========

This section should help to answer the end user question, _'How do I migrate from ActiveMQ 5.x to Artemis?'_. This should include the identification of any tools that can help make this easier, as well as documenting information and procedures specific to migrating.

Wishlist
========

### Protocol features

*   Exclusive consumer support across all protocols STOMP, MQTT, AMQP, etc. \[ .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [ARTEMIS-855](https://issues.apache.org/jira/browse/ARTEMIS-855?src=confmacro) \]
    

### KahaDB Migration Tool

*   Support exporting messages from KahaDB format to Artemis

### Over-the-wire migration tool

*   Support a tool for migrating messages from ActiveMQ 5.x brokers to Artemis-based brokers (for non-standard backends)
    *   Goal: preserve messageId

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=51806447))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();