      .maincontent { overflow:hidden; }         SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- How do I use SSL 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [How do I use SSL](how-do-i-use-ssl.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

### Setting up the Key and Trust Stores

Also see [Tomcat's SSL instructions](http://jakarta.apache.org/tomcat/tomcat-5.5-doc/ssl-howto.html) for more info. The following was provided by Colin Kilburn. Thanks Colin!

ActiveMQ uses dummy credentials by default

ActiveMQ includes key and trust stores that reference a dummy self signed cert. When you create a broker certificate and stores for your installation, either overwrite the values in the conf directory or delete the existing dummy key and trust stores so they cannot interfere)

1.  Using keytool, create a certificate for the broker:
    
    keytool -genkey -alias broker -keyalg RSA -keystore broker.ks
    
2.  Export the broker's certificate so it can be shared with clients:
    
    keytool -export -alias broker -keystore broker.ks -file broker_cert
    
3.  Create a certificate/keystore for the client:
    
    keytool -genkey -alias client -keyalg RSA -keystore client.ks
    
4.  Create a truststore for the client, and import the broker's certificate. This establishes that the client "trusts" the broker:
    
    keytool -import -alias broker -keystore client.ts -file broker_cert
    

### Starting the Broker

#### Using the javax.net.ssl.* System Properties

Before starting the broker's VM set the ACTIVEMQ\_SSL\_OPTS environment variable so that it knows to use the broker keystore.  (note that in previous versions of ActiveMQ this property was called SSL\_OPTS in some scripts.  As of v5.12.0 all scripts use ACTIVEMQ\_SSL_OPTS)

export ACTIVEMQ\_SSL\_OPTS = -Djavax.net.ssl.keyStore=/path/to/broker.ks -Djavax.net.ssl.keyStorePassword=password

#### Using Spring to configure SSL for a Broker instance

Sometimes the use of javax.net.ssl.* system properties is not appropriate as they effect all SSL users in a JVM. ActiveMQ 5.2.x adds an <sslContext> element to the <amq:broker> that allows a broker specific set of SSL properties to be configured.

The SslContext [test case](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/java/org/apache/activemq/transport/tcp/SslContextBrokerServiceTest.java) validates starting an SSL transport listener using the configuration specified in the broker Xbean. The SslContext element is added to the broker as follows:

<beans
  <amq:broker useJmx="false" persistent="false">

    <amq:sslContext>
      <amq:sslContext
      		keyStore="broker.ks" keyStorePassword="password"
      		trustStore="client.ks" trustStorePassword="password"/>
    </amq:sslContext>

    <amq:transportConnectors>
      <amq:transportConnector uri="ssl://localhost:61616" />
    </amq:transportConnectors>

  </amq:broker>
</beans>

The SslContext is used to configure the [SslTransportFactory](https://svn.apache.org/repos/asf/activemq/trunk/activemq-client/src/main/java/org/apache/activemq/transport/tcp/SslTransportFactory.java) for that broker. Full details of the configuration options available can be seen in the [schema definition](http://activemq.apache.org/schema/core/activemq-core-5.2-SNAPSHOT.xsd) or in the accessors of [org.apache.activemq.spring.SpringSslContext](https://svn.apache.org/repos/asf/activemq/trunk/activemq-spring/src/main/java/org/apache/activemq/spring/SpringSslContext.java)

### Starting the Client

When starting the client's VM, specify the following system properties:

javax.net.ssl.keyStore=/path/to/client.ks
javax.net.ssl.keyStorePassword=password
javax.net.ssl.trustStore=/path/to/client.ts

In Linux, do not use absolute path to keystore. By default, keytool uses ~/.keystore, but in some setups passing -Djavax.net.ssl.keyStore=/home/account/.keystore to Java VM does not work. This is not ActiveMQ specific but good to keep in mind anyway.

### Client certificates

If you want to verify client certificates, you need to take a few extra steps:

1.  Export the client's certificate so it can be shared with broker:
    
    keytool -export -alias client -keystore client.ks -file client_cert
    
2.  Create a truststore for the broker, and import the client's certificate. This establishes that the broker "trusts" the client:
    
    keytool -import -alias client -keystore broker.ts -file client_cert
    
3.  Add
    
    -Djavax.net.ssl.trustStore=/path/to/broker.ts
    
    to ACTIVEMQ\_SSL\_OPTS
    
4.  Instruct ActiveMQ to require client authentication by setting the following in activemq.xml:
    
      <transportConnectors>
        <transportConnector name="ssl" uri="ssl://localhost:61617?needClientAuth=true" />
      </transportConnectors>
    

### Certificate revocation

Starting with version **5.12**, you can define certificate revocation list (CRL) path on ssl context, so that invalid certificates can revoked

    <sslContext>
        <sslContext keyStore="org/apache/activemq/security/broker1.ks"
                    keyStorePassword="password"
                    trustStore="org/apache/activemq/security/activemq-revoke.jks"
                    trustStorePassword="password"
                    crlPath="org/apache/activemq/security/activemq-revoke.crl"/>
    </sslContext>

This list is static and loaded on broker startup.

Starting with version **5.14.0**, you can also enable more advanced Online Certificate Status Protocol (OCSP) protocol. For that you need to configure a location for the `java.security` configuration extension by setting appropriate system properties (in `${ACTIVEMQ_HOME}/bin/env`) like

ACTIVEMQ\_SSL\_OPTS="-Djava.security.properties=$ACTIVEMQ_CONF/java.security"

Then you need to configure OCSP responder properties in `java.security` file like

ocsp.enable=true
ocsp.responderURL=http://ocsp.example.net:80

A demo of the broker configuration working with OCSP responder can be found at [https://github.com/dejanb/sslib](https://github.com/dejanb/sslib)

### Working Around Java 7 SSL Bugs

As noted by issue AMQ-5970, it seems some versions of Java 7 have problems with SSL sessions that need to use the Diffie-Hellman cypher suite. If you run into this issue, just copy the Bouncy Castle bcprov-jdk15on-148.jar to ActiveMQ's lib directory and restart your broker.

### Useful links

These links might also help

*   [Sun's JSSE guide](http://java.sun.com/j2se/1.4.2/docs/guide/security/jsse/JSSERefGuide.html#CreateKeystore)
*   [Thawte SSL Troubleshooting Tips](https://search.thawte.com/support/ssl-digital-certificates/index?page=content&id=SO10061)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36030))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();