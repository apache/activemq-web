Apache ActiveMQ ™ -- Broker Configuration URI 

[Using ActiveMQ](using-activemq.html) > [Configuring Transports](configuring-transports.html) > [ActiveMQ Connection URIs](activemq-connection-uris.html) > [Broker Configuration URI](broker-configuration-uri.html)


### Overview

An ActiveMQ broker can be extensivly configured using a single configuration URI. The following URI schemes are supported

Scheme

Link

Description

xbean:

[Broker XBean URI](broker-xbean-uri.html)

Configures the broker using an [Xml Configuration](xml-configuration.html) from an XML file which is on the classpath (or in 4.2 onwards can be on the file system or an external URL) which uses Spring and xbean-spring to configure the broker

broker:

[Broker URI](broker-uri.html)

Configures the broker explicitly using a URI syntax

properties:

[Broker Properties URI](broker-properties-uri.html)

Configures the broker explicitly using a URI syntax

For the most flexible and powerful option we recommend the [Xml Configuration](xml-configuration.html) via the [Broker XBean URI](broker-xbean-uri.html) to configure AcitveMQ brokers.

If you are worried about jar dependencies then either the [Broker URI](broker-uri.html) or the [Broker Properties URI](broker-properties-uri.html) are useful as they are very simple and require no dependencies on Spring or xbean-spring and don't require any XML.

