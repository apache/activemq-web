Apache ActiveMQ ™ -- ActiveMQ Consumer Dispatch Async 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Consumer Features](activemq-consumer-features.html) > [ActiveMQ Consumer Dispatch Async](activemq-consumer-dispatch-async.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

Overview
--------

In AMQ4 onwards, the choice of a broker performing synchronous or asynchronous dispatch to a consumer has become more configurable. It is now configured as a default value on the [connection URI, Connection and ConnectionFactory](activemq-uri-configuration.html) together with being customizable on a per consumer basis via the [Destination Options](activemq-uri-configuration.html) instead previously just being a transport server setting.

This makes more sense since you want to do async message delivery to slower consumers, but do sync message delivery to faster consumers (to avoid the synchronization and context switching costs of adding another seda queue). The downside to using sync message delivery is that the producer is more likely to block if there is a slow consumer that he is dispatching messages to.

The default setting is dispatchAsync=true which is the best setting for high performance. If you want to deal better with slow consumers you will want to enable this setting. If you want better thoughput and the chances of having a slow consumer are low, you may want to change this to false.

### Configuring Async Dispatch at the ConnectionFactory Level

connectionFactory.DispatchAsync = false;

### Configuring Dispatch Async at the Connection Level

Configuring the dispatchAsync setting at this level overrides the settings at the connection factory level.

connection.DispatchAsync = false;

### Configuring Dispatch Async at the Consumer Level using the Destination URI

Configuring the dispatchAsync using [Destination Options](activemq-uri-configuration.html) overrides the settings at the connection and connection factory level.

var queue = new ActiveMQQueue("TEST.QUEUE?consumer.dispatchAsync=false");
var consumer = session.CreateConsumer(queue);


