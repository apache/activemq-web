Apache ActiveMQ ™ -- How does ActiveMQ compare to JBossMQ 

[Community](community.html) > [FAQ](faq.html) > [General](general.html) > [How does ActiveMQ compare to JBossMQ](how-does-activemq-compare-to-jbossmq.html)


There are some similarities between the two; they both support JMS 1.1 and run inside [JBoss 4.x](jboss-integration.html).

However ActiveMQ does offer some specific differences and advantages (at least from our perspective)

*   ActiveMQ works great in any JVM not just inside the JBoss application server
*   ActiveMQ comes complete with a large number of [Cross Language Clients](cross-language-clients.html)
*   ActiveMQ supports many different [Protocols](protocols.html) such as [Ajax](ajax.html), [REST](rest.html), [Stomp](stomp.html), [OpenWire](openwire.html), [XMPP](xmpp.html)
*   ActiveMQ supports a large number of advanced features like [Message Groups](message-groups.html), [Exclusive Consumer](exclusive-consumer.html), [Composite Destinations](composite-destinations.html), [Advisory Message](advisory-message.html) support
*   ActiveMQ supports reliable connections with [configurable](configuring-transports.html) automatic reconnection
*   ActiveMQ has great [Spring Support](spring-support.html)
*   ActiveMQ supports distributed destinations across networks
*   ActiveMQ is very fast; often 10x faster than JBossMQ.

Performance guides
------------------

If you're not convinced by performance reports then please do try running performance tests yourself. You might wanna check out our overview of [Performance](performance.html) or try using out the [ActiveMQ Performance Module Users Manual](activemq-performance-module-users-manual.html)

The Commercial Providers on the [Support](support.html) page may also be able to help diagnose performance issues, suggest changes, etc...

More on JBoss Integration
-------------------------

[Integrating Apache ActiveMQ with JBoss](integrating-apache-activemq-with-jboss.html)

