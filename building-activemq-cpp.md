      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Building ActiveMQ CPP 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Cross Language Clients](cross-language-clients.html) > [ActiveMQ C++ Clients](activemq-c-clients.html) > [Building ActiveMQ CPP](building-activemq-cpp.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Dependencies
------------

### libuuid

The build requires the **libuuid** library that is part of the e2fsprogs package and is available from [http://e2fsprogs.sourceforge.net/](http://e2fsprogs.sourceforge.net/) which is not always installed by default.

### cppunit

The package contains a complete set of cppunit tests. In order for you to build an run the tests, you will need to download and install the cppunit suite. See [http://cppunit.sourceforge.net/cppunit-wiki](http://cppunit.sourceforge.net/cppunit-wiki)

or on Fedora type the following:

sudo yum install cppunit

Make sure that the paths to the installed cppunit library and includes are visible in your current shell before you try building the tests.

Windows users will need to build the cppunit library using the CPPUnit MSVC project files.  A discussion of the build process can be found on the CPPUnit wiki under [CPPUnit Platform build instructions](http://cppunit.sourceforge.net/cppunit-wiki/BuildingCppUnit1) this covers both MSVC along with many other platforms and tool suites.

### GNU Build System (for building on *nix)

To Generate the ./configure script use to create the Makefiles, you need the following software installed:

Tool

Recommended Version

autoconf

>= 2.59  

automake

>= 1.9.6

libtool

>= 1.5.22  

Building on *nix (Unix/Linux/OS X/Cygwin)
-----------------------------------------

This assumes you have all of the project dependencies installed. We're now ready to create the configure script. To do this, run:

./autogen.sh

You may see the following warnings when running this command:

src/test-integration/Makefile.am:44: `CXXFLAGS' is a user variable, you should not override it;  
src/test-integration/Makefile.am:44: use `AM_CXXFLAGS' instead.  
src/test/Makefile.am:104: `CXXFLAGS' is a user variable, you should not override it;  
src/test/Makefile.am:104: use `AM_CXXFLAGS' instead.

These can be ignored. We override CXXFLAGS in the makefiles for the unit and integration tests in order to suppress compiler warnings.

This should be run the first time and anytime you change configure.ac or any of the Makefile.am files.

Solaris 10 Note

CPP_UNIT might not build until you correct the file libstdc++.la to contain the correct data, see this discussion.

[http://forum.sun.com/jive/thread.jspa?threadID=73150](http://forum.sun.com/jive/thread.jspa?threadID=73150)

The configure script will customize the way the software is built and installed into your system along with detecting the available libraries that have been installed. To use the default configuration just run:

./configure

For more help on how to customize the build configuration, run:

./configure --help

Once the configure script has run successfully, you are ready to build. Run:

make

This will build all of the core ActiveMQ CPP source code. To build and install the code into the system directories, run:

make install

You will have to become the superuser in order to be able to install the files.

Doxygen
-------

To generate the doxygen documentation for the project, just run:

make doxygen-run

Running Tests
-------------

### Unit Tests

In order to build and run the suite of unit tests, run:

make check

This will verify that the library is functioning correctly on the target platform. In addition, it will generate the integration tests binary.

### Integration Tests

The library also contains a set of tests that are run against a real AMQ broker. These allow you to validate this distribution of ActiveMQ CPP against your broker. Running these without a broker will result in failed tests. The tests currently hard-code the broker url to be tcp://localhost:61613 for stomp and tcp://localhost:61616 for openwire.

The integration tests are built via "make check". To run them, first start a broker and then

cd src/test-integration
./activemq-test-integration

This will take quite some time to complete, so be patient.

Example
-------

There is an example application that ships with the distribution in src/examples. The example is compiled by default with the "make" command, but can easily be compiled manually using the command:

g++ -o main -pthread -I ../main main.cpp ../../out/libactivemq-cpp-0\_0\_2.a -luuid

Notes for Windows users
-----------------------

We support using the GNU compiler on Windows, using the Cygwin package. However we also support using the MSVC compiler on Windows.

There are a couple or things that you will need to setup to ensure that the MSVC compile succeeds.

*   You need to download and install the Platform SDK if you don't have it installed already.
*   Ensure that the path to you MSVC install is set in the PATH env variable. You can test this by typing cl.exe at the command line, if you get an error complaining that its not found, then you'll need to fix your PATH.
*   Set the INCLUDE env variable to include the path to your MSVC includes, and the platform SDK includes. For example:
    
    INCLUDE = D:\\Program Files\\Microsoft Visual Studio 8\\VC\\include;D:\\Program Files\\Microsoft Platform SDK\\Include\\*
    
*   Set the LIB env variable to include the path to your MSVC libs, and the Platform SDK libs. For example:
    
    LIB = D:\\Program Files\\Microsoft Visual Studio 8\\VC\\lib;D:\\Program Files\\Microsoft Platform SDK\\Lib
    
*   The Project files reference the CPPUnit libraries for the Integration and Unit tests builds.  In order for these to build correctly you must either place the CPPUnit libraries in a directory listed in the project settings, or add a new location for your install of CPPUnit. 

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=50800))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();