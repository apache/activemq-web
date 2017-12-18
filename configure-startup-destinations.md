Apache ActiveMQ ™ -- Configure Startup Destinations 

[Features](features.html) > [Destination Features](destination-features.html) > [Configure Startup Destinations](configure-startup-destinations.html)


Typically in Apache ActiveMQ we [create destinations on demand](how-do-i-create-new-destinations.html) as clients start to use them. However sometimes users want to be able to configure which destinations are available on startup explicitly in the [Xml Configuration](xml-configuration.html).

4.1 Feature

Note this feature is available from 4.1 onwards. If you try this XML on older versions of ActiveMQ you will get an exception about the 'destinations' property not being writable.

### Example

The following [example](http://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-core/src/test/resources/org/apache/activemq/broker/destinations-on-start.xml) shows how you can configure a number of destinations to be available at startup. <broker xmlns="http://activemq.apache.org/schema/core"> <destinations> <queue physicalName="FOO.BAR" /> <topic physicalName="SOME.TOPIC" /> </destinations> </broker>

