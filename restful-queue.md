      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- RESTful Queue 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Developers](developers.html) > [Ideas](ideas.html) > [RESTful Queue](restful-queue.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

RESTful Queue
-------------

This document is intended to document the ideal RESTful interface to message queues in light of

*   [the discussion on rest-discuss](http://tech.groups.yahoo.com/group/rest-discuss/message/8955)
*   [Atom Publishing Protocol](http://bitworking.org/projects/atom/draft-ietf-atompub-protocol-17.html) (APP)
*   [httplr](http://www.dehora.net/doc/httplr/draft-httplr-01.html)

### Issues with Queues and REST

One of the main issues with making a truly RESTful API to a message queue is that a message queue is essentially a load balancer, so each consumer of a queue sees essentially a different queue; as only one consumer gets a copy of each message.

Also if a consumer goes away, the messages that were associated with that consumer need to be re-assigned to another consumer. So the main tricky part really is the operation for a consumer to find out what messages it may consume.

### Queue administration

This section deals with the general browsing and creation/deletion of queues.

#### Browse available queues

To browse the queues, they are a hierarchial structure usually, so lets browse them like any APP collection

GET /queues
-------------------->

200 OK
Atom Feed with one entry per directory/category/queue
<--------------------

#### Browse a queue's messages

GET /queues/uk/products/books/computers
-------------------->

200 OK
Atom Feed with one entry per pending message
<--------------------

Note that we could expose the queues as a tree, for example

GET /queues/uk/products
-------------------->

200 OK
Atom Feed with one entry per queue in uk.products.* together with any child catgory/directory
<--------------------

#### Creating a queue

Creating a queue is typically idempotent; since really you are just creating a name that folks can post to.

POST /queues
-------------------->

201 OK
Location: someUniqueUrlForTheNewQueueToBePostedTo
<--------------------

#### Deleting a queue

DELETE /queues/foo.bar
-------------------->

200 OK
<--------------------

### Send to queue

Sending to queue is the usual APP-style double request; one to get the unique URI to post to and secondly to do the actual post...

POST /queues/foo.bar
-------------------->

201 OK
Location: someUniqueUrlForTheNewMessageToBePostedTo
<--------------------

The client can then repeatedly POST the mesage to someUniqueUrlForTheNewMessageToBePostedTo until it gets a 200 OK which avoids duplicates.

#### Optional alternative for single request

If a smart client is capable of generating a system wide unique GUID (id) for the message, the server side could ignore duplicates. So posting to queue could be done without the double-request approach above

POST /queues/foo.bar?guid=clientGeneratedUniqueId
-------------------->

200 OK
<--------------------

### Consuming from a queue

As described above, this is the tricky part of mapping message queues to REST.

So we introduce a resource for a _subscription_ to a queue. The subscription remains active until some timeout value - so a subscription is a sort of lease.

When a subscription is created it can be given a variety of different pieces of data such as

*   the [prefetch buffer](what-is-the-prefetch-limit-for.html)
*   what destinations it applies to (for example we could use wildcards)
*   whether a selector/filter is applied

#### Create a subscription

POST /subscriptions
-------------------->

201 OK
Location: subscriptionUri
<--------------------

The actual subscription data could be form encoded key/value pairs.

#### Deleting a subscription

Good clients will delete subscriptions when they are no longer required; though they do timeout eventually.

DELETE subscriptionUri
-------------------->

200 OK
<--------------------

#### Consuming messages

You consume messages by browsing the subscription (like any APP resource) then DELETEing the message when you have finished processing it.

GET subscriptionUri
-------------------->

200 OK
Atom Feed with one entry per message associated to this subscription
<--------------------

Then to acknowledge a particular message has been processed

DELETE messageUri
-------------------->

200 OK
<--------------------

Deltas with APP
---------------

Almost all of the above could be just pure APP really. The only real difference is that each consumer has its own feed of messages which are to be consumed.

In ActiveMQ's case, we use a [prefetch value per consumer](what-is-the-prefetch-limit-for.html) to define how many messages each consumer gets in its buffer, before messages must be acknowledged to get more messages.

So the idea is that we have a per-consumer feed which is created; it can then be browsed (by anyone with sufficient karma).

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=64355))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();