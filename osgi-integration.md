      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- OSGi Integration 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [OSGi Integration](osgi-integration.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Introduction
============

This article will provide more details on how to use ActiveMQ in [Apache Karaf](http://karaf.apache.org/), small OSGi based runtime. Apache Karaf was previously know as _ServiceMix kernel_, so informations found here are applicable to [Apache ServiceMix Enterprise Service Bus](http://servicemix.apache.org/home.html) as well.

Procedures described in this article were tested using Apache karaf 2.3.0

Installation
============

ActiveMQ provides Karaf features which will help you integrate and use the broker in OSGi environment. For starters you need to add the features URL to Karaf. For version 5.9.0 you can do it like this:

karaf@root> features:chooseurl activemq 5.9.0

After that you should see newly added features

karaf@root> features:list
State         Version         Name                 Repository
\[uninstalled\] \[5.9.0         \] activemq-broker               activemq-5.9.0        
\[uninstalled\] \[5.9.0         \] activemq-http                 activemq-5.9.0        
\[uninstalled\] \[5.9.0         \] activemq-camel                activemq-5.9.0        
\[uninstalled\] \[5.9.0         \] activemq-web-console          activemq-5.9.0

Installing and running the broker is as simple as installing `activemq-broker` feature, like

karaf@root> features:install activemq-broker

This will install and start the full broker (including the web console), just as if you started the standalone distribution.

Broker Configuration
====================

Broker is configured using OSGi Config Admin mechanism and could be easily managed in [Karaf](http://karaf.apache.org/manual/latest-2.3.x/users-guide/configuration.html). Configuration can be done by modifying `${KARAF_BASE}/etc/org.apache.activemq.server-default.cfg` file or respective config admin property. An example of the file looks like

broker-name=amq-broker
data=${karaf.data}/${broker-name}
config=${karaf.base}/etc/activemq.xml

Mandatory properties are listed in the following table

Property Name

Property Description

broker-name

Name of the broker

config

Location of the XML configuration file

You can also use this file to set other properties which will replace placeholders in XML configuration file, as the `${data`} property is used in this example.

Default XML configuration file is located in the `${KARAF_BASE}/etc/activemq.xml` by default.

Web Console
===========

Web Console is installed by default and can be reached at [http://localhost:8181/activemqweb/](http://localhost:8181/activemqweb/)

The configuration for the console is done in a similar fashion to the broker itself. Configuration is located in `${KARAF_BASE}/etc/org.apache.activemq.webconsole.cfg` and by default looks like

webconsole.jms.url=tcp://localhost:61616
webconsole.jmx.url=service:jmx:rmi:///jndi/rmi://localhost:1099/karaf-root
webconsole.jmx.user=karaf
webconsole.jmx.password=karaf

**Optional:** In order to use the ActiveMQ console with a broker configured with authentication, it is necessary to configure the username/password for JMS connection as well.

webconsole.jms.user=system
webconsole.jms.password=manager

Commands
========

After these simple steps you have all necessary libraries installed in the container. Also, now you have specific commands on your disposal that you can use to manage your broker:

  browse                Display selected messages in a specified destination
  bstat                 Displays useful broker statistics
  list                  Lists all available brokers in the specified JMX context
  purge                 Delete selected destination's messages that matches the message selector
  query                 Display selected broker component's attributes and statistics
  dstat                 Performs a predefined query that displays useful tabular statistics regarding the specified destination type 

Help on commands

To obtain some detailed help on a given command, you can run:

activemq:\[command\] --help 

Broker querying
---------------

Several commands are available to query the broker. To address local brokers, you need to use the `--jmxlocal` parameter.

The following command displays available brokers:

karaf@root> activemq:list --jmxlocal
BrokerName = mybroker

To have more detailed informations, run:

karaf@root> activemq:query --jmxlocal

It will display informations about the connectors, list of queues, etc...

You can also browse or purge queues using the `activemq:browse` and `activemq:purge` commands.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=23333873))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();