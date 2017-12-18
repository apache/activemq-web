      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- AMQ Message Store 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Persistence](persistence.html) > [AMQ Message Store](amq-message-store.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The Basics
----------

This is the default storage for AcitveMQ 5 and above. The AMQ Message Store is an embeddable transactional message storage solution that is extremely fast and reliable.  
message commands are written to a transactional journal - which consists of rolling data logs - which means writing is extremely fast and the state of the store is easily recoverable.

Messages themselves are persisted in the data logs of the journal - with references to their location being held by a reference store (by default Kaha) for fast retrevial.

![](amq-message-store.data/amqstore.png)

  
  
  
References to messages are held in memory, and periodically inserted into the reference store to improve performance.  
  
The messages are stored in data logs, which are individual files, typically 32mb in size (though this is configurable, they can be larger if the size of a message is large than the file size). When all the messages in a data log have been successfully consumed, the data log file is marked as being ready to be deleted - or archived - which will happen at the next clean up period.

Configuration
-------------

By default ActiveMQ will use the the AMQ Store - and its default settings. You can configure the properties of the AMQ Store however, by explictly defining its persistence adapter (amqPersistenceAdapter):

 <broker brokerName="broker" persistent="true" useShutdownHook="false">
    <persistenceAdapter>
      <amqPersistenceAdapter directory="${activemq.base}/activemq-data" maxFileLength="32mb"/>
    </persistenceAdapter>
    <transportConnectors>
      <transportConnector uri="tcp://localhost:61616"/>
    </transportConnectors>
  </broker>

The above shows the configuration required to set the AMQ Store through its amqPersistenceAdapter - and explicity setting the directory and maxFileLength properties.

### AMQ Store Properties

property name

default value

Comments

directory

activemq-data

the path to the directory to use to store the message store data and log files

useNIO

true

use NIO to write messages to the data logs

syncOnWrite

false

sync every write to disk

maxFileLength

32mb

a hint to set the maximum size of the message data logs

persistentIndex

true

use a persistent index for the message logs. If this is false, an in-memory structure is maintained

maxCheckpointMessageAddSize

4kb

the maximum number of messages to keep in a transaction before automatically committing

cleanupInterval

30000

time (ms) before checking for a discarding/moving message data logs that are no longer used

indexBinSize

1024

default number of bins used by the index. The bigger the bin size - the better the relative performance of the index

indexKeySize

96

the size of the index key - the key is the message id

indexPageSize

16kb

the size of the index page - the bigger the page - the better the write performance of the index

directoryArchive

archive

the path to the directory to use to store discarded data logs

archiveDataLogs

false

if true data logs are moved to the archive directory instead of being deleted

Data Structure
--------------

In the data directory defined for the AMQ Store there is the following directory structure:

![](amq-message-store.data/amqdir.png)

### Top level

the message broker's name is used to distinguish its directory of message data. By default, the broker name is local host.  
Below this top level directory are the following sub directories:

### archive

message data logs are moved here when they are discarded.  
n.b. this directory only exists when the property archiveDataLogs is enabled

### journal

Used to hold the message data logs

### kr-store

The directory structure of the Kaha reference store (if used)

##### data

The indexes used to reference the message data logs in the journal for fast retrieval

##### state

The state of the store - i.e. names of durable subscribers - the reason for this is described in [Recovery](amq-message-store.html)

### tmp-storage

use to hold data files for transient messages that may be stored on disk to alleviate memory consumption - e.g. non-persistent topic messages awaiting delivery to an active, but slow subscriber.

Recovery
--------

If the message broker does not shutdown properly, then the reference store indexes are cleaned and the message data files (which contain messages/acknowledgements and transactional boundaries) are replayed to rebuild up the message store state. It is possbile to force automatic recovery if using the Kaha reference store (the default) by deleting the kr-store/state/ directory.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=69705))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();