Apache ActiveMQ ™ -- Can I send really large files over ActiveMQ 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [Can I send really large files over ActiveMQ](can-i-send-really-large-files-over-activemq.html)


Can I send really large files over ActiveMQ
-------------------------------------------

The answer is yes.

If you are using ActiveMQ 4.2 or later we highly recommend you use [Blob Messages](blob-messages.html) which implements an out of band transport of the messages; it allows the files to be hosted on external http/ftp sites if required and can support either direct publisher <-> subscriber communication or publisher -> broker/file server -> consumer messaging.

For 4.1 or ealier large file transfer is achieved using [JMS Streams](jms-streams.html).

Normally the JMS API expects the entire JMS messsage to reside in the client side memory; however using [Blob Messages](blob-messages.html) or [JMS Streams](jms-streams.html) allows you to send and receive arbitrarily large files with very low RAM overhead.

