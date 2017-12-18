Apache ActiveMQ ™ -- ActiveMQ Destination Options 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Destination Features](activemq-destination-features.html) > [ActiveMQ Destination Options](activemq-destination-options.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

### Background

Destination Options are a way to provide extended configuration options to a NMS consumer without having to extend the NMS API. The options are encoded using URL query syntax in the destination name that the consumer is created on.

### Consumer Options

Option Name

Default Value

Description

consumer.prefetchSize

variable

The number of message the consumer will [prefetch](#).  **Removed in NMS.ActiveMQ v1.7.0 use the PrefetchPolicy isntead.**

consumer.maximumPendingMessageLimit

0

Use to control if messages for non-durable topics are dropped if a [slow consumer](#) situation exists.

consumer.noLocal

false

Same as the noLocal flag on a Topic consumer. Exposed here so that it can be used with a queue.

consumer.dispatchAsync

true

Should the broker [dispatch messages asynchronously](#) to the consumer.

consumer.retroactive

false

Is this a [Retroactive Consumer](#).

consumer.selector

null

NMS Selector used with the consumer.

consumer.exclusive

false

Is this an [Exclusive Consumer](#).

consumer.priority

0

Allows you to configure a [Consumer Priority](#).

### Example

var queue = session.GetQueue("TEST.QUEUE?consumer.dispatchAsync=false&consumer.prefetchSize=10");
var consumer = session.CreateConsumer(queue);


