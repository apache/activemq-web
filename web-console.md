      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Web Console 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Tools](tools.html) > [Web Console](web-console.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

The ActiveMQ Web Console is a web based administration tool for working with ActiveMQ. When used with the [JMX](jmx.html) support it can be an invaluable tool for working with ActiveMQ

### Running the Web Console on ActiveMQ 5.0 or later

We have integrated the Web Console into the binary distribution. So [Download](download.html) a binary distribution then follow the instructions for [Version 5 Run Broker](version-5-run-broker.html). Then you can point your web browser at the URL

*   [http://localhost:8161/admin](http://localhost:8161/admin)

And hey presto, you should now have the Web Console running.

In the event that you are running a standalone broker and the Web Console is not reachable, check that the following lines are included in your ActiveMQ config xml:

<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
<property name="locations">
<value>file:${activemq.base}/conf/credentials.properties</value>
</property>
</bean>

<!\-\- your broker config goes here -->

<import resource="${activemq.base}/conf/jetty.xml" />

The import will start up an embedded Jetty container. To verify that the config is working, the following should appear in your ActiveMQ console/logs on next startup:

INFO | jetty-7.1.6.v20100715
INFO | ActiveMQ WebConsole initialized.

### Changing the port

If you want to change the port number of the web console, see the configuration files in the conf directory.

### Securing Web Console

Starting with ActiveMQ 5.4.0, Web Console comes pre-configured with basic access authentication setup. It's turned off by default, so you need to turn it on explicitly, but it's really simple. Go to the `${ACTIVEMQ_HOME}/conf/jetty.xml` and find the following line

<property name="authenticate" value="false" />

and change it to

<property name="authenticate" value="true" />

That's it. From that point on, web server will look at `${ACTIVEMQ_HOME}/conf/jetty-realm.properties` file trying to match provided credentials with those listed in the file. By default, you can access the web console with `admin/admin` credentials. That can be changed (and more users can be added) in the `jetty-realm.properties` file.

You may also wish to enable **ssl connector** to further secure access to the web console and other web resources of the broker. To do that, go to the `${ACTIVEMQ_HOME}/conf/jetty.xml` and make sure you have the secure connector enabled. In versions 5.7 and newer just uncomment a predefined config. In any case make sure your connectors settings looks similar to this.

        <property name="connectors">
            <list>
                <bean id="Connector" class="org.eclipse.jetty.server.nio.SelectChannelConnector">
                    <property name="port" value="8161" />
                </bean>
                <bean id="SecureConnector" class="org.eclipse.jetty.server.ssl.SslSelectChannelConnector">
                    <property name="port" value="8162" />
                    <property name="keystore" value="file:${activemq.conf}/broker.ks" />
                    <property name="password" value="password" />
                </bean>
            </list>
        </property>

Standard connector is left enabled in this example, but you can remove it in your configuration if you wish.

Note that these changes will affect the whole web server, so if you're using [REST](rest.html) API or blob fileserver be sure to provide appropriate credentials.

If you're interested in securing 5.3.1 (and 5.3.2) Web consoles, take a look at [this article](http://www.nighttale.net/activemq/securing-activemq-531-console.html). For older versions, please refer to [this article](http://it.toolbox.com/blogs/unix-sysadmin/securing-activemq-web-console-27727)

### Using the Web Console

The web console is depicted in the following image:

![](web-console.data/web_console.png)

To get started, go to the [Send](http://localhost:8080/activemq-web-console/send.jsp) page and send a message to a queue (you can send multiple if you like, see the message count field).

Now that you have sent messages to a queue you should be able to [Browse](http://localhost:8080/activemq-web-console/browse.jsp) then and view the queue as an RSS or Atom feed.

The Web Console has many features relative to it's tabs as shown in the following table.

Tab

Features

Home

[System Usage](http://activemq.apache.org/producer-flow-control.html#ProducerFlowControl-Systemusage)

Queues

Topics

[Viewing Advisory Messages](http://activemq.apache.org/advisory-message.html)

Subscribers

Connections

[Protocols](http://activemq.apache.org/protocols.html)

Scheduled

Send

[Delay and Schedule Message Delivery](http://activemq.apache.org/delay-and-schedule-message-delivery.html)

External Web Consoles
=====================

There are a number of external web consoles for Apache ActiveMQ in separate open source projects:

External Project

Description

[hawtio](http://hawt.io/)

hawtio is an open source HTML5 web application for visualising, managing, tracing and debugging Camel routes & endpoints, ActiveMQ brokers, JMX, OSGi and logging. Here is a [blog entry](http://www.bennet-schulz.com/2016/07/apache-activemq-and-hawtio.html) how to install hawtio as web console for ActiveMQ.

[RHQ](http://www.jboss.org/rhq)

RHQ is an open source operational monitoring tool which has support for Apache Camel (along with other Apache projects like Tomcat, httpd, ActiveMQ etc)

[Hermes JMS](http://www.hermesjms.com/confluence/display/HJMS/Home)

HermesJMS is an extensible console that helps you interact with JMS providers making it simple to publish and edit messages, browse or seach queues and topics, copy messages around and delete them.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36192))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();