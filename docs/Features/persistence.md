Apache ActiveMQ ™ -- Persistence 

[Features](features.md) > [Persistence](Features/persistence.md)


ActiveMQ V5.9
-------------

In ActiveMQ 5.9, the [Replicated LevelDB Store](replicated-Features/PersistenceFeatures/Persistence/Features/Persistence/leveldb-store.md) is introduced. It handles using [Apache ZooKeeper](http://zookeeper.apache.org/) to pick a master from a set of broker nodes configured to replicate single LevelDB Store. Then synchronizes all slave LevelDB Stores with the master keeps them up to date by replicating all updates to the master. This might become the preferred [Master Slave](Features/ClusteringFeatures/Clustering/Features/Clustering/masterslave.md) configuration going forward.

ActiveMQ V5.8
-------------

In ActiveMQ 5.8, the [LevelDB Store](Features/PersistenceFeatures/Persistence/Features/Persistence/leveldb-store.md) was introduced. The LevelDB Store is a file based persistence database. It has been optimized to provide even faster persistence than KahaDB. Although not yet the default message store, we expect this store implementation become the default in future releases.

ActiveMQ V5.3
-------------

From 5.3 onwards - we recommend you use [KahaDB](Features/PersistenceFeatures/Persistence/Features/Persistence/kahadb.md) \- which offers improved scalability and recoverability over the [AMQ Message Store](Features/Persistence/amq-message-store.md).  
The [AMQ Message Store](Features/Persistence/amq-message-store.md) which although faster than [KahaDB](Features/PersistenceFeatures/Persistence/Features/Persistence/kahadb.md) \- does not scales as well as [KahaDB](Features/PersistenceFeatures/Persistence/Features/Persistence/kahadb.md) and recovery times take longer.

ActiveMQ V4
-----------

For long term persistence we recommend using JDBC coupled with our high performance journal. You can use just JDBC if you wish but its quite slow.

Our out of the box default configuration uses [Apache Derby](http://incubator.apache.org/derby/) as the default database, which is easy to embed - but we support all the [major SQL databases](jdbc-CommunityCommunity/Community/support.md) \- just reconfigure your JDBC configuration in the [Xml Configuration](xml-Community/FAQ/configuration.md).

High performance journal - ActiveMQ 4.x
---------------------------------------

To achieve high performance of durable messaging in ACtiveMQ V4.x we strongly recommend you use our high performance journal - which is enabled by default. This works rather like a database; messages (and transcation commits/rollbacks and message acknowledgements) are written to the journal as fast as is humanly possible - then at intervals we checkpoint the journal to the long term persistence storage (in this case JDBC).

Its common when using queues for example that messages are consumed fairly shortly after being published; so you could publish 10,000 messages and only have a few messages outstanding - so when we checkpoint to the JDBC database, we often have only a small amount of messages to actually write to JDBC. Even if we have to write all the messages to the JDBC, we still get performance gains with the journal, since we can use a large transaction batch to insert the messages into the JDBC database to boost performance on the JDBC side.

Our journal is based on lots of the great work in the [Howl](http://howl.objectweb.org/) project; we keep close ties to the Howl community. However since ActiveMQ has to handle arbitarily large message sizes, we've had to make our journal handle any size of message and so we don't use the fixed size record model that Howl uses.

Configuring persistence
-----------------------

For full explict control over configuration check out the [Xml Configuration](xml-Community/FAQ/configuration.md). However a quick way to set which persistence adapter to use is to set the following system property to be the class name of the PersistenceAdapter implementation.

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

For more details see the [Initial Configuration](Using ActiveMQ/initial-Community/FAQ/configuration.md) guide.

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

Make sure to send durable messages so that it will be persisted in the database server while waiting to be consumed by clients. More information on configuration JDBC persistence at [JDBC Support](jdbc-CommunityCommunity/Community/support.md)

[Kaha Persistence](kaha-Features/persistence.md)

Disaster Recovery options
-------------------------

For people with high [DR](Community/FAQ/TerminologyCommunity/FAQ/Terminology/Community/FAQ/Terminology/dr.md) requirements we have various options for providing a [Replicated Message Store](Features/Clustering/replicated-message-store.md) to allow full failover in times of major data centre failure.

Disabling Persistence
---------------------

If you don't want persistence at all you can disable it easily via the [Xml Configuration](xml-Community/FAQ/configuration.md). e.g.

<broker persistent="false"> </broker>

This will make the broker use the [<memoryPersistenceAdapter>](http://activemq.apache.org/maven/apidocs/org/apache/activemq/store/memory/MemoryPersistenceAdapter.html)  
For an example of using a configuration URI see [How To Unit Test JMS Code](Community/FAQ/JMSCommunity/FAQ/JMS/Community/FAQ/JMS/how-to-unit-test-jms-code.md)

