Apache ActiveMQ ™ -- How can I monitor ActiveMQ 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How can I monitor ActiveMQ](how-can-i-monitor-activemq.html)


How can I monitor ActiveMQ
--------------------------

Starting with ActiveMQ 5.8.0 [Jolokia](http://www.jolokia.org/) is bundled which provides a RESTful interface to ActiveMQ's JMX capabilities. An open source third party tool that connects via Jolokia is [hawt.io](http://hawt.io/), an HTML-5 web console with an ActiveMQ plugin that is at least worth being familiar with as ActiveMQ and hawt.io share developers.

In ActiveMQ 4.x you can monitor the broker to see what destinations are being used, their activity along with connections and subscriptions using the following tools

*   [JMX](jmx.html) and a JMX console such as [jConsole](http://java.sun.com/developer/technicalArticles/J2SE/jconsole.html)
*   The [Web Console](web-console.html)
*   the [Advisory Message](advisory-message.html) feature (using JMS messages to monitor the system)
*   The [Command Agent](command-agent.html); ActiveMQ.Agent topic that you query for status
*   The [Visualisation](visualisation.html) plug-in
*   The [Statistics](http://activemq.apache.org/statisticsplugin.html) plug-in (from 5.3)

### Third Party Tools

*   [jmxtrans](https://github.com/jmxtrans/jmxtrans) which can be used to continuously query ActiveMQ via JMX and write to a chosen output. For instance, write to a graphite database file which can then be used to graph trends over time and be queried by Nagios to alarm should your thresholds be exceeded.
*   [ActiveMQ Monitor (AMon)](http://www.ttmsolutions.com/Transactional_Software_Solutions/Active_Monitor_AMon.php)
*   [Apache ActiveMQBrowser](http://sourceforge.net/projects/activemqbrowser/)
*   [HermesJMS](http://www.hermesjms.com/confluence/display/HJMS/Home)
*   [HermesJMS/soapUI](http://www.soapui.org/JMS/working-with-jms-messages.html)
*   [Hyperic HQ](http://www.hyperic.com/products/open-source-systems-monitoring) and [Hyperic HQ Enterprise](http://www.hyperic.com/products/enterprise-systems-monitoring)
*   [FuseHQ](http://fusesource.com/products/fuse-hq/) (based on Hyperic HQ Enterprise)
*   [iTKO LISA Test](http://www.itko.com/products/jms.jsp)
*   [Geronimo Administration Console](https://cwiki.apache.org/GMOxDOC11/geronimo-administration-console.html#GeronimoAdministrationConsole-JMSServer) (JMS Resources)
*   [Media Driver Integrated Console](https://mediadriver.com/software/) can manage and monitor ActiveMQ, IBM MQ and Tibco EMS

### See Also

*   [How can I monitor the connection with the broker](how-can-i-monitor-the-connection-with-the-broker.html)

