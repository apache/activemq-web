Apache ActiveMQ ™ -- How can I support auto reconnection 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [Using Apache ActiveMQ](Community/FAQCommunity/FAQ/Community/FAQ/using-apache-activemq.md) > [How can I support auto reconnection](Community/FAQ/Using Apache ActiveMQ/how-can-i-support-auto-reconnection.md)


How can I support auto reconnection?
------------------------------------

Networks are unreliable and sockets do get dropped from time to time (it could be a network glitch, dodgy router, firewall, or someone could even just restart a broker).

You often want a JMS client to automatically handle the fact that the connection to the broker was lost such that the JMS client either reconnnects to the same broker when it becomes available, or reconnects to another broker in the cluster.

Its easy to perform auto-reconnection. In Apache ActiveMQ using the [failover transport](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/failover-transport-reference.md) in which the JMS client (connection) will automatically reconnect to the broker if there is a socket exception.

Just use the following connection URI (setting the brokerURL in the ActiveMQConnectionFactory)

failover:tcp://host:port 

You can use a list of URIs to specify which machines to connect to and use discovery to find the brokers to connect to. More details on this see [Configuring Transports](Using ActiveMQ/configuring-transports.md)

