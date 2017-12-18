      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- JMS Bridge With Oracle AQ 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [User Submitted Configurations](user-submitted-configurations.html) > [JMS Bridge With Oracle AQ](jms-bridge-with-oracle-aq.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### Example of a configuration that shows how to connect to Oracle AQ queues and topics.

<beans>
    <!\-\- Allows us to use system properties as variables in this configuration file -->
    <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"/>

    <broker useJmx="true" persistent="false" xmlns="http://activemq.org/config/1.0"
            brokerName="localhost" dataDirectory="${activemq.base}/data" >
    </broker>

    <camelContext id="camel" xmlns="http://activemq.apache.org/camel/schema/spring">
        <!\-\- Dependencies: ojdbc.jar and aqjms.jar must be in the activemq lib directory -->

        <!\-\- this camel route will read incoming messages from Oracle -->
        <route>
            <from uri="oracleQueue:queue:ORACLE_QUEUE">
            <to   uri="activemq:queue:queue.inboundOracleAQqueue" >
        </route>
        <route>
            <!\-\- NOTE: I have had success with a topic using ActiveMQ 5.3, but not 5.1 -->
            <from uri="oracleTopic:topic:ORACLE_TOPIC">
            <to   uri="activemq:queue:queue.inboundOracleAQtopic" >
        </route>

        <!\-\- these camel routes will log the messages to the console .... replace them with something more useful!!  -->
        <route>
            <from uri="activemq:queue:queue.inboundOracleAQqueue" >
            <to uri="log:oracleAQ.inbound.got\_a\_queue_message?level=ERROR">
        </route>
        <route>
            <from uri="activemq:queue:queue.inboundOracleAQtopic" >
            <to uri="log:oracleAQ.inbound.got\_a\_topic_message?level=ERROR">
        </route>
    </camelContext>

    <!\-\- without the following bean instantiation, we will get an oracle.jms.AQjmsException with each and every received message -->
    <bean id="requiredBeanForOracleAq" class="org.apache.activemq.ActiveMQConnectionFactory" />

    <bean id="connectionFactoryOracleAQQueue" class="oracle.jms.AQjmsFactory" factory-method="getQueueConnectionFactory">
        <constructor-arg index="0">
            <value>jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS\_LIST ....... (SERVICE\_NAME = myDbService)))</value>
        </constructor-arg>
        <constructor-arg index="1" type="java.util.Properties">
            <value></value>
        </constructor-arg>
    </bean>

    <bean id="connectionFactoryOracleAQTopic" class="oracle.jms.AQjmsFactory"
                factory-method="getQueueConnectionFactory">
        <constructor-arg index="0">
            <value>jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS\_LIST ....... (SERVICE\_NAME = myDbService)))</value>
        </constructor-arg>
        <constructor-arg index="1" type="java.util.Properties">
            <value></value>
        </constructor-arg>
    </bean>

    <bean id="oracleQueueCredentials" class="org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter">
        <property name="targetConnectionFactory">
            <ref bean="connectionFactoryOracleAQQueue">
        </property>
        <property name="username">
            <value>foo</value>
        </property>
        <property name="password">
            <value>bar</value>
        </property>
    </bean>

    <bean id="oracleTopicCredentials" class="org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter">
        <property name="targetConnectionFactory">
            <ref bean="connectionFactoryOracleAQTopic">
        </property>
        <property name="username">
            <value>foo</value>
        </property>
        <property name="password">
            <value>bar</value>
        </property>
    </bean>

   <bean id="oracleQueue" class="org.apache.camel.component.jms.JmsComponent">
        <property name="connectionFactory" ref="oracleQueueCredentials">
   </bean>

   <bean id="oracleTopic" class="org.apache.camel.component.jms.JmsComponent">
        <property name="connectionFactory" ref="oracleTopicCredentials">
   </bean>
</beans>

If you run in an OSGi environment such as [ServiceMix 4](http://servicemix.apache.org) then take a look at [this discussion](http://servicemix.396122.n5.nabble.com/ServiceMix-4-2-Camel-OracleAQ-td421214.html#a421214) how to install the OracleAQ Client in the OSGi container.

#### Oracle SQL code

You may need to setup OracleAQ, and here is a sample code

BEGIN
 DBMS\_AQADM.CREATE\_QUEUE\_TABLE( queue\_table => 'queue\_message\_table', queue\_payload\_type => 'SYS.AQ$\_JMS\_TEXT_MESSAGE');
END;        

BEGIN
  DBMS\_AQADM.CREATE\_QUEUE( queue\_name => 'ORACLE\_QUEUE', queue\_table => 'queue\_message_table');
END;

BEGIN
  DBMS\_AQADM.START\_QUEUE(queue\_name => 'ORACLE\_QUEUE');
END;  

You can also find more information about OracleAQ and using JMS at: [http://docs.oracle.com/cd/B13789\_01/server.101/b10785/jm\_exmpl.htm](http://docs.oracle.com/cd/B13789_01/server.101/b10785/jm_exmpl.htm)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=119767))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();