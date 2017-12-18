Apache ActiveMQ ™ -- How do I restrict connections from creating new queues or topics 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I restrict connections from creating new queues or topics](how-do-i-restrict-connections-from-creating-new-queues-or-topics.html)


How do I restrict connections from creating new queues or topics?
-----------------------------------------------------------------

As is described in [How do I create new destinations](how-do-i-create-new-destinations.html) there is no need to create all the destinations up front, you can let the broker create them on the fly.

However if you don't want this behaviour, or wish to restrict this behaviour to certain topic or queue [Wildcards](wildcards.html) (areas of the queue or topic name space) then you can use the [Security](security.html) plugins to disallow the **admin** role on whatever areas of the queue and topic namespace you wish

