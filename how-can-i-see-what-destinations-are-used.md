Apache ActiveMQ ™ -- How can I see what destinations are used 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How can I see what destinations are used](how-can-i-see-what-destinations-are-used.html)


The easiest way is to use [JMX](jmx.html) by pointing your JMX console or JConsole at the broker JVM.

You can also get all of the active destinations from the broker using Java code via [getDestinations()](http://activemq.apache.org/maven/5.8.0/apidocs/org/apache/activemq/broker/region/Region.html#getDestinations%28org.apache.activemq.command.ActiveMQDestination%29).

You can also get a Map of all the [Destination](http://activemq.apache.org/maven/5.8.0/apidocs/org/apache/activemq/broker/region/Destination.html) objects indexed by ActiveMQDestination via [getDestinationMap()](http://activemq.apache.org/maven/5.8.0/apidocs/org/apache/activemq/broker/region/Region.html#getDestinationMap%28%29). This allows you to look at the individual destination details such as the queue depths and so forth

