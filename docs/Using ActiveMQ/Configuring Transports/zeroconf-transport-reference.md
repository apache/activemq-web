Apache ActiveMQ ™ -- ZeroConf Transport Reference 

[Using ActiveMQ](using-activemq.md) > [Configuring Transports](Using ActiveMQ/configuring-transports.md) > [ZeroConf Transport Reference](Using ActiveMQ/Configuring TransportsUsing ActiveMQ/Configuring Transports/Using ActiveMQ/Configuring Transports/zeroconf-transport-reference.md)


### The ZeroConf Transport

The ZeroConf transport works just like [Discovery Transport](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/discovery-transport-reference.md), except that it uses a [ZeroConf](Using ActiveMQ/Configuring Transports/ZeroConf Transport Reference/zeroconf.md) based discovery agent to locate the list of broker uris to connect to.

#### Configuration Syntax

**zeroconf:serviceName?transportOptions**  
or  
**zeroconf:serviceName**

where _serviceName_ is the Zeroconf service name; which seems to start with an underscore (_) and must end with a dot (.). So we can use this service name to distinguish development, UAT & production brokers - or group them into domains etc.

Note that to be able to use ZeroConf to find brokers, the brokers need to have [Discovery](Features/discovery.md) enabled. To configure discovery in a Broker you should use the [Xml Configuration](xml-Community/FAQ/configuration.md). Its basically something like...

<broker name="foo">
  <transportConnectors>
    <transportConnector name="openwire" uri="tcp://0.0.0.0:61616" discoveryUri="zeroconf:\_activemq\_development. />
  </transportConnectors>
  ...
</broker>

##### Example client URI

zeroconf:\_activemq\_development.

