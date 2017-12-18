Apache ActiveMQ ™ -- While posting large binary file to activeMQ, is there a way to measure its progress 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [While posting large binary file to activeMQ, is there a way to measure its progress](while-posting-large-binary-file-to-activemq-is-there-a-way-to-measure-its-progress.html)


If you are using the JMS Streams feature with 4.x of ActiveMQ  
[http://activemq.org/JMS+Streams](http://activemq.org/JMS+Streams)

you'd be able to watch the progress in a JMX console or HermesJMS by looking at the queue depths; each large 1Gb file is split into individual JMS messages so you can monitor queue depth etc to track progress

