      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- JNDI Support 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Containers](containers.html) > [JNDI Support](jndi-support.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

ActiveMQ will work with any JNDI provider capable of storing Java objects. However it is common to require a JNDI initial context to be able to run many JMS example programs, like [Sun's JMS tutorial.](http://java.sun.com/products/jms/tutorial/1_3_1-fcs/doc/jms_tutorialTOC.html)

So we provide a simple JNDI **`InitialContextFactory`** which can be used to lookup JMS connection factory objects as well as Destination objects. For example if you place this [jndi.properties](http://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/jndi.properties) file on your classpath, you can look inside the **`InitialContext`** and lookup **`ConnectionFactory`** objects and **`Destinations`** etc.

java.naming.factory.initial = org.apache.activemq.jndi.ActiveMQInitialContextFactory # Use the following property to configure the default connector java.naming.provider.url = vm://localhost # Use the following property to specify the JNDI name the connection factory # should appear as. #connectionFactoryNames = connectionFactory, queueConnectionFactory, topicConnectionFactry # Register some queues in JNDI using the form: # queue.\[jndiName\] = \[physicalName\] queue.MyQueue = example.MyQueue # Register some topics in JNDI using the form: # topic.\[jndiName\] = \[physicalName\] topic.MyTopic = example.MyTopic

You can edit the **`jndi.properties`** file to configure the **`ActiveMQConnectionFactory`**'s properties such as **`brokerURL`** and whether or not there should be an embedded broker etc. See [how to embed a broker in a connection](how-do-i-embed-a-broker-inside-a-connection.html) for more details.

### ActiveMQ JNDI Tutorial

This is a quick one page tutorial on how to setup and use JNDI to create a connection to ActiveMQ. The first thing is ActiveMQ does not provide a full JNDI server. This means JMS clients need to use properties files to create a JNDI **`IntialContextFactory`**. If you need an example properties file, you can look the source distribution [https://github.com/apache/activemq/blob/master/activemq-unit-tests/src/test/resources/jndi.properties](https://github.com/apache/activemq/blob/master/activemq-unit-tests/src/test/resources/jndi.properties). Before we proceed, here are the properties.

Name

Value

`java.naming.factory.initial`

`org.apache.activemq.jndi.ActiveMQInitialContextFactory`

`java.naming.provider.url`

`tcp://hostname:61616`

`topic.MyTopic`

`example.MyTopic`

Make sure to add **`activemq-_<version>_.jar`** and **`spring-1.x.jar`** to your classpath. If the libraries are not in the classpath, you will get a **`ClassNotFoundException`** at runtime. If you get **`ClassNotFoundException`**, try printing out the classpath and check it is present. You can also run ActiveMQ with **`-verbose`** option to verify the jar was loaded correctly.

**Sample Code**

java// Create a new intial context, which loads from jndi.properties file: javax.naming.Context ctx = new javax.naming.InitialContext(); // Lookup the connection factory: javax.jms.TopicConnectionFactory factory = (javax.jms.TopicConnectionFactory)ctx.lookup("ConnectionFactory"); // Create a new TopicConnection for pub/sub messaging: javax.jms.TopicConnection conn = factory.getTopicConnection(); // Lookup an existing topic: javax.jms.Topic mytopic = (javax.jms.Topic)ctx.lookup("MyTopic"); // Create a new TopicSession for the client: javax.jms.TopicSession session = conn.createTopicSession(false,TopicSession.AUTO_ACKNOWLEDGE); // Create a new subscriber to receive messages: javax.jms.TopicSubscriber subscriber = session.createSubscriber(mytopic);

Notice the name of the topic in the sample is **`MyTopic`**. ActiveMQ will read the **`jndi.properties`** files and creates the topics and queues in a lazy fashion. The prefix topic and queue is stripped, so the JNDI name begins after the prefix.

Once you have the **`jndi.properties`** edited and ready, it needs to be accessible to your application. The easiest way is to add **`jndi.properties`** to a jar file. When **`new InitialContext()`** is called, it will scan the resources and find the file. If you get **`javax.naming.NamingException`**, it usually means the **`jndi.properties`** file is not accessible.

You can also try to create a new initial context using either an instance of properties file or a map. For example, the approach recommended by JMS specification will work just fine.

Example Recommended by Specification

javaProperties props = new Properties(); props.setProperty(Context.INITIAL\_CONTEXT\_FACTORY,"org.apache.activemq.jndi.ActiveMQInitialContextFactory"); props.setProperty(Context.PROVIDER_URL,"tcp://hostname:61616"); javax.naming.Context ctx = new InitialContext(props);||

If ActiveMQ is embedded within an EJB container, you will need to look at the containers documentation for the correct JNDI values.

### Dynamically Creating Destinations

For the easiest possible configuration with JNDI based programs, there are two dynamic contexts, namely:

*   **`dynamicQueues`**
*   **`dynamicTopics`**

These allow you to lookup queues and topics using JNDI without any configuration.

For example, if you use the following name to lookup into JNDI:

dynamicQueues/FOO.BAR

you will get back an **`ActiveMQQueue`** of the name **`FOO.BAR`**. This can be very handy if you can easily reconfigure the JNDI name to use to lookup something in JNDI, but don't want to have to double configure a **`jndi.properties`** to match.

### Working With Embedded Brokers

It is often useful to use an embedded broker in the same JVM as the JMS client. For this see [How do I embed a Broker inside a Connection](how-do-i-embed-a-broker-inside-a-connection.html).

If you want to use an embedded broker with your JNDI provider you can just use the [VM Transport](vm-transport-reference.html) to connect to the broker in your URL. e.g. to create a purely in JVM broker use this URI

vm://locahost

If you want to customize the broker use something like this:

vm:broker:(tcp://localhost:61616)

More options are available in the [VM Transport Reference](vm-transport-reference.html)

### Example Java Code

Once you have configured JNDI on the classpath you can run any normal JMS application such as the following [example](http://svn.apache.org/repos/asf/incubator/activemq/trunk/activemq-unit-tests/src/test/java/org/apache/activemq/demo/SimpleProducer.java). Notice that the Java code just uses pure JMS APIs and is not in any way ActiveMQ specific

java/\*\* \* The SimpleQueueSender class consists only of a main method, * which sends several messages to a queue. * * Run this program in conjunction with SimpleQueueReceiver. * Specify a queue name on the command line when you run the * program. By default, the program sends one message. Specify * a number after the queue name to send that number of messages. */ package org.apache.activemq.demo; import javax.jms.Connection; import javax.jms.ConnectionFactory; import javax.jms.Destination; import javax.jms.JMSException; import javax.jms.MessageProducer; import javax.jms.Session; import javax.jms.TextMessage; import javax.naming.Context; import javax.naming.InitialContext; import javax.naming.NamingException; import org.slf4j.Logger; import org.slf4j.LoggerFactory; /** * A simple polymorphic JMS producer which can work with Queues or Topics which * uses JNDI to lookup the JMS connection factory and destination. */ public final class SimpleProducer { private static final Logger LOG = LoggerFactory.getLogger(SimpleProducer.class); private SimpleProducer() {}  /** * @param args the destination name to send to and optionally, the number of * messages to send */ public static void main(String\[\] args) { Context jndiContext; ConnectionFactory connectionFactory; Connection connection; Session session; Destination destination; MessageProducer producer; String destinationName; final int numMsgs;  if ((args.length < 1) || (args.length > 2)) { LOG.info("Usage: java SimpleProducer <destination-name> \[<number-of-messages>\]"); System.exit(1); }  destinationName = args\[0\]; LOG.info("Destination name is " + destinationName); if (args.length == 2) { numMsgs = (new Integer(args\[1\])).intValue(); } else { numMsgs = 1; } /* * Create a JNDI API InitialContext object */ try { jndiContext = new InitialContext(); } catch (NamingException e) { LOG.info("Could not create JNDI API context: " + e.toString()); System.exit(1); }  /* * Look up connection factory and destination. */ try { connectionFactory = (ConnectionFactory)jndiContext.lookup("ConnectionFactory"); destination = (Destination)jndiContext.lookup(destinationName); } catch (NamingException e) { LOG.info("JNDI API lookup failed: " + e); System.exit(1); }  /* * Create connection. Create session from connection; false means * session is not transacted. Create sender and text message. Send * messages, varying text slightly. Send end-of-messages message. * Finally, close the connection. */ try { connection = connectionFactory.createConnection(); session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE); producer = session.createProducer(destination); TextMessage message = session.createTextMessage();  for (int i = 0; i < numMsgs; i++) { message.setText("This is message " + (i + 1)); LOG.info("Sending message: " + message.getText()); producer.send(message); }  /* * Send a non-text control message indicating end of messages. */ producer.send(session.createMessage()); } catch (JMSException e) { LOG.info("Exception occurred: " + e); } finally { if (connection != null) { try { connection.close(); } catch (JMSException ignored) {} } } } }

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35864))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();