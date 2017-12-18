Apache ActiveMQ ™ -- How do I use ActiveMQ using in JVM messaging 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I use ActiveMQ using in JVM messaging](how-do-i-use-activemq-using-in-jvm-messaging.html)


### For ActiveMQ 3.x/4.x

To use pure in-memory messaging you just need to set the broker URL to be

vm://localhost

Actually you can use any text after _vm://_ so that you can segment multiple logical JMS brokers within the same JVM and classloader, using the name to distinguish between them.

There is an example of how to do this along with a description of the available protocols in the [Protocols overview](uri-protocols.html).

Also see: [how to optimise the VM transport](how-should-i-use-the-vm-transport.html)

