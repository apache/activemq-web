Schema for namespace: http://activemq.org/config/1.0   

Root Element
============

Element

Description

Class

[broker](#broker)

An ActiveMQ Message Broker which consists of a number of transport connectors, network connectors and a persistence adaptor

org.activemq.xbean.XBeanBrokerService

Element Summary
===============

Element

Description

Class

[broker](#broker)

An ActiveMQ Message Broker which consists of a number of transport connectors, network connectors and a persistence adaptor

org.activemq.xbean.XBeanBrokerService

[demandForwardingBridge](#demandForwardingBridge)

Forwards messages from the local broker to the remote broker based on demand.

org.activemq.network.DemandForwardingBridge

[fixedSizedSubscriptionRecoveryPolicy](#fixedSizedSubscriptionRecoveryPolicy)

This implementation of {@link SubscriptionRecoveryPolicy} will keep a fixed amount of memory available in RAM for message history which is evicted in time order.

org.activemq.broker.region.policy.FixedSizedSubscriptionRecoveryPolicy

[forwardingBridge](#forwardingBridge)

Forwards all messages from the local broker to the remote broker.

org.activemq.network.ForwardingBridge

[inboundQueueBridge](#inboundQueueBridge)

Create an Inbound Queue Bridge

org.activemq.network.jms.InboundQueueBridge

[inboundTopicBridge](#inboundTopicBridge)

Create an Inbound Topic Bridge

org.activemq.network.jms.InboundTopicBridge

[jdbcPersistenceAdapter](#jdbcPersistenceAdapter)

A {@link PersistenceAdapter} implementation using JDBC for persistence storage. This persistence adapter will correctly remember prepared XA transactions, but it will not keep track of local transaction commits so that operations performed against the Message store are done as a single uow.

org.activemq.store.jdbc.JDBCPersistenceAdapter

[jmsQueueConnector](#jmsQueueConnector)

A Bridge to other JMS Queue providers

org.activemq.network.jms.JmsQueueConnector

[jmsTopicConnector](#jmsTopicConnector)

A Bridge to other JMS Topic providers

org.activemq.network.jms.JmsTopicConnector

[journalPersistenceAdapter](#journalPersistenceAdapter)

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

org.activemq.store.journal.JournalPersistenceAdapter

[journaledJDBC](#journaledJDBC)

Creates a default persistence model using the Journal and JDBC

org.activemq.store.PersistenceAdapterFactoryBean

[lastImageSubscriptionRecoveryPolicy](#lastImageSubscriptionRecoveryPolicy)

This implementation of {@link SubscriptionRecoveryPolicy} will only keep the last message.

org.activemq.broker.region.policy.LastImageSubscriptionRecoveryPolicy

[managementContext](#managementContext)

A Flow provides different dispatch policies within the NMR

org.activemq.broker.jmx.ManagementContext

[memoryPersistenceAdapter](#memoryPersistenceAdapter)

org.activemq.store.memory.MemoryPersistenceAdapter

[networkConnector](#networkConnector)

org.activemq.network.NetworkConnector

[noSubscriptionRecoveryPolicy](#noSubscriptionRecoveryPolicy)

This is the default Topic recovery policy which does not recover any messages.

org.activemq.broker.region.policy.NoSubscriptionRecoveryPolicy

[outboundQueueBridge](#outboundQueueBridge)

Create an Outbound Queue Bridge

org.activemq.network.jms.OutboundQueueBridge

[outboundTopicBridge](#outboundTopicBridge)

Create an Outbound Topic Bridge

org.activemq.network.jms.OutboundTopicBridge

[policyEntry](#policyEntry)

Represents an entry in a {@link PolicyMap} for assigning policies to a specific destination or a hierarchial wildcard area of destinations.

org.activemq.broker.region.policy.PolicyEntry

[policyMap](#policyMap)

Represents a destination based configuration of policies so that individual destinations or wildcard hierarchies of destinations can be configured using different policies.

org.activemq.broker.region.policy.PolicyMap

[proxyConnector](#proxyConnector)

org.activemq.proxy.ProxyConnector

[quickJournalPersistenceAdapter](#quickJournalPersistenceAdapter)

An implementation of {@link PersistenceAdapter} designed for use with a {@link Journal} and then check pointing asynchronously on a timeout with some other long term persistent storage.

org.activemq.store.journal.QuickJournalPersistenceAdapter

[roundRobinDispatchPolicy](#roundRobinDispatchPolicy)

Simple dispatch policy that sends a message to every subscription that matches the message.

org.activemq.broker.region.policy.RoundRobinDispatchPolicy

[simpleDispatchPolicy](#simpleDispatchPolicy)

Simple dispatch policy that sends a message to every subscription that matches the message.

org.activemq.broker.region.policy.SimpleDispatchPolicy

[simpleJmsMessageConvertor](#simpleJmsMessageConvertor)

Converts Message from one JMS to another

org.activemq.network.jms.SimpleJmsMessageConvertor

[strictOrderDispatchPolicy](#strictOrderDispatchPolicy)

Dispatch policy that causes every subscription to see messages in the same order.

org.activemq.broker.region.policy.StrictOrderDispatchPolicy

[timedSubscriptionRecoveryPolicy](#timedSubscriptionRecoveryPolicy)

This implementation of {@link SubscriptionRecoveryPolicy} will keep a timed buffer of messages around in memory and use that to recover new subscriptions.

org.activemq.broker.region.policy.TimedSubscriptionRecoveryPolicy

[transportConnector](#transportConnector)

org.activemq.broker.TransportConnector

[usageManager](#usageManager)

Used to keep track of how much of something is being used so that a productive working set usage can be controlled. Main use case is manage memory usage.

org.activemq.memory.UsageManager

Element Detail
==============

Element: broker
---------------

Attribute

Type

Description

start

xs:boolean

Element

Type

Description

abstractApplicationContext

<spring:bean/>

Element: demandForwardingBridge
-------------------------------

Attribute

Type

Description

clientId

xs:string

destinationFilter

xs:string

dispatchAsync

xs:boolean

prefetchSize

xs:integer

Element

Type

Description

localBroker

<spring:bean/>

remoteBroker

<spring:bean/>

Element: fixedSizedSubscriptionRecoveryPolicy
---------------------------------------------

Attribute

Type

Description

maximumSize

xs:integer

Sets the maximum amount of RAM in bytes that this buffer can hold in RAM

useSharedBuffer

xs:boolean

Element

Type

Description

buffer

<spring:bean/>

Element: forwardingBridge
-------------------------

Attribute

Type

Description

clientId

xs:string

destinationFilter

xs:string

dispatchAsync

xs:boolean

prefetchSize

xs:integer

Element

Type

Description

localBroker

<spring:bean/>

remoteBroker

<spring:bean/>

Element: inboundQueueBridge
---------------------------

Attribute

Type

Description

inboundQueueName

xs:string

Element: inboundTopicBridge
---------------------------

Attribute

Type

Description

inboundTopicName

xs:string

Element: jdbcPersistenceAdapter
-------------------------------

Attribute

Type

Description

adapterClass

xs:string

cleanupPeriod

xs:integer

useExternalMessageReferences

xs:boolean

Element

Type

Description

adapter

<spring:bean/>

dataSource

<spring:bean/>

ds

<spring:bean/>

scheduledThreadPoolExecutor

<spring:bean/>

wireFormat

<spring:bean/>

Element: jmsQueueConnector
--------------------------

Attribute

Type

Description

localConnectionFactoryName

xs:string

localPassword

xs:string

localUsername

xs:string

outboundPassword

xs:string

outboundQueueConnectionFactoryName

xs:string

outboundUsername

xs:string

replyToDestinationCacheSize

xs:integer

Element

Type

Description

inboundQueueBridges

([inboundQueueBridge](#inboundQueueBridge))*

localQueueConnection

<spring:bean/>

localQueueConnectionFactory

<spring:bean/>

outboundQueueBridges

([outboundQueueBridge](#outboundQueueBridge))*

outboundQueueConnection

<spring:bean/>

outboundQueueConnectionFactory

<spring:bean/>

Element: jmsTopicConnector
--------------------------

Attribute

Type

Description

localConnectionFactoryName

xs:string

localPassword

xs:string

localUsername

xs:string

outboundPassword

xs:string

outboundTopicConnectionFactoryName

xs:string

outboundUsername

xs:string

replyToDestinationCacheSize

xs:integer

Element

Type

Description

inboundTopicBridges

([inboundTopicBridge](#inboundTopicBridge))*

localTopicConnection

<spring:bean/>

localTopicConnectionFactory

<spring:bean/>

outboundTopicBridges

([outboundTopicBridge](#outboundTopicBridge))*

outboundTopicConnection

<spring:bean/>

outboundTopicConnectionFactory

<spring:bean/>

Element: journalPersistenceAdapter
----------------------------------

Attribute

Type

Description

maxCheckpointMessageAddSize

xs:integer

maxCheckpointWorkers

xs:integer

useExternalMessageReferences

xs:boolean

Element

Type

Description

journal

<spring:bean/>

longTermPersistence

<spring:bean/>

memManager

[usageManager](#usageManager)

taskRunnerFactory

<spring:bean/>

Element: journaledJDBC
----------------------

Element: lastImageSubscriptionRecoveryPolicy
--------------------------------------------

Element: managementContext
--------------------------

Attribute

Type

Description

connectorPath

xs:string

connectorPort

xs:integer

createConnector

xs:boolean

createMBeanServer

xs:boolean

jmxDomainName

xs:string

useMBeanServer

xs:boolean

Element

Type

Description

server

<spring:bean/>

Element: memoryPersistenceAdapter
---------------------------------

Attribute

Type

Description

useExternalMessageReferences

xs:boolean

Element: networkConnector
-------------------------

Attribute

Type

Description

brokerName

xs:string

localURI

xsd:string

localUri

xsd:string

uri

xsd:string

Element

Type

Description

discoveryAgent

<spring:bean/>

Element: noSubscriptionRecoveryPolicy
-------------------------------------

Element: outboundQueueBridge
----------------------------

Attribute

Type

Description

outboundQueueName

xs:string

Element: outboundTopicBridge
----------------------------

Attribute

Type

Description

outboundTopicName

xs:string

Element: policyEntry
--------------------

Element

Type

Description

dispatchPolicy

<spring:bean/>

redeliveryPolicy

<spring:bean/>

subscriptionRecoveryPolicy

<spring:bean/>

Element: policyMap
------------------

Element

Type

Description

defaultEntry

[policyEntry](#policyEntry)

policyEntries

(<spring:bean/>)*

Sets the individual entries on the policy map

Element: proxyConnector
-----------------------

Attribute

Type

Description

bind

xsd:string

localUri

xsd:string

remote

xsd:string

Element

Type

Description

server

<spring:bean/>

Element: quickJournalPersistenceAdapter
---------------------------------------

Attribute

Type

Description

maxCheckpointMessageAddSize

xs:integer

maxCheckpointWorkers

xs:integer

useExternalMessageReferences

xs:boolean

Element

Type

Description

journal

<spring:bean/>

longTermPersistence

<spring:bean/>

memManager

[usageManager](#usageManager)

taskRunnerFactory

<spring:bean/>

Element: roundRobinDispatchPolicy
---------------------------------

Element: simpleDispatchPolicy
-----------------------------

Element: simpleJmsMessageConvertor
----------------------------------

Element: strictOrderDispatchPolicy
----------------------------------

Element: timedSubscriptionRecoveryPolicy
----------------------------------------

Attribute

Type

Description

recoverDuration

xs:long

Element: transportConnector
---------------------------

Attribute

Type

Description

brokerName

xs:string

uri

xsd:string

Sets the server transport URI to use if there is not a {@link TransportServer} configured via the {@link #setServer(TransportServer)} method. This value is used to lazy create a {@link TransportServer} instance

Element

Type

Description

broker

<spring:bean/>

brokerInfo

<spring:bean/>

server

<spring:bean/>

taskRunnerFactory

<spring:bean/>

Element: usageManager
---------------------

Attribute

Type

Description

limit

xs:long

percentUsage

xs:integer

percentUsageMinDelta

xs:integer

Sets the minimum number of percentage points the usage has to change before a UsageListener event is fired by the manager.

Element

Type

Description

parent

[usageManager](#usageManager)