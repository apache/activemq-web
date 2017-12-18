      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Replicated LevelDB Store 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Persistence](persistence.html) > [Replicated LevelDB Store](replicated-leveldb-store.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Warning

The LevelDB store has been deprecated and is no longer supported or recommended for use. The recommended store is [KahaDB](kahadb.html)

Synopsis
--------

The Replicated LevelDB Store uses Apache ZooKeeper to pick a master from a set of broker nodes configured to replicate a LevelDB Store. Then synchronizes all slave LevelDB Stores with the master keeps them up to date by replicating all updates from the master.

The Replicated LevelDB Store uses the same data files as a LevelDB Store, so you can switch a broker configuration between replicated and non replicated whenever you want.

Version Compatibility

Available as of ActiveMQ 5.9.0.

How it works.
-------------

![](replicated-leveldb-store.data/replicated-leveldb-store.png)

It uses [Apache ZooKeeper](http://zookeeper.apache.org/) to coordinate which node in the cluster becomes the master. The elected master broker node starts and accepts client connections. The other nodes go into slave mode and connect the the master and synchronize their persistent state /w it. The slave nodes do not accept client connections. All persistent operations are replicated to the connected slaves. If the master dies, the slaves with the latest update gets promoted to become the master. The failed node can then be brought back online and it will go into slave mode.

All messaging operations which require a sync to disk will wait for the update to be replicated to a quorum of the nodes before completing. So if you configure the store with `replicas="3"` then the quorum size is `(3/2+1)=2`. The master will store the update locally and wait for 1 other slave to store the update before reporting success. Another way to think about it is that store will do synchronous replication to a quorum of the replication nodes and asynchronous replication replication to any additional nodes.

When a new master is elected, you also need at least a quorum of nodes online to be able to find a node with the lastest updates. The node with the lastest updates will become the new master. Therefore, it's recommend that you run with at least 3 replica nodes so that you can take one down without suffering a service outage.

### Deployment Tips

Clients should be using the [Failover Transport](failover-transport-reference.html) to connect to the broker nodes in the replication cluster. e.g. using a URL something like the following:

failover:(tcp://broker1:61616,tcp://broker2:61616,tcp://broker3:61616)

You should run at least 3 ZooKeeper server nodes so that the ZooKeeper service is highly available. Don't overcommit your ZooKeeper servers. An overworked ZooKeeper might start thinking live replication nodes have gone offline due to delays in processing their 'keep-alive' messages.

For best results, make sure you explicitly configure the hostname attribute with a hostname or ip address for the node that other cluster members to access the machine with. The automatically determined hostname is not always accessible by the other cluster members and results in slaves not being able to establish a replication session with the master.

Configuration
-------------

You can configure ActiveMQ to use LevelDB for its persistence adapter - like below :

  <broker brokerName="broker" ... >
    ...
    <persistenceAdapter>
      <replicatedLevelDB
        directory="activemq-data"
        replicas="3"
        bind="tcp://0.0.0.0:0"
        zkAddress="zoo1.example.org:2181,zoo2.example.org:2181,zoo3.example.org:2181"
        zkPassword="password"
        zkPath="/activemq/leveldb-stores"
        hostname="broker1.example.org"
        />
    </persistenceAdapter>
    ...
  </broker>

### Replicated LevelDB Store Properties

All the broker nodes that are part of the same replication set should have matching `brokerName` XML attributes. The following configuration properties should be the same on all the broker nodes that are part of the same replication set:

property name

default value

Comments

`replicas`

`3`

The number of nodes that will exist in the cluster. At least (replicas/2)+1 nodes must be online to avoid service outage.

`securityToken`

A security token which must match on all replication nodes for them to accept each others replication requests.

`zkAddress`

`127.0.0.1:2181`

A comma separated list of ZooKeeper servers.

`zkPassword`

The password to use when connecting to the ZooKeeper server.

`zkPath`

`/default`

The path to the ZooKeeper directory where Master/Slave election information will be exchanged.

`zkSessionTimeout`

`2s`

How quickly a node failure will be detected by ZooKeeper. (prior to 5.11 - this had a typo zkSessionTmeout)

`sync`

`quorum_mem`

Controls where updates are reside before being considered complete. This setting is a comma separated list of the following options: `local_mem`, `local_disk`, `remote_mem`, `remote_disk`, `quorum_mem`, `quorum_disk`. If you combine two settings for a target, the stronger guarantee is used. For example, configuring `local_mem, local_disk` is the same as just using `local_disk`. quorum_mem is the same as `local_mem, remote_mem` and `quorum_disk` is the same as `local_disk, remote_disk`

Different replication sets can share the same `zkPath` as long they have different `brokerName`.

The following configuration properties can be unique per node:

property name

default value

Comments

`bind`

`tcp://0.0.0.0:61619`

When this node becomes a master, it will bind the configured address and port to service the replication protocol. Using dynamic ports is also supported. Just configure with `tcp://0.0.0.0:0`

`hostname`

The host name used to advertise the replication service when this node becomes the master. If not set it will be automatically determined.

`weight`

1

The replication node that has the latest update with the highest weight will become the master. Used to give preference to some nodes towards becoming master.

The store also supports the same configuration properties of a standard [LevelDB Store](leveldb-store.html) but it does not support the pluggable storage lockers :

### Standard LevelDB Store Properties

property name

default value

Comments

`directory`

`LevelDB`

The directory which the store will use to hold it's data files. The store will create the directory if it does not already exist.

`readThreads`

`10`

The number of concurrent IO read threads to allowed.

`logSize`

`104857600` (100 MB)

The max size (in bytes) of each data log file before log file rotation occurs.

`verifyChecksums`

`false`

Set to true to force checksum verification of all data that is read from the file system.

`paranoidChecks`

`false`

Make the store error out as soon as possible if it detects internal corruption.

`indexFactory`

`org.fusesource.leveldbjni.JniDBFactory, org.iq80.leveldb.impl.Iq80DBFactory`

The factory classes to use when creating the LevelDB indexes

`indexMaxOpenFiles`

`1000`

Number of open files that can be used by the index.

`indexBlockRestartInterval`

`16`

Number keys between restart points for delta encoding of keys.

`indexWriteBufferSize`

`6291456` (6 MB)

Amount of index data to build up in memory before converting to a sorted on-disk file.

`indexBlockSize`

`4096` (4 K)

The size of index data packed per block.

`indexCacheSize`

`268435456` (256 MB)

The maximum amount of off-heap memory to use to cache index blocks.

`indexCompression`

`snappy`

The type of compression to apply to the index blocks. Can be snappy or none.

`logCompression`

`none`

The type of compression to apply to the log records. Can be snappy or none.

Caveats

The LevelDB store does not yet support storing data associated with [Delay and Schedule Message Delivery](delay-and-schedule-message-delivery.html). Those are are stored in a separate non-replicated KahaDB data files. Unexpected results will occur if you use [Delay and Schedule Message Delivery](delay-and-schedule-message-delivery.html) with the replicated leveldb store since that data will be not be there when the master fails over to a slave.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=31820167))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();