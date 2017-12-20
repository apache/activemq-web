Apache ActiveMQ ™ -- How do I configure automatic reconnection 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [Configuration](Community/FAQ/configuration.md) > [How do I configure automatic reconnection](Community/FAQ/Configuration/how-do-i-configure-automatic-reconnection.md)


If a JMS broker goes down, ActiveMQ can automatically reconnect to an available JMS broker using the **failover:** protocol. Not only does this automatically reconnect, it will also resume any temporary destinations, sessions, producers and most importantly consumers.

All of this happens silently inside the JMS client so you don't need to worry about it in your application code.

e.g. connecting to the URL

failover:tcp://host1:port1,tcp://host2:port2

For more detail see [Failover Transport Reference](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/failover-transport-reference.md)

