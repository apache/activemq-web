Apache ActiveMQ ™ -- ActiveMQ Consumer Priority 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Consumer Features](activemq-consumer-features.html) > [ActiveMQ Consumer Priority](activemq-consumer-priority.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

### Background

As well as having a pluggable dispatch policy (e.g. round robin etc), we now support consumer priorities.

This allows us to weight consumers to optimise network hops. For example, you typically want a broker to send messages to regular NMS consumers rather than to other brokers; there's no need to make unnecessary broker-to-broker hops if there are available consumers.

### Example

The priority for a consumer is set using [Destination Options](activemq-uri-configuration.html) as follows:

var queue = session.GetQueue("TEST.QUEUE?consumer.priority=10");
var consumer = session.CreateConsumer(queue);

The range for assigning priority numbers is from 0 to 127, with 127 being the highest priority and 0 being the default priority.  
The way it works is that the broker will simply order any queue consumers according to their priorities and send messages to the highest priority consumers first.  
Once a particular consumer has its prefetch buffer filled up, the broker will begin to dispatch messages to consumers of lower priorities.


