Apache ActiveMQ ™ -- How do I restart embedded broker 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I restart embedded broker](how-do-i-restart-embedded-broker.html)


Pure restart of the embedded broker is not advisable, since it's state could be corrupted. Therefore, you're advised to instantiate the broker again before restarting it.

BrokerService service = BrokerFactory.createBroker("xbean:activemq.xml");
service.start();
service.waitUntilStarted();

service.stop();
service.waitUntilStopped();

service = BrokerFactory.createBroker("xbean:activemq.xml");
service.start();

In 5.3 however, we allowed the force start of the broker that has been stopped for use cases that need this functionality. You can do it by using

BrokerService.start(boolean force);

method.

The following example demonstrates it.

BrokerService service = BrokerFactory.createBroker("xbean:activemq.xml");
service.start();
service.waitUntilStarted();

service.stop();
service.waitUntilStopped();

service.start(true);

However, it's better (more reliable) to instantiate the broker again if it is possible.

