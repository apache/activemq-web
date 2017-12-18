      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- XMPP 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Protocols](protocols.html) > [XMPP](xmpp.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

XMPP Protocol Support (Jabber!)
-------------------------------

Deprecated

This transport was deprecated in 5.8.0 and has been removed in a 5.9.0!

We have support for [XMPP](http://www.xmpp.org/) (Jabber) as a transport in ActiveMQ.

To use just add a connector as follows

<broker xmlns="http://activemq.org/config/1.0">
    <transportConnectors>
       <transportConnector name="openwire" uri="tcp://localhost:61616" discoveryUri="multicast://default"/>
       <transportConnector name="stomp"    uri="stomp://localhost:61613"/>
       <transportConnector name="xmpp"     uri="xmpp://localhost:61222"/>
    </transportConnectors>
  </broker>

And you can now use XMPP to connect to the broker & send and receive messages.

Some versions of the broker (5.0-5.2) does not include [WoodStox](http://woodstox.codehaus.org/) library by default, which could impact ActiveMQ XMPP funcionality. You should have a library named like `wstx-asl-x.x.x.jar` in the `lib/optional` directory of your broker. If that's not the case, download it from [here](http://woodstox.codehaus.org/) and put it in the classpath

### XMPP Support in Apache ActiveMQ

ActiveMQ provides a bidirectional bridge between ActiveMQ messages and XMPP.

*   if a client joins a chatroom / conference room, the name of the conference room is mapped to a JMS topic of the same name
*   typing into a chatroom sends a message to the topic
*   presence in a chatroom maintains a subscription on the JMS topic (using noLocal to avoid getting copies of things you say) so that messages sent by other clients (via [XMPP](xmpp.html), the [Web Console](web-console.html), the [Examples](examples.html) or any other [Cross Language Clients](cross-language-clients.html)) are then sent to the chatroom.

### Using a Jabber Client

Basically, you should be able to connect from any Jabber-compatible client to the broker. The below example is using [Spark](http://jivesoftware.com/products/spark/) 2.0.0 version. For more details on connecting with different clients take a look at [#Jabber clients compatibility](xmpp.html).

To connect to Apache ActiveMQ try the following...

1\. Run the [Web Console](web-console.html)  
2\. Start [Spark](http://jivesoftware.com/products/spark/) or whatever Jabber Client you wish  
3\. Login to localhost:61222

Some Jabber clients (like iChat) insist on usernames in forms of _username@host_, so in that case just append _@localhost_ to your username

![](xmpp.data/step1.png)

Some Jabber clients like to auto-discover the host and port. You need to explicitly disable this feature so you can explicitly configure **localhost** as the host and **61222** as the port.

e.g. on Spark go to the **Advanced** tab and disable the **Automatically discover host and port**

4\. You should now see the following screen...

![](xmpp.data/step2.png)

5\. Now click on the **Join Conference Room** button (next to the Add Contact button) and the following dialog should appear

![](xmpp.data/step3.png)

6\. Now press the **Create or Join Room** button to get the following dialog. Enter a JMS topic name, in this case **foo.bar** and you're good to go...

![](xmpp.data/step4.png)

7\. Now your chat window should appear for talking and listening to the topic **foo.bar**. So start typing to test things out. 

![](xmpp.data/step5.png)

 8\. Now if you go to the [Topic Console](http://localhost:8161/admin/topics.jsp) in the Web Console you should see the topic has been created

 ![](xmpp.data/step6-new.png)

9\. If you now click on the **Send To** link next to the **foo.bar** topic you can send a message to the topic from the web console. 

 ![](xmpp.data/step7-new.png)

10\. Press send and you should see the chat appear on the chat window ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png)

 ![](xmpp.data/step8.png)

### Jabber clients compatibility

Here you can find specfic issues and workarounds for various Jabber clients. If you have some of your own, please post them here.

#### Spark

Url: [http://www.igniterealtime.org/projects/spark/index.jsp](http://www.igniterealtime.org/projects/spark/index.jsp)  
Spark 2.0.0 works fine with ActiveMQ; Click [here](http://www.igniterealtime.org/downloads/download-landing.jsp?file=spark/spark_2_ 0_0.exe) to download: [Spark 2.0.0 for Windows](http://www.igniterealtime.org/downloads/download-landing.jsp?file=spark/spark_2_0_0.exe).  
Spark 2.5.x connects fine, but it won't open the **Join Conference Room** dialog.

#### iChat

Url: [http://www.apple.com/macosx/features/ichat.html](http://www.apple.com/macosx/features/ichat.html)  
Tested version 4.0.7 works fine, but it insists you use _username@host_ format for usernames

#### Adium

Url: [http://www.adiumx.com/](http://www.adiumx.com/)  
Tested version 1.3.3 works fine. The only spotted issue is reconnecting to [Command Agent](command-agent.html) topic. We recommend that you restart the Adium if you need to do this

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35901))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();