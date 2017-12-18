Apache ActiveMQ ™ -- How do I disable persistence 

[Community](community.html) > [FAQ](faq.html) > [Configuration](configuration.html) > [How do I disable persistence](how-do-i-disable-persistence.html)


There are three main ways to disable persistence, such as for unit testing JMS code

1.  Set the NON_PERSISTENT message delivery flag on your MessageProducer
2.  Set the **persistent=false** flag in the **<broker/>** element of the [Xml Configuration](xml-configuration.html) or on the property [BrokerService](http://incubator.apache.org/activemq/maven/activemq-core/apidocs/org/apache/activemq/broker/BrokerService.html)
3.  Delete the persistence files before running your tests (a bit hacky)

If you are unit testing you may be interested in [How To Unit Test JMS Code](how-to-unit-test-jms-code.html).

Please refer to the [Initial Configuration](initial-configuration.html) guide on how to disable persistence via system properties, java code or using the [Xml Configuration](xml-configuration.html)

