Apache ActiveMQ ™ -- How do I define a local address and local port for TCP or SSL 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [Configuration](Community/FAQ/configuration.md) > [How do I define a local address and local port for TCP or SSL](Community/FAQ/ConfigurationCommunity/FAQ/Configuration/Community/FAQ/Configuration/how-do-i-define-a-local-address-and-local-port-for-tcp-or-ssl.md)


TCP based transport protocols (including SSL) allow you to define the local address and local port for Socket to use when it's created.  
This can be useful for clients that reside on multi-homed machines or for clients operating in a DMZ, where only pre-defined ports can be used.

To specify the local address and local port, ActiveMQ supports the use of the path on the URI, e.g.

ssl://localhost:5666/localhost:60606

where the path following the forward slash "localhost:60606" defines the local address and local port

