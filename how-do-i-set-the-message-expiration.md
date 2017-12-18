Apache ActiveMQ ™ -- How do I set the message expiration 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I set the message expiration](how-do-i-set-the-message-expiration.html)


JMSExpiration on a message is set by the MessageProducer in JMS - either via

*   [producer.setTimeToLive()](http://java.sun.com/j2ee/1.4/docs/api/javax/jms/MessageProducer.html#setTimeToLive(long))
*   [producer.send(Destination, Message, int, int, long)](http://java.sun.com/j2ee/1.4/docs/api/javax/jms/MessageProducer.html#send(javax.jms.Destination,%20javax.jms.Message,%20int,%20int,%20long))

