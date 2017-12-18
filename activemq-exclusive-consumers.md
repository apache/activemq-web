Apache ActiveMQ ™ -- ActiveMQ Exclusive Consumers 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Consumer Features](activemq-consumer-features.html) > [ActiveMQ Exclusive Consumers](activemq-exclusive-consumers.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

### Exclusive Consumer

We have a new feature in version 4.x and above called Exclusive Consumer or Exclusive Queues which avoids the end user having to _pin_ anything. The broker will pick a single MessageConsumer to get all the messages for a queue to ensure ordering. If that consumer fails, the broker will auto failover and choose another consumer.

So the effect is a heterogeneous cluster where each client has the same setup and configuration; the broker is choosing one consumer to be the _master_ and send all the messages to it in order until it dies; then you get immediate failover to another consumer.

For those who've struggled with pinning NMS consumers in clusters you'll immediately realize how useful this is to making clustered, high available distributed services.

### Example

An Exclusive Consumer is created using [ActiveMQ URI Configuration](activemq-uri-configuration.html) as follows:

var queue = session.GetQueue("TEST.QUEUE?consumer.exclusive=true");
var consumer = session.CreateConsumer(queue);


