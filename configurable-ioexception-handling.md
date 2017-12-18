      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Configurable IOException Handling 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Persistence](persistence.html) > [Configurable IOException Handling](configurable-ioexception-handling.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Starting with 5.3.1, ActiveMQ provides configurable IOException handling for its file-based message stores. From version 5.5 the handler is also invoked when the JDBC persistence adapter gets a failure on `getConnection()`.

Default IOException handler
---------------------------

ActiveMQ comes with a default IOException handler, which does the following. When some of the file-based message stores encounter IOException it can be one of the two things: either the disk is unavailable of there's no more space on the disk.

The first case is usually encountered when disk fails or network disk is disconnected. These errors are not "recoverable" and we usually want to shutdown the broker until problems with the disk are solved.

When there's no more space on the disk, we usually want to wait that some space is reclaimed and continue what we have been doing before (exchanging messages). All file-based persistent stores are capable of surviving these kind of errors.

### Configuring Default IOException handler

There are a couple of properties you can use to tune the behavior of the `DefaultIOExceptionHandler`. First, instantiate the exception handler as a bean. Then configure the broker to use the exception handler by setting the broker's `ioExceptionHandler` property.

Example:

    <bean id="ioExceptionHandler" class="org.apache.activemq.util.DefaultIOExceptionHandler">
        <property name="ignoreAllErrors"><value>true</value></property>
    </bean>

    <broker xmlns="http://activemq.apache.org/schema/core" ioExceptionHandler="#ioExceptionHandler">
      ...
    </broker>

Handler configuration properties:

Property

Since

Default Value

Description

`ignoreAllErrors`

5.4

`false`

When `true` all errors are ignored and the broker remains running.

`ignoreNoSpaceErrors`

5.4

`true`

When `false` 'no disk space' errors are treated the same as other errors causing the broker to be stopped.

`noSpaceMessage`

5.4

`space`

The string used to match against the exception's message. When matched a 'no disk space' error results.

`ignoreSQLExceptions`

5.5

`true`

If `true` all SQLExceptions are ignored by the handler allowing them to be handled by the persistence adapter's locker. When `false` the exception handler processes the exception.

`sqlExceptionMessage`

5.5

`""`

The SQLException phrase to match when ignoring SQLExceptions. Only matched exceptions are ignored. All SQLExceptions match the default empty string.

`stopStartConnectors`

5.5

`false`

When `true` transport connectors are stopped (client connections are refused), however, the broker will remain running. The transport connectors will be restarted following a successful persistence adapter checkpoint. All exceptions are ignored whilst the transport connectors are stopped. This option ensures that the broker does not need to be manually restarted in the event of a DB restart, for example.

`resumeCheckSleepPeriod`

5.5

`5sec`

The interval between persistence adapter checkpoints. Typically used in conjunction with `stopStartConnectors`.

systemExitOnShutdown

5.13

false

before stopping the broker, set the broker attribute systemExitOnShutdown to this value to potentially force a jvm exit.

The default configuration will try to find a specified string in the exception message to determine whether it is a 'no disk space' error. On most platforms (at least those we have tested), you'll find the word 'space' in it. Of course, you can customize this to your platform by using `noSpaceMessage` property.

Note: as of ActiveMQ 5.11 the `JDBCIOExceptionHandler` has been deprecated. It has been replaced by the `org.apache.activemq.util.LeaseLockerIOExceptionHandler` that will work with any persistence adapter that supports pluggable storage lockers whether or not a locker is in use.

Writing your own handler

In case this handler doesn't work for you, you can write your own. For example you might want to change the way how you detect full disk and execute some external command, like `df` on Linux to be sure.

All you have to do is implement the `org.apache.activemq.util.IOExceptionHandler` interface then configure the broker to use it:

    <bean id="ioExceptionHandler" class="com.mycompany.MyIOExceptionHandler">
        <property name="ignoreAllErrors"><value>true</value></property>
    </bean>

    <broker xmlns="http://activemq.apache.org/schema/core" ioExceptionHandler="#ioExceptionHandler">
      ...
    </broker>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=5965507))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();