      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Dispatch Policies 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Message Dispatching Features](message-dispatching-features.html) > [Dispatch Policies](dispatch-policies.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Dispatch Policies
=================

Dispatch policies for queues
----------------------------

Plug-able dispatch policies only apply to topics. For Queues, dispatch is more static, you can choose round robin (the default) or strict order. Before discussing dispatch policies its worth first understanding [the purpose of the prefetch value](what-is-the-prefetch-limit-for.html).

The out of the box configuration of ActiveMQ is designed for high performance and high throughput messaging where there are lots of messages that need to be dispatched to consumers as quickly as possible. So the default prefetch values are fairly large and the default dispatch policy will try and fill the prefetch buffers as quickly as possible.

However with messaging there are many use cases and sometimes the default configuration is not ideal to your use case; when you send a small number of messages, they tend to all go to one consumer unless you've lots of messages. If you have a large number of consumers and a relatively high [prefetch value](what-is-the-prefetch-limit-for.html) and you have a small number of messages that each message takes quite a while to process then the default dispatch policy might result in increasing the amount of time it takes to process all the messages (since the load balancing is not fair for small numbers of messages).

For queues, you can define whether the dispatch will occur in a round-robin fashion (default behaviour) or if one consumer's prefetch buffer will be exhausted before the dispatch process selects the next consumer along (strictOrderDispatch).  
The latter behaviour is enabled by setting the "strictOrderDispatch" attribute on the <policyEntry /> element. E.g.:

<policyEntry queue=">" strictOrderDispatch="false" />

Consumer priorities are observed, so if you have several consumers with different [priorities](http://activemq.apache.org/consumer-priority.html), the one with the highest priority will be flooded first until it can take no more, then the next one along, etc.

From version 5.14.0 - the strictOrderDispatch=true option will ensure strict order for redispatched messages when there is a single consumer. 

Dispatch policies for Topics
----------------------------

There are more options for topics because the dispatch policy is plug-able. Any implementation of org.apache.activemq.broker.region.policy.DispatchPolicy will work.  
The default org.apache.activemq.broker.region.policy.SimpleDispatchPolicy does what one would expect and delivers messages to all subscribers. An example of a more advanced implementation is the org.apache.activemq.broker.region.policy.PriorityNetworkDispatchPolicy which will only dispatch to the highest priority network consumer. This is useful in a loop network topology where there is more than route to a consumer.

Here is an [example of destination policy configuration](http://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/xbean/activemq-policy.xml).

xml<destinationPolicy> <policyMap> <policyEntries> <policyEntry topic="FOO.>"> <dispatchPolicy> <roundRobinDispatchPolicy /> </dispatchPolicy> <subscriptionRecoveryPolicy> <lastImageSubscriptionRecoveryPolicy /> </subscriptionRecoveryPolicy> </policyEntry> <policyEntry topic="ORDERS.>"> <dispatchPolicy> <strictOrderDispatchPolicy /> </dispatchPolicy> <!-- 1 minutes worth --> <subscriptionRecoveryPolicy> <timedSubscriptionRecoveryPolicy recoverDuration="60000" /> </subscriptionRecoveryPolicy> </policyEntry> <policyEntry topic="PRICES.>"> <!-- lets force old messages to be discarded for slow consumers --> <pendingMessageLimitStrategy> <constantPendingMessageLimitStrategy limit="10"/> </pendingMessageLimitStrategy> <!-- 10 seconds worth --> <subscriptionRecoveryPolicy> <timedSubscriptionRecoveryPolicy recoverDuration="10000" /> </subscriptionRecoveryPolicy> </policyEntry> <policyEntry tempTopic="true" advisoryForConsumed="true" /> <policyEntry tempQueue="true" advisoryForConsumed="true" /> </policyEntries> </policyMap> </destinationPolicy>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35950))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();