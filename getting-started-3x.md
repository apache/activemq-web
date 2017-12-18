      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Getting Started 3.x 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") ™ [ASF](http://www.apache.org "The Apache Software Foundation")

[Site](site.html) > [Old Links](old-links.html) > [Previous Versions](previous-versions.html) > [Getting Started 3.x](getting-started-3x.html)

[Download](download.html "Download") | [JavaDocs](http://activemq.apache.org/maven/5.9.0/apidocs/index.html) [More...](javadocs.html "JavaDocs") | [Source](source.html "Source") | [Forums](discussion-forums.html "Discussion Forums") | [Support](support.html "Support")

Introduction
------------

This document describes how to install and configure ActiveMQ 3.x for both Unix and Windows' platforms.

Document Organization
---------------------

The Getting Started Guide for ActiveMQ 3.x document contains the following sections:

*   [Introduction](#GettingStarted3.x-Introduction)
*   [Document Organization](#GettingStarted3.x-DocumentOrganization)
*   [Pre-Installation Requirements](#GettingStarted3.x-PreInstallationRequirements)
*   [Installation Procedure for Windows](#GettingStarted3.x-InstallationProcedureforWindows)
    *   [Windows Binary Installation](#GettingStarted3.x-WindowsBinaryInstallation)
    *   [Windows Source Installation](#GettingStarted3.x-WindowsSourceInstallation)
    *   [Windows Developers' Release](#GettingStarted3.x-WindowsDevelopers%27Release)
*   [Installation Procedure for Unix](#GettingStarted3.x-InstallationProcedureforUnix)
    *   [Unix Binary Installation](#GettingStarted3.x-UnixBinaryInstallation)
    *   [Unix Source Installation](#GettingStarted3.x-UnixSourceInstallation)
    *   [Unix Developers' Release](#GettingStarted3.x-UnixDevelopers%27Release)
*   [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ)
*   [Testing the Installation](#GettingStarted3.x-TestingtheInstallation)
*   [Stopping ActiveMQ](#GettingStarted3.x-StoppingActiveMQ)
*   [Configuring ActiveMQ](#GettingStarted3.x-ConfiguringActiveMQ)

Pre-Installation Requirements
-----------------------------

**Hardware:**

*   33 MB of free disk space for the ActiveMQ 3.x binary distribution.
*   18 MB of free disk space for the ActiveMQ 3.x source or developer's distributions.

**Operating Systems:**

*   Windows: Windows XP SP2, Windows 2000.
*   Unix: Ubuntu Linux, Powerdog Linux, MacOS, AIX, HP-UX, Solaris, or any Unix platform that supports Java.

**Environment:**

*   Java Developer Kit (JDK) 1.4.x or greater for deployment and 1.5.x (Java 5) for compiling/building.
*   The JAVA_HOME environment variable must be set to the directory where the JDK is installed, e.g., c:\\Program Files\\jsdk.1.4.2-09.
*   Maven 1.0.2 or greater (required when installing source or developer's releases).
*   [JARs](http://cvs.apache.org/repository/geronimo-spec/jars/) that will be used must be added to the classpath.

Installation Procedure for Windows
----------------------------------

This section of the Getting Started Guide explains how to install binary and source distributions of ActiveMQ on a Windows system.

#### Windows Binary Installation

This procedure explains how to download and install the binary distribution on a Windows system.

1.  From a browser, navigate to [www.ActiveMQ.org](http://www.ActiveMQ.org).
2.  Click the [Download](#GettingStarted3.x-Download) link in the navigation pane (the left pane).
3.  Click the [ActiveMQ 3.x Release](#GettingStarted3.x-ActiveMQ3.xRelease) link under the "Latest Releases" section. This brings up a new page.
4.  Under the [Download Here](#GettingStarted3.x-DownloadHere) section, select the desired distribution (you may have to scroll down to see the "Download Here" section).  
    For a binary distribution, the filename will be similar to: activemq-x.x.x.zip.
5.  Extract the files from the ZIP file into a directory of your choice.
6.  Proceed to the [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ) section of this document.
7.  Following start-up, go to the [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section of this document.

#### Windows Source Installation

This procedure explains how to download and install the source distribution on a Windows system.

**NOTE:** ActiveMQ can be run on a Java 1.4.x system, however, Java 1.5 is required to compile/build ActiveMQ.

1.  From a browser, navigate to [www.ActiveMQ.org](http://www.ActiveMQ.org).
2.  Click the [Download](#GettingStarted3.x-Download) link in the navigation pane (the left pane).
3.  Click the [ActiveMQ 3.x Release](#GettingStarted3.x-ActiveMQ3.xRelease) link under the "Latest Releases" section. This brings up another page.
4.  Under the [Download Here](#GettingStarted3.x-DownloadHere) section, select the desired distribution (if necessary, scroll down to see the "Download Here" section).  
    For a source distribution, the filename will be similar to: activemq-x.x-src.zip.
5.  Extract ActiveMQ from the ZIP file into a directory of your choice.
6.  Build ActiveMQ using Maven 1.0.2 or greater and Java 1.5.
    
    <!\[CDATA\[ The recommended method of building ActiveMQ is the following: cd \[activemq\_install\_dir\] where \[activemq\_install\_dir\] is the directory in which ActiveMQ was installed. maven clean test If the above build fails on some tests, type the following: cd \[activemq\_install\_dir\] maven -Dmaven.test.skip=true \]\]>
    
7.  If you prefer to use an IDE, then you can auto-generate the IDE's project file using maven plugins:
    
    <!\[CDATA\[ maven eclipse or maven idea \]\]>
    
    Feel free to use any other applicable IDE. Please refer to the [plugin reference](http://maven.apache.org/reference/plugins/plugins.html) for more details.
    
8.  Start ActiveMQ from the target directory, for example:
    
    <!\[CDATA\[ cd \[activemq\_install\_dir\]\\activemq-assembly\\target\\activemq-x.x-SNAPSHOT\ bin\\activemq \]\]>
    
    **NOTE:** Working directories get created relative to the current directory. To create the working directories in the proper place, ActiveMQ must be launched from its home/installation directory.
    
9.  Proceed to the [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section.

**NOTE:** Working directories get created relative to the current directory. To create the working directories in the proper place, ActiveMQ must be launched from its home/installation directory.

![](https://cwiki.apache.org/confluence/images/icons/emoticons/forbidden.gif)

**Warning**  
If you are building ActiveMQ 3.x under Windows using Cygwin there is a path name length limitation. If the path name length is exceeded, you may see build errors. To correct this, move the ActiveMQ source directory higher in the file system tree, e.g., /cygdrive/c/d/sm.

#### Windows Developer's Release

This procedure explains how to download and install the latest developer's snapshot.

**NOTE:** ActiveMQ can be run on a Java 1.4.x system, however, Java 1.5 is required to compile/build ActiveMQ.

1.  From a browser, navigate to [www.ActiveMQ.org](http://www.ActiveMQ.org).
2.  Click the [Download](#GettingStarted3.x-Download) link in the navigation pane (the left pane).
3.  Click the [Current development SNAPSHOT release](#GettingStarted3.x-CurrentdevelopmentSNAPSHOTrelease) link.
4.  Select the version of ActiveMQ to download (if necessary, scroll down to see the ActiveMQ snapshots).
5.  Extract the files from the ZIP file into a directory of your choice.
6.  If a binary snapshot was downloaded, proceed to the [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ) section of this document.  
    If a source snapshot was downloaded, perform step 6 and step 7 of the [Windows Source Installation](#GettingStarted3.x-WindowsSourceInstallation) procedure.
7.  Following start-up, proceed to the [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section.

Installation Procedure for Unix
-------------------------------

#### Unix Binary Installation

This procedure explains how to download and install the binary distribution on a Unix system.

1.  Download the activemq gzip file to the Unix machine, using either a browser or a tool, i.e., wget, scp, ftp, etc.
    
    <!\[CDATA\[ If the Unix machine has a browser: a. Navigate to www.ActiveMQ.org. b. Click the "Download" link in the navigation pane (the left pane). c. Click the "ActiveMQ 3.x Release" link under the &amp;quot;Latest Releases&amp;quot; section. This brings up a new page. d. Under the "Download Here" section, select the desired distribution (if necessary, scroll down to see the "Download Here" section). For a binary Unix distribution, the filename will be similar to: activemq-x.x.x.tar.gz. OR If the Unix machine does NOT have a browser, tools such as wget, scp, or ftp can be used to download the ActiveMQ distribution. It is beyond the scope of this document to explain the use of those tools. For convenience an example is provided below using a Windows machine (that has a browser) and a Unix machine with &amp;quot;wget&amp;quot; installed on it. \*NOTE:\* There are several alternative ways to perform this type of installation. a. Obtain the link to the ActiveMQ distribution file. On the Windows machine with a browser, navigate to www.ActiveMQ.org. b. Click the "Download" link in the left navigation pane. c. Click the "ActiveMQ 3.x Release" link under the &amp;quot;Latest Releases&amp;quot; section. This brings up a new page. d. Under the "Download Here" section, roll-over the desired distribution (if necessary, scroll down to see the "Download Here" section). For a binary Unix distribution the filename will be similar to: activemq-x.x.x.tar.gz. e. Right-click on the distribution name and Copy Shortcut f. On the Unix machine, change to the directory in which ActiveMQ will be installed, e.g., /usr/local. f. Download the ActiveMQ distribution to the Unix machine using the "wget" tool. For example, type "wget" followed by the saved shortcut: wget http://cvs.apache.org/repository/incubator-activemq/distributions/activemq-x.x.x.tar.gz \]\]>
    
2.  Extract the files from the gzip file into a directory of your choice. For example:
    
    <!\[CDATA\[ tar zxvf activemq-x.x.x.tar.gz \]\]>
    
3.  If the ActiveMQ start-up script is not executable, change its permisssions. The ActiveMQ script is located in the bin directory. For example:
    
    <!\[CDATA\[ cd \[activemq\_install\_dir\]/bin where \[activemq\_install\_dir\] is the directory in which ActiveMQ was installed. chmod 755 activemq \]\]>
    
4.  Proceed to the [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ) section of this document.
5.  Following start-up, go to the [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section.

#### Unix Source Installation

This procedure explains how to download and install the source distribution on a Unix system. This procedure assumes the Unix machine has a browser. Please see the previous [Unix Binary Installation](#GettingStarted3.x-UnixBinaryInstallation) section for details on how to install ActiveMQ without a browser.

**NOTE:** ActiveMQ can be run on a Java 1.4.x system, however, Java 1.5 is required to compile/build ActiveMQ.

1.  From a browser, navigate to [www.ActiveMQ.org](http://www.ActiveMQ.org).
2.  Click the [Download](#GettingStarted3.x-Download) link in the navigation pane (the left pane).
3.  Click the [ActiveMQ 3.x Release](#GettingStarted3.x-ActiveMQ3.xRelease) link under the "Latest Releases" section. This brings up a new page.
4.  Under the [Download Here](#GettingStarted3.x-DownloadHere) section, select the desired distribution (if necessary, scroll down to see the "Download Here" section).  
    For a source distribution, the filename will be similar to: activemq-x.x-src.tar.gz.
5.  Extract the files from the ZIP file into a directory of your choice. For example:
    
    <!\[CDATA\[ tar zxvf activemq.x.x-src.tar.gz \]\]>
    
6.  Build ActiveMQ using Maven 1.0.2 or greater and Java 5:
    
    <!\[CDATA\[ The preferred method of building ActiveMQ is the following: cd \[activemq\_install\_dir\] where \[activemq\_install\_dir\] is the directory in which ActiveMQ was installed. maven clean test If the above build fails on some tests, do the following: cd \[activemq\_install\_dir\] maven m:clean maven -Dmaven.test.skip=true \]\]>
    
7.  If you prefer to use an IDE then you can auto-generate the IDE's project file using maven plugins:
    
    <!\[CDATA\[ maven eclipse or maven idea \]\]>
    
    Feel free to use any other applicable IDE. Please refer to the [plugin reference](http://maven.apache.org/reference/plugins/plugins.html) for more details.  
    **NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.
    
8.  Proceed to the [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ) section of this document.
9.  Proceed to [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section.

#### Unix Developer's Release

This procedure explains how to download and install the latest developer's snapshot.

**NOTE:** ActiveMQ can be run on a Java 1.4.x system, however, Java 5 is required to compile/build ActiveMQ.

1.  From a browser, navigate to [www.ActiveMQ.org](http://www.ActiveMQ.org).
2.  Click the [Download](#GettingStarted3.x-Download) link in the navigation pane (the left pane).
3.  Click the [Current development SNAPSHOT release](#GettingStarted3.x-CurrentdevelopmentSNAPSHOTrelease) link.
4.  Select the version of ActiveMQ to download (you may have to scroll down to see the ActiveMQ snapshots). The filename will be similar to: activemq-x.x.x-tar.gz or activemq-x.x.x-src.tar.gz.
5.  Extract the files from the gzip file into a directory of your choice. For example:
    
    <!\[CDATA\[ For a binary developer's snapshot: tar zxvf activemq-x.x.x.tar.gz For a source developer's snapshot: tar zxvf activemq-x.x.x-src.tar.gz \]\]>
    
6.  If a binary snapshot was downloaded, to make it executable, the ActiveMQ script may need its permissions changed:
    
    <!\[CDATA\[ cd \[activemq\_install\_dir\]/bin where \[activemq\_install\_dir\] is the directory in which ActiveMQ was installed. chmod 755 activemq \]\]>
    
    #For a binary snapshot, proceed to the [Starting ActiveMQ](#GettingStarted3.x-StartingActiveMQ) section of this document.  
    #If a source snapshot was downloaded perform steps 6 - 8 of the [Unix Source Installation](#GettingStarted3.x-UnixSourceInstallation) procedure.
    
7.  Proceed to the [Testing the Installation](#GettingStarted3.x-TestingtheInstallation) section.

Starting ActiveMQ
-----------------

#### On Windows:

From a console window, change to the installation directory and run ActiveMQ:

<!\[CDATA\[ cd \[activemq\_install\_dir\] \]\]>

where activemq\_install\_dir is the directory in which ActiveMQ was installed, e.g., c:\\Program Files\\ActiveMQ-3.x.  
Then type:

<!\[CDATA\[ bin\\activemq \]\]>

**NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.

#### On Unix:

From a command shell, change to the installation directory and run ActiveMQ:

<!\[CDATA\[ cd \[activemq\_install\_dir\] \]\]>

where activemq\_install\_dir is the directory in which ActiveMQ was installed, e.g., /usr/local/activemq-3.x.  
Then type:

<!\[CDATA\[ bin/activemq OR bin/activemq &gt; /tmp/smlog 2&gt;&amp;1 &amp;; Note: /tmp/smlog may be changed to another file name. \]\]>

**NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.

![](https://cwiki.apache.org/confluence/images/icons/emoticons/forbidden.gif)

**Warning**  
Do NOT close the console or shell in which ActiveMQ was started, as that will terminate ActiveMQ (unless ActiveMQ was started with nohup).

<!\[CDATA\[ nohup bin/activemq &gt; /tmp/smlog 2&gt;&amp;1 &amp; \]\]>

Testing the Installation
------------------------

If ActiveMQ is up and running without problems, the Window's console window or the Unix command shell will display information similar to the following log line:

<!\[CDATA\[ INFO ActiveMQ JMS Message Broker (ID:apple-s-Computer.local-51222-1140729837569-0:0) has started \]\]>

  
ActiveMQ's default port is 61616. From another window run netstat and search for port 61616.

From a Windows console, type:

<!\[CDATA\[ netstat -an|find &amp;quot;61616&amp;quot; \]\]>

**OR**

From a Unix command shell, type:

<!\[CDATA\[ netstat -an|grep 61616 \]\]>

Stopping ActiveMQ
-----------------

For both Windows and Unix installations, terminate ActiveMQ by typing "CTRL-C" in the console or command shell in which it is running.

If ActiveMQ was started in the background on Unix, the process can be killed, with the following:

<!\[CDATA\[ ps -ef|grep activemq kill \[PID\] where \[PID\] is the process id of the ActiveMQ process. \]\]>

Configuring ActiveMQ
--------------------

The ActiveMQ broker should now run. You can configure the broker by specifying an [Xml Configuration](xml-configuration.html "Xml Configuration") file as a parameter to the _activemq_ command.

See the [Initial Configuration](initial-configuration.html "Initial Configuration") for details of which jars you need to add to your classpath to start using ActiveMQ in your Java code

If you want to use JNDI to connect to your JMS provider then please view the [JNDI Support](jndi-support.html "JNDI Support"). If you are a Spring user you should read about [Spring Support](spring-support.html "Spring Support")

After the installation, ActiveMQ is running with a basic configuration. For details on configuring options, please see refer to the [Configuration](configuration.html "Configuration") section.

Additional Resources
--------------------

If you are new to using ActiveMQ, running the [Examples](examples.html "Examples") is a good next step to learn more about ActiveMQ.

### [Overview](overview.html "Overview")

*   [Index](index.html "Index")
*   [News](news.html "News")
*   [New Features](new-features.html "New Features")
*   [Getting Started](getting-started.html "Getting Started")
*   [FAQ](faq.html "FAQ")
*   [Articles](articles.html "Articles")
*   [Books](books.html "Books")
*   [Download](download.html "Download")
*   [License](http://www.apache.org/licenses/)

### Search

    
  

### Sub Projects

*   [Apollo](http://activemq.apache.org/apollo "ActiveMQ Apollo")
*   [CMS](http://activemq.apache.org/cms/ "The C++ API for Messaging")
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [Camel](http://camel.apache.org/ "POJO based Enterprise Integration Patterns with a typesafe Java DSL")

### [Community](community.html "Community")

*   [Support](support.html "Support")
*   [Contributing](contributing.html "Contributing")
*   [Discussion Forums](discussion-forums.html "Discussion Forums")
*   [Mailing Lists](mailing-lists.html "Mailing Lists")
*   [IRC](irc://irc.codehaus.org/activemq)
*   [IRC Log](http://servlet.uwyn.com/drone/log/hausbot/activemq)
*   [Site](site.html "Site")
*   [Sponsorship](http://www.apache.org/foundation/sponsorship.html)
*   [Projects Using ActiveMQ](projects-using-activemq.html "Projects Using ActiveMQ")
*   [Users](users.html "Users")
*   [Team](team.html "Team")
*   [Thanks](http://www.apache.org/foundation/thanks.html)

### [Features](features.html "Features")

*   [Advisory Message](advisory-message.html "Advisory Message")
*   [Clustering](clustering.html "Clustering")
*   [Cross Language Clients](cross-language-clients.html "Cross Language Clients")
*   [Enterprise Integration Patterns](enterprise-integration-patterns.html "Enterprise Integration Patterns")
*   [JMX](jmx.html "JMX")
*   [JMS to JMS Bridge](jms-to-jms-bridge.html "JMS to JMS Bridge")
*   [MasterSlave](masterslave.html "MasterSlave")
*   [Message Groups](message-groups.html "Message Groups")
*   [Networks of Brokers](networks-of-brokers.html "Networks of Brokers")
*   [Performance](performance.html "Performance")
*   [Persistence](persistence.html "Persistence")
*   [Security](security.html "Security")
*   [Virtual Destinations](virtual-destinations.html "Virtual Destinations")
*   [Visualisation](visualisation.html "Visualisation")
*   [More ...](features.html "Features")

### [Connectivity](connectivity.html "Connectivity")

*   [Ajax](ajax.html "Ajax")
*   [AMQP](amqp.html "AMQP")
*   [Axis and CXF Support](axis-and-cxf-support.html "Axis and CXF Support")
*   [C Integration](c-integration.html "C Integration")
*   [C++](activemq-c-clients.html "ActiveMQ C++ Clients")
*   [C# and .Net Integration](http://activemq.apache.org/nms/)
*   [CMS](http://activemq.apache.org/cms/)
*   [J2EE](j2ee.html "J2EE")
*   [JBoss Integration](jboss-integration.html "JBoss Integration")
*   [Jetty](http://docs.codehaus.org/display/JETTY/Integrating+with+ActiveMQ)
*   [JNDI Support](jndi-support.html "JNDI Support")
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [REST](rest.html "REST")
*   [RSS and Atom](rss-and-atom.html "RSS and Atom")
*   [Spring Support](spring-support.html "Spring Support")
*   [Stomp](stomp.html "Stomp")
*   [Tomcat](tomcat.html "Tomcat")
*   [Unix Service](unix-service.html "Unix Service")
*   [WebLogic Integration](weblogic-integration.html "WebLogic Integration")
*   [XMPP](xmpp.html "XMPP")
*   [More ...](connectivity.html "Connectivity")

### [Using ActiveMQ 5](using-activemq-5.html "Using ActiveMQ 5")

*   [Getting Started](version-5-getting-started.html "Version 5 Getting Started")
*   [Initial Configuration](version-5-initial-configuration.html "Version 5 Initial Configuration")
*   [Running a Broker](version-5-run-broker.html "Version 5 Run Broker")
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html "How do I embed a Broker inside a Connection")
*   [Command Line Tools](activemq-command-line-tools-reference.html "ActiveMQ Command Line Tools Reference")
*   [Configuring Transports](configuring-version-5-transports.html "Configuring Version 5 Transports")
*   [Examples](version-5-examples.html "Version 5 Examples")
*   [Web Samples](version-5-web-samples.html "Version 5 Web Samples")
*   [Monitoring the Broker](how-can-i-monitor-activemq.html "How can I monitor ActiveMQ")
*   [Xml Configuration](version-5-xml-configuration.html "Version 5 XML Configuration")
*   [Xml Reference](xml-reference.html "Xml Reference")
*   [More ...](using-activemq-5.html "Using ActiveMQ 5")

### [Using ActiveMQ 4](using-activemq.html "Using ActiveMQ")

*   [Getting Started](getting-started.html "Getting Started")
*   [Initial Configuration](initial-configuration.html "Initial Configuration")
*   [Running a Broker](run-broker.html "Run Broker")
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html "How do I embed a Broker inside a Connection")
*   [Command Line Tools](activemq-command-line-tools-reference.html "ActiveMQ Command Line Tools Reference")
*   [Configuring Transports](configuring-transports.html "Configuring Transports")
*   [Examples](examples.html "Examples")
*   [Web Samples](web-samples.html "Web Samples")
*   [Monitoring the Broker](how-can-i-monitor-activemq.html "How can I monitor ActiveMQ")
*   [Xml Configuration](xml-configuration.html "Xml Configuration")
*   [Xml Reference](xml-reference.html "Xml Reference")
*   [More ...](using-activemq.html "Using ActiveMQ")

### [Tools](tools.html "Tools")

*   [Web Console](web-console.html "Web Console")
*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html "ActiveMQ Performance Module Users Manual")

### [External Tools](tools.html "Tools")

*   [hawtio](http://hawt.io "HTML5 console for monitoring Apache ActiveMQ and Apache Camel")
*   [Hermes Jms](hermes-jms.html "Hermes Jms")
*   [JMeter](http://jakarta.apache.org/jmeter)

### [Support](support.html "Support")

*   [Issues](http://issues.apache.org/jira/browse/AMQ)
*   [Roadmap](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:roadmap-panel)
*   [Change log](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:changelog-panel)

### Related Projects

*   [Apache ServiceMix](http://incubator.apache.org/servicemix/ "Distributed Enterprise Service Bus based on JBI")
*   [Lingo](http://lingo.codehaus.org/ "POJO Remoting using JMS")
*   [Jencks](http://jencks.codehaus.org/ "Message Driven POJOs and pooling for JMS and JDBC")
*   [Stomp](http://stomp.codehaus.org/ "A simple protocol for messaging middleware interop and the easy development of custom clients")
*   [Spring](http://www.springframework.org/)
*   [OpenEJB](http://openejb.apache.org)
*   [Geronimo](http://geronimo.apache.org/)

### [Developers](developers.html "Developers")

*   [Source](source.html "Source")
*   [Building](building.html "Building")
*   [Developer Guide](developer-guide.html "Developer Guide")
*   [Becoming a committer](becoming-a-committer.html "Becoming a committer")
*   [Code Overview](code-overview.html "Code Overview")
*   [Wire Protocol](wire-protocol.html "Wire Protocol")
*   [Release Guide](release-guide.html "Release Guide")

### Tests

*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html "ActiveMQ Performance Module Users Manual")
*   [Benchmark Tests](benchmark-tests.html "Benchmark Tests")
*   [JMeter System Tests](jmeter-system-tests.html "JMeter System Tests")
*   [JMeter Performance Tests](jmeter-performance-tests.html "JMeter Performance Tests")
*   [Integration Tests](integration-tests.html "Integration Tests")

### Project Reports

*   [JUnit Reports](junit-reports.html "JUnit Reports")
*   [Source XRef](source-xref.html "Source XRef")
*   [Test Source XRef](test-source-xref.html "Test Source XRef")
*   [Xml Reference](xml-reference.html "Xml Reference")

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36078))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();