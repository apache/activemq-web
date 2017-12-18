      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Maven2 ActiveMQ Broker Plugin 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Tools](tools.html) > [Maven2 ActiveMQ Broker Plugin](maven2-activemq-broker-plugin.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ provides a Maven2 plugin to easily startup a JMS broker. It is useful to quickly boot up a message broker in your Maven2 project for debugging or for doing integration tests.

###  How to Use

Be Careful

The maven plugins in ActiveMQ have been renamed in version 5.8.0+ to better follow the Maven plugin naming conventions. The ActiveMQ Broker plugin has changed from 'maven-activemq-plugin' to 'activemq-maven-plugin'.

> Replace the 5.7.0 version string with the version of your choosing, eg: 5.6.0, 5.8-SNAPSHOT

In your Maven2 project, or using a minimal pom.xml like the following:

<?xml version="1.0" encoding="UTF-8"?>
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.acme</groupId>
  <artifactId>run-amq</artifactId>
  <version>1.0-SNAPSHOT</version>
</project>

just type:

 mvn org.apache.activemq.tooling:maven-activemq-plugin:5.1:run

This will download the 5.7.0 version of the plugin, and spin up a broker using a simple configuration url of the form `broker:(tcp://localhost:61616)?useJmx=false&persistent=false`. The necessary ActiveMQ jars will automatically be downloaded by Maven.

To configure log4j, provide the `-Dlog4j.configuration=[file:///](file:///)<full path to log4j.properties>` system property on the mvn command line.

If you require a more advanced configuration with spring support, the jetty webconsole or with embedded camel you can add the plugin in your pom.xml and provide the required optional dependencies. For the default `conf/activemq.xml`, the following dependencies are required :

 <build>    
    <plugins>
      <plugin>
        <groupId>org.apache.activemq.tooling</groupId>
        <artifactId>maven-activemq-plugin</artifactId>
        <version>5.7.0</version>
        <configuration>
          <configUri>xbean:file:../conf/activemq.xml</configUri>
          <fork>false</fork>
          <systemProperties>
            <property>
              <name>javax.net.ssl.keyStorePassword</name>
              <value>password</value>
            </property>
            <property>
              <name>org.apache.activemq.default.directory.prefix</name>
              <value>./target/</value>
            </property>
          </systemProperties>
        </configuration>
        <dependencies>
	  <dependency>
            <groupId>org.springframework</groupId>
	    <artifactId>spring</artifactId>
  	    <version>2.5.5</version>
	  </dependency>
	  <dependency>
            <groupId>org.mortbay.jetty</groupId>
            <artifactId>jetty-xbean</artifactId>
            <version>6.1.11</version>
         </dependency> 	
         <dependency>
           <groupId>org.apache.camel</groupId>
           <artifactId>camel-activemq</artifactId>
           <version>1.1.0</version>
         </dependency>
	</dependencies>			
      </plugin>
    </plugins>
</build>

 and run it using:

 mvn activemq:run

###  Configuration Options

Name

Default

Description

configUri

broker:(tcp://localhost:61616)?useJmx=false&persistent=false

The broker configuration URI that will be use to startup the broker. For more information, refer [here](how-do-i-embed-a-broker-inside-a-connection.html)  

fork

false

If true, start up the broker in a separate thread, enabling maven to continue processing (Useful for integration testing).  

systemProperties

none

Additional system properties that will be set.  

 Note: By default, the broker plugin will set activemq.base, activemq.home, org.apache.activemq.default.directory.prefix, derby.system.home to ./target/. This means that all data folders will be created there, hence will easily be deleted by running mvn clean.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=59663))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();