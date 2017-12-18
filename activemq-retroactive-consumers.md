      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ Retroactive Consumers 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Consumer Features](activemq-consumer-features.html) > [ActiveMQ Retroactive Consumers](activemq-retroactive-consumers.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

Background
----------

A retroactive consumer is just a regular NMS consumer who indicates that at the start of a subscription every attempt should be used to go back in time and send any old messages (or the last message sent on that topic) that the consumer may have missed.

See the [Subscription Recovery Policy](../subscription-recovery-policy.html) for more detail.

### Example

You mark a Consumer as being retroactive as follows:

var topic = session.GetTopic("TEST.Topic?consumer.retroactive=true");
var consumer = session.CreateConsumer(topic);

Limitations
-----------

Retroactive consumer will not consistently work when used across a network of brokers.

In the case of topics, when we connect broker A to broker B, broker B will send broker A all the subscriptions that it has received. Since Broker A replicates messages to each subscription, and we want to avoid receiving duplicates at broker B, we can't send broker A more than 1 subscription for the same topic. So our network bridges keep track of the subscriptions sent across and only send the first subscription to a topic. Subsequent subscriptions increment the reference count of the subscription, but the subscription is not actually sent.

This in essence is the problem. If the first subscription to a topic is not retroactive, it is sent B to A, and the B broker will not get the retroactive messages. Then subsequent subscriptions could be (retroactive), but it will not cause retroactive message to sent from broker A to broker B since the subsequent subscription will not be sent to broker A.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25201861))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();