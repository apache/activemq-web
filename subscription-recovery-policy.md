      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Subscription Recovery Policy 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Consumer Features](consumer-features.html) > [Subscription Recovery Policy](subscription-recovery-policy.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The subscription recovery policy allows you to go back in time when you subscribe to a topic.

For example imagine you are processing a price feed; you're using a federated network and either a network glitch occurs or someone kills the broker you're talking to. If you reconnect to another broker in the cluster you may have lost messages.

So we support a timed or fixed size recovery buffer so that if you reconnect to another broker within some time period (depending on volume & RAM this could be 30 seconds to 5 minutes), then any messages you missed during the downtime are redelivered before new messages are delivered to you.

For more information see [Retroactive Consumer](retroactive-consumer.html)

### Last image caching

Its often common in financial market data type worlds to want to know the latest price of say IBM stock along with get all the future updates to the price. Historically you often had a request-reply snapshot quote service for the latest price, then you subscribe to a topic for updates. The issue is the client then has 2 APIs / middlewares to deal with - often quite different things - plus you have an ordering issue (race condition) - the update could beat the last price request so you can get out of order (going back in time to an old price, which could be very old).

One of our _subscription recovery policy_ implementations is called **Last Image Subscription Policy** which will ensure that when you subscribe to a topic (say PRICES.NASDAQ.IBM), you will receive the last image (the last message that was sent on that topic) plus any updates which occur in the future, with ordering to ensure that the last image is always first before any new messages arrive.

A common problem in market data type situations is that you may have a cache of last image prices, then a feed of new price changes; if you request the last price from the cache and subscribe to new prices; depending on how you do it you can either, miss an update or receive a newer update before the old last image arrives (so either get out of order messages).

Note that you can configure the subscription recovery policy, and most other policies on different destinations or wildcards. So you may use last image policy for prices on topics only and use a buffered fixed size policy for other notifications on different topics etc.

### Summary of Available Recovery Policies

Policy Name

Sample Configuration

Description

FixedSizedSubscriptionRecoveryPolicy

<fixedSizedSubscriptionRecoveryPolicy maximumSize="1024"/>

Keep a fixed amount of memory in RAM for message history which is evicted in time order.

FixedCountSubscriptionRecoveryPolicy

<fixedCountSubscriptionRecoveryPolicy maximumSize="100"/>

Keep a fixed count of last messages.

LastImageSubscriptionRecoveryPolicy

<lastImageSubscriptionRecoveryPolicy/>

Keep only the last message.

NoSubscriptionRecoveryPolicy

<noSubscriptionRecoveryPolicy/>

Disables message recovery.

QueryBasedSubscriptionRecoveryPolicy

<queryBasedSubscriptionRecoveryPolicy query="JMSType = 'car' AND color = 'blue'"/>

Perform a user specific query mechanism to load any message they may have missed. Details on message selectors are available here:

[http://java.sun.com/j2ee/1.4/docs/api/javax/jms/Message.html](http://java.sun.com/j2ee/1.4/docs/api/javax/jms/Message.html)

TimedSubscriptionRecoveryPolicy

<timedSubscriptionRecoveryPolicy recoverDuration="60000" />

Keep a timed buffer of messages around in memory and use that to recover new subscriptions. Recovery time is in milliseconds.

RetainedMessageSubscriptionRecoveryPolicy

<retainedMessageSubscriptionRecoveryPolicy/>

Keep the last message with ActiveMQ.Retain property set to true

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35886))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();