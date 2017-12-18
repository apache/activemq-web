      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ 5.13.4 Release 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Overview](overview.html) > [Download](download.html) > [ActiveMQ 5.13.4 Release](activemq-5134-release.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

![](http://activemq.apache.org/activemq-500-release.data/activemq-5.x-box-reflection.png)

ActiveMQ 5.13.4 Release
-----------------------

Apache ActiveMQ 5.13.4 includes 30 resolved[ issues](https://issues.apache.org/jira/secure/ReleaseNote.jspa?version=12335661&projectId=12311210) and improvements.

### Getting the Binary Distributions

Description

Download Link

_Verify_

Windows Distribution

[apache-activemq-5.13.4-bin.zip](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.zip)

[ASC](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.zip.asc), [MD5](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.zip.md5), [SHA1](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.zip.sha1)

Unix/Linux/Cygwin Distribution

[apache-activemq-5.13.4-bin.tar.gz](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.tar.gz)

[ASC](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.tar.gz.asc), [MD5](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.tar.gz.md5), [SHA1](https://archive.apache.org/dist/activemq/5.13.4/apache-activemq-5.13.4-bin.tar.gz.sha1)

Verify the Integrity of Downloads
---------------------------------

It is essential that you verify the integrity of the downloaded files using the PGP or MD5 signatures. The PGP signatures can be verified using PGP or GPG. Begin by following these steps:

1.  Download the [KEYS](http://www.apache.org/dist/activemq/KEYS)
2.  Download the asc signature file for the relevant distribution
3.  Verify the signatures using the following commands, depending on your use of PGP or GPG:
    
    $ pgpk -a KEYS
    $ pgpv apache-activemq-<version>-bin.tar.gz.asc
    
    or
    
    $ pgp -ka KEYS
    $ pgp apache-activemq-<version>-bin.tar.gz.asc
    
    or
    
    $ gpg --import KEYS
    $ gpg --verify apache-activemq-<version>-bin.tar.gz.asc
    

(Where <version> is replaced with the actual version, e.g., 5.1.0, 5.2.0, etc.).

Alternatively, you can verify the MD5 signature on the files. A Unix program called `md5` or `md5sum` is included in most Linux and Unix distributions. It is also available as part of [GNU Textutils](http://www.gnu.org/software/textutils/textutils.html). Windows users can utilize any of the following md5 programs:

*   [md5](http://www.fourmilab.ch/md5/)
*   [md5sums](http://www.pc-tools.net/win32/md5sums/)
*   [SlavaSoft FSUM](http://www.slavasoft.com/fsum/)

Getting the Binaries using Maven 3
----------------------------------

To use this release in your maven project, the simplest dependency that you can use in your [Maven POM](http://maven.apache.org/guides/introduction/introduction-to-the-pom.html) is:

<dependency>
  <groupId>org.apache.activemq</groupId>
  <artifactId>activemq-all</artifactId>
  <version>5.13.4</version>
</dependency>

If you need more fine grained control of your dependencies (activemq-all is an uber jar) pick and choose from the various components activemq-client, activemq-broker, activemq-xx-store etc.

Getting the Source Code
-----------------------

### Source Distributions

Description

Download Link

Verify

Source Release

[activemq-parent-5.13.4-source-release.zip](https://archive.apache.org/dist/activemq/5.13.4/activemq-parent-5.13.4-source-release.zip)

[ASC](https://archive.apache.org/dist/activemq/5.13.4/activemq-parent-5.13.4-source-release.zip.asc), [MD5](https://archive.apache.org/dist/activemq/5.13.4/activemq-parent-5.13.4-source-release.zip.md5), [SHA1](https://archive.apache.org/dist/activemq/5.13.4/activemq-parent-5.13.4-source-release.zip.sha1)

### Git Tag

[https://git-wip-us.apache.org/repos/asf?p=activemq.git;a=tag;h=refs/tags/activemq-5.13.4](https://git-wip-us.apache.org/repos/asf?p=activemq.git;a=tag;h=refs/tags/activemq-5.13.4)

Change Log
----------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?version=12335661&projectId=12311210)

This release affects applications using ObjectMessages. Please refer to [http://activemq.apache.org/objectmessage.html](http://activemq.apache.org/objectmessage.html) and .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [AMQ-6013](https://issues.apache.org/jira/browse/AMQ-6013?src=confmacro) for more information.

Also see the previous [ActiveMQ 5.13.3 Release](activemq-5133-release.html)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=65146891))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();