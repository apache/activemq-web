Apache ActiveMQ ™ -- How do I delete a destination 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I delete a destination](how-do-i-delete-a-destination.html)


How do I delete a destination
-----------------------------

via Java code or [JMX](jmx.html) you can grab the [BrokerViewMBean](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/broker/jmx/BrokerViewMBean.html) and call one of the following methods

*   [removeQueue(String)](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/broker/jmx/BrokerViewMBean.html#removeQueue(java.lang.String))
*   [removeTopic(String)](http://activemq.apache.org/maven/activemq-core/apidocs/org/apache/activemq/broker/jmx/BrokerViewMBean.html#removeTopic(java.lang.String))

### See also

*   [How do I create new destinations](how-do-i-create-new-destinations.html)
*   [How can I monitor ActiveMQ](how-can-i-monitor-activemq.html)
*   [JMX](jmx.html)
*   [Web Console](web-console.html)

