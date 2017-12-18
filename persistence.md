      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Persistence 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Persistence](persistence.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ V5.9
-------------

In ActiveMQ 5.9, the [Replicated LevelDB Store](replicated-leveldb-store.html) is introduced. It handles using [Apache ZooKeeper](http://zookeeper.apache.org/) to pick a master from a set of broker nodes configured to replicate single LevelDB Store. Then synchronizes all slave LevelDB Stores with the master keeps them up to date by replicating all updates to the master. This might become the preferred [Master Slave](masterslave.html) configuration going forward.

ActiveMQ V5.8
-------------

In ActiveMQ 5.8, the [LevelDB Store](leveldb-store.html) was introduced. The LevelDB Store is a file based persistence database. It has been optimized to provide even faster persistence than KahaDB. Although not yet the default message store, we expect this store implementation become the default in future releases.

ActiveMQ V5.3
-------------

From 5.3 onwards - we recommend you use [KahaDB](kahadb.html) \- which offers improved scalability and recoverability over the [AMQ Message Store](amq-message-store.html).  
The [AMQ Message Store](amq-message-store.html) which although faster than [KahaDB](kahadb.html) \- does not scales as well as [KahaDB](kahadb.html) and recovery times take longer.

ActiveMQ V4
-----------

For long term persistence we recommend using JDBC coupled with our high performance journal. You can use just JDBC if you wish but its quite slow.

Our out of the box default configuration uses [Apache Derby](http://incubator.apache.org/derby/) as the default database, which is easy to embed - but we support all the [major SQL databases](jdbc-support.html) \- just reconfigure your JDBC configuration in the [Xml Configuration](xml-configuration.html).

High performance journal - ActiveMQ 4.x
---------------------------------------

To achieve high performance of durable messaging in ACtiveMQ V4.x we strongly recommend you use our high performance journal - which is enabled by default. This works rather like a database; messages (and transcation commits/rollbacks and message acknowledgements) are written to the journal as fast as is humanly possible - then at intervals we checkpoint the journal to the long term persistence storage (in this case JDBC).

Its common when using queues for example that messages are consumed fairly shortly after being published; so you could publish 10,000 messages and only have a few messages outstanding - so when we checkpoint to the JDBC database, we often have only a small amount of messages to actually write to JDBC. Even if we have to write all the messages to the JDBC, we still get performance gains with the journal, since we can use a large transaction batch to insert the messages into the JDBC database to boost performance on the JDBC side.

Our journal is based on lots of the great work in the [Howl](http://howl.objectweb.org/) project; we keep close ties to the Howl community. However since ActiveMQ has to handle arbitarily large message sizes, we've had to make our journal handle any size of message and so we don't use the fixed size record model that Howl uses.

Configuring persistence
-----------------------

For full explict control over configuration check out the [Xml Configuration](xml-configuration.html). However a quick way to set which persistence adapter to use is to set the following system property to be the class name of the PersistenceAdapter implementation.

activemq.persistenceAdapter

When running the broker from the command line, we look for the activemq.xml on the classpath unless you specify one to use. e.g.  
**AMQ 4.x**

activemq xbean:file:myconfig.xml

**AMQ 3.x**

activemq myconfig.xml

or just  
**AMQ3.x/AMQ4.x**

activemq

Here is a sample XML configuration which shows how to configure the journal and the JDBC persistence.

AMQ 5.x

xml<beans xmlns="http://www.springframework.org/schema/beans" xmlns:amq="http://activemq.apache.org/schema/core" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd"> <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"/> <broker useJmx="true" xmlns="http://activemq.apache.org/schema/core"> <networkConnectors> <!-- <networkConnector uri="multicast://default?initialReconnectDelay=100" /> <networkConnector uri="static://(tcp://localhost:61616)" /> --> </networkConnectors> <persistenceFactory> <journalPersistenceAdapterFactory journalLogFiles="5" dataDirectory="${basedir}/target" /> <!-- To use a different dataSource, use the following syntax : --> <!-- <journalPersistenceAdapterFactory journalLogFiles="5" dataDirectory="${basedir}/activemq-data" dataSource="#mysql-ds"/> --> </persistenceFactory> <transportConnectors> <transportConnector uri="tcp://localhost:61636" /> </transportConnectors> </broker> <!-- MySql DataSource Sample Setup --> <!-- <bean id="mysql-ds" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close"> <property name="driverClassName" value="com.mysql.jdbc.Driver"/> <property name="url" value="jdbc:mysql://localhost/activemq?relaxAutoCommit=true"/> <property name="username" value="activemq"/> <property name="password" value="activemq"/> <property name="poolPreparedStatements" value="true"/> </bean> --> </beans>

For more details see the [Initial Configuration](initial-configuration.html) guide.

JDBC Persistence without Journaling
-----------------------------------

To enable JDBC persistence of JMS messages without journaling, we need to change the message broker's default persistence configuration from  
**AMQ 4.x**

<persistenceAdapter> <journaledJDBC journalLogFiles="5" dataDirectory="../activemq-data"/> </persistenceAdapter>

to

<persistenceAdapter> <jdbcPersistenceAdapter dataSource="#my-ds"/> </persistenceAdapter>

**For AMQ 3.x**

<persistence> <journalPersistence directory="../var/journal"> <jdbcPersistence dataSourceRef="derby-ds"/> </journalPersistence> </persistence>

to

<persistence> <jdbcPersistence dataSourceRef="derby-ds"/> </persistence>

Make sure to send durable messages so that it will be persisted in the database server while waiting to be consumed by clients. More information on configuration JDBC persistence at [JDBC Support](jdbc-support.html)

[Kaha Persistence](kaha-persistence.html)

Disaster Recovery options
-------------------------

For people with high [DR](dr.html) requirements we have various options for providing a [Replicated Message Store](replicated-message-store.html) to allow full failover in times of major data centre failure.

Disabling Persistence
---------------------

If you don't want persistence at all you can disable it easily via the [Xml Configuration](xml-configuration.html). e.g.

<broker persistent="false"> </broker>

This will make the broker use the [<memoryPersistenceAdapter>](http://activemq.apache.org/maven/apidocs/org/apache/activemq/store/memory/MemoryPersistenceAdapter.html)  
For an example of using a configuration URI see [How To Unit Test JMS Code](how-to-unit-test-jms-code.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36079))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();