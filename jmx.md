      .maincontent { overflow:hidden; }          SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- JMX 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [JMX](jmx.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

JMX
---

Apache ActiveMQ has extensive support for JMX to allow you to monitor and control the behavior of the broker via the [JMX MBeans](http://activemq.apache.org/maven/apidocs/org/apache/activemq/broker/jmx/package-summary.html).

### Using JMX to monitor Apache ActiveMQ

You can enable/disable JMX support as follows...

1\. [Run a broker](run-broker.html) setting the broker property useJmx to true (enabled by default) i.e.

For xbean configuration

<broker useJmx="true" brokerName="BROKER1">
...
</broker>

2\. Run a JMX console

$ jconsole 

3\. The ActiveMQ broker should appear in the list of local connections, if you are running JConsole on the same host as ActiveMQ.

**JMX remote access**

Remote connections to JMX are not enabled by default in the activemq.xml for security reasons. Please refer to [Java Management guide](http://docs.oracle.com/javase/6/docs/technotes/guides/management/agent.html) to configure the broker for remote management.

Using the Apache ActiveMQ version on OS X it appears as follows:

![](jmx.data/activemq-jmx.png)  
 

### ActiveMQ MBeans Reference

For additional references provided below is a brief hierarchy of the mbeans and a listing of the properties, attributes, and operations of each mbeans.

 Mbean Type

Properties / ObjectName 

Attributes 

Operations 

 Broker

*   **type**=Broker
*   **brokerName**=<broker identifier>

*   BrokerId
*   TotalEnqueueCount
*   TotalDequeueCount
*   TotalConsumerCount
*   TotalMessageCount
*   TotalConnectionsCount
*   TotalConsumerCount
*   TotalProducerCount
*   MemoryLimit
*   MemoryPercentUsage
*   StoreLimit
*   StorePercentUsage

*   start
*   stop
*   terminateJVM
*   resetStatistics
*   gc

 Destination

*   **type**=Broker
*   **brokerName**=<name of broker>
*   **destinationType**=Queue|Topic
*   **destinationName**=<name>

*   AverageEnqueueTime
*   ConsumerCount
*   DequeueCount
*   EnqueueCount
*   ExpiredCount
*   InFlightCount
*   MemoryLimit
*   MemoryPercentUsage
*   Name
*   QueueSize (queues only)

*   browseMessages
*   gc
*   purge
*   resetStatistics

 NetworkConnector

*   **type**=Broker
*   **brokerName**=<name of broker>
*   **connector**=networkConnectors
*   **networkConnectorName**=<connector identifier>

*   Name
*   Duplex
*   DynamicOnly
*   BridgeTempDestinations
*   ConduitSubscriptions
*   DecreaseNetworkConsumerPriority
*   DispatchAsync
*   DynamicOnly
*   NetworkTTL
*   Password
*   PrefetchSize

*   start
*   stop

 Connector

*   **type**=Broker
*   **brokerName**=<name of broker>
*   **connector**=clientConnectors
*   **ConnectorName**=<connector identifier>

*   StatisticsEnabled

*   start
*   stop
*   resetStatistics
*   enableStatistics
*   disableStatistics
*   connectionCount

 Connection

*   **type**=Broker
*   **brokerName**=<name of broker>
*   **connectionViewType**=clientId
*   **connectionName**=<connection identifier>

*   DispatchQueueSize
*   Active
*   Blocked
*   Connected
*   Slow
*   Consumers
*   Producers
*   RemoteAddress
*   UserName
*   ClientId

*   start
*   stop
*   resetStatistics

  PersistenceAdapter

*   **type**=Broker
*   **brokerName**=<broker name>
*   **Service**=PersistenceAdapter
*   **InstanceName**=<adapter identifier>

*   Name
*   Size
*   Data
*   Transactions

 Health

*   **type**=Broker
*   **brokerName**=<broker name>
*   **Service**=Health

*   CurrentStatus

*   health

Command line utilities are also available to let you monitor ActiveMQ. Refer to [ActiveMQ Command Line Tools Reference](activemq-command-line-tools-reference.html) for usage information.

JMX API is also exposed via [REST management API](rest.html)

### Password Protecting the JMX Connector

(For Java 1.5+)

1\. Make sure JMX is enabled, but tell ActiveMQ **not** create its own connector so that it will use the default JVM JMX connector.

<broker xmlns="http://activemq.org/config/1.0" brokerName="localhost"useJmx="true">

  ...

  <managementContext>
     <managementContext createConnector="false"/>
  </managementContext>

  ...

</broker>

2\. Create access and password files

conf/jmx.access:

\# The "monitorRole" role has readonly access.
\# The "controlRole" role has readwrite access.
monitorRole readonly
controlRole readwrite

conf/jmx.password:

\# The "monitorRole" role has password "abc123".
\# The "controlRole" role has password "abcd1234".
monitorRole abc123
controlRole abcd1234

(Make sure both files are not world readable - more info can be find [here](http://java.sun.com/j2se/1.5.0/docs/guide/management/agent.html#auth) to protect files)

For more details you can see the [Monitoring Tomcat Document](http://tomcat.apache.org/tomcat-5.5-doc/monitoring.html)

3\. Modify the "activemq" startup script (in bin) to enable the Java 1.5+ JMX connector

Find the "ACTIVEMQ\_SUNJMX\_START=" line and change it too the following: (note that in previous versions of ActiveMQ this property was called SUNJMX in some scripts.  As of v5.12.0 all scripts use ACTIVEMQ\_SUNJMX\_START):

1\. Windows

  ACTIVEMQ\_SUNJMX\_START=-Dcom.sun.management.jmxremote.port=1616 -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.password.file=%ACTIVEMQ_BASE%/conf/jmx.password \
    -Dcom.sun.management.jmxremote.access.file=%ACTIVEMQ_BASE%/conf/jmx.access

2\. Unix

  ACTIVEMQ\_SUNJMX\_START="-Dcom.sun.management.jmxremote.port=1616 -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.password.file=${ACTIVEMQ_BASE}/conf/jmx.password \
    -Dcom.sun.management.jmxremote.access.file=${ACTIVEMQ_BASE}/conf/jmx.access"

This could be set in /etc/activemq.conf instead (if you have root access):

1\. Windows

ACTIVEMQ\_HOME=DRIVE\_LETTER:/where/ActiveMQ/is/installed
ACTIVEMQ\_BASE=%ACTIVEMQ\_HOME%
ACTIVEMQ\_SUNJMX\_START=-Dcom.sun.management.jmxremote.port=1616 -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.password.file=%ACTIVEMQ_BASE%/conf/jmx.password \
    -Dcom.sun.management.jmxremote.access.file=%ACTIVEMQ_BASE%/conf/jmx.access

2\. Unix

ACTIVEMQ\_HOME=DRIVE\_LETTER:/where/ActiveMQ/is/installed
ACTIVEMQ\_BASE=${ACTIVEMQ\_HOME}
ACTIVEMQ\_SUNJMX\_START="-Dcom.sun.management.jmxremote.port=1616 -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.password.file=${ACTIVEMQ_BASE}/conf/jmx.password \
    -Dcom.sun.management.jmxremote.access.file=${ACTIVEMQ_BASE}/conf/jmx.access"

4\. Start ActiveMQ

You should be able to connect to JMX on the JMX URL

service:jmx:rmi:///jndi/rmi://<your hostname>:1616/jmxrmi

And you will be forced to login.

### Selective MBean registration

In situations where you need to scale your broker to large number of connections, destinations and consumers it can become very expensive to keep JMX MBeans for all those objects. Instead of turning off JMX completely, starting with 5.12.0, you can selectively suppress registration of some types of MBeans and thus help your broker scale, while still having a basic view of the broker state.

For example, the following configuration will exclude all dynamic producers, consumers, connections and advisory topics from registering their MBeans

<managementContext>
<managementContext 
   suppressMBean="endpoint=dynamicProducer,endpoint=Consumer,connectionName=*,destinationName=ActiveMQ.Advisory.*"
/>
</managementContext>

#### ManagementContext Properties Reference

Property Name

Default Value

Description

useMBeanServer

true

If true then it avoids creating a new MBean server if a MBeanServer has already been created in the JVM

jmxDomainName

org.apache.activemq

The jmx domain that all objects names will use

createMBeanServer

true

If we should create the MBeanServer is none is found.

createConnector

false

Please refer to [Java Management guide](http://docs.oracle.com/javase/6/docs/technotes/guides/management/agent.html) to configure the server for remote management and lock down the endpoint serialisation with an appropriate [jdk.serialFilter](http://openjdk.java.net/jeps/290)

connectorPort

1099

The port that the JMX connector will use

connectorHost

localhost

The host that the JMX connector and RMI server (if rmiServerPort>0) will use

rmiServerPort

0

The RMI server port, handy if port usage needs to be restricted behind a firewall

connectorPath

/jmxrmi

The path that JMX connector will be registered under

findTigerMBeanServer

true

Enables/disables the searching for the Java 5 platform MBeanServer

suppressMBean

 

List of MBean name patters to ignore

### [Overview](overview.html)

*   [Index](index.html)
*   [News](news.html)
*   [New Features](new-features.html)
*   [Getting Started](getting-started.html)
*   [FAQ](faq.html)
*   [Articles](articles.html)
*   [Books](books.html)
*   [Download](download.html)
*   [License](http://www.apache.org/licenses/)

### Search

    
  

### Sub Projects

*   [Artemis](http://activemq.apache.org/artemis/)
*   [Apollo](http://activemq.apache.org/apollo "ActiveMQ Apollo")
*   [CMS](http://activemq.apache.org/cms/)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](contributing.html)
*   [Discussion Forums](discussion-forums.html)
*   [Mailing Lists](mailing-lists.html)
*   [IRC](irc.html)
*   [IRC Log](http://javabot.evanchooly.com/logs/%23apache-activemq/today)
*   [Security Advisories](security-advisories.html)
*   [Site](site.html)
*   [Sponsorship](http://www.apache.org/foundation/sponsorship.html)
*   [Projects Using ActiveMQ](projects-using-activemq.html)
*   [Users](users.html)
*   [Team](team.html)
*   [Thanks](thanks.html)

### [Features](features.html)

*   [Advisory Message](advisory-message.html)
*   [Clustering](clustering.html)
*   [Cross Language Clients](cross-language-clients.html)
*   [Enterprise Integration Patterns](enterprise-integration-patterns.html)
*   [JMX](jmx.html)
*   [JMS to JMS Bridge](jms-to-jms-bridge.html)
*   [MasterSlave](masterslave.html)
*   [Message Groups](message-groups.html)
*   [Networks of Brokers](networks-of-brokers.html)
*   [Performance](performance.html)
*   [Persistence](persistence.html)
*   [Security](security.html)
*   [Virtual Destinations](virtual-destinations.html)
*   [Visualisation](visualisation.html)
*   [More ...](features.html)

### [Connectivity](connectivity.html)

*   [Ajax](ajax.html)
*   [AMQP](amqp.html)
*   [Axis and CXF Support](axis-and-cxf-support.html)
*   [C Integration](c-integration.html)
*   [C++](activemq-c-clients.html)
*   [C# and .Net Integration](http://activemq.apache.org/nms/)
*   [CMS](http://activemq.apache.org/cms/)
*   [J2EE](j2ee.html)
*   [JBoss Integration](jboss-integration.html)
*   [Jetty](http://docs.codehaus.org/display/JETTY/Integrating+with+ActiveMQ)
*   [JNDI Support](jndi-support.html)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [REST](rest.html)
*   [RSS and Atom](rss-and-atom.html)
*   [Spring Support](spring-support.html)
*   [Stomp](stomp.html)
*   [Tomcat](tomcat.html)
*   [Unix Service](unix-service.html)
*   [WebLogic Integration](weblogic-integration.html)
*   [XMPP](xmpp.html)
*   [More ...](connectivity.html)

### [Using ActiveMQ 5](using-activemq-5.html)

*   [Getting Started](version-5-getting-started.html)
*   [Initial Configuration](version-5-initial-configuration.html)
*   [Running a Broker](version-5-run-broker.html)
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html)
*   [Command Line Tools](activemq-command-line-tools-reference.html)
*   [Configuring Transports](configuring-version-5-transports.html)
*   [Examples](version-5-examples.html)
*   [Web Samples](version-5-web-samples.html)
*   [Monitoring the Broker](how-can-i-monitor-activemq.html)
*   [Xml Configuration](version-5-xml-configuration.html)
*   [Xml Reference](xml-reference.html)
*   [More ...](using-activemq-5.html)

### [Tools](tools.html)

*   [Web Console](web-console.html)
*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)

### [Support](support.html)

*   [Issues](http://issues.apache.org/jira/browse/AMQ)
*   [Roadmap](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:roadmap-panel)
*   [Change log](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:changelog-panel)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)
*   [Developer Guide](developer-guide.html)
*   [Becoming a committer](becoming-a-committer.html)
*   [Code Overview](code-overview.html)
*   [Wire Protocol](wire-protocol.html)
*   [Release Guide](release-guide.html)

### Tests

*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)
*   [Benchmark Tests](benchmark-tests.html)
*   [JMeter System Tests](jmeter-system-tests.html)
*   [JMeter Performance Tests](jmeter-performance-tests.html)
*   [Integration Tests](integration-tests.html)

### Project Reports

*   [JUnit Reports](junit-reports.html)
*   [Source XRef](source-xref.html)
*   [Test Source XRef](test-source-xref.html)
*   [Xml Reference](xml-reference.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35976))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();