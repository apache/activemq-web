Apache ActiveMQ ™ -- How do I purge a queue 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I purge a queue](how-do-i-purge-a-queue.html)


A frequent requirement is to purge a queue (i.e. delete all the messages on it).

### Solution

You can use the [Web Console](web-console.html) to view queues, add/remove queues, purge queues or delete/forward individual messages.

Another option is to use [JMX](jmx.html) to browse the queues and call the **purge()** method on the [QueueViewMBean](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/jmx/QueueViewMBean.html).

You could also delete the queue via removeQueue(String) or removeTopic(String) methods on the [BrokerViewMBean](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/jmx/BrokerViewMBean.html)

You can also do it [programmatically](how-can-i-see-what-destinations-are-used.html)

### Also See

*   [Web Console](web-console.html)
*   [JMX](jmx.html)
*   [How do I find the Size of a Queue](how-do-i-find-the-size-of-a-queue.html)
*   [How can I see what destinations are used](how-can-i-see-what-destinations-are-used.html)

