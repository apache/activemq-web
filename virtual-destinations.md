      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Virtual Destinations 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Destination Features](destination-features.html) > [Virtual Destinations](virtual-destinations.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

_Virtual Destinations_ allow us to create logical destinations that clients can use to produce and consume from but which map onto one or more _physical destinations_. It allows us to provide more flexible loosely coupled messaging configurations.

Virtual Topics
--------------

The idea behind _publish subscribe_ is a great one. Allow producers to be decoupled from consumers so that they do not even know how many consumers are interested in the messages they publish. The JMS specification defines support for durable topics however they have limitations as we will describe...

### The limitations of JMS durable topics

A JMS durable subscriber MessageConsumer is created with a unique JMS clientID and durable subscriber name. To be JMS compliant only one JMS connection can be active at any point in time for one JMS clientID, and only one consumer can be active for a clientID and subscriber name. i.e., only **one** thread can be actively consuming from a given logical topic subscriber. This means we cannot implement

*   load balancing of messages.
*   fast failover of the subscriber if that one process running that one consumer thread dies.

Now _queue_ semantics in JMS offer the ability to load balance work across a number of consumers in a reliable way - allowing many threads, processes and machines to be used to process messages. Then we have sophisticated sticky load balancing techniques like [Message Groups](message-groups.html) to load balance and parallelise work while maintaining ordering.

Another added benefit of having physical queues for each logical topic subscriber is we can them monitor the queue depths via [JMX](jmx.html) to monitor system performance together with being able to browse these physical queues.

### Virtual Topics to the rescue

The idea behind virtual topics is that producers send to a topic in the usual JMS way. Consumers can continue to use the Topic semantics in the JMS specification. However if the topic is virtual, consumer can consume from a physical queue for a logical topic subscription, allowing many consumers to be running on many machines & threads to load balance the load.

E.g., let's say we have a topic called **VirtualTopic.Orders**. (Where the prefix VirtualTopic. indicates its a virtual topic). And we logically want to send orders to systems A and B. Now with regular durable topics we'd create a JMS consumer for clientID\_A and "A" along with clientID\_B and "B".

With virtual topics we can just go right ahead and consume to queue **Consumer.A.VirtualTopic.Orders** to be a consumer for system A or consume to **Consumer.B.VirtualTopic.Orders** to be a consumer for system B.

We can now have a pool of consumers for each system which then compete for messages for systems A or B such that all the messages for system A are processed exactly once and similarly for system B.

### Customizing the out-of-the-box defaults

The out-of-the-box defaults are described above. Namely that the only virtual topics available must be within the **VirtualTopic.>** namespace and that the consumer queues are named **Consumer.*.VirtualTopic.>**.

You can configure this to use whatever naming convention you wish. The following [example](https://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/broker/virtual/global-virtual-topics.xml) shows how to make all topics virtual topics. The example below is using the name **>** to indicate 'match all topics'. You could use this wildcard to apply different virtual topic policies in different hierarchies.

<destinationInterceptors> 

 <virtualDestinationInterceptor> 

 <virtualDestinations> 

 <virtualTopic name=">" prefix="VirtualTopicConsumers.*." selectorAware="false"/>   

   </virtualDestinations>

 </virtualDestinationInterceptor> 

</destinationInterceptors>

Note that making a topic virtual does add a small CPU overhead when sending messages to the topic but it is fairly small.

Option

Default

Description

selectorAware

false

only messages that match one of the existing subscribers are actually dispatched. Using this option prevents the build up of unmatched messages when selectors are used by exclusive consumers

local

false

when true, don't fan out messages that were received over a network

concurrentSend

false

when true, use an executor to fanout such that sends occur in parallel. This allows the journal to batch writes which will reduce disk io (5.12)

transactedSend

false

when true, use a transaction for fanout sends such that there is a single disk sync. A local broker transaction will be created if there is no client transaction (5.13)

dropOnResourceLimit

false

when true, ignore any ResourceAllocationException thrown during fanout (see: sendFailIfNoSpace policy entry) (5.16)

Composite Destinations
----------------------

Composite Destinations allow for one-to-many relationships on individual destinations; the main use case is for _composite queues_. For example when a message is sent to queue A you may want to forward it also to queues B and C and topic D. Composite destinations are then a mapping from a virtual destination to a collection of other physical destinations. In this case the mapping is broker side and the client is unaware of the mapping between the destinations. This is different from client side [Composite Destinations](composite-destinations.html) where the client uses a URL notation to specify the actual physical destinations that a message must be sent to.

The following [example](http://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/broker/virtual/composite-queue.xml) shows how to set up a **<compositeQueue/>** element in the XML configuration so that when a message is sent to `MY.QUEUE` then it is really forwarded to the physical queue `FOO` and the topic `BAR`.

<destinationInterceptors>

 <virtualDestinationInterceptor> 

 <virtualDestinations> 

 <compositeQueue name="MY.QUEUE">

 <forwardTo>

 <queue physicalName="FOO" /> 

 <topic physicalName="BAR" />

 </forwardTo>

 </compositeQueue>

 </virtualDestinations>

 </virtualDestinationInterceptor>

</destinationInterceptors>

By default, subscribers cannot consume messages directly from a composite queue or topic - it is a logical construct only. Given the configuration above, subscribers can only consume messages from `FOO` and `BAR`; but not `MY.QUEUE`.

This behaviour can be altered to implement use cases such as watching a queue by sending the same messages to a notification topic (wire tapping), by setting the optionally set `forwardOnly` attribute to false.

<compositeQueue name="IncomingOrders" forwardOnly="false"> 

   <forwardTo>

    <topic physicalName="Notifications" />

   </forwardTo>

 </compositeQueue>

Messages sent to `IncomingOrders` will all be copied and forwarded to `Notifications`, before being placed on the physical `IncomingOrders` queue for consumption by subscribers.

Where the `forwardOnly` attribute is not defined or is set to `true`, there is no logical difference between a `compositeQueue` and a `compositeTopic` \- they can be used interchangeably. It is only when a composite destination is made physical through the use of `forwardOnly` that the choice of `compositeTopic`/`compositeQueue` has an impact on behavior.

### Using filtered destinations

From Apache ActiveMQ **4.2** onwards you can now use selectors to define virtual destinations.

You may wish to create a virtual destination which forwards messages to multiple destinations but applying a selector first to decide if the message really does have to go to a particular destination.

The following example shows how a message sent to the virtual destination **MY.QUEUE** will be forwarded to **FOO** and **BAR** if the selectors match

<destinationInterceptors> <virtualDestinationInterceptor> <virtualDestinations> 

   <compositeQueue name="MY.QUEUE">

    <forwardTo>

     <filteredDestination selector="odd = 'yes'" queue="FOO"/>

     <filteredDestination selector="i = 5" topic="BAR"/>

    </forwardTo>

  </compositeQueue>

</virtualDestinations> </virtualDestinationInterceptor> </destinationInterceptors>

Avoiding Duplicate Message in a Network of Brokers
--------------------------------------------------

You have to make sure that the messages sent to the **Consumer.*.VirtualTopic.>** destination are not forwarded when you're using both queue-based and non-queue based subscribers to the virtual topic (that is, if you have normal topic subscribers to the virtual topic). If you use Virtual Topics in a network of brokers, it is likely you will get duplicate messages if you use the default network configuration. This is because a network node will not only forward message sent to the virtual topic, but also the associated physical queues. To fix this, you should disable forwarding messages on the associated physical queues.

Here is an example of how to do that:

<networkConnectors> <networkConnector uri="static://([tcp://localhost:61617](tcp://localhost:61617))">

 <excludedDestinations> 

 <queue physicalName="Consumer.*.VirtualTopic.>"/> 

 </excludedDestinations> 

</networkConnector> </networkConnectors>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35884))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();