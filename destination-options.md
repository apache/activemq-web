Apache ActiveMQ ™ -- Destination Options 

[Features](features.html) > [Destination Features](destination-features.html) > [Destination Options](destination-options.html)


### Background

Destination Options are a way to provide extended configuration options to a JMS consumer without having to extend the JMS API. The options are encoded using URL query syntax in the destination name that the consumer is created on.

### Consumer Options

Option Name

Default Value

Description

`consumer.dispatchAsync`

`true`

Should the broker [dispatch messages asynchronously](consumer-dispatch-async.html) to the consumer.

`consumer.exclusive`

`false`

Is this an [Exclusive Consumer](exclusive-consumer.html).

`consumer.maximumPendingMessageLimit`

`0`

Use to control if messages for non-durable topics are dropped if a [slow consumer](slow-consumer-handling.html) situation exists.

`consumer.noLocal`

`false`

Same as the **`noLocal`** flag on a Topic consumer. Exposed here so that it can be used with a queue.

`consumer.prefetchSize`

`n/a`

The number of message the consumer will [prefetch](what-is-the-prefetch-limit-for.html).

`consumer.priority`

`0`

Allows you to configure a [Consumer Priority](consumer-priority.html).

`consumer.retroactive`

`false`

Is this a [Retroactive Consumer](retroactive-consumer.html).

`consumer.selector`

`null`

JMS Selector used with the consumer.

### Example

queue = new ActiveMQQueue("TEST.QUEUE?consumer.dispatchAsync=false&consumer.prefetchSize=10");
consumer = session.createConsumer(queue);

