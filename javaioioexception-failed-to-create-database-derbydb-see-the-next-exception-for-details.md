      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- java.io.IOException Failed to create database 'derbydb', see the next exception for details 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [Exceptions](exceptions.html) > [java.io.IOException Failed to create database 'derbydb', see the next exception for details](javaioioexception-failed-to-create-database-derbydb-see-the-next-exception-for-details.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

If you get an error like this

Jun 19, 2006 10:35:27 PM org.apache.activemq.broker.BrokerService getBroker
INFO: ActiveMQ 4.0 JMS Message Broker (localhost) is starting
Jun 19, 2006 10:35:27 PM org.apache.activemq.broker.BrokerService getBroker
INFO: For help or more information please see:
http://incubator.apache.org/activemq/
java.io.IOException: Failed to create database 'derbydb', see the next
exception for details.
       at
org.apache.activemq.util.IOExceptionSupport.create(IOExceptionSupport.java:42)
       at
org.apache.activemq.store.jdbc.TransactionContext.getConnection(TransactionContext.java:58)
       at
org.apache.activemq.store.jdbc.JDBCPersistenceAdapter.createAdapter(JDBCPersistenceAdapter.java:229)
       at
org.apache.activemq.store.jdbc.JDBCPersistenceAdapter.getAdapter(JDBCPersistenceAdapter.java:213)
       at
org.apache.activemq.store.jdbc.JDBCPersistenceAdapter.start(JDBCPersistenceAdapter.java:139)
       at
org.apache.activemq.store.journal.JournalPersistenceAdapter.start(JournalPersistenceAdapter.java:215)
       at
org.apache.activemq.broker.BrokerService.createRegionBroker(BrokerService.java:930)
       at
org.apache.activemq.broker.BrokerService.createBroker(BrokerService.java:888)
       at
org.apache.activemq.broker.BrokerService.getBroker(BrokerService.java:458)
       at
org.apache.activemq.broker.BrokerService.addConnector(BrokerService.java:143)
       at
org.apache.activemq.broker.BrokerService.addConnector(BrokerService.java:133)
       at
com.ic.ntn.message.HelloWorld$HelloWorldBroker.run(HelloWorld.java:92)
       at java.lang.Thread.run(Thread.java:595)
Caused by: SQL Exception: Failed to create database 'derbydb', see the next
exception for details.
       at org.apache.derby.impl.jdbc.Util.newEmbedSQLException(Unknown
Source)
       at org.apache.derby.impl.jdbc.Util.newEmbedSQLException(Unknown
Source)
       at org.apache.derby.impl.jdbc.Util.generateCsSQLException(Unknown
Source)
       at
org.apache.derby.impl.jdbc.EmbedConnection.newSQLException(Unknown Source)
       at org.apache.derby.impl.jdbc.EmbedConnection.createDatabase(Unknown
Source)
       at org.apache.derby.impl.jdbc.EmbedConnection.<init>(Unknown Source)
       at org.apache.derby.impl.jdbc.EmbedConnection30.<init>(Unknown
Source)
       at org.apache.derby.jdbc.Driver30.getNewEmbedConnection(Unknown
Source)
       at org.apache.derby.jdbc.InternalDriver.connect(Unknown Source)
       at org.apache.derby.jdbc.EmbeddedDataSource.getConnection(Unknown
Source)
       at org.apache.derby.jdbc.EmbeddedDataSource.getConnection(Unknown
Source)
       at
org.apache.activemq.store.jdbc.TransactionContext.getConnection(TransactionContext.java:54)
       ... 11 more

Then the error is probably that the JDBC driver (Apache Derby by default) could not write to the persistent file area.

### Workaround

Create a directory for the broker to write its files. e.g. in Java code call [setDataDirectory](http://incubator.apache.org/activemq/maven/activemq-core/apidocs/org/apache/activemq/broker/BrokerService.html#setDataDirectory(java.io.File))

File dir = new File("foo");
dir.mkdir();
broker.setDataDirectory(dir);

or in XML use

<broker dataDirectory="foo">...

### See

*   [How do I embed a Broker inside a Connection](how-do-i-embed-a-broker-inside-a-connection.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35926))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();