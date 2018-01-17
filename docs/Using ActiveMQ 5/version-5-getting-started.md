Apache ActiveMQ ™ -- Version 5 Getting Started 

[Using ActiveMQ 5](using-activemq-5.md) > [Version 5 Getting Started](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md)


Introduction
------------

This document describes how to install and configure ActiveMQ for both Unix and Windows' platforms.

Document Organization
---------------------

The Getting Started Guide for ActiveMQ contains the following sections:

/*<!\[CDATA\[*/ div.rbtoc1502137418893 {padding: 0px;} div.rbtoc1502137418893 ul {list-style: disc;margin-left: 0px;} div.rbtoc1502137418893 li {margin-left: 0px;padding-left: 0px;} /*\]\]>*/

*   [Introduction](#Version5GettingStarted-Introduction)
*   [Document Organization](#Version5GettingStarted-DocumentOrganization)
*   [Pre-Installation Requirements](#Version5GettingStarted-Pre-InstallationRequirements)
*   [Installation Procedure for Windows](#Version5GettingStarted-InstallationProcedureforWindows)
    *   [Windows Binary Installation](#Version5GettingStarted-WindowsBinaryInstallation)
    *   [Windows Source Installation](#Version5GettingStarted-WindowsSourceInstallation)
    *   [Windows Developer's Release](#Version5GettingStarted-WindowsDeveloper'sRelease)
*   [Installation Procedure for Unix](#Version5GettingStarted-InstallationProcedureforUnix)
    *   [Unix Binary Installation](#Version5GettingStarted-UnixBinaryInstallationUnixBinaryInstallation)
    *   [Unix Source Installation](#Version5GettingStarted-UnixSourceInstallation)
    *   [Unix Developer's Release](#Version5GettingStarted-UnixDeveloper'sRelease)
*   [Starting ActiveMQ](#Version5GettingStarted-StartingActiveMQStartingActiveMQ)
    *   [On Windows](#Version5GettingStarted-OnWindows)
    *   [On Unix](#Version5GettingStarted-OnUnix)
    *   [More help](#Version5GettingStarted-Morehelp)
*   [Testing the Installation](#Version5GettingStarted-TestingtheInstallationTestingtheInstallation)
*   [Monitoring ActiveMQ](#Version5GettingStarted-MonitoringActiveMQ)
*   [Stopping ActiveMQ](#Version5GettingStarted-StoppingActiveMQ)
*   [Starting ActiveMQ with a different configuration file](#Version5GettingStarted-StartingActiveMQwithadifferentconfigurationfileStartingActiveMQwithadifferentconfigurationfile)
    *   [ActiveMQ 5.8 or older](#Version5GettingStarted-ActiveMQ5.8orolder)
    *   [ActiveMQ 5.9 onwards](#Version5GettingStarted-ActiveMQ5.9onwards)
*   [Configuring ActiveMQ](#Version5GettingStarted-ConfiguringActiveMQ)
*   [Additional Resources](#Version5GettingStarted-AdditionalResources)

Pre-Installation Requirements
-----------------------------

**Hardware:**

*   60 MB of free disk space for the ActiveMQ binary distribution.
*   200 MB of free disk space for the ActiveMQ source or developer's distributions.

**Operating Systems:**

*   Windows: Windows XP SP2, Windows 2000.
*   Unix: Ubuntu Linux, Powerdog Linux, MacOS, AIX, HP-UX, Solaris, or any Unix platform that supports Java.

**Environment:**

*   Java Developer Kit (JDK) 1.7.x or greater for deployment and 1.7.x (Java 7) for compiling/building.
*   The JAVA_HOME environment variable must be set to the directory where the JDK is installed, e.g., `c:\Program Files\jdk.1.7.0_xx_xx`.
*   Maven 3.0 or greater (required when installing source or developer's releases).
*   [JARs](http://cvs.apache.org/repository/geronimo-spec/jars/) that will be used must be added to the classpath.

Installation Procedure for Windows
----------------------------------

This section of the Getting Started Guide explains how to install binary and source distributions of ActiveMQ on a Windows system.

#### Windows Binary Installation

This procedure explains how to download and install the binary distribution on a Windows system.

1.  From a browser, navigate to [activemq.apache.org/](http://activemq.apache.org/).
2.  Click the [Download](OverviewOverview/Overview/download.md) link in the navigation pane (the left pane).
3.  Select the latest distribution (for older releases, click the link to the archives).  
    For a binary distribution, the filename will be similar to: `activemq-x.x.x.zip`.
4.  Extract the files from the ZIP file into a directory of your choice.
5.  Proceed to the [#Starting ActiveMQ](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.
6.  Following start-up, go to the [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.

#### Windows Source Installation

This procedure explains how to download and install the source distribution on a Windows system.

**NOTE:** ActiveMQ requires Java 7 to run and to build

1.  From a browser, navigate to [activemq.apache.org/](http://activemq.apache.org/).
2.  Click the [Download](OverviewOverview/Overview/download.md) link in the navigation pane (the left pane).
3.  Select the latest distribution (for older releases, click the link to the archives).  
    For a source distribution, the filename will be similar to: `activemq-x.x-src.zip`.
4.  Extract ActiveMQ from the ZIP file into a directory of your choice.
5.  Build ActiveMQ using Maven 2.1 or greater and Java 1.7.

The recommended method of building ActiveMQ is the following:

cd \[activemq\_install\_dir\]
mvn clean install

where \[activemq\_install\_dir\] is the directory in which ActiveMQ was installed.

If the above build fails on some tests, type the following:

cd \[activemq\_install\_dir\]
mvn clean install -Dmaven.test.skip=true 

1.  If you prefer to use an IDE, then you can auto-generate the IDE's project file using maven plugins:
    
    mvn eclipse:eclipse
    
    or
    
    mvn idea:idea
    
    Feel free to use any other applicable IDE. Please refer to the [plugin reference](http://maven.apache.org/plugins/index.html) for more details.
    
2.  Start ActiveMQ from the target directory, for example:
    
    cd \[activemq\_install\_dir\]\\assembly\\target
    unzip activemq-x.x-SNAPSHOT.zip
    cd activemq-x.x-SNAPSHOT
    bin\\activemq
    
    **NOTE:** Working directories get created relative to the current directory. To create the working directories in the proper place, ActiveMQ must be launched from its home/installation directory.
    
3.  Proceed to the [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section.

Warning

If you are building ActiveMQ 5.x under Windows using Cygwin there is a path name length limitation. If the path name length is exceeded, you may see build errors. To correct this, move the ActiveMQ source directory higher in the file system tree, e.g., /cygdrive/c/d/sm.

#### Windows Developer's Release

This procedure explains how to download and install the latest developer's snapshot.

**NOTE:** ActiveMQ requires Java 7 to run and to build

1.  From a browser, navigate to [activemq.apache.org/](http://activemq.apache.org/).
2.  Click the [Download](OverviewOverview/Overview/download.md) link in the navigation pane (the left pane).
3.  Click the Maven ActiveMQ SNAPSHOT link.
4.  Select the version of ActiveMQ to download
5.  Extract the files from the ZIP file into a directory of your choice.
6.  If a binary snapshot was downloaded, proceed to the [#Starting ActiveMQ](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.  
    If a source snapshot was downloaded, perform step 6 and step 7 of the [#Windows Source Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) procedure.
7.  Following start-up, proceed to the [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section.

Installation Procedure for Unix
-------------------------------

#### Unix Binary Installation

This procedure explains how to download and install the binary distribution on a Unix system.  
**NOTE:** There are several alternative ways to perform this type of installation.

1.  Download the activemq gzip file to the Unix machine, using either a browser or a tool, i.e., wget, scp, ftp, etc. for example:
    
    \> wget http://activemq.apache.org/path/tofile/apache-activemq-5.8-tar.gz
    
2.  Extract the files from the gzip file into a directory of your choice. For example:
    
    \> tar zxvf activemq-x.x.x.tar.gz
    
3.  If the `ActiveMQ` start-up script is not executable, change its permissions. The `ActiveMQ` script is located in the `bin` directory. For example:
    
    \> cd \[activemq\_install\_dir\]/bin
    \> chmod 755 activemq
    
4.  Proceed to the [#Starting ActiveMQ](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.
5.  Following start-up, go to the [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section.

#### Unix Source Installation

This procedure explains how to download and install the source distribution on a Unix system. This procedure assumes the Unix machine has a browser. Please see the previous [#Unix Binary Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section for details on how to install ActiveMQ without a browser.

**NOTE:** ActiveMQ requires Java 7 to run and to build

1.  From a browser, navigate to [activemq.apache.org/](http://activemq.apache.org/).
2.  Click the [Download](OverviewOverview/Overview/download.md) link in the navigation pane (the left pane).
3.  Click the Maven ActiveMQ SNAPSHOT link.
4.  Select the version of ActiveMQ to download  
    For a source distribution, the filename will be similar to: `activemq-x.x-src.tar.gz`.
5.  Extract the files from the ZIP file into a directory of your choice. For example:
    
    tar zxvf activemq.x.x-src.tar.gz
    
6.  Build ActiveMQ using Maven 3.0 or greater and Java 7:  
    The preferred method of building ActiveMQ is the following:
    
    cd \[activemq\_install\_dir\]
    mvn clean install
    
    If Maven crashes with a java.lang.OutOfMemoryError, you you need to do this first (assuming a Bourne-like shell):
    
    export MAVEN_OPTS=-Xmx1024M
    
    If the above build fails on some tests, do the following:
    
    cd \[activemq\_install\_dir\]
    mvn clean install -Dmaven.test.skip=true 
    
    If you prefer to use an IDE then you can auto-generate the IDE's project file using maven plugins:
    
    mvn eclipse:eclipse
    
    or
    
    mvn idea:idea
    
    Feel free to use any other applicable IDE. Please refer to the [plugin reference](http://maven.apache.org/reference/plugins/plugins.html) for more details.  
    **NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.
    
7.  Proceed to the [#Starting ActiveMQ](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.
8.  Proceed to [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section.

#### Unix Developer's Release

This procedure explains how to download and install the latest developer's snapshot.

**NOTE:** ActiveMQ requires Java 7 to run and to build

1.  From a browser, navigate to [activemq.apache.org/](http://activemq.apache.org/).
2.  Click the [#Download](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) link in the navigation pane (the left pane).
3.  Click the Maven ActiveMQ SNAPSHOT link.
4.  Select the version of ActiveMQ to download
5.  Extract the files from the gzip file into a directory of your choice. For example:  
    For a binary developer's snapshot:
    
    tar zxvf activemq-x.x.x.tar.gz
    
    For a source developer's snapshot:
    
    tar zxvf activemq-x.x.x-src.tar.gz
    
6.  If a binary snapshot was downloaded, to make it executable, the `ActiveMQ` script may need its permissions changed:
    
    cd \[activemq\_install\_dir\]/bin
    chmod 755 activemq
    
7.  For a binary snapshot, proceed to the [#Starting ActiveMQ](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section of this document.
8.  If a source snapshot was downloaded perform steps 6 - 8 of the [#Unix Source Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) procedure.
9.  Proceed to the [#Testing the Installation](version-5-Using ActiveMQUsing ActiveMQ/Using ActiveMQ/getting-started.md) section.

Starting ActiveMQ
-----------------

There now follows instructions on how to [run the ActiveMQ Message Broker](Using ActiveMQ/run-broker.md).

See also [Starting ActiveMQ with a different configuration file](#)

### On Windows

From a console window, change to the installation directory and run `ActiveMQ`:

cd \[activemq\_install\_dir\]

where `activemq_install_dir` is the directory in which ActiveMQ was installed, e.g., `c:\Program Files\ActiveMQ-5.x`.

Then type (depending on ActiveMQ version):

**ActiveMQ 5.10 onwards**

bin\\activemq start

**ActiveMQ 5.9 or older**

bin\\activemq

**NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.

### On Unix

From a command shell, change to the installation directory and run `ActiveMQ`:

cd \[activemq\_install\_dir\]

where `activemq_install_dir` is the directory in which ActiveMQ was installed, e.g., `/usr/local/activemq-5.x`.  
Then type:

bin/activemq start

OR

bin/activemq start > /tmp/smlog  2>&1 &;
Note: /tmp/smlog may be changed to another file name.

**NOTE:** Working directories get created relative to the current directory. To create working directories in the proper place, ActiveMQ must be launched from its home/installation directory.

Warning

Do NOT close the console or shell in which ActiveMQ was started, as that will terminate ActiveMQ (unless ActiveMQ was started with nohup).

nohup bin/activemq > /tmp/smlog 2>&1 &

### More help

For other ways of running the broker see [Here](Using ActiveMQ/run-broker.md). For example you can run an [embedded broker](Community/FAQ/Using Apache ActiveMQ/how-do-i-embed-a-broker-inside-a-connection.md) inside your JMS Connection to avoid starting a separate process.

Testing the Installation
------------------------

If ActiveMQ is up and running without problems, the Window's console window or the Unix command shell will display information similar to the following log line:

INFO  ActiveMQ JMS Message Broker (ID:apple-s-Computer.local-51222-1140729837569-0:0) has started

  
ActiveMQ's default port is 61616. From another window run netstat and search for port 61616.

From a Windows console, type:

netstat -an|find "61616"

**OR**

From a Unix command shell, type:

netstat -an|grep 61616

Monitoring ActiveMQ
-------------------

You can monitor ActiveMQ using the [Web Console](ToolsTools/Tools/web-console.md) by pointing your browser at

[http://localhost:8161/admin](http://localhost:8161/admin)

From ActiveMQ 5.8 onwards the web apps is secured out of the box.  
The default username and password is admin/admin. You can configure this in the conf/jetty-real.properties file.

Or you can use the [JMX](Features/jmx.md) support to view the running state of ActiveMQ.

For more information see the file `docs/WebConsole-README.txt` in the distribution.

Stopping ActiveMQ
-----------------

For both Windows and Unix installations, terminate ActiveMQ by typing "CTRL-C" in the console or command shell in which it is running.

If ActiveMQ was started in the background on Unix, the process can be killed, with the following:

cd \[activemq\_install\_dir\]

where `activemq_install_dir` is the directory in which ActiveMQ was installed, e.g., `/usr/local/activemq-5.x`.  
Then type:

bin/activemq stop

Or you can do the following:

ps -ef|grep activemq
kill \[PID\]
  where \[PID\] is the process id of the ActiveMQ process.

Starting ActiveMQ with a different configuration file
-----------------------------------------------------

By default ActiveMQ uses the `conf/activemq.xml` as the main configuration file when starting. If you want to use a different configuration file you can specify this as a parameter.

#### ActiveMQ 5.8 or older

For example to use `conf/activemq-demo.xml` which includes the web demos, you do as follows:

bin/activemq console xbean:conf/activemq-demo.xml

To start Active in console mode and load the `conf/activemq-demo.xml` file. Yes you need the `xbean:` as prefix.

And to launch as a background process you can do:

bin/activemq start xbean:conf/activemq-demo.xml

#### ActiveMQ 5.9 onwards

For example to use `examples/conf/activemq-demo.xml` which includes the web demos, you do as follows:

bin/activemq console xbean:examples/conf/activemq-demo.xml

To start Active in console mode and load the `examples/conf/activemq-demo.xml` file. Yes you need the `xbean:` as prefix.

And to launch as a background process you can do:

bin/activemq start xbean:examples/conf/activemq-demo.xml

Configuring ActiveMQ
--------------------

The ActiveMQ broker should now run. You can configure the broker by specifying an [Xml Configuration](xml-Community/FAQ/configuration.md) file as a parameter to the _activemq_ command. An alternative is to use the [Broker Configuration URI](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/broker-configuration-uri.md) to configure things on the command line in a concise format (though the configuration options are not as extensive as if you use Java or XML code). You can also

Also see [Configuring Transports](Using ActiveMQ/configuring-transports.md) to see how you can configure the various connection, transport and broker options using the connection URL in the ActiveMQConnectionFactory.

See the [Initial Configuration](Using ActiveMQ/initial-Community/FAQ/configuration.md) for details of which jars you need to add to your classpath to start using ActiveMQ in your Java code

If you want to use JNDI to connect to your JMS provider then please view the [JNDI Support](Connectivity/Containers/jndi-Community/support.md). If you are a Spring user you should read about [Spring Support](Connectivity/Containers/spring-Community/support.md)

After the installation, ActiveMQ is running with a basic configuration. For details on configuring options, please see refer to the [Configuration](Community/FAQ/configuration.md) section.

Additional Resources
--------------------

If you are new to using ActiveMQ, running the [Web Samples](Using ActiveMQ/web-samples.md) or the [Examples](Using ActiveMQ/examples.md) is a good next step to learn more about ActiveMQ.

