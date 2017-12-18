Apache ActiveMQ ™ -- How does OpenWire compare to Stomp 

[Community](community.html) > [FAQ](faq.html) > [General](general.html) > [How does OpenWire compare to Stomp](how-does-openwire-compare-to-stomp.html)


[OpenWire](openwire.html) is the native protocol that Apache ActiveMQ uses. It is designed for performance and size on the wire - sacrificing some ease of implementation with higher performance and reduced network bandwidth as a priority. OpenWire was first released in Apache ActiveMQ 4.0.

[Stomp](stomp.html) is a simpler text based protocol which is designed to be very simple to implement in a few hours in any language or platform (e.g. you can use a telnet client to communicate via Stomp). A Stomp client is not going to be as efficient as an client that uses  
OpenWire, but it much simpler so you can generally be up and running with it much quicker.

