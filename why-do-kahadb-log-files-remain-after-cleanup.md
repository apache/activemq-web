      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Why do KahaDB log files remain after cleanup 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [Why do KahaDB log files remain after cleanup](why-do-kahadb-log-files-remain-after-cleanup.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Clean-up of un-referenced KahaDB journal log files **`data-<id>.log`** will occur every 30 seconds by default. If a data file is in-use it will not be cleaned up.

A data file may be in-use because:

1.  It contains a pending message for a destination or durable topic subscription
2.  It contains an ACK for a message which is in an in-use data file - the ACK cannot be removed as a recovery would then mark the message for redelivery
3.  The journal references a pending transaction
4.  It is a journal file, and there may be a pending write to it

The **`TRACE`** level logging of the **`org.apache.activemq.store.kahadb.MessageDatabase`** class provides insight into the cleanup process and will allow you to determine why a given data file is considered in-use and as a result, not a candidate for cleanup.

To debug, add the following (or similar) to your **`log4j.properties`** file (if needed):

log4j.appender.kahadb=org.apache.log4j.RollingFileAppender 
log4j.appender.kahadb.file=${activemq.base}/data/kahadb.log 
log4j.appender.kahadb.maxFileSize=1024KB 
log4j.appender.kahadb.maxBackupIndex=5 
log4j.appender.kahadb.append=true 
log4j.appender.kahadb.layout=org.apache.log4j.PatternLayout 
log4j.appender.kahadb.layout.ConversionPattern=%d \[%-15.15t\] %-5p %-30.30c{1} - %m%n 
log4j.logger.org.apache.activemq.store.kahadb.MessageDatabase=TRACE, kahadb

Either restart ActiveMQ and let the cleanup process run (give it a minute or two for example) or alternatively apply this logging configuration to a running broker via JMX. The **`Broker`** MBean exposes an operation called **`reloadLog4jProperties`** in JMX that can be used to tell the broker to reload its **`log4j.properties`**. Often its enough to apply this logging configuration for 2-5 minutes and then analyze the broker's log file.

Examine the log file and look for cleanup of the data files. The process starts with the complete set of known data files and queries the index on a per destination basis to prune this list. Anything that remains is a candidate for cleanup. The trace logging gives the destination and the log file numbers that remain candidates for removal as it iterates through the index.

At some point you'll hit a destination and the number of data file ids will suddenly drop because that destination references them. It could be a DLQ or an offline durable subscriber. In any event, the logging will help you pinpoint the destinations that are hogging disk space.

Here is a quick sample:

 TRACE | Last update: 164:41712, full gc candidates set: \[86, 87, 163, 164\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after first tx:164:41712, \[86, 87, 163\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:A, \[86, 87, 163\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:1:B, \[86, 87, 163\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:D, \[86, 87, 163\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:E, \[86, 87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:H, \[86, 87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:I, \[86, 87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates after dest:0:J, \[87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 TRACE | gc candidates: \[87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker
 DEBUG | Cleanup removing the data files: \[87\] | org.apache.activemq.store.kahadb.MessageDatabase | ActiveMQ Journal Checkpoint Worker

We get one candidate, **`data-87.log`** from the existing set of journal data files **`[86, 87, 163, 164]`**. There is a current transaction using **`164`**, destination (Queue named **`E`**) `'**0:E**'` has some messages in **`163`**, destination `'**0:I**'` has messages in **`86`** and **`87`** is un-referenced. In this case, there must be some long standing un-acknowledged messages or a very slow consumer on destination `'**0:I**'`.

The `'**0:**'` prefix is shorthand for a queue, `'**1:**'` for a topic. Example: **`dest:1:B`** refers to a topic named **`B`**.

* * *

### Non-persistent messages

Similar for non-persistent messages that are not stored in your configured KahaDB persistence adapter but get swapped to temp storage once they exceed the broker's configured **`memoryUsage`** limit. A similar logging configuration can show details of the cleanup of temp storage.

log4j.appender.kahadb=org.apache.log4j.RollingFileAppender
log4j.appender.kahadb.file=${activemq.base}/data/kahadb.log
log4j.appender.kahadb.maxFileSize=1024KB
log4j.appender.kahadb.maxBackupIndex=5
log4j.appender.kahadb.append=true
log4j.appender.kahadb.layout=org.apache.log4j.PatternLayout
log4j.appender.kahadb.layout.ConversionPattern=%d \[%-15.15t\] %-5p %-30.30c{1} - %m%n
log4j.logger.org.apache.activemq.store.kahadb=TRACE, kahadb
log4j.logger.org.apache.activemq.store.kahadb.MessageDatabase=INFO, kahadb
 

Note the last line of above logging configuration disables the verbose logging of the KahaDB cleanup task. If that line gets removed, the cleanup details of both KahaDB and temp storage will be logged to the same file but you need to be careful not to mix the logging output.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=27824400))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();