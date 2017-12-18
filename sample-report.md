      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- sample report 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Performance](performance.html) > [ActiveMQ Performance Module Users Manual](activemq-performance-module-users-manual.html) > [sample report](sample-report.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Performance Test Report Template
--------------------------------

<testResult>
  <property name='systemSettings'>
    <props>
      <prop key='java.runtime.name'>Java(TM) 2 Runtime Environment, Standard Edition</prop>
      <prop key='java.vm.version'>1.4.2_10-b03</prop>
                     .
                     .
                     .
      <prop key='os.arch'>x86</prop>
      <prop key='os.name'>Windows XP</prop>
      <prop key='sun.cpu.isalist'>pentium i486 i386</prop>
    </props>
  </property>

  <property name='testProperties'>
    <props>
      <prop key='sysTest.numClients'>5</prop>
                     .
                     .
                     .
      <prop key='sysTest.destDistro'>all</prop>
      <prop key='sysTest.totalDests'>2</prop>
    </props>
  </property>

  <property name='performanceData'>
    <list>
      <value index='0' clientName='TestProducer0'>1035</value>
      <value index='0' clientName='TestProducer3'>255</value>
      <value index='0' clientName='TestProducer4'>727</value>
      <value index='0' clientName='TestProducer2'>347</value>
      <value index='0' clientName='TestProducer1'>527</value>
      <value index='1' clientName='TestProducer0'>947</value>
      <value index='1' clientName='TestProducer3'>615</value>
      <value index='1' clientName='TestProducer4'>712</value>
      <value index='1' clientName='TestProducer2'>864</value>
      <value index='1' clientName='TestProducer1'>187</value>
                     .
                     .
                     .
      <value index='171' clientName='TestProducer0'>1364</value>
      <value index='171' clientName='TestProducer3'>395</value>
      <value index='171' clientName='TestProducer4'>716</value>
      <value index='171' clientName='TestProducer2'>377</value>
      <value index='171' clientName='TestProducer1'>515</value>
    </list>
  </property>

  <property name='perfSummary'>
    <props>
      <prop key='SystemTotalTP'>552114</prop>
      <prop key='SystemTotalClients'>5</prop>
      <prop key='SystemAveTP'>3209.9651162790697</prop>
      <prop key='SystemAveEMMTP'>3161.9651162790697</prop>
      <prop key='SystemAveClientTP'>641.9930232558139</prop>
      <prop key='SystemAveClientEMMTP'>632.3930232558139</prop>
      <prop key='MinClientTP'>clientName=TestProducer4,value=36</prop>
      <prop key='MaxClientTP'>clientName=TestProducer4,value=1764</prop>
      <prop key='MinClientTotalTP'>clientName=TestProducer1,value=107409</prop>
      <prop key='MaxClientTotalTP'>clientName=TestProducer0,value=116751</prop>
      <prop key='MinClientAveTP'>clientName=TestProducer1,value=624.4709302325581</prop>
      <prop key='MaxClientAveTP'>clientName=TestProducer0,value=678.7848837209302</prop>
      <prop key='MinClientAveEMMTP'>clientName=TestProducer1,value=615.2732558139535</prop>
      <prop key='MaxClientAveEMMTP'>clientName=TestProducer0,value=668.9418604651163</prop>
    </props>
  </property>
</testResult>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=36224))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();