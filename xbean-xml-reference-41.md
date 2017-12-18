      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- XBean XML Reference 4.1 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [Xml Reference](xml-reference.html) > [XBean XML Reference 4.1](xbean-xml-reference-41.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### Elements By Type

#### The _[org.apache.activemq.network.jms.InboundQueueBridge](xbean-xml-reference-41.html)_ Type Implementations

_[<inboundQueueBridge>](xbean-xml-reference-41.html)_

Create an Inbound Queue Bridge

#### The _[org.apache.activemq.broker.BrokerService](xbean-xml-reference-41.html)_ Type Implementations

_[<broker>](xbean-xml-reference-41.html)_

An ActiveMQ Message Broker which consists of a number of transport connectors, network connectors and a persistence adaptor

#### The _[org.apache.activemq.broker.BrokerPlugin](xbean-xml-reference-41.html)_ Type Implementations

_[<authorizationPlugin>](xbean-xml-reference-41.html)_

An authorization plugin where each operation on a destination is checked against an authorizationMap

_[<connectionDotFilePlugin>](xbean-xml-reference-41.html)_

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current connections

_[<destinationDotFilePlugin>](xbean-xml-reference-41.html)_

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current topic & queue hierarchies.

_[<jaasAuthenticationPlugin>](xbean-xml-reference-41.html)_

Provides a JAAS based authentication plugin

_[<loggingBrokerPlugin>](xbean-xml-reference-41.html)_

A simple Broker interceptor which allows you to enable/disable logging.

_[<simpleAuthenticationPlugin>](xbean-xml-reference-41.html)_

Provides a simple authentication plugin configured with a map of user-passwords and a map of user-groups

#### The _[org.apache.activemq.store.jdbc.JDBCAdapter](xbean-xml-reference-41.html)_ Type Implementations

_[<blobJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the getBlob()/setBlob() operations. This is a little more involved since to insert a blob you have to: 1: insert empty blob. 2: select the blob 3: finally update the blob with data value. The databases/JDBC drivers that use this adapter are:

_[<bytesJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the setBytes()/getBytes() operations. The databases/JDBC drivers that use this adapter are:

_[<db2JDBCAdapter>](xbean-xml-reference-41.html)_

_[<defaultJDBCAdapter>](xbean-xml-reference-41.html)_

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

sub-classing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

_[<imageBasedJDBCAdaptor>](xbean-xml-reference-41.html)_

Provides JDBCAdapter since that uses IMAGE datatype to hold binary data. The databases/JDBC drivers that use this adapter are:

*   Sybase
*   MS SQL

_[<oracleJDBCAdapter>](xbean-xml-reference-41.html)_

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

Subclassing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

_[<streamJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the setBinaryStream()/getBinaryStream() operations. The databases/JDBC drivers that use this adapter are:

*   Axion

#### The _[org.apache.activemq.broker.region.virtual.VirtualDestination](xbean-xml-reference-41.html)_ Type Implementations

_[<compositeQueue>](xbean-xml-reference-41.html)_

Represents a virtual queue which forwards to a number of other destinations.

_[<compositeTopic>](xbean-xml-reference-41.html)_

Represents a virtual topic which forwards to a number of other destinations.

_[<virtualTopic>](xbean-xml-reference-41.html)_

Creates [Virtual Topics](http://activemq.org/site/virtual-destinations.html) using a prefix and postfix. The virtual destination creates a wildcard that is then used to look up all active queue subscriptions which match.

#### The _[org.apache.activemq.broker.region.policy.PolicyMap](xbean-xml-reference-41.html)_ Type Implementations

_[<policyMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies.

#### The _[org.apache.activemq.broker.region.policy.PendingMessageLimitStrategy](xbean-xml-reference-41.html)_ Type Implementations

_[<constantPendingMessageLimitStrategy>](xbean-xml-reference-41.html)_

This PendingMessageLimitStrategy is configured to a constant value for all subscriptions.

_[<prefetchRatePendingMessageLimitStrategy>](xbean-xml-reference-41.html)_

This PendingMessageLimitStrategy sets the maximum pending message limit value to be a multiplier of the prefetch limit of the subscription.

#### The _[org.apache.activemq.broker.region.policy.SubscriptionRecoveryPolicy](xbean-xml-reference-41.html)_ Type Implementations

_[<fixedCountSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

_[<fixedSizedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will keep a fixed amount of memory available in RAM for message history which is evicted in time order.

_[<lastImageSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

_[<noSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This is the default Topic recovery policy which does not recover any messages.

_[<queryBasedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will perform a user specific query mechanism to load any messages they may have missed.

_[<timedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will keep a timed buffer of messages around in memory and use that to recover new subscriptions.

#### The _[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_ Type Implementations

_[<statements>](xbean-xml-reference-41.html)_

#### The _[org.apache.activemq.broker.jmx.ManagementContext](xbean-xml-reference-41.html)_ Type Implementations

_[<managementContext>](xbean-xml-reference-41.html)_

A Flow provides different dispatch policies within the NMR

#### The _[org.apache.activemq.store.PersistenceAdapterFactory](xbean-xml-reference-41.html)_ Type Implementations

_[<journaledJDBC>](xbean-xml-reference-41.html)_

Creates a default persistence model using the Journal and JDBC

#### The _[org.apache.activemq.security.AuthorizationEntry](xbean-xml-reference-41.html)_ Type Implementations

_[<authorizationEntry>](xbean-xml-reference-41.html)_

Represents an entry in a {@link DefaultAuthorizationMap} for assigning different operations (read, write, admin) of user roles to a specific destination or a hierarchical wildcard area of destinations.

#### The _[org.apache.activemq.broker.region.policy.DeadLetterStrategy](xbean-xml-reference-41.html)_ Type Implementations

_[<individualDeadLetterStrategy>](xbean-xml-reference-41.html)_

A {@link DeadLetterStrategy} where each destination has its own individual DLQ using the subject naming hierarchy.

_[<sharedDeadLetterStrategy>](xbean-xml-reference-41.html)_

A default implementation of {@link DeadLetterStrategy} which uses a constant destination.

#### The _[javax.jms.Topic](xbean-xml-reference-41.html)_ Type Implementations

_[<topic>](xbean-xml-reference-41.html)_

An ActiveMQ Topic Destination

#### The _[org.apache.activemq.store.PersistenceAdapter](xbean-xml-reference-41.html)_ Type Implementations

_[<jdbcPersistenceAdapter>](xbean-xml-reference-41.html)_

A {@link PersistenceAdapter} implementation using JDBC for persistence storage. This persistence adapter will correctly remember prepared XA transactions, but it will not keep track of local transaction commits so that operations performed against the Message store are done as a single uow.

_[<journalPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

_[<kahaPersistenceAdapter>](xbean-xml-reference-41.html)_

_[<memoryPersistenceAdapter>](xbean-xml-reference-41.html)_

_[<quickJournalPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

_[<rapidPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

#### The _[org.apache.activemq.broker.region.policy.PolicyEntry](xbean-xml-reference-41.html)_ Type Implementations

_[<policyEntry>](xbean-xml-reference-41.html)_

Represents an entry in a {@link PolicyMap} for assigning policies to a specific destination or a hierarchical wildcard area of destinations.

#### The _[org.apache.activemq.network.DemandForwardingBridgeSupport](xbean-xml-reference-41.html)_ Type Implementations

_[<compositeDemandForwardingBridge>](xbean-xml-reference-41.html)_

A demand forwarding bridge which works with multicast style transports where a single Transport could be communicating with multiple remote brokers

_[<demandForwardingBridge>](xbean-xml-reference-41.html)_

Forwards messages from the local broker to the remote broker based on demand.

#### The _[org.apache.activemq.network.jms.OutboundQueueBridge](xbean-xml-reference-41.html)_ Type Implementations

_[<outboundQueueBridge>](xbean-xml-reference-41.html)_

Create an Outbound Queue Bridge

#### The _[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_ Type Implementations

_[<usageManager>](xbean-xml-reference-41.html)_

Used to keep track of how much of something is being used so that a productive working set usage can be controlled. Main use case is manage memory usage.

#### The _[org.apache.activemq.store.jdbc.JDBCPersistenceAdapter](xbean-xml-reference-41.html)_ Type Implementations

_[<jdbcPersistenceAdapter>](xbean-xml-reference-41.html)_

A {@link PersistenceAdapter} implementation using JDBC for persistence storage. This persistence adapter will correctly remember prepared XA transactions, but it will not keep track of local transaction commits so that operations performed against the Message store are done as a single uow.

#### The _[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_ Type Implementations

_[<queue>](xbean-xml-reference-41.html)_

An ActiveMQ Queue Destination

_[<topic>](xbean-xml-reference-41.html)_

An ActiveMQ Topic Destination

#### The _[org.apache.activemq.network.jms.InboundTopicBridge](xbean-xml-reference-41.html)_ Type Implementations

_[<inboundTopicBridge>](xbean-xml-reference-41.html)_

Create an Inbound Topic Bridge

#### The _[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_ Type Implementations

_[<jmsQueueConnector>](xbean-xml-reference-41.html)_

A Bridge to other JMS Queue providers

_[<jmsTopicConnector>](xbean-xml-reference-41.html)_

A Bridge to other JMS Topic providers

#### The _[org.apache.activemq.security.AuthorizationMap](xbean-xml-reference-41.html)_ Type Implementations

_[<authorizationMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies. Each entry in the map represents the authorization ACLs for each operation.

_[<simpleAuthorizationMap>](xbean-xml-reference-41.html)_

An AuthorizationMap which is configured with individual DestinationMaps for each operation.

#### The _[org.apache.activemq.broker.region.policy.DispatchPolicy](xbean-xml-reference-41.html)_ Type Implementations

_[<roundRobinDispatchPolicy>](xbean-xml-reference-41.html)_

Simple dispatch policy that sends a message to every subscription that matches the message.

_[<simpleDispatchPolicy>](xbean-xml-reference-41.html)_

Simple dispatch policy that sends a message to every subscription that matches the message.

_[<strictOrderDispatchPolicy>](xbean-xml-reference-41.html)_

Dispatch policy that causes every subscription to see messages in the same order.

#### The _[javax.jms.Queue](xbean-xml-reference-41.html)_ Type Implementations

_[<queue>](xbean-xml-reference-41.html)_

An ActiveMQ Queue Destination

#### The _[org.apache.activemq.broker.region.policy.MessageEvictionStrategy](xbean-xml-reference-41.html)_ Type Implementations

_[<oldestMessageEvictionStrategy>](xbean-xml-reference-41.html)_

An eviction strategy which evicts the oldest message first (which is the default).

_[<oldestMessageWithLowestPriorityEvictionStrategy>](xbean-xml-reference-41.html)_

An eviction strategy which evicts the oldest message with the lowest priority first.

#### The _[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_ Type Implementations

_[<simpleJmsMessageConvertor>](xbean-xml-reference-41.html)_

Converts Message from one JMS to another

#### The _[org.apache.activemq.broker.region.DestinationInterceptor](xbean-xml-reference-41.html)_ Type Implementations

_[<virtualDestinationInterceptor>](xbean-xml-reference-41.html)_

Implements [Virtual Topics](http://incubator.apache.org/activemq/virtual-destinations.html).

#### The _[org.apache.activemq.network.jms.OutboundTopicBridge](xbean-xml-reference-41.html)_ Type Implementations

_[<outboundTopicBridge>](xbean-xml-reference-41.html)_

Create an Outbound Topic Bridge

#### The _[org.apache.activemq.filter.DestinationMap](xbean-xml-reference-41.html)_ Type Implementations

_[<authorizationMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies. Each entry in the map represents the authorization ACLs for each operation.

_[<policyMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies.

### The _[<authorizationEntry>](xbean-xml-reference-41.html)_ Element

Represents an entry in a {@link DefaultAuthorizationMap} for assigning different operations (read, write, admin) of user roles to a specific destination or a hierarchical wildcard area of destinations.

#### Properties

Property Name

Type

Description

admin

_java.lang.String_

adminACLs

_java.util.Set_

destination

_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_

queue

_java.lang.String_

A helper method to set the destination from a configuration file

read

_java.lang.String_

readACLs

_java.util.Set_

topic

_java.lang.String_

A helper method to set the destination from a configuration file

write

_java.lang.String_

writeACLs

_java.util.Set_

### The _[<authorizationMap>](xbean-xml-reference-41.html)_ Element

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies. Each entry in the map represents the authorization ACLs for each operation.

#### Properties

Property Name

Type

Description

authorizationEntries

(_java.lang.Object_)*

Sets the individual entries on the authorization map

defaultEntry

_[org.apache.activemq.security.AuthorizationEntry](xbean-xml-reference-41.html)_

entries

(_java.lang.Object_)*

A helper method to allow the destination map to be populated from a dependency injection framework such as Spring

### The _[<authorizationPlugin>](xbean-xml-reference-41.html)_ Element

An authorization plugin where each operation on a destination is checked against an authorizationMap

#### Properties

Property Name

Type

Description

map

_[org.apache.activemq.security.AuthorizationMap](xbean-xml-reference-41.html)_

### The _[<axionJDBCAdapter>](xbean-xml-reference-41.html)_ Element

Axion specific Adapter. Axion does not seem to support ALTER statements or sub-selects. This means: - We cannot auto upgrade the schema was we roll out new versions of ActiveMQ - We cannot delete durable sub messages that have be acknowledged by all consumers.

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<blobJDBCAdapter>](xbean-xml-reference-41.html)_ Element

This JDBCAdapter inserts and extracts BLOB data using the getBlob()/setBlob() operations. This is a little more involved since to insert a blob you have to: 1: insert empty blob. 2: select the blob 3: finally update the blob with data value. The databases/JDBC drivers that use this adapter are:

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<broker>](xbean-xml-reference-41.html)_ Element

An ActiveMQ Message Broker which consists of a number of transport connectors, network connectors and a persistence adaptor

#### Properties

Property Name

Type

Description

adminView

_org.apache.activemq.broker.jmx.BrokerView_

Returns the administration view of the broker; used to create and destroy resources such as queues and topics. Note this method returns null if JMX is disabled.

advisorySupport

_boolean_

Allows the support of advisory messages to be disabled for performance reasons.

brokerName

_java.lang.String_

Sets the name of this broker; which must be unique in the network

brokerObjectName

_javax.management.ObjectName_

Sets the JMX ObjectName for this broker

dataDirectory

_java.io.File_

Sets the directory in which the data files will be stored by default for the JDBC and Journal persistence adaptors.

deleteAllMessagesOnStartup

_boolean_

Sets whether or not all messages are deleted on startup - mostly only useful for testing.

destinationInterceptors

(_[org.apache.activemq.broker.region.DestinationInterceptor](xbean-xml-reference-41.html)_)*

Sets the destination interceptors to use

destinationPolicy

_[org.apache.activemq.broker.region.policy.PolicyMap](xbean-xml-reference-41.html)_

Sets the destination specific policies available either for exact destinations or for wildcard areas of destinations.

destinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

Sets the destinations which should be loaded/created on startup

jmsBridgeConnectors

(_[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_)*

keepDurableSubsActive

_boolean_

managementContext

_[org.apache.activemq.broker.jmx.ManagementContext](xbean-xml-reference-41.html)_

masterConnectorURI

_java.lang.String_

memoryManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

messageAuthorizationPolicy

_org.apache.activemq.security.MessageAuthorizationPolicy_

Sets the policy used to decide if the current connection is authorized to consume a given message

networkConnectorURIs

(_java.lang.String_)*

networkConnectors

(_java.lang.Object_)*

Sets the network connectors which this broker will use to connect to other brokers in a federated network

persistenceAdapter

_[org.apache.activemq.store.PersistenceAdapter](xbean-xml-reference-41.html)_

Sets the persistence adaptor implementation to use for this broker

persistenceFactory

_[org.apache.activemq.store.PersistenceAdapterFactory](xbean-xml-reference-41.html)_

persistent

_boolean_

Sets whether or not persistence is enabled or disabled.

plugins

(_[org.apache.activemq.broker.BrokerPlugin](xbean-xml-reference-41.html)_)*

Sets a number of broker plugins to install such as for security authentication or authorization

populateJMSXUserID

_boolean_

Sets whether or not the broker should populate the JMSXUserID header.

proxyConnectors

(_java.lang.Object_)*

Sets the network connectors which this broker will use to connect to other brokers in a federated network

shutdownOnMasterFailure

_boolean_

start

_boolean_

Sets whether or not the broker is started along with the ApplicationContext it is defined within. Normally you would want the broker to start up along with the ApplicationContext but sometimes when working with JUnit tests you may wish to start and stop the broker explicitly yourself.

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

transportConnectorURIs

(_java.lang.String_)*

transportConnectors

(_java.lang.Object_)*

Sets the transport connectors which this broker will listen on for new clients

useJmx

_boolean_

Sets whether or not the Broker's services should be exposed into JMX or not.

useLoggingForShutdownErrors

_boolean_

Sets whether or not we should use commons-logging when reporting errors when shutting down the broker

useShutdownHook

_boolean_

Sets whether or not we should use a shutdown handler to close down the broker cleanly if the JVM is terminated. It is recommended you leave this enabled.

useVirtualTopics

_boolean_

Sets whether or not [Virtual Topics](http://incubator.apache.org/activemq/virtual-destinations.html) should be supported by default if they have not been explicitly configured.

vmConnectorURI

_java.net.URI_

### The _[<bytesJDBCAdapter>](xbean-xml-reference-41.html)_ Element

This JDBCAdapter inserts and extracts BLOB data using the setBytes()/getBytes() operations. The databases/JDBC drivers that use this adapter are:

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<compositeDemandForwardingBridge>](xbean-xml-reference-41.html)_ Element

A demand forwarding bridge which works with multicast style transports where a single Transport could be communicating with multiple remote brokers

#### Properties

Property Name

Type

Description

decreaseNetworkConsumerPriority

_boolean_

dispatchAsync

_boolean_

durableDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

dynamicallyIncludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

excludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

localBroker

_org.apache.activemq.transport.Transport_

localBrokerName

_java.lang.String_

name

_java.lang.String_

networkTTL

_int_

password

_java.lang.String_

prefetchSize

_int_

remoteBroker

_org.apache.activemq.transport.Transport_

staticallyIncludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

userName

_java.lang.String_

### The _[<compositeQueue>](xbean-xml-reference-41.html)_ Element

Represents a virtual queue which forwards to a number of other destinations.

#### Properties

Property Name

Type

Description

copyMessage

_boolean_

Sets whether a copy of the message will be sent to each destination. Defaults to true so that the forward destination is set as the destination of the message

forwardOnly

_boolean_

Sets if the virtual destination is forward only (and so there is no physical queue to match the virtual queue) or if there is also a physical queue with the same name).

forwardTo

_java.util.Collection_

Sets the list of destinations to forward to

name

_java.lang.String_

Sets the name of this composite destination

### The _[<compositeTopic>](xbean-xml-reference-41.html)_ Element

Represents a virtual topic which forwards to a number of other destinations.

#### Properties

Property Name

Type

Description

copyMessage

_boolean_

Sets whether a copy of the message will be sent to each destination. Defaults to true so that the forward destination is set as the destination of the message

forwardOnly

_boolean_

Sets if the virtual destination is forward only (and so there is no physical queue to match the virtual queue) or if there is also a physical queue with the same name).

forwardTo

_java.util.Collection_

Sets the list of destinations to forward to

name

_java.lang.String_

Sets the name of this composite destination

### The _[<connectionDotFilePlugin>](xbean-xml-reference-41.html)_ Element

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current connections

#### Properties

Property Name

Type

Description

file

_java.lang.String_

Sets the destination file name to create the destination diagram

### The _[<constantPendingMessageLimitStrategy>](xbean-xml-reference-41.html)_ Element

This PendingMessageLimitStrategy is configured to a constant value for all subscriptions.

#### Properties

Property Name

Type

Description

limit

_int_

### The _[<db2JDBCAdapter>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<defaultJDBCAdapter>](xbean-xml-reference-41.html)_ Element

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

sub-classing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<demandForwardingBridge>](xbean-xml-reference-41.html)_ Element

Forwards messages from the local broker to the remote broker based on demand.

#### Properties

Property Name

Type

Description

decreaseNetworkConsumerPriority

_boolean_

dispatchAsync

_boolean_

durableDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

dynamicallyIncludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

excludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

localBroker

_org.apache.activemq.transport.Transport_

localBrokerName

_java.lang.String_

name

_java.lang.String_

networkTTL

_int_

password

_java.lang.String_

prefetchSize

_int_

remoteBroker

_org.apache.activemq.transport.Transport_

staticallyIncludedDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

userName

_java.lang.String_

### The _[<destinationDotFilePlugin>](xbean-xml-reference-41.html)_ Element

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current topic & queue hierarchies.

#### Properties

Property Name

Type

Description

file

_java.lang.String_

Sets the destination file name to create the destination diagram

### The _[<destinationEntry>](xbean-xml-reference-41.html)_ Element

A default entry in a DestinationMap which holds a single value.

#### Properties

Property Name

Type

Description

destination

_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_

queue

_java.lang.String_

A helper method to set the destination from a configuration file

topic

_java.lang.String_

A helper method to set the destination from a configuration file

value

_java.lang.Object_

### The _[<fixedCountSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

#### Properties

Property Name

Type

Description

maximumSize

_int_

Sets the maximum number of messages that this destination will hold around in RAM

### The _[<fixedSizedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This implementation of {@link SubscriptionRecoveryPolicy} will keep a fixed amount of memory available in RAM for message history which is evicted in time order.

#### Properties

Property Name

Type

Description

buffer

_org.apache.activemq.memory.list.MessageList_

maximumSize

_int_

Sets the maximum amount of RAM in bytes that this buffer can hold in RAM

useSharedBuffer

_boolean_

### The _[<forwardingBridge>](xbean-xml-reference-41.html)_ Element

Forwards all messages from the local broker to the remote broker.

#### Properties

Property Name

Type

Description

clientId

_java.lang.String_

destinationFilter

_java.lang.String_

dispatchAsync

_boolean_

localBroker

_org.apache.activemq.transport.Transport_

prefetchSize

_int_

remoteBroker

_org.apache.activemq.transport.Transport_

### The _[<imageBasedJDBCAdaptor>](xbean-xml-reference-41.html)_ Element

Provides JDBCAdapter since that uses IMAGE datatype to hold binary data. The databases/JDBC drivers that use this adapter are:

*   Sybase
*   MS SQL

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<inboundQueueBridge>](xbean-xml-reference-41.html)_ Element

Create an Inbound Queue Bridge

#### Properties

Property Name

Type

Description

consumer

_javax.jms.MessageConsumer_

consumerConnection

_javax.jms.QueueConnection_

consumerQueue

_[javax.jms.Queue](xbean-xml-reference-41.html)_

doHandleReplyTo

_boolean_

inboundQueueName

_java.lang.String_

jmsConnector

_[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_

jmsMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

producerConnection

_javax.jms.QueueConnection_

producerQueue

_[javax.jms.Queue](xbean-xml-reference-41.html)_

selector

_java.lang.String_

### The _[<inboundTopicBridge>](xbean-xml-reference-41.html)_ Element

Create an Inbound Topic Bridge

#### Properties

Property Name

Type

Description

consumer

_javax.jms.MessageConsumer_

consumerConnection

_javax.jms.TopicConnection_

consumerName

_java.lang.String_

consumerTopic

_[javax.jms.Topic](xbean-xml-reference-41.html)_

doHandleReplyTo

_boolean_

inboundTopicName

_java.lang.String_

jmsConnector

_[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_

jmsMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

producerConnection

_javax.jms.TopicConnection_

producerTopic

_[javax.jms.Topic](xbean-xml-reference-41.html)_

selector

_java.lang.String_

### The _[<individualDeadLetterStrategy>](xbean-xml-reference-41.html)_ Element

A {@link DeadLetterStrategy} where each destination has its own individual DLQ using the subject naming hierarchy.

#### Properties

Property Name

Type

Description

queuePrefix

_java.lang.String_

Sets the prefix to use for all dead letter queues for queue messages

topicPrefix

_java.lang.String_

Sets the prefix to use for all dead letter queues for topic messages

useQueueForQueueMessages

_boolean_

Sets whether a queue or topic should be used for queue messages sent to a DLQ. The default is to use a Queue

useQueueForTopicMessages

_boolean_

Sets whether a queue or topic should be used for topic messages sent to a DLQ. The default is to use a Queue

### The _[<informixJDBCAdapter>](xbean-xml-reference-41.html)_ Element

JDBC Adapter for Informix database. Because Informix database restricts length of composite primary keys, length of _container name_ field and _subscription id_ field must be reduced to 150 characters. Therefore be sure not to use longer names for container name and subscription id than 150 characters.

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<jaasAuthenticationPlugin>](xbean-xml-reference-41.html)_ Element

Provides a JAAS based authentication plugin

#### Properties

Property Name

Type

Description

configuration

_java.lang.String_

Sets the JAAS configuration domain name used

discoverLoginConfig

_boolean_

Enables or disables the auto-discovery of the login.config file for JAAS to initialize itself. This flag is enabled by default such that if the **java.security.auth.login.config** system property is not defined then it is set to the location of the **login.config** file on the classpath.

### The _[<jdbcPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

A {@link PersistenceAdapter} implementation using JDBC for persistence storage. This persistence adapter will correctly remember prepared XA transactions, but it will not keep track of local transaction commits so that operations performed against the Message store are done as a single uow.

#### Properties

Property Name

Type

Description

adapter

_[org.apache.activemq.store.jdbc.JDBCAdapter](xbean-xml-reference-41.html)_

brokerService

_[org.apache.activemq.broker.BrokerService](xbean-xml-reference-41.html)_

cleanupPeriod

_int_

dataDirectory

_java.lang.String_

dataDirectoryFile

_java.io.File_

dataSource

_javax.sql.DataSource_

databaseLocker

_org.apache.activemq.store.jdbc.DatabaseLocker_

Sets the database locker strategy to use to lock the database on startup

ds

_javax.sql.DataSource_

scheduledThreadPoolExecutor

_edu.emory.mathcs.backport.java.util.concurrent.ScheduledThreadPoolExecutor_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useDatabaseLock

_boolean_

useExternalMessageReferences

_boolean_

wireFormat

_org.apache.activeio.command.WireFormat_

### The _[<jmsQueueConnector>](xbean-xml-reference-41.html)_ Element

A Bridge to other JMS Queue providers

#### Properties

Property Name

Type

Description

brokerService

_[org.apache.activemq.broker.BrokerService](xbean-xml-reference-41.html)_

One way to configure the local connection - this is called by The BrokerService when the Connector is embedded

inboundMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

inboundQueueBridges

(_[org.apache.activemq.network.jms.InboundQueueBridge](xbean-xml-reference-41.html)_)*

jndiLocalTemplate

_org.springframework.jndi.JndiTemplate_

jndiOutboundTemplate

_org.springframework.jndi.JndiTemplate_

localConnectionFactoryName

_java.lang.String_

localPassword

_java.lang.String_

localQueueConnection

_javax.jms.QueueConnection_

localQueueConnectionFactory

_javax.jms.QueueConnectionFactory_

localUsername

_java.lang.String_

name

_java.lang.String_

outboundMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

outboundPassword

_java.lang.String_

outboundQueueBridges

(_[org.apache.activemq.network.jms.OutboundQueueBridge](xbean-xml-reference-41.html)_)*

outboundQueueConnection

_javax.jms.QueueConnection_

outboundQueueConnectionFactory

_javax.jms.QueueConnectionFactory_

outboundQueueConnectionFactoryName

_java.lang.String_

outboundUsername

_java.lang.String_

replyToDestinationCacheSize

_int_

### The _[<jmsTopicConnector>](xbean-xml-reference-41.html)_ Element

A Bridge to other JMS Topic providers

#### Properties

Property Name

Type

Description

brokerService

_[org.apache.activemq.broker.BrokerService](xbean-xml-reference-41.html)_

One way to configure the local connection - this is called by The BrokerService when the Connector is embedded

inboundMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

inboundTopicBridges

(_[org.apache.activemq.network.jms.InboundTopicBridge](xbean-xml-reference-41.html)_)*

jndiLocalTemplate

_org.springframework.jndi.JndiTemplate_

jndiOutboundTemplate

_org.springframework.jndi.JndiTemplate_

localConnectionFactoryName

_java.lang.String_

localPassword

_java.lang.String_

localTopicConnection

_javax.jms.TopicConnection_

localTopicConnectionFactory

_javax.jms.TopicConnectionFactory_

localUsername

_java.lang.String_

name

_java.lang.String_

outboundMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

outboundPassword

_java.lang.String_

outboundTopicBridges

(_[org.apache.activemq.network.jms.OutboundTopicBridge](xbean-xml-reference-41.html)_)*

outboundTopicConnection

_javax.jms.TopicConnection_

outboundTopicConnectionFactory

_javax.jms.TopicConnectionFactory_

outboundTopicConnectionFactoryName

_java.lang.String_

outboundUsername

_java.lang.String_

replyToDestinationCacheSize

_int_

### The _[<journalPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

#### Properties

Property Name

Type

Description

journal

_org.apache.activeio.journal.Journal_

longTermPersistence

_[org.apache.activemq.store.PersistenceAdapter](xbean-xml-reference-41.html)_

maxCheckpointMessageAddSize

_int_

maxCheckpointWorkers

_int_

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<journaledJDBC>](xbean-xml-reference-41.html)_ Element

Creates a default persistence model using the Journal and JDBC

#### Properties

Property Name

Type

Description

adapter

_[org.apache.activemq.store.jdbc.JDBCAdapter](xbean-xml-reference-41.html)_

dataDirectory

_java.lang.String_

dataDirectoryFile

_java.io.File_

dataSource

_javax.sql.DataSource_

jdbcAdapter

_[org.apache.activemq.store.jdbc.JDBCPersistenceAdapter](xbean-xml-reference-41.html)_

journal

_org.apache.activeio.journal.Journal_

journalArchiveDirectory

_java.io.File_

journalLogFileSize

_int_

journalLogFiles

_int_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

useJournal

_boolean_

useQuickJournal

_boolean_

### The _[<kahaPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

dir

_java.io.File_

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<lastImageSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

### The _[<loggingBrokerPlugin>](xbean-xml-reference-41.html)_ Element

A simple Broker interceptor which allows you to enable/disable logging.

#### Properties

Property Name

Type

Description

ackLog

_org.apache.commons.logging.Log_

adminConnectionContext

_org.apache.activemq.broker.ConnectionContext_

log

_org.apache.commons.logging.Log_

next

_org.apache.activemq.broker.Broker_

sendLog

_org.apache.commons.logging.Log_

### The _[<managementContext>](xbean-xml-reference-41.html)_ Element

A Flow provides different dispatch policies within the NMR

#### Properties

Property Name

Type

Description

MBeanServer

_javax.management.MBeanServer_

Get the MBeanServer

connectorPath

_java.lang.String_

connectorPort

_int_

createConnector

_boolean_

createMBeanServer

_boolean_

findTigerMbeanServer

_boolean_

Enables/disables the searching for the Java 5 platform MBeanServer

jmxDomainName

_java.lang.String_

server

_javax.management.MBeanServer_

useMBeanServer

_boolean_

### The _[<memoryPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<multicastNetworkConnector>](xbean-xml-reference-41.html)_ Element

A network connector which uses some kind of multicast-like transport that communicates with potentially many remote brokers over a single logical {@link Transport} instance such as when using multicast. This implementation does not depend on multicast at all; any other group based transport could be used.

#### Properties

Property Name

Type

Description

bridge

_[org.apache.activemq.network.DemandForwardingBridgeSupport](xbean-xml-reference-41.html)_

brokerName

_java.lang.String_

conduitSubscriptions

_boolean_

connectionFilter

_org.apache.activemq.network.ConnectionFilter_

decreaseNetworkConsumerPriority

_boolean_

dispatchAsync

_boolean_

durableDestinations

_java.util.Set_

dynamicOnly

_boolean_

dynamicallyIncludedDestinations

(_java.lang.Object_)*

excludedDestinations

(_java.lang.Object_)*

localTransport

_org.apache.activemq.transport.Transport_

localUri

_java.net.URI_

name

_java.lang.String_

networkTTL

_int_

password

_java.lang.String_

prefetchSize

_int_

remoteTransport

_org.apache.activemq.transport.Transport_

Sets the remote transport implementation

remoteURI

_java.net.URI_

Sets the remote transport URI to some group transport like `multicast://address:port`

staticallyIncludedDestinations

(_java.lang.Object_)*

userName

_java.lang.String_

### The _[<networkConnector>](xbean-xml-reference-41.html)_ Element

A network connector which uses a discovery agent to detect the remote brokers available and setup a connection to each available remote broker

#### Properties

Property Name

Type

Description

brokerName

_java.lang.String_

conduitSubscriptions

_boolean_

connectionFilter

_org.apache.activemq.network.ConnectionFilter_

decreaseNetworkConsumerPriority

_boolean_

discoveryAgent

_org.apache.activemq.transport.discovery.DiscoveryAgent_

discoveryURI

_java.net.URI_

dispatchAsync

_boolean_

durableDestinations

_java.util.Set_

dynamicOnly

_boolean_

dynamicallyIncludedDestinations

(_java.lang.Object_)*

excludedDestinations

(_java.lang.Object_)*

failover

_boolean_

localUri

_java.net.URI_

name

_java.lang.String_

networkTTL

_int_

password

_java.lang.String_

prefetchSize

_int_

staticallyIncludedDestinations

(_java.lang.Object_)*

uri

_java.net.URI_

userName

_java.lang.String_

### The _[<noSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This is the default Topic recovery policy which does not recover any messages.

### The _[<oldestMessageEvictionStrategy>](xbean-xml-reference-41.html)_ Element

An eviction strategy which evicts the oldest message first (which is the default).

#### Properties

Property Name

Type

Description

evictExpiredMessagesHighWatermark

_int_

Sets the high water mark on which we will eagerly evict expired messages from RAM

### The _[<oldestMessageWithLowestPriorityEvictionStrategy>](xbean-xml-reference-41.html)_ Element

An eviction strategy which evicts the oldest message with the lowest priority first.

#### Properties

Property Name

Type

Description

evictExpiredMessagesHighWatermark

_int_

Sets the high water mark on which we will eagerly evict expired messages from RAM

### The _[<oracleJDBCAdapter>](xbean-xml-reference-41.html)_ Element

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

Subclassing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<outboundQueueBridge>](xbean-xml-reference-41.html)_ Element

Create an Outbound Queue Bridge

#### Properties

Property Name

Type

Description

consumer

_javax.jms.MessageConsumer_

consumerConnection

_javax.jms.QueueConnection_

consumerQueue

_[javax.jms.Queue](xbean-xml-reference-41.html)_

doHandleReplyTo

_boolean_

jmsConnector

_[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_

jmsMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

outboundQueueName

_java.lang.String_

producerConnection

_javax.jms.QueueConnection_

producerQueue

_[javax.jms.Queue](xbean-xml-reference-41.html)_

selector

_java.lang.String_

### The _[<outboundTopicBridge>](xbean-xml-reference-41.html)_ Element

Create an Outbound Topic Bridge

#### Properties

Property Name

Type

Description

consumer

_javax.jms.MessageConsumer_

consumerConnection

_javax.jms.TopicConnection_

consumerName

_java.lang.String_

consumerTopic

_[javax.jms.Topic](xbean-xml-reference-41.html)_

doHandleReplyTo

_boolean_

jmsConnector

_[org.apache.activemq.network.jms.JmsConnector](xbean-xml-reference-41.html)_

jmsMessageConvertor

_[org.apache.activemq.network.jms.JmsMesageConvertor](xbean-xml-reference-41.html)_

outboundTopicName

_java.lang.String_

producerConnection

_javax.jms.TopicConnection_

producerTopic

_[javax.jms.Topic](xbean-xml-reference-41.html)_

selector

_java.lang.String_

### The _[<policyEntry>](xbean-xml-reference-41.html)_ Element

Represents an entry in a {@link PolicyMap} for assigning policies to a specific destination or a hierarchical wildcard area of destinations.

#### Properties

Property Name

Type

Description

deadLetterStrategy

_[org.apache.activemq.broker.region.policy.DeadLetterStrategy](xbean-xml-reference-41.html)_

Sets the policy used to determine which dead letter queue destination should be used

destination

_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_

dispatchPolicy

_[org.apache.activemq.broker.region.policy.DispatchPolicy](xbean-xml-reference-41.html)_

memoryLimit

_long_

messageEvictionStrategy

_[org.apache.activemq.broker.region.policy.MessageEvictionStrategy](xbean-xml-reference-41.html)_

Sets the eviction strategy used to decide which message to evict when the slow consumer needs to discard messages

messageGroupHashBucketCount

_int_

Sets the number of hash buckets to use for the message group functionality. This is only applicable to using message groups to parallelize processing of a queue while preserving order across an individual JMSXGroupID header value. This value sets the number of hash buckets that will be used (i.e. the maximum possible concurrency).

pendingMessageLimitStrategy

_[org.apache.activemq.broker.region.policy.PendingMessageLimitStrategy](xbean-xml-reference-41.html)_

Sets the strategy to calculate the maximum number of messages that are allowed to be pending on consumers (in addition to their prefetch sizes). Once the limit is reached, non-durable topics can then start discarding old messages. This allows us to keep dispatching messages to slow consumers while not blocking fast consumers and discarding the messages oldest first.

queue

_java.lang.String_

A helper method to set the destination from a configuration file

sendAdvisoryIfNoConsumers

_boolean_

Sends an advisory message if a non-persistent message is sent and there are no active consumers

subscriptionRecoveryPolicy

_[org.apache.activemq.broker.region.policy.SubscriptionRecoveryPolicy](xbean-xml-reference-41.html)_

topic

_java.lang.String_

A helper method to set the destination from a configuration file

### The _[<policyMap>](xbean-xml-reference-41.html)_ Element

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies.

#### Properties

Property Name

Type

Description

defaultEntry

_[org.apache.activemq.broker.region.policy.PolicyEntry](xbean-xml-reference-41.html)_

entries

(_java.lang.Object_)*

A helper method to allow the destination map to be populated from a dependency injection framework such as Spring

policyEntries

(_java.lang.Object_)*

Sets the individual entries on the policy map

### The _[<prefetchRatePendingMessageLimitStrategy>](xbean-xml-reference-41.html)_ Element

This PendingMessageLimitStrategy sets the maximum pending message limit value to be a multiplier of the prefetch limit of the subscription.

#### Properties

Property Name

Type

Description

multiplier

_double_

Sets the multiplier of the prefetch size which will be used to define the maximum number of pending messages for non-durable topics before messages are discarded.

### The _[<proxyConnector>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

bind

_java.net.URI_

localUri

_java.net.URI_

name

_java.lang.String_

remote

_java.net.URI_

server

_org.apache.activemq.transport.TransportServer_

### The _[<queryBasedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This implementation of {@link SubscriptionRecoveryPolicy} will perform a user specific query mechanism to load any messages they may have missed.

#### Properties

Property Name

Type

Description

query

_org.apache.activemq.broker.region.policy.MessageQuery_

Sets the query strategy to load initial messages

### The _[<queue>](xbean-xml-reference-41.html)_ Element

An ActiveMQ Queue Destination

#### Properties

Property Name

Type

Description

compositeDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

name

_java.lang.String_

physicalName

_java.lang.String_

properties

_java.util.Properties_

Get the properties from this instance for storing in JNDI

### The _[<quickJournalPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

#### Properties

Property Name

Type

Description

journal

_org.apache.activeio.journal.Journal_

longTermPersistence

_[org.apache.activemq.store.PersistenceAdapter](xbean-xml-reference-41.html)_

maxCheckpointMessageAddSize

_int_

maxCheckpointWorkers

_int_

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<rapidPersistenceAdapter>](xbean-xml-reference-41.html)_ Element

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

#### Properties

Property Name

Type

Description

journal

_org.apache.activeio.journal.Journal_

maxCheckpointMessageAddSize

_int_

maxCheckpointWorkers

_int_

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

usageManager

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<roundRobinDispatchPolicy>](xbean-xml-reference-41.html)_ Element

Simple dispatch policy that sends a message to every subscription that matches the message.

### The _[<sharedDeadLetterStrategy>](xbean-xml-reference-41.html)_ Element

A default implementation of {@link DeadLetterStrategy} which uses a constant destination.

#### Properties

Property Name

Type

Description

deadLetterQueue

_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_

### The _[<simpleAuthenticationPlugin>](xbean-xml-reference-41.html)_ Element

Provides a simple authentication plugin configured with a map of user-passwords and a map of user-groups

#### Properties

Property Name

Type

Description

userGroups

_java.util.Map_

Sets the groups a user is in. The key is the user name and the value is a Set of groups

userPasswords

_java.util.Map_

Sets the map indexed by user name with the value the password

### The _[<simpleAuthorizationMap>](xbean-xml-reference-41.html)_ Element

An AuthorizationMap which is configured with individual DestinationMaps for each operation.

#### Properties

Property Name

Type

Description

adminACLs

_[org.apache.activemq.filter.DestinationMap](xbean-xml-reference-41.html)_

readACLs

_[org.apache.activemq.filter.DestinationMap](xbean-xml-reference-41.html)_

writeACLs

_[org.apache.activemq.filter.DestinationMap](xbean-xml-reference-41.html)_

### The _[<simpleDispatchPolicy>](xbean-xml-reference-41.html)_ Element

Simple dispatch policy that sends a message to every subscription that matches the message.

### The _[<simpleJmsMessageConvertor>](xbean-xml-reference-41.html)_ Element

Converts Message from one JMS to another

#### Properties

Property Name

Type

Description

connection

_javax.jms.Connection_

### The _[<statements>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

addMessageStatement

_java.lang.String_

binaryDataType

_java.lang.String_

containerNameDataType

_java.lang.String_

createDurableSubStatement

_java.lang.String_

createSchemaStatements

(_java.lang.String_)*

deleteOldMessagesStatement

_java.lang.String_

deleteSubscriptionStatement

_java.lang.String_

dropSchemaStatements

(_java.lang.String_)*

durableSubAcksTableName

_java.lang.String_

findAllDestinationsStatement

_java.lang.String_

findAllDurableSubMessagesStatement

_java.lang.String_

findAllDurableSubsStatement

_java.lang.String_

findAllMessagesStatement

_java.lang.String_

findDurableSubStatement

_java.lang.String_

findLastSequenceIdInAcksStatement

_java.lang.String_

findLastSequenceIdInMsgsStatement

_java.lang.String_

findMessageSequenceIdStatement

_java.lang.String_

findMessageStatement

_java.lang.String_

lockCreateStatement

_java.lang.String_

lockTableName

_java.lang.String_

lockUpdateStatement

_java.lang.String_

longDataType

_java.lang.String_

messageTableName

_java.lang.String_

msgIdDataType

_java.lang.String_

removeAllMessagesStatement

_java.lang.String_

removeAllSubscriptionsStatement

_java.lang.String_

removeMessageStatment

_java.lang.String_

sequenceDataType

_java.lang.String_

stringIdDataType

_java.lang.String_

tablePrefix

_java.lang.String_

updateLastAckOfDurableSubStatement

_java.lang.String_

updateMessageStatement

_java.lang.String_

useExternalMessageReferences

_boolean_

useLockCreateWhereClause

_boolean_

### The _[<streamJDBCAdapter>](xbean-xml-reference-41.html)_ Element

This JDBCAdapter inserts and extracts BLOB data using the setBinaryStream()/getBinaryStream() operations. The databases/JDBC drivers that use this adapter are:

*   Axion

#### Properties

Property Name

Type

Description

batchStatments

_boolean_

statements

_[org.apache.activemq.store.jdbc.Statements](xbean-xml-reference-41.html)_

useExternalMessageReferences

_boolean_

### The _[<strictOrderDispatchPolicy>](xbean-xml-reference-41.html)_ Element

Dispatch policy that causes every subscription to see messages in the same order.

### The _[<timedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_ Element

This implementation of {@link SubscriptionRecoveryPolicy} will keep a timed buffer of messages around in memory and use that to recover new subscriptions.

#### Properties

Property Name

Type

Description

recoverDuration

_long_

### The _[<topic>](xbean-xml-reference-41.html)_ Element

An ActiveMQ Topic Destination

#### Properties

Property Name

Type

Description

compositeDestinations

(_[org.apache.activemq.command.ActiveMQDestination](xbean-xml-reference-41.html)_)*

name

_java.lang.String_

physicalName

_java.lang.String_

properties

_java.util.Properties_

Get the properties from this instance for storing in JNDI

### The _[<transportConnector>](xbean-xml-reference-41.html)_ Element

#### Properties

Property Name

Type

Description

broker

_org.apache.activemq.broker.Broker_

brokerInfo

_org.apache.activemq.command.BrokerInfo_

brokerName

_java.lang.String_

connectUri

_java.net.URI_

disableAsyncDispatch

_boolean_

discoveryAgent

_org.apache.activemq.transport.discovery.DiscoveryAgent_

discoveryUri

_java.net.URI_

messageAuthorizationPolicy

_org.apache.activemq.security.MessageAuthorizationPolicy_

Sets the policy used to decide if the current connection is authorized to consume a given message

name

_java.lang.String_

server

_org.apache.activemq.transport.TransportServer_

taskRunnerFactory

_org.apache.activemq.thread.TaskRunnerFactory_

uri

_java.net.URI_

Sets the server transport URI to use if there is not a {@link TransportServer} configured via the {@link #setServer(TransportServer)} method. This value is used to lazy create a {@link TransportServer} instance

### The _[<usageManager>](xbean-xml-reference-41.html)_ Element

Used to keep track of how much of something is being used so that a productive working set usage can be controlled. Main use case is manage memory usage.

#### Properties

Property Name

Type

Description

limit

_long_

Sets the memory limit in bytes

limitKb

_long_

Sets the memory limit in kilobytes

limitMb

_long_

Sets the memory limit in megabytes

parent

_[org.apache.activemq.memory.UsageManager](xbean-xml-reference-41.html)_

percentUsage

_int_

percentUsageMinDelta

_int_

Sets the minimum number of percentage points the usage has to change before a UsageListener event is fired by the manager.

### The _[<virtualDestinationInterceptor>](xbean-xml-reference-41.html)_ Element

Implements [Virtual Topics](http://incubator.apache.org/activemq/virtual-destinations.html).

#### Properties

Property Name

Type

Description

virtualDestinations

(_[org.apache.activemq.broker.region.virtual.VirtualDestination](xbean-xml-reference-41.html)_)*

### The _[<virtualTopic>](xbean-xml-reference-41.html)_ Element

Creates [Virtual Topics](http://activemq.org/site/virtual-destinations.html) using a prefix and postfix. The virtual destination creates a wildcard that is then used to look up all active queue subscriptions which match.

#### Properties

Property Name

Type

Description

name

_java.lang.String_

postfix

_java.lang.String_

Sets any postix used to identify the queue consumers

prefix

_java.lang.String_

Sets the prefix wildcard used to identify the queue consumers for a given topic

### Element Index

_[<authorizationEntry>](xbean-xml-reference-41.html)_

Represents an entry in a {@link DefaultAuthorizationMap} for assigning different operations (read, write, admin) of user roles to a specific destination or a hierarchical wildcard area of destinations.

_[<authorizationMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies. Each entry in the map represents the authorization ACLs for each operation.

_[<authorizationPlugin>](xbean-xml-reference-41.html)_

An authorization plugin where each operation on a destination is checked against an authorizationMap

_[<axionJDBCAdapter>](xbean-xml-reference-41.html)_

Axion specific Adapter. Axion does not seem to support ALTER statements or sub-selects. This means: - We cannot auto upgrade the schema was we roll out new versions of ActiveMQ - We cannot delete durable sub messages that have be acknowledged by all consumers.

_[<blobJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the getBlob()/setBlob() operations. This is a little more involved since to insert a blob you have to: 1: insert empty blob. 2: select the blob 3: finally update the blob with data value. The databases/JDBC drivers that use this adapter are:

_[<broker>](xbean-xml-reference-41.html)_

An ActiveMQ Message Broker which consists of a number of transport connectors, network connectors and a persistence adaptor

_[<bytesJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the setBytes()/getBytes() operations. The databases/JDBC drivers that use this adapter are:

_[<compositeDemandForwardingBridge>](xbean-xml-reference-41.html)_

A demand forwarding bridge which works with multicast style transports where a single Transport could be communicating with multiple remote brokers

_[<compositeQueue>](xbean-xml-reference-41.html)_

Represents a virtual queue which forwards to a number of other destinations.

_[<compositeTopic>](xbean-xml-reference-41.html)_

Represents a virtual topic which forwards to a number of other destinations.

_[<connectionDotFilePlugin>](xbean-xml-reference-41.html)_

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current connections

_[<constantPendingMessageLimitStrategy>](xbean-xml-reference-41.html)_

This PendingMessageLimitStrategy is configured to a constant value for all subscriptions.

_[<db2JDBCAdapter>](xbean-xml-reference-41.html)_

_[<defaultJDBCAdapter>](xbean-xml-reference-41.html)_

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

sub-classing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

_[<demandForwardingBridge>](xbean-xml-reference-41.html)_

Forwards messages from the local broker to the remote broker based on demand.

_[<destinationDotFilePlugin>](xbean-xml-reference-41.html)_

A [DOT](http://www.graphviz.org/) file creator plugin which creates a DOT file showing the current topic & queue hierarchies.

_[<destinationEntry>](xbean-xml-reference-41.html)_

A default entry in a DestinationMap which holds a single value.

_[<fixedCountSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

_[<fixedSizedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will keep a fixed amount of memory available in RAM for message history which is evicted in time order.

_[<forwardingBridge>](xbean-xml-reference-41.html)_

Forwards all messages from the local broker to the remote broker.

_[<imageBasedJDBCAdaptor>](xbean-xml-reference-41.html)_

Provides JDBCAdapter since that uses IMAGE datatype to hold binary data. The databases/JDBC drivers that use this adapter are:

*   Sybase
*   MS SQL

_[<inboundQueueBridge>](xbean-xml-reference-41.html)_

Create an Inbound Queue Bridge

_[<inboundTopicBridge>](xbean-xml-reference-41.html)_

Create an Inbound Topic Bridge

_[<individualDeadLetterStrategy>](xbean-xml-reference-41.html)_

A {@link DeadLetterStrategy} where each destination has its own individual DLQ using the subject naming hierarchy.

_[<informixJDBCAdapter>](xbean-xml-reference-41.html)_

JDBC Adapter for Informix database. Because Informix database restricts length of composite primary keys, length of _container name_ field and _subscription id_ field must be reduced to 150 characters. Therefore be sure not to use longer names for container name and subscription id than 150 characters.

_[<jaasAuthenticationPlugin>](xbean-xml-reference-41.html)_

Provides a JAAS based authentication plugin

_[<jdbcPersistenceAdapter>](xbean-xml-reference-41.html)_

A {@link PersistenceAdapter} implementation using JDBC for persistence storage. This persistence adapter will correctly remember prepared XA transactions, but it will not keep track of local transaction commits so that operations performed against the Message store are done as a single uow.

_[<jmsQueueConnector>](xbean-xml-reference-41.html)_

A Bridge to other JMS Queue providers

_[<jmsTopicConnector>](xbean-xml-reference-41.html)_

A Bridge to other JMS Topic providers

_[<journalPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

_[<journaledJDBC>](xbean-xml-reference-41.html)_

Creates a default persistence model using the Journal and JDBC

_[<kahaPersistenceAdapter>](xbean-xml-reference-41.html)_

_[<lastImageSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

_[<loggingBrokerPlugin>](xbean-xml-reference-41.html)_

A simple Broker interceptor which allows you to enable/disable logging.

_[<managementContext>](xbean-xml-reference-41.html)_

A Flow provides different dispatch policies within the NMR

_[<memoryPersistenceAdapter>](xbean-xml-reference-41.html)_

_[<multicastNetworkConnector>](xbean-xml-reference-41.html)_

A network connector which uses some kind of multicast-like transport that communicates with potentially many remote brokers over a single logical {@link Transport} instance such as when using multicast. This implementation does not depend on multicast at all; any other group based transport could be used.

_[<networkConnector>](xbean-xml-reference-41.html)_

A network connector which uses a discovery agent to detect the remote brokers available and setup a connection to each available remote broker

_[<noSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This is the default Topic recovery policy which does not recover any messages.

_[<oldestMessageEvictionStrategy>](xbean-xml-reference-41.html)_

An eviction strategy which evicts the oldest message first (which is the default).

_[<oldestMessageWithLowestPriorityEvictionStrategy>](xbean-xml-reference-41.html)_

An eviction strategy which evicts the oldest message with the lowest priority first.

_[<oracleJDBCAdapter>](xbean-xml-reference-41.html)_

Implements all the default JDBC operations that are used by the JDBCPersistenceAdapter.

Subclassing is encouraged to override the default implementation of methods to account for differences in JDBC Driver implementations.

The JDBCAdapter inserts and extracts BLOB data using the getBytes()/setBytes() operations.

The databases/JDBC drivers that use this adapter are:

_[<outboundQueueBridge>](xbean-xml-reference-41.html)_

Create an Outbound Queue Bridge

_[<outboundTopicBridge>](xbean-xml-reference-41.html)_

Create an Outbound Topic Bridge

_[<policyEntry>](xbean-xml-reference-41.html)_

Represents an entry in a {@link PolicyMap} for assigning policies to a specific destination or a hierarchical wildcard area of destinations.

_[<policyMap>](xbean-xml-reference-41.html)_

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies.

_[<prefetchRatePendingMessageLimitStrategy>](xbean-xml-reference-41.html)_

This PendingMessageLimitStrategy sets the maximum pending message limit value to be a multiplier of the prefetch limit of the subscription.

_[<proxyConnector>](xbean-xml-reference-41.html)_

_[<queryBasedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will perform a user specific query mechanism to load any messages they may have missed.

_[<queue>](xbean-xml-reference-41.html)_

An ActiveMQ Queue Destination

_[<quickJournalPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

_[<rapidPersistenceAdapter>](xbean-xml-reference-41.html)_

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

_[<roundRobinDispatchPolicy>](xbean-xml-reference-41.html)_

Simple dispatch policy that sends a message to every subscription that matches the message.

_[<sharedDeadLetterStrategy>](xbean-xml-reference-41.html)_

A default implementation of {@link DeadLetterStrategy} which uses a constant destination.

_[<simpleAuthenticationPlugin>](xbean-xml-reference-41.html)_

Provides a simple authentication plugin configured with a map of user-passwords and a map of user-groups

_[<simpleAuthorizationMap>](xbean-xml-reference-41.html)_

An AuthorizationMap which is configured with individual DestinationMaps for each operation.

_[<simpleDispatchPolicy>](xbean-xml-reference-41.html)_

Simple dispatch policy that sends a message to every subscription that matches the message.

_[<simpleJmsMessageConvertor>](xbean-xml-reference-41.html)_

Converts Message from one JMS to another

_[<statements>](xbean-xml-reference-41.html)_

_[<streamJDBCAdapter>](xbean-xml-reference-41.html)_

This JDBCAdapter inserts and extracts BLOB data using the setBinaryStream()/getBinaryStream() operations. The databases/JDBC drivers that use this adapter are:

*   Axion

_[<strictOrderDispatchPolicy>](xbean-xml-reference-41.html)_

Dispatch policy that causes every subscription to see messages in the same order.

_[<timedSubscriptionRecoveryPolicy>](xbean-xml-reference-41.html)_

This implementation of {@link SubscriptionRecoveryPolicy} will keep a timed buffer of messages around in memory and use that to recover new subscriptions.

_[<topic>](xbean-xml-reference-41.html)_

An ActiveMQ Topic Destination

_[<transportConnector>](xbean-xml-reference-41.html)_

_[<usageManager>](xbean-xml-reference-41.html)_

Used to keep track of how much of something is being used so that a productive working set usage can be controlled. Main use case is manage memory usage.

_[<virtualDestinationInterceptor>](xbean-xml-reference-41.html)_

Implements [Virtual Topics](http://incubator.apache.org/activemq/virtual-destinations.html).

_[<virtualTopic>](xbean-xml-reference-41.html)_

Creates [Virtual Topics](http://activemq.org/site/virtual-destinations.html) using a prefix and postfix. The virtual destination creates a wildcard that is then used to look up all active queue subscriptions which match.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36039))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();