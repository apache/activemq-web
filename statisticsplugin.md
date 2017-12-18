      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- StatisticsPlugin 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Interceptors](interceptors.html) > [StatisticsPlugin](statisticsplugin.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Beginning in ActiveMQ 5.3, a statistics plugin is included that can be used to retrieve statistics from the broker or its destinations. Note that the message must contain a `replyTo` header (the `jmsReplyTo` header if you're using JMS) else the message will be ignored. The `replyTo` header must contain the name of the destination from which you want to retrieve the stats message(s). The statistics message is a `MapMessage` populated with statistics for the target (i.e., a broker or a destination).

To retrieve stats for the broker, just send an empty message to the destination named `ActiveMQ.Statistics.Broker` along with a `replyTo` header. To retrieve stats for a destination, just send an empty message to the destination named `ActiveMQ.Statistics.Destination.<destination-name>` or `ActiveMQ.Statistics.Destination.<wildcard-expression>` along with a `replyTo` header. If many destinations match a given wildcard expression, one stats message for each destination will be sent to the `replyTo` destination.

To configure ActiveMQ to use the statistics plugin, just add the following to the ActiveMQ XML configuration:

<broker ...>
  <plugins>
    <statisticsBrokerPlugin/>
  </plugins>
</broker>

The statistics plugin looks for messages sent to particular destinations. Below is an example of using the statistics plugin to grab stats from a broker:

Queue replyTo = session.createTemporaryQueue();
MessageConsumer consumer = session.createConsumer(replyTo);

String queueName = "ActiveMQ.Statistics.Broker";
Queue testQueue = session.createQueue(queueName);
MessageProducer producer = session.createProducer(testQueue);
Message msg = session.createMessage();
msg.setJMSReplyTo(replyTo);
producer.send(msg);

MapMessage reply = (MapMessage) consumer.receive();
assertNotNull(reply);

for (Enumeration e = reply.getMapNames();e.hasMoreElements();) {
  String name = e.nextElement().toString();
  System.out.println(name + "=" + reply.getObject(name));
}

The output from the code above is shown below:

vm=vm://localhost  
memoryUsage=0  
storeUsage=3330  
tempPercentUsage=0  
ssl=  
openwire=tcp://localhost:50059  
brokerId=ID:bigmac-50057-1253605065511-0:0  
consumerCount=2  
brokerName=localhost  
expiredCount=0  
dispatchCount=1  
maxEnqueueTime=5.0  
storePercentUsage=0  
dequeueCount=0  
inflightCount=1  
messagesCached=0  
tempLimit=107374182400  
averageEnqueueTime=5.0  
stomp+ssl=  
memoryPercentUsage=0  
size=10  
tempUsage=0  
producerCount=1  
minEnqueueTime=5.0  
dataDirectory=/Users/rajdavies/dev/projects/activemq/activemq-core/activemq-data  
enqueueCount=10  
stomp=  
storeLimit=107374182400  
memoryLimit=67108864

Similarly, to query the statistics for a destination just send a message to the destination name prepended with `ActiveMQ.Statistics.Destination`. For example, to retrieve the statistics for a queue whose name is TEST.FOO, send an empty message to the queue named `ActiveMQ.Statistics.Destination.TEST.FOO`. Below is an example:

Queue replyTo = session.createTemporaryQueue();
MessageConsumer consumer = session.createConsumer(replyTo);

Queue testQueue = session.createQueue("TEST.FOO");
MessageProducer producer = session.createProducer(null);

String queueName = "ActiveMQ.Statistics.Destination." + testQueue.getQueueName()
Queue query = session.createQueue(queueName);

Message msg = session.createMessage();

producer.send(testQueue, msg) 
msg.setJMSReplyTo(replyTo);
producer.send(query, msg);
MapMessage reply = (MapMessage) consumer.receive();
assertNotNull(reply);
assertTrue(reply.getMapNames().hasMoreElements());
        
for (Enumeration e = reply.getMapNames();e.hasMoreElements();) {
    String name = e.nextElement().toString();
    System.err.println(name + "=" + reply.getObject(name));
}

The output from the code above is shown below:

memoryUsage=0  
dequeueCount=0  
inflightCount=0  
messagesCached=0  
averageEnqueueTime=0.0  
destinationName=queue://TEST.FOO  
size=1  
memoryPercentUsage=0  
producerCount=0  
consumerCount=0  
minEnqueueTime=0.0  
maxEnqueueTime=0.0  
dispatchCount=0  
expiredCount=0  
enqueueCount=1  
memoryLimit=67108864

You can also use wildcards in the queue name, too. This will result in a separate stats message for every destination that is matched by the wildcard. Very handy indeed.

### Subscriptions statistics

Since 5.6.0 you can also retrieve statistics on all queue and topic subscriptions. All you need to do it send an empty message to the destination named `ActiveMQ.Statistics. Subscription` along with a `replyTo` header.  The response will come in the form of one or more messages each containing the statistics for exactly one subscription on the Broker. 

Below is an example of using the statistics plugin to grab stats from a broker:

Queue replyTo = session.createTemporaryQueue();
MessageConsumer consumer = session.createConsumer(replyTo);

String queueName = "ActiveMQ.Statistics.Subscription";
Queue testQueue = session.createQueue(queueName);
MessageProducer producer = session.createProducer(testQueue);
Message msg = session.createMessage();
msg.setJMSReplyTo(replyTo);
producer.send(msg);

MapMessage reply = (MapMessage) consumer.receive();
assertNotNull(reply);

for (Enumeration e = reply.getMapNames();e.hasMoreElements();) {
  String name = e.nextElement().toString();
  System.out.println(name + "=" + reply.getObject(name));
}

An example output from the code above is shown below:

selector=null  
dispatchedQueueSize=1  
maximumPendingMessageLimit=0  
exclusive=false  
connectionId=ID:dejan-bosanacs-macbook-pro-2.local-64989-1335528942875-4:1  
destinationName=Test.Queue  
clientId=ID:dejan-bosanacs-macbook-pro-2.local-64989-1335528942875-3:1  
slowConsumer=false  
prefetchSize=1000  
sessionId=1  
dequeueCounter=0  
enqueueCounter=1  
retroactive=false  
dispatchedCounter=1

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=5144972))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();