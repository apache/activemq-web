      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Complex Single Broker Configuration (STOMP only) 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [User Submitted Configurations](user-submitted-configurations.html) > [Complex Single Broker Configuration (STOMP only)](complex-single-broker-configuration-stomp-only.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Example of an ActiveMQ configuration with predefined queues, simple destination security (could easily update it to JAAS), complex Web Console security with Jetty JAAS, and JMX security too.

While this is a fairly detailed configuration, it locks down every ActiveMQ service. It would be ideal if ActiveMQ shipped with a default closed configuration like this.

ActiveMQ is assumed to be installed in /usr/local/activemq/ in this example.

<!--
  ActiveMQ activemq.xml configuration file (/usr/local/activemq/conf/activemq.xml)

  \* ActiveMQ JVM Startup options are in /etc/activemq.conf

  \* Uses the Sun JMX connector for remote management.  Point jconsole at:
     service:jmx:rmi:///jndi/rmi://myserver.domain.net:61616/jmxrmi

  \* Uses Kaha persistence storage, stored in the "activemq-data" directory.
    "activemq-data" and "logs" sub-directories must be writable by the
    ActiveMQ user.

  \* Also see conf/log4j.properties for logging configuration
-->

<beans>
    <!\-\- Enables system properties as variables in this configuration file -->
    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"/>

    <broker xmlns="http://activemq.org/config/1.0" brokerName="SERVER1"
        populateJMSXUserID="true" useJmx="true" persistent="true">

    <!\-\- Queue setup.  Queues can be created on the fly by any user with
         admin rights, but it is not good to give every user admin rights.  -->
    <destinations>
        <queue physicalName="widgets" />
        <queue physicalName="spacecontrol" />
        <queue physicalName="displays" />
    </destinations>

    <!\-\- We only allow Stomp clients -->
    <transportConnectors>
        <transportConnector name="stomp" uri="stomp://localhost:61613"/>
    </transportConnectors>

    <!\-\- We don't have any other brokers to connect to -->
    <networkConnectors>
    </networkConnectors>

    <!\-\- Do not create an ActiveMQ JMX connector.  Use the Sun JMX connector
         instead, and hook ActiveMQ to it. -->
    <managementContext>
        <managementContext createConnector="false" />
    </managementContext>

    <plugins>
        <simpleAuthenticationPlugin>
            <users>
                <authenticationUser username="sa" password="manager" groups="producers,consumers,admins" />
                <authenticationUser username="frontend" password="manager" groups="producers,consumers" />
                <authenticationUser username="backend" password="manager" groups="consumers" />
            </users>
        </simpleAuthenticationPlugin>
        <authorizationPlugin>
            <map>
                <authorizationMap>
                    <authorizationEntries>
                        <authorizationEntry queue=">" write="producers" read="consumers" admin="admins" />
                    </authorizationEntries>
                </authorizationMap>
            </map>
        </authorizationPlugin>
    </plugins>

    </broker>

    <!\-\- Do not create ActiveMQ.Agent topic, as it does not work if
         destination security is enabled -->
    <!\-\- <commandAgent xmlns="http://activemq.org/config/1.0"/> -->

    <!\-\- Web Console.  Auth is via JAAS.  Beware: jetty-plus-6.1.4.jar contains the
         JAAS classes, and is not included with ActiveMQ.  You need to download
         separately.  Web Console queue browser will fail, as it tries to use JMS
         to browse the queue, and that requires a password.
    -->

    <jetty xmlns="http://mortbay.com/schemas/jetty/1.0">
        <connectors>
            <nioConnector port="8161" />
        </connectors>

        <userRealms>
            <!\-\- "name" must match the realm in web.xml, and "loginModuleName" must be defined in login.conf -->
            <jaasUserRealm name="ActiveMQ" loginModuleName="ActiveMQ"
                    callbackHandlerClass="org.mortbay.jetty.plus.jaas.callback.DefaultCallbackHandler" />
        </userRealms>

        <handlers>
            <webAppContext contextPath="/admin" resourceBase="${activemq.base}/webapps/admin" logUrlOnStart="true" />
        </handlers>
    </jetty>
</beans>

Add this XML snippet to the web.xml for the /admin/ app, in order to enable HTTP Authentication to match the activemq.xml configuration above.

<security-constraint>
    <web-resource-collection>
        <web-resource-name>Web Console</web-resource-name>
        <url-pattern>/*</url-pattern>
    </web-resource-collection>
    <auth-constraint>
        <role-name>admins</role-name>
    </auth-constraint>
</security-constraint>

<login-config>
    <auth-method>BASIC</auth-method>
    <realm-name>ActiveMQ</realm-name>
</login-config>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=119738))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();