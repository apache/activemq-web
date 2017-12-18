      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- JMS and JDBC operations in one transaction 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ](using-activemq.html) > [User Submitted Configurations](user-submitted-configurations.html) > [JMS and JDBC operations in one transaction](jms-and-jdbc-operations-in-one-transaction.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### JMS and JDBC operations in one transaction with Spring/Jencks/ActiveMQ

Spring beans:

<beans>
    <!\-\- ActiveMQ Broker -->
    <bean id="broker" class="org.apache.activemq.broker.BrokerService" init-method="start" destroy-method="stop">
        <property name="persistent" value="false"/>
        <property name="transportConnectorURIs">
            <list>
                <value>tcp://localhost:5000</value>
            </list>
        </property>
    </bean>

    <!\-\- Geronimo Transaction Manager -->
    <bean id="transactionContextManager" class="org.jencks.factory.TransactionContextManagerFactoryBean"/>
    <bean id="geronimo" class="org.jencks.factory.GeronimoTransactionManagerFactoryBean"/>
    <bean id="geronimoTransactionManager" class="org.springframework.transaction.jta.JtaTransactionManager">
        <property name="userTransaction" ref="geronimo" />
    </bean>

    <!\-\- Jencks Connection Manager -->
    <bean id="connectionManager" class="org.jencks.factory.ConnectionManagerFactoryBean">
        <property name="transactionSupport">
            <bean class="org.jencks.factory.XATransactionFactoryBean">
                <property name="useTransactionCaching" value="true"/>
                <property name="useThreadCaching" value="false"/>
            </bean>
        </property>
        <property name="poolingSupport">
            <bean class="org.jencks.factory.SinglePoolFactoryBean">
                <property name="maxSize" value="2"/>
                <property name="minSize" value="1"/>
                <property name="blockingTimeoutMilliseconds" value="60"/>
                <property name="idleTimeoutMinutes" value="60"/>
                <property name="matchOne" value="true"/>
                <property name="matchAll" value="true"/>
                <property name="selectOneAssumeMatch" value="true"/>
            </bean>
        </property>
    </bean>

    <!\-\- ActiveMQ Connection -->
    <bean id="jmsResourceAdapter" class="org.apache.activemq.ra.ActiveMQResourceAdapter" depends-on="broker">
        <property name="serverUrl">
            <value>tcp://localhost:5000</value>
        </property>
    </bean>
    <bean id="jmsManagedConnectionFactory" class="org.apache.activemq.ra.ActiveMQManagedConnectionFactory">
        <property name="resourceAdapter" ref="jmsResourceAdapter"/>
    </bean>
    <bean id="jmsConnectionFactory" class="org.springframework.jca.support.LocalConnectionFactoryBean">
        <property name="managedConnectionFactory" ref="jmsManagedConnectionFactory"/>
        <property name="connectionManager" ref="connectionManager"/>
    </bean>

    <!\-\- Tranql JDBC Connection -->
    <!--
    <bean id="tranqlManagedConnectionFactory" class="org.jencks.tranql.XAPoolDataSourceMCF">
        <property name="driverName" value="org.postgresql.Driver"/>
        <property name="url" value="jdbc:postgresql://ats-manager/activemq"/>
        <property name="user" value="activemq"/>
    </bean>
    <bean id="tranqlDataSource" class="org.springframework.jca.support.LocalConnectionFactoryBean">
        <property name="managedConnectionFactory" ref="tranqlManagedConnectionFactory"/>
        <property name="connectionManager" ref="connectionManager"/>
    </bean>
    \-\->

    <!\-\- Enhydra JDBC Connection -->
    <bean id="enhydraDataSource" class="org.enhydra.jdbc.pool.StandardXAPoolDataSource" destroy-method="shutdown">
        <property name="dataSource">
            <bean class="org.enhydra.jdbc.standard.StandardXADataSource" destroy-method="shutdown">
                <property name="transactionManager" ref="geronimo" />
                <property name="driverName" value="org.postgresql.Driver" />
                <property name="url" value="jdbc:postgresql://ats-manager/activemq" />
            </bean>
        </property>
        <property name="user" value="activemq"/>
    </bean>

    <bean id="jencksJCAContainer" class="org.jencks.JCAContainer">
        <property name="bootstrapContext">
            <bean class="org.jencks.factory.BootstrapContextFactoryBean">
                <property name="threadPoolSize" value="25"/>
            </bean>
        </property>
        <property name="resourceAdapter" ref="jmsResourceAdapter"/>
    </bean>

    <bean id="inboundConnector" class="org.jencks.JCAConnector">
        <property name="jcaContainer" ref="jencksJCAContainer" />
        <property name="activationSpec">
            <bean class="org.apache.activemq.ra.ActiveMQActivationSpec">
                <property name="destination" value="messages.input"/>
                <property name="destinationType" value="javax.jms.Queue"/>
            </bean>
        </property>
        <property name="transactionManager" ref="geronimo"/>
        <property name="ref" value="echoBean"/>
    </bean>

    <bean id="echoBean" class="transactions.EchoBean">
        <property name="jdbcTemplate">
            <bean class="org.springframework.jdbc.core.JdbcTemplate">
                <property name="dataSource" ref="enhydraDataSource"/>
            </bean>
        </property>
        <property name="jmsTemplate">
            <bean class="org.springframework.jms.core.JmsTemplate">
                <property name="connectionFactory" ref="jmsConnectionFactory"/>
            </bean>
        </property>
    </bean>
</beans>

Java code:

public class EchoBean implements MessageListener {

    private Log log = LogFactory.getLog(getClass());

    private JdbcTemplate jdbcTemplate;
    private JmsTemplate jmsTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void setJmsTemplate(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void onMessage(Message message) {
        log.debug(message);
        if (message instanceof TextMessage) {
            try {
                String messageText = ((TextMessage)message).getText();
                log.debug("execute JMS operation");
                jmsTemplate.convertAndSend("messages.ouptut", messageText);
                log.debug("execute JDBC operation");
                jdbcTemplate.execute("insert into t1 values('"+messageText+"')");
            } catch (JMSException e) {
                e.printStackTrace();
            }
        }
    }
}

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36100))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();