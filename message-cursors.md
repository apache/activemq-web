      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Message Cursors 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Message Dispatching Features](message-dispatching-features.html) > [Message Cursors](message-cursors.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Message Cursors
---------------

A common problem in previous versions of ActiveMQ was [running out of RAM buffer](my-producer-blocks.html) when using non-persistent messaging.

Beginning with ActiveMQ 5.0.0, there is a new memory model that allows messages to be paged in from storage when space is available (using Store cursors for persistent messages).

Releases prior to 5.0 kept references in memory for all the messages that could be dispatched to an active Durable Topic Consumer or a Queue. While a reference itself is not large, it does impose a limit on the maximum number of messages that can be pending delivery.

A typical approach for messaging systems dispatching persistent messages is to pull them in batches from long term storage when a client is ready to consume them, using a cursor to maintain the next to dispatch position. This is a robust and very scalable approach, but not the most performant for cases when the consumer(s) can keep up with the producer(s) of messages.

ActiveMQ 5.0 takes a hybrid approach, allowing messages to pass from producer to consumer directly (after the messages have been persisted), but switches back to using cursors if the consumer(s) fall behind.

When Message Consumers are both active and fast - keeping up with the Message Producer(s) - messages are stored and then passed to a dispatch queue in the broker associated with the Consumer: ![](message-cursors.data/DispatchFastConsumers.png)  
If a Consumer becomes active after messages are pending from the store for it, or it's slower than the producer, then messages are paged in to the dispatch queue from a pending cursor: ![](message-cursors.data/DispatchSlowConsumers.png)

### Types of Cursor

The default message cursor type in ActiveMQ 5.0 is Store based.  It behaves as above. There are two additional types of cursor that could be used: **VM Cursor** and **File based Cursor**, described below.

#### VM Cursor

The VM Cursor is how ActiveMQ 4.x works: references to a message are held in memory, and passed to the dispatch queue when needed. This can be very fast, but also has the downside of not being able to handle very slow consumers or consumers that have been inactive for a long time: ![](message-cursors.data/VMCursor.png)

#### File based Cursor

The File based Cursor is dervied from the VM Cursor.  When memory in the broker reaches its limit, it can page messages to temporary files on disk. This type of cursor can be used when the message store might be relatively slow, but consumers are generally fast. By buffering to disk, it allows the message broker to handle message bursts from producers without resorting to paging in from slow storage: ![](message-cursors.data/FileCursor.png)

#### Paging for Non-Persistent Messages

The store based cursor also handles cursors for non-persistent messages, which are not stored in the message store. Non-persistent messages are passed directly to the cursor, so the store based cursor embeds a file based cursor just for these types of messages: ![](message-cursors.data/NonPersistentMsgs.png)

### Configuring Cursors

By default, Store based cursors are used, but it is possible to configure different cursors depending on the destination.

#### Topic subscribers

For Topics there is a dispatch queue and pending cursor for every subscriber.  It's possible to configure different policies for durable subscribers and transient subscribers - e.g:

<destinationPolicy>
      <policyMap>
        <policyEntries>
          <policyEntry topic="org.apache.>" producerFlowControl="false" memoryLimit="1mb">
            <dispatchPolicy>
              <strictOrderDispatchPolicy />
            </dispatchPolicy>
            <deadLetterStrategy>
              <individualDeadLetterStrategy  topicPrefix="Test.DLQ." />
            </deadLetterStrategy>
            <pendingSubscriberPolicy>
            	<vmCursor />
            </pendingSubscriberPolicy>
            <pendingDurableSubscriberPolicy>
                <vmDurableCursor/>
            </pendingDurableSubscriberPolicy>
          </policyEntry>
        </policyEntries>
      </policyMap>
</destinationPolicy>

Valid Subscriber types are **_vmCursor_** and **_fileCursor._** The default is the store based cursor.  
Valid Durable Subscriber cursor types are **_storeDurableSubscriberCursor_**, **_vmDurableCursor_** and **_fileDurableSubscriberCursor._** The default is the store based cursor

#### Queues

For Queues there is a single dispatch Queue and pending Queue for every destination, so configuration is slightly different:

<destinationPolicy>
      <policyMap>
        <policyEntries>
          <policyEntry queue="org.apache.>">
            <deadLetterStrategy>
              <individualDeadLetterStrategy queuePrefix="Test.DLQ."/>
            </deadLetterStrategy>
            <pendingQueuePolicy>
            	<vmQueueCursor />
            </pendingQueuePolicy>
          </policyEntry>
        </policyEntries>
      </policyMap>
 </destinationPolicy>

Valid Queue cursor types are **_storeCursor_**, **_vmQueueCursor_** and **_fileQueueCursor._** The default is the store based cursor

### See Also

*   [Producer Flow Control](producer-flow-control.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=48811))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();