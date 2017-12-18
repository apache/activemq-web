      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Users 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [Users](users.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

This page contains a list of some of our users and gives a brief overview of how they are using ActiveMQ. The purpose of this page is to help the ActiveMQ community get to know each other & find out what we're all doing with ActiveMQ and for the developers of ActiveMQ to get a better feel for what kinds of things people are doing with ActiveMQ.

Name

Company name or description

Use of ActiveMQ

[FuseSource](http://fusesource.com/)

FuseSource provide enterprise class support, training and mentoring around an open source Apache SOA stack including [ServiceMix](http://servicemix.apache.org/), [ActiveMQ](http://activemq.apache.org/) and [Camel](http://activemq.apache.org/camel/)

Matt Biddulph

[Dopplr](http://www.dopplr.com/)

Use ActiveMQ as their messaging provider - see Matt's great presentation [Made of Messages](http://www.slideshare.net/carsonified/dopplr-its-made-of-messages-matt-biddulph-presentation)

[gnip](http://gnip.com)

Use [ActiveMQ for their low latency MOM messaging](http://www.byteonic.com/2008/gnip-online-message-oriented-middleware-mom/)

Peter Brooke

RomTrac

We are using ActiveMQ and Camel to provider high performance load balancing of requests across a cluster of servers

Sridhar Komandur

University of Washington (UW Tech)

ActiveMQ is being used as backend messaging layer for a variety of distributed applications withing UW

Gareth Davies

Daugherty Systems

At current client (global agribusiness firm), using ActiveMQ for asynchronous, reliable messaging within in-house SOA application

Raffe G.

Document archiving/flow systems

We try to use ActiveMQ as connectivity option between our FrontEnd (FE) and BackEnd (BE). FE receives requests which processing is normally heavy time-consuming. Thus FE creates a message which is sent to BE for processing and returns a ticket (correlationID) to the user. This will later use the ticket to ask for the response of the processing (again sending a message from FE to BE which will respond synchronously in this case). So we want to have reliable messaging between our FE and BE.  
So far this is not entirely working for us.

Tom L.

Promotional Marketing

Here is our flow. The backend systems (written in a propriatery language) send requests to a tomcat server via http. The message servlet from the ActiveMQ's web API connects to an embeded broker instance using the VM connector and places the request on the queue. We don't have a need for clustering yet, but we are planning on using either tomcat's clustering or ActiveCluster if it becomes necessary (since the brokers are embeded anyways).

Aleksi Kallio

CSC, the Finnish IT center for science

We are building a bioinformatics system for DNA-microarray data storage and analysis. System contains rich graphical clients, a large database and heavy server machinery for processing analysis jobs. We are trying to use ActiveMQ as a JMS implementation to shuttle data between the servers and clients in an event based manner.

[Frik Strecker](mailto:frik@gatherworks.com)

[GatherPlace](http://www.gatherplace.net) provides cost-effective remote application sharing

ActiveMQ is used to collect real-time billing and usage information from servers distributed throughout the world. Free accounts are available to active ActiveMQ developers for ActiveMQ purposes.

[Golconde](http://code.google.com/p/golconde/)

Uses ActiveMQ to implement a distributed Postgresql replication system

[Robert Liguori](http://www.oreillynet.com/pub/au/3212)

STG Technologies, Inc.

Uses ActiveMQ in support of the aviation industry.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36153))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();