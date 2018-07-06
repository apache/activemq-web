Apache ActiveMQ ™ -- How do I turn off creating an embedded ActiveMQ broker when using the VM transport 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I turn off creating an embedded ActiveMQ broker when using the VM transport](how-do-i-turn-off-creating-an-embedded-activemq-broker-when-using-the-vm-transport.html)


You can turn off auto creation by setting the create property on the VM Transport to false:

ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory("vm://localhost?create=false");

