Apache ActiveMQ ™ -- Delay and Schedule Message Delivery 

[Features](features.md) > [Message Features](FeaturesFeatures/Features/message-features.md) > [Delay and Schedule Message Delivery](Features/Message Features/delay-and-schedule-message-delivery.md)


ActiveMQ from version **5.4** has an optional persistent scheduler built into the ActiveMQ message broker. It is enabled by setting the broker **schedulerSupport** attribute to true in the [Xml Configuration](xml-Community/FAQ/configuration.md).  
An ActiveMQ client can take advantage of a delayed delivery by using the following message properties:

Check your Message Properties

The message property `scheduledJobId `is reserved for use by the Job Scheduler. If this property is set before sending, the message will be sent immediately and not scheduled. Also, after a scheduled message is received, the property `scheduledJobId` will be set on the received message so keep this in mind if using something like a Camel Route which might automatically copy properties over when re-sending a message.

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

For the connivence of Java JMS clients - there's an interface with the property names used for scheduling at _**org.apache.activemq.ScheduledMessage**_.

For example, to have a message scheduled for delivery in 60 seconds - you would need to set the _AMQ\_SCHEDULED\_DELAY_ property:

        MessageProducer producer = session.createProducer(destination);
        TextMessage message = session.createTextMessage("test msg");
        long time = 60 * 1000;
        message.setLongProperty(ScheduledMessage.AMQ\_SCHEDULED\_DELAY, time);
        producer.send(message);

You can set a message to wait with an initial delay, and the repeat delivery 10 times, waiting 10 seconds between each re-delivery:

        MessageProducer producer = session.createProducer(destination);
        TextMessage message = session.createTextMessage("test msg");
        long delay = 30 * 1000;
        long period = 10 * 1000;
        int repeat = 9;
        message.setLongProperty(ScheduledMessage.AMQ\_SCHEDULED\_DELAY, delay);
        message.setLongProperty(ScheduledMessage.AMQ\_SCHEDULED\_PERIOD, period);
        message.setIntProperty(ScheduledMessage.AMQ\_SCHEDULED\_REPEAT, repeat);
        producer.send(message);

You can also use [CRON](http://en.wikipedia.org/wiki/Cron) to schedule a message, for example, if you want a message scheduled to be delivered every hour, you would need to set the CRON entry to be - _0 * * * *_ \- e.g.

        MessageProducer producer = session.createProducer(destination);
        TextMessage message = session.createTextMessage("test msg");
        message.setStringProperty(ScheduledMessage.AMQ\_SCHEDULED\_CRON, "0 * * * *");
        producer.send(message);

CRON scheduling takes priority over using message delay - however, if a repeat and period is set with a CRON entry, the ActiveMQ scheduler will schedule delivery of the message for every time the CRON entry fires. Easier to explain with an example. Supposing that you want a message to be delivered 10 times, with a one second delay between each message - and you wanted this to happen every hour - you'd do this:

        MessageProducer producer = session.createProducer(destination);
        TextMessage message = session.createTextMessage("test msg");
        message.setStringProperty(ScheduledMessage.AMQ\_SCHEDULED\_CRON, "0 * * * *");
        message.setLongProperty(ScheduledMessage.AMQ\_SCHEDULED\_DELAY, 1000);
        message.setLongProperty(ScheduledMessage.AMQ\_SCHEDULED\_PERIOD, 1000);
        message.setIntProperty(ScheduledMessage.AMQ\_SCHEDULED\_REPEAT, 9);
        producer.send(message);

