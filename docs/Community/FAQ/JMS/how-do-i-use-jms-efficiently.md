Apache ActiveMQ ™ -- How do I use JMS efficiently 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [JMS](Community/FAQCommunity/FAQ/Community/FAQ/jms.md) > [How do I use JMS efficiently](Community/FAQ/JMSCommunity/FAQ/JMS/Community/FAQ/JMS/how-do-i-use-jms-efficiently.md)


How do I use JMS efficiently?
-----------------------------

JMS is designed for high performance. In particular its design is such that you are meant to create a number of objects up front on the startup of your application and then resuse them throughout your application. e.g. its a good idea to create upfront and then reuse the following

*   Connection
*   Session
*   MessageProducer
*   MessageConsumer

The reason is that each create & destroy of the above objects typically requires an individual request & response with the JMS broker to ensure it worked. e.g. creating a connection, session, producer, then sending a message, then closing everything down again - could result in 7 request-responses with the server!

Note a little trick - you can reuse the same MessageProducer for sending messages to different destinations; just create it with a null destination and specify it on the send method.

MessageProducer instances that are created with a null destination are anonymous producers and as such the broker cannot fire an advisory for producer when these are created. This means that when the pooled MessageProducer is in use no advisories for producers will ever be sent.

### Using Pooling with JMS

To use JMS efficiently we recommend you use [Camel](http://activemq.apache.org/camel/) to hide the JMS API and [bind the messaging to your beans](http://activemq.apache.org/camel/bean-integration.html).

Alternatively try using Spring's [MessageListenerContainer](http://static.springsource.org/spring/docs/2.5.x/referenceCommunity/FAQCommunity/FAQ/Community/FAQ/jms.md#Community/FAQ/jms.mdp) for consuming messages and [JmsTemplate](http://static.springsource.org/spring/docs/2.5.x/referenceCommunity/FAQCommunity/FAQ/Community/FAQ/jms.md#jms-jmstemplate) for sending - but be [aware of the gotchas](http://activemq.apache.orgConnectivity/Containers/Spring SupportConnectivity/Containers/Spring Support/Connectivity/Containers/Spring Support/jmstemplate-gotchas.md)

### Other performance tips

Also see

*   [Should I use transactions](Community/FAQ/JMSCommunity/FAQ/JMS/Community/FAQ/JMS/should-i-use-transactions.md)
*   [Should I use XA](Community/FAQ/JMSCommunity/FAQ/JMS/Community/FAQ/JMS/should-i-use-xa.md)

### Java Connector Architecture

[Java Connector Architecture](http://java.sun.com/j2ee/connector/) supports the pooling of JMS connections, sessions and MessageListeners, parallel message processing, thread pooling and transaction & exception handling, through the use of a JCA [Resource Adapter](Connectivity/ContainersConnectivity/Containers/Connectivity/Containers/resource-adapter.md).

All of these benefits are also available through Spring's MessageListenerContiner **except** for the XA transactions. If you need XA support then you must use JCA

Typically JCA is used in a J2EE container via MDBs; though there is a POJO Spring based [JCA Container](Connectivity/Containers/jca-container.md) you can use, which is simple and lightweight and easy to embed inside Tomcat or any J2SE application.

