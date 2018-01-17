Apache ActiveMQ ™ -- Configuring Wire Formats 

[Using ActiveMQ](using-activemq.md) > [Configuring Transports](Using ActiveMQ/configuring-transports.md) > [ActiveMQ Connection URIs](Using ActiveMQ/Configuring Transports/activemq-connection-uris.md) > [Configuring Wire Formats](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/configuring-wire-formats.md)


### The OpenWire Wire Format

OpenWire is the default wire format used by ActiveMQ.  It provides a highly efficient binary format for high speed messaging.  OpenWire options can be configured on a JMS client's connection URI or on a broker's transport bind URI.

Option

Default

Description

`cacheEnabled`

`true`

Should commonly repeated values be cached so that less marshaling occurs?

`cacheSize`

`1024`

When **`cacheEnabled=true`** then this parameter is used to specify the number of values to be cached.

`maxInactivityDuration`

`30000`

The maximum [inactivity](Using ActiveMQ/Configuring Transports/activemq-inactivitymonitor.md) duration (before which the socket is considered dead) in milliseconds. On some platforms it can take a long time for a socket to die. Therefore allow the broker to kill connections when they have been inactive for the configured period of time. Used by some transports to enable a keep alive heart beat feature.

Inactivity monitoring is disabled when set to a value **`<= 0`**.

`maxInactivityDurationInitalDelay`

`10000`

The initial delay before starting [inactivity](Using ActiveMQ/Configuring Transports/activemq-inactivitymonitor.md) checks.

Yes, the word **`'Inital'`** is supposed to be misspelled like that.

`maxFrameSize`

`MAX_LONG`

Maximum allowed frame size. Can help help prevent OOM DOS attacks.

`sizePrefixDisabled`

`false`

Should the size of the packet be prefixed before each packet is marshaled?

`stackTraceEnabled`

`true`

Should the stack trace of exception that occur on the broker be sent to the client?

`tcpNoDelayEnabled`

`true`

Does not affect the wire format, but provides a hint to the peer that **`TCP_NODELAY`** should be enabled on the communications Socket.

`tightEncodingEnabled`

`true`

Should wire size be optimized over CPU usage?

Use the Correct Prefix!

Wire format options must have the prefix **`wireFormat.`** to take effect, e.g., **`wireFormat.maxInactivityDuration=10000`**. Options missing this prefix will be ignored.

#### Example Configurations

**Java:**

ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory("tcp://localhost:61616?wireFormat.cacheEnabled=false&wireFormat.tightEncodingEnabled=false");

**Spring:**

<bean class="org.apache.activemq.ActiveMQConnectionFactory">
  <property name="brokerURL" value="failover:(tcp://localhost:61616?jms.optimizeAcknowledge=false&wireFormat.maxInactivityDuration=30000)"/>
  <!\-\- other options... -->
</bean>

