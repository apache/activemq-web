      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Pure Master Slave 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Clustering](clustering.html) > [MasterSlave](masterslave.html) > [Pure Master Slave](pure-master-slave.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### Pure Master Slave

This feature has been deprecated and will be removed in version 5.8

This feature will be removed in 5.8 as it has not evolved to be production ready.  
You are advised to use [shared storage master/slave](masterslave.html) or the [Replicated LevelDB Store](replicated-leveldb-store.html).  
See [AMQ-4165](https://issues.apache.org/jira/browse/AMQ-4165)

A Pure Master Slave configuration provides a basic shared nothing, fully replicated topology which does not depend on a shared file system or shared database.

### How Pure Master Slave works

*   A slave of a master broker consumes all message states from the master - messages, acknowledgments and transactional states.  
    Whilst a Slave is actively connected to the Master - it does not allow or start any network or transport connectors, it's sole purpose is to duplicate the state of the master.

*   The master broker will only respond to a client when a message exchange has been successfully passed to the slave. For example, a commit  
    in a clients transaction will not complete until the master and the slave have processed the commit.

*   In the event the master fails (e.g. hardware failure) the slave has optionally two modes of operation
    1.  starts all it's network and transport connectors - allowing clients connected to the master to resume on the slave.
    2.  or can be configured to close down. In this mode, the slave is simply used to duplicate state for the master.

*   clients should use a failover transport for connecting to the master broker first and then the slave. e.g. using a URL such as

failover://(tcp://masterhost:61616,tcp://slavehost:61616)?randomize=false

The **randomize** property just disables randomness so that the transport will always try the master first, then the slave if it can't connect to that. Note that the slave does not accept connections until it becomes the master

### Limitations of Pure Master Slave

*   Only one slave can be connected to the Master
*   A failed master cannot be re-introduced without shutting down the the slave broker (no automatic failback)
*   There is no automatic synchronization between brokers. This is a manual process.

### Recovering a Pure Master Slave topology

This is a manual process - once a master has failed, the only sure way to ensure that the toplogy is synchronized again is manually:

*   shutdown the slave broker (The clients do not need to be shutdown - they will wait until the topology is re-established if they are failover clients
*   copy the data directory from the slave over the data directory of the master broker
*   re-start the master and the slave

### Configuring Pure Master Slave

You should not configure a connection between the master and a slave. The connection is automatically established with the slave's configuration. If you explicitly configure a network connection, you may encounter race conditions when the master broker is under heavy load.

A master broker doesn't need any special configuration - it's a normal broker until a slave broker attaches itself.  
To identify a broker as a slave - there is just one property to set (see below) as this [example shows](http://svn.apache.org/repos/asf/activemq/trunk/activemq-core/src/test/resources/org/apache/activemq/broker/ft/slave2.xml) \- so configuration is nice and easy:

<broker masterConnectorURI="tcp://masterhost:62001" shutdownOnMasterFailure="false">
  <persistenceAdapter>
      <journaledJDBC journalLogFiles="5" dataDirectory="${activemq.base}/data/broker2" />
    </persistenceAdapter>

    <transportConnectors>
	  <transportConnector uri="tcp://slavehost:61616"/>
   </transportConnectors>
</broker>

Broker Property

default

Description

masterConnectorURI

null

URI to the master broker e.g. **_tcp://masterhost:62001_**

shutdownOnMasterFailure

false

if true, the slave will shut down if the master fails otherwise the slave will take over as being the new master. The slave ensures that there is a separate copy of each message and acknowledgement on another machine which can protect against catastrophic hardware failure. If the master fails you might want the slave to shut down as well as you may always want to duplicate messages to 2 physical locations to prevent message loss on catastrophic data centre or hardware failure. If you would rather the system keep on running after a master failure then leave this flag as false.

waitForSlave

false

version 5.2+, if true, a master will wait till a slave has attached before completing its startup sequence

shutdownOnSlaveFailure

false

version 5.2+, if true, a master will shutdown if the slave connection is lost, ensuring that the master will not become out of sync with the slave.

### Configuring the authentication of the Slave

In ActiveMQ 4.1 or later you can use a **<masterConnector/>** element as an alternative XML configuration mechanism as shown in the following [example](http://svn.apache.org/repos/asf/activemq/trunk/activemq-core/src/test/resources/org/apache/activemq/broker/ft/slave2.xml) to configure the user and password that the slave will use to connect to the master

<broker brokerName="slave" useJmx="false"  deleteAllMessagesOnStartup="true"  xmlns="http://activemq.apache.org/schema/core">
    <services>
      <masterConnector remoteURI= "tcp://localhost:62001" userName="James" password="Cheese"/>
    </services>

    <transportConnectors>
      <transportConnector uri="tcp://localhost:62002"/>
    </transportConnectors>
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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=103228))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();