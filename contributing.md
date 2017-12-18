      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Contributing 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [Contributing](contributing.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

There are many ways you can help make ActiveMQ a better piece of software - please dive in and help!

Try surf the documentation - if somethings confusing or not clear, let us know. Download the code & try it out and see what you think. Browse the source code. Got an itch to scratch, want to tune some operation or add some feature?

Want to do some hacking on ActiveMQ? Try surfing to our [issue tracker](http://issues.apache.org/jira/browse/AMQ) for open issues or features that need to be implemented, take ownership of an issue and try fix it.

Getting in touch
----------------

There are various ways of communicating with the ActiveMQ community.

*   join us on the [Discussion Forums](discussion-forums.html) or subscribe to the [Mailing Lists](mailing-lists.html) and take part in any conversations
*   pop by on in [irc](irc.html) and say hi
    
*   add some comments to the [wiki](navigation.html)

If you find a bug or problem
----------------------------

Please raise a new issue in our [issue tracker](https://issues.apache.org/jira/browse/AMQ)

If you can create a JUnit test case then your issue is more likely to be resolved quicker.  
e.g. take a look at some of the existing [unit tests cases](https://git-wip-us.apache.org/repos/asf?p=activemq.git;a=tree;f=activemq-unit-tests/src/test;h=185a655c5200ed30fd2964bc236c18c5bde534c4;hb=refs/heads/master)

Then we can add your issue to the test suite and then we'll know when its really fixed and we can ensure that the problem **stays fixed** in future releases.

If you want to help out with the documentation
----------------------------------------------

If you want to contribute to the ActiveMQ documentation you should first subscribe our [dev@](mailto:dev-subscribe@activemq.apache.org) where ActiveMQ developers interact with each other. If you want edit rights on the ActiveMQ site, create an account in the [ActiveMQ wiki](https://cwiki.apache.org/confluence/display/ACTIVEMQ) and fill in and submit an ICLA to the ASF (see the [Committer Guide](becoming-a-committer.html)). Then ask on the dev@ list to be granted edit rights and an admin will do so fairly quickly. If you want to just contribute the content, please submit the content on the dev@ list or create an issue and attach it there. **All** contributions are highly appreciated.

Working on the code
-------------------

Grab the [Source](source.html) from git

Build the project.

export MAVEN_OPTS="-Xmx512M -XX:MaxPermSize=128M"
mvn -Dtest=false install

PS: You might need to build multiple times (if you get a build error) because sometimes maven fails to download all the files.

Create a project in your IDE. e.g. if you are using Eclipse the following should do the trick.

mvn eclipse:eclipse

Then import the projects into your workspace.

Creating patches
----------------

We gladly accept patches if you can find ways to improve, tune or fix ActiveMQ in some way.

Most IDEs can create nice patches now very easily. e.g. in Eclipse just right click on a file/directory and select Team -> Create Patch. Then just save the patch as a file and then submit it. (You may have to click on Team -> Share... first to enable the Subversion options).

If you're a command line person try the following to create the patch

diff -u Main.java.orig Main.java >> patchfile.txt

or

git diff Main.java >> patchfile.txt

Submitting patches
------------------

The easiest way to submit a patch is to create a new JIRA issue, attach the patch and tick the ASF license grant check box, tick the Patch Attached button on the issue then fire off an email to the [Mailing Lists](mailing-lists.html) or [Discussion Forums](discussion-forums.html).

Becoming a commmitter
---------------------

Once you've got involved as above, we may well invite you to be a committer. See [Becoming a committer](becoming-a-committer.html) for more details.

Using the issue tracker
-----------------------

Before you can raise an issue in the issue tracker you need to register with it. This is quick & painless.

If you want to have a go at fixing an issue you need to be in the list of activemq-developers on the issue tracker. To join the group, please mail the [dev@activemq.apache.org](mailto:dev@activemq.apache.org) mail list with the email address you used to register with the issue tracker and we'll add you to the group.

Why not dive in the [issue tracker](https://issues.apache.org/jira/browse/AMQ), and try tackle some of our outstanding issues?

Becoming a committer
--------------------

The first step is contributing to the project; if you want to take that a step forward and become a fellow committer on the project then see the [Committer Guide](becoming-a-committer.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35872))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();