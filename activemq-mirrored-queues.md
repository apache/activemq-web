      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- ActiveMQ Mirrored Queues 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Destination Features](activemq-destination-features.html) > [ActiveMQ Mirrored Queues](activemq-mirrored-queues.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

Mirrored Queues
---------------

Queues provide an excellent reliable and high performance [load balancing mechanism](../how-does-a-queue-compare-to-a-topic.html). Each message placed on a queue can only be successfully processed by a single consumer. This is a good thing! ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png). However sometimes you want to monitor what messages flow between the producers and consumers on a queue.

To do this you can use [Virtual Destinations](../virtual-destinations.html) to setup a virtual Queue which forwards the message to multiple physical queues. However enabling this for every single queue in your system can be painful.

So to make it easy to monitor queues, we have added a feature we call _Mirrored Queues_. Mirrored Queues are kinda like a zero-configuration [Wire Tap](http://activemq.apache.org/camel/wire-tap.html) on all of your queues inside your Message Broker.

### Example

For example imagine we have a number of producers sending to queue **Foo.Bar** and consumers consuming from queue **Foo.Bar** and we want to monitor or view activity.

If you enable Mirrored Queues then by default you can subscribe to the topic **VirtualTopic.Mirror.Foo.Bar** and receive all the messages that are sent to the queue **Foo.Bar**. Since its a topic as many consumers can subscribe to this topic as are required.

If you want you can use this feature with [Virtual Topics](../virtual-destinations.html); so that you can define a logical consumer; say called A. Then you can subscribe to the queue **Consumer.A.VirtualTopic.Mirror.Foo.Bar** to receive all the messages sent to queue **Foo.Bar** for the consumer A. You can then run multiple instances of this consumer who can then load balance among each other.

This combination of Mirrored Queues and [Virtual Destinations](../virtual-destinations.html) can be extremely useful for monitoring transaction flows; for example with [Business Activity Monitoring (BAM)](http://activemq.apache.org/camel/bam.html).

### How Mirrored Queues work

When enabled, mirrored queues causes every message sent to a queue to also be sent to a topic of a similar name; so that folks who are interested in watching message exchanges on a queue can consume from the mirrored queue topic.

When coupled with [Virtual Topics](../virtual-destinations.html) on this topic as described in the above example, you can actually end up creating new queues which are mirrors of a given queue dynamically at runtime!

### Enabling Mirrored Queues

By default Mirrored Queues is disabled; as enabling it will cause a virtual topic to be created for each queue you use.

To enable Mirrored Queues, set the **useMirroredQueues** property on [BrokerService](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/broker/BrokerService.html) or add the following inside the <broker> element in the [Xml Configuration](../xml-configuration.html):

    <destinationInterceptors>
        <mirroredQueue copyMessage = "true" postfix=".qmirror" prefix=""/>
    </destinationInterceptors>

This would make a topic named "*.qmirror" for each queue on your Broker.

### [Overview](overview.html)

*   [Home](index.html)
*   [FAQ](faq.html)
*   [Download](download.html)

### [Using NMS](using-nms.html)

*   [NMS Overview](apachenms.html)
*   [Getting Started](nms.html)
*   [NMS API Reference](nms-api.html)
*   [ActiveMQ](apachenmsactivemq.html)
*   [Stomp](apachenmsstomp.html)
*   [MSMQ](apachenmsmsmq.html)
*   [Tibco EMS](apachenmsems.html)
*   [WCF](apachenmswcf.html)

### Search

   

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](http://activemq.apache.org/contributing.html)
*   [Discussion Forums](http://activemq.apache.org/discussion-forums.html)
*   [Mailing Lists](http://activemq.apache.org/mailing-lists.html)
*   [IRC](irc://irc.codehaus.org/activemq)
*   [Articles](articles.html)
*   [Site](site.html)
*   [Team](http://activemq.apache.org/team.html)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25201940))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();