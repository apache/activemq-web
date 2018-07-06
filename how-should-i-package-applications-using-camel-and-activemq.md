Apache ActiveMQ ™ -- How should I package applications using Camel and ActiveMQ 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How should I package applications using Camel and ActiveMQ](how-should-i-package-applications-using-camel-and-activemq.html)


How should I package applications using Camel and ActiveMQ
----------------------------------------------------------

So you may wish to use Camel's [Enterprise Integration Patterns](enterprise-integration-patterns.html) inside the ActiveMQ Broker. In which case the stand alone broker is already packaged to work with Camel out of the box; just add your EIP routing rules to ActiveMQ's [Xml Configuration](xml-configuration.html) like the example routing rule which ships with ActiveMQ 5.x or later. If you want to include some Java routing rules, then just add your jar to somewhere inside ActiveMQ's lib directory.

If you wish to use ActiveMQ and/or Camel in a standalone application, we recommend you just create a normal Spring application; then add the necessary jars and customise the Spring XML and you're good to go.

### What jars do I need

*   [what jars are required for ActiveMQ](initial-configuration.html)
*   [what jars are required for Camel](http://activemq.apache.org/camel/what-jars-do-i-need.html)

