      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- What is the Prefetch Limit For? 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [What is the Prefetch Limit For?](what-is-the-prefetch-limit-for.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

One of the design goals of ActiveMQ is to be a highly performant message bus. This means using a [SEDA](seda.html) architecture to perform as much work as possible asynchronously. To make efficient use of network resources the broker utilizes a 'push' model to dispatch messages to consumers. This ensures that a consumer always has a local buffer of messages ready to process. The alternative would be for consumers to explicitly pull messages from the broker. Pulling messages individually is not very efficient and can increase the per message latency significantly.

However, there is a danger that without limiting the number of messages that are pushed to a consumer its client-side resources could become exhausted. This is the natural consequence of message consumption typically being much slower than message delivery. To avoid this situation ActiveMQ therefore employs a **prefetch limit** to limit the maximum number of messages that can be dispatched to an individual consumer at once. The consumer in turn uses the prefetch limit to size its prefetch message buffer.

Once the broker has dispatched a prefetch limit number of messages to a consumer it will not dispatch any more messages to that consumer until the consumer has acknowledged at least 50% of the prefetched messages, e.g., prefetch/2, that it received. When the broker has received said acknowledgements it will dispatch a further prefetch/2 number of messages to the consumer to 'top-up', as it were, its prefetch buffer. Note that it's possible to specify a prefetch limit on a per consumer basis (see below).

Large prefetch values are recommended for high performance with high message volumes. However, for lower message volumes, where each message takes a long time to process, the prefetch should be set to 1. This ensures that a consumer is only processing one message at a time. Specifying a prefetch limit of zero, however, will cause the consumer to poll for messages, one at a time, instead of the message being pushed to the consumer.

What is a Slow Consumer?

A slow consumer is one that has more than twice its configured prefetch limit number of messages pending.

Implementing Consumers Using a Dynamic Language

Consumers that are unable to cache prefetched messages must set their prefetch to 1. An example of such a consumer is one implemented using a scripting language like Ruby, say, that connects via STOMP. In this case there's no notion of a client-side message buffer.

### Specifying the PrefetchPolicy

You can specify an instance of the [ActiveMQPrefetchPolicy](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQPrefetchPolicy.html) on an [ActiveMQConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnectionFactory.html) or [ActiveMQConnection](http://activemq.apache.org/maven/apidocs/org/apache/activemq/ActiveMQConnection.html). This allows you to configure all the individual prefetch values; as each different quality of service has a different value. e.g.

*   persistent queues (default value: **`1000`**)
    
*   non-persistent queues (default value: **`1000`**)
    
*   persistent topics (default value: **`100`**)
    
*   non-persistent topics (default value: **`Short.MAX_VALUE - 1`**)
    

The prefetch limit can also be configured on the connection URI used to establish a connection the broker. To change the prefetch limit for all consumer types configure a connection URI as follows:

tcp://localhost:61616?jms.prefetchPolicy.all=50

To change the prefetch limit for queue consumers only configure the connection URI as follows:

tcp://localhost:61616?jms.prefetchPolicy.queuePrefetch=1

It can also be configured on a per consumer basis using [Destination Options](destination-options.html):

queue = new ActiveMQQueue("TEST.QUEUE?consumer.prefetchSize=10");
consumer = session.createConsumer(queue);

### Pooled Consumers and Prefetch

Consuming messages from a pool of consumers an be problematic due to prefetch. Unconsumed prefetched messages are only released when a consumer is closed, but with a pooled consumer the close is deferred (for reuse) till the consumer pool closes. This leaves prefetched messages unconsumed till the consumer is reused. This feature can be desirable from a performance perspective. However, it can lead to out-of-order message delivery when there is more than one consumer in the pool. For this reason, the [org.apache.activemq.pool.PooledConnectionFactory](http://activemq.apache.org/maven/apidocs/org/apache/activemq/jms/pool/PooledConnectionFactory.html) does **not** pool consumers.

Pooling consumers is supported by Springs CachingConnectionFactory (although turned off by default). In case you use the CachingConnectionFactory with multiple consumer threads configured in Springs DefaultMessageListenerContainer (DMLC) then you either want to turn off consumer pooling in the CachingConnectionFactory (its off by default) or you may want to use a prefetch of 0 when pooling consumers. In this way, the consumer will poll for messages on each call to **`receive(timeout)`**. Its generally recommended to turn off consumer caching in Springs CachingConnectionFactory and any other frameworks that allow to pool JMS consumers.

Note that Springs DefaultMessageListenerContainer (DMLC) and its **`CACHE_CONSUMER`** cache level is not affected by this problem! Springs DMLC does not pool consumers in the sense that it does not use an internal pool with multiple consumer instances. Instead it caches the consumer, i.e. it re-uses the same JMS consumer object to receive all messages for the life time of the DMLC instance. So it behaves pretty much like properly hand written JMS code, where you create the JMS connection, session, consumer and then use this consumer instance to receive all your messages.  
Hence there is no problem with using  **`CACHE_CONSUMER`** in Springs DMLC, even with multiple consumer threads, unless you are using XA transactions. XA transactions do not work with **`CACHE_CONSUMER`**. However local JMS transactions and non-transacted consumers are just fine to use  **`CACHE_CONSUMER`** in Springs DMLC.

Also note that Camel's [JMS](http://camel.apache.org/jms.html) or [ActiveMQ](http://camel.apache.org/activemq.html) components use Springs DMLC internally. So everything said above about Springs DMLC and  **`CACHE_CONSUMER`** applies to these two Camel components as well.

### Ram vs. Performance Trade-off

Setting a relatively high value of prefetch leads to higher performance. Therefore the default values are typically greater than 1000 and much higher for topics and higher still for the non-persistent messages. The prefetch size dictates how many messages will be held in RAM on the client so if your RAM is limited you may want to set a low value such as 1 or 10 etc.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36183))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();