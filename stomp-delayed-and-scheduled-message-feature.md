      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Stomp Delayed and Scheduled Message Feature 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.Stomp](apachenmsstomp.html) > [Stomp Advanced Features](stomp-advanced-features.html) > [Stomp Message Features](stomp-message-features.html) > [Stomp Delayed and Scheduled Message Feature](stomp-delayed-and-scheduled-message-feature.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

This documentation only applies when the Stomp client is connected to an ActiveMQ Broker v5.4 and above.

ActiveMQ from version **5.4** has an optional persistent scheduler built into the ActiveMQ message broker. It is enabled by setting the broker **schedulerSupport** attribute to true in the [xml configuration](#).  
An ActiveMQ client can take advantage of a delayed delivery by using the following message properties:

Property name

type

description

AMQ\_SCHEDULED\_DELAY

long

The time in milliseconds that a message will wait before being scheduled to be delivered by the broker

AMQ\_SCHEDULED\_PERIOD

long

The time in milliseconds to wait after the start time to wait before scheduling the message again

AMQ\_SCHEDULED\_REPEAT

int

The number of times to repeat scheduling a message for delivery

AMQ\_SCHEDULED\_CRON

String

Use a Cron entry to set the schedule

For example, to have a message scheduled for delivery in 60 seconds - you would need to set the _AMQ\_SCHEDULED\_DELAY_ property:

        IMessageProducer producer = session.CreateProducer(destination);
        ITextMessage message = session.CreateTextMessage("test msg");
        long time = 60 * 1000;
        message.Properties\["AMQ\_SCHEDULED\_DELAY"\] = time;
        producer.Send(message);

You can set a message to wait with an initial delay, and the repeat delivery 10 times, waiting 10 seconds between each re-delivery:

        IMessageProducer producer = session.CreateProducer(destination);
        ITextMessage message = session.CreateTextMessage("test msg");
        long delay = 30 * 1000;
        long period = 10 * 1000;
        int repeat = 9;
        message.Properties\["AMQ\_SCHEDULED\_DELAY"\] = delay;
        message.Properties\["AMQ\_SCHEDULED\_PERIOD"\] = period;
        message.Properties\["AMQ\_SCHEDULED\_REPEAT"\] = repeat;
        producer.Send(message);

You can also use [CRON](http://en.wikipedia.org/wiki/Cron) to schedule a message, for example, if you want a message scheduled to be delivered every hour, you would need to set the CRON entry to be - _0 * * * *_ \- e.g.

        IMessageProducer producer = session.CreateProducer(destination);
        ITextMessage message = session.CreateTextMessage("test msg");
        message.Properties\["AMQ\_SCHEDULED\_CRON"\] = "0 * * * *";
        producer.Send(message);

CRON scheduling takes priority over using message delay - however, if a repeat and period is set with a CRON entry, the ActiveMQ scheduler will schedule delivery of the message for every time the CRON entry fires. Easier to explain with an example. Supposing that you want a message to be delivered 10 times, with a one second delay between each message - and you wanted this to happen every hour - you'd do this:

        IMessageProducer producer = session.CreateProducer(destination);
        ITextMessage message = session.CreateTextMessage("test msg");
        message.Properties\["AMQ\_SCHEDULED\_CRON"\] = "0 * * * *";
        message.Properties\["AMQ\_SCHEDULED\_DELAY"\] = 1000;
        message.Properties\["AMQ\_SCHEDULED\_PERIOD"\] = 1000;
        message.Properties\["AMQ\_SCHEDULED\_REPEAT"\] = 9;
        producer.Send(message);

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25202035))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();