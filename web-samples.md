Apache ActiveMQ ™ -- Web Samples 

[Using ActiveMQ](using-activemq.html) > [Web Samples](web-samples.html)


There are a few example programs demonstrating the [REST](rest.html), [Ajax](ajax.html) and [WebSockets](websockets.html) messaging that comes with the ActiveMQ distribution.

Up until version 5.8 web demos were included in the default configuration and could be accessed directly using [http://localhost:8161/demo](http://localhost:8161/demo) url after starting the broker.

From 5.8 onwards, demos are excluded from default configuration. To start a broker with web examples, use `activemq-demo.xml` configuration file, like

bin/activemq console xbean:examples/conf/activemq-demo.xml

See Also
--------

*   [Examples](examples.html)
*   [JMX](jmx.html)
*   [Web Console](web-console.html)

