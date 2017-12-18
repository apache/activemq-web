      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Activation Spec Properties 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [Resource Adapter](resource-adapter.html) > [Activation Spec Properties](activation-spec-properties.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

An Activation Spec is used to configure the message delivery to an MDB. The ejb-jar.xml deployment descriptor needs to include a <activation-config> element inside the <message-driven> element like:

<activation-config>
    <activation-config-property>
       <activation-config-property-name>destination</activation-config-property-name>
       <activation-config-property-value>queue.testQueue</activation-config-property-value>
    </activation-config-property>
    <activation-config-property>
       <activation-config-property-name>destinationType</activation-config-property-name>
       <activation-config-property-value>javax.jms.Queue</activation-config-property-value>
    </activation-config-property>
</activation-config>

Here, the value for destination is the physical name of the desired destination. The value for destinationType is the class name that defines the type of destination. It should be javax.jms.Queue or javax.jms.Topic.  
 

The Activation Spec properties that can be configured are:

Property Name

Required

Default Value

Description

acknowledgeMode

no

Auto-acknowledge

The JMS Acknowledgement mode to use. Valid values are: Auto-acknowledge or Dups-ok-acknowledge

clientId

no

set in resource adapter

The JMS Client ID to use (only really required for durable topics)

destinationType

yes

null

The type of destination; a queue or topic

destination

yes

null

The destination name (queue or topic name)

enableBatch

no

false

Used to enable transaction batching for increased performance

maxMessagesPerBatch

no

10

The number of messages per transaction batch

maxMessagesPerSessions

no

10

This is actually the prefetch size for the subscription. (Yes, badly named).

maxSessions

no

10

The maximum number of concurrent sessions to use

messageSelector

no

null

The JMS [Message Selector](selectors.html) to use on the subscription to perform content based routing filtering the messages

noLocal

no

false

Only required for topic subscriptions; indicates if locally published messages should be included in the subscription or not

password

no

set in resource adapter

The password for the JMS connection

subscriptionDurability

no

NonDurable

Whether or not a durable (topic) subscription is required. Valid values are: Durable or NonDurable

subscriptionName

no

null

The name of the durable subscriber. Only used for durable topics and combined with the clientID to uniquely identify the durable topic subscription

userName

no

set in resource adapter

The user for the JMS connection

useRAManagedTransaction

no

false

Typically, a resource adapter delivers messages to an endpoint which is managed by a container. Normally, this container likes to be the one that wants to control the transaction that the inbound message is being delivered on. But sometimes, you want to deliver to a simpler container system that will not be controlling the inbound transaction. In these cases, if you set useRAManagedTransaction to true, the resource adapter will commit the transaction if no exception was generated from the MessageListener and rollback if an exception is thrown.

initialRedeliveryDelay

no

1000

The delay before redeliveries start. Also configurable on the ResourceAdapter

maximumRedeliveries

no

5

The maximum number of redeliveries or -1 for no maximum. Also configurable on the ResourceAdapter

redeliveryBackOffMultiplier

no

5

The multiplier to use if exponential back off is enabled. Also configurable on the ResourceAdapter

redeliveryUseExponentialBackOff

no

false

To enable exponential backoff. Also configurable on the ResourceAdapter

useJndi

no

false

when true, use destination as a jndi name

Maximising Throughput of MDBs

If you want to maximise throughput of MDBs you should really set the **maxSessions** to something fairly large to increase the concurrency. Then set **maxMessagesPerSessions** to something big (say) 1000.

This assumes you have large numbers of messages available (say more than **maxSessions** \* **maxMessagesPerSession**). Otherwise the [prefetch](what-is-the-prefetch-limit-for.html) will end up [starving other consumers](i-do-not-receive-messages-in-my-second-consumer.html).

So if you don't have that many messages available, but maybe they take a while to process then you might want to set a lower value of **maxMessagesPerSessions**

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36189))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();