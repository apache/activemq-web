Apache ActiveMQ ™ -- NMS Providers 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

### NMS Providers

An NMS Provider is a .NET Assembly that provides an implementation of the NMS API that provides connectivity with a particular Messaging Service or an implementation of a standard Messaging Protocol. Currently, the following providers are available:

*   [**ActiveMQ**](apachenmsactivemq.html) client which communicates with ActiveMQ using its own native wire protocol and provides many [advanced features](activemq-advanced-features.html) beyond the standard NMS API.
*   [**STOMP**](apachenmsstomp.html) which connects to any [STOMP Broker](http://stomp.codehaus.org/).  Also, when coupled with [StompConnect](http://stomp.codehaus.org/StompConnect), NMS can be used to communicate with pretty much any existing MOM provider! (Or at least those that support JMS which most MOM providers do).
*   [**MSMQ**](apachenmsmsmq.html) is an implementation of NMS using Microsoft's MSMQ API.
*   [**EMS**](apachenmsems.html) provider for talking to TIBCO's EMS message broker.  To use this, you will need to following TIBCO's licensing requirements to acquire the TIBCO client assembly DLL.  NMS does not ship with the TIBCO client assembly.
*   [**WCF**](apachenmswcf.html) provides support of Windows Communications Framework.
*   [**AMQP**](apachenmsamqp.html) is an implementation of NMS using the [Apache Qpid Messaging API](https://qpid.apache.org/components/messaging-api/index.html). AMQP 1.0 protocol support is provided by [Apache Qpid Proton](https://qpid.apache.org/proton/index.html).
*   [**MQTT**](apachenmsmqtt.html) provider uses the publish-subscribe pattern that is a "light weight" messaging protocol for use on top of the [TCP/IP protocol](https://en.wikipedia.org/wiki/TCP/IP "TCP/IP"). 
*   **[XMS](apachenmsxms.html)** provider connects to the IBM WebSphere MQ Series broker.


