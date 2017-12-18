      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Compile ActiveMQ with GCJ 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Connectivity](connectivity.html) > [Cross Language Clients](cross-language-clients.html) > [C Integration](c-integration.html) > [Compile ActiveMQ with GCJ](compile-activemq-with-gcj.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

You can use [GCJ](http://gcc.gnu.org/java/) to build ActiveMQ as a shared library you can reuse from C++.

### Native compile ActiveMQ HOWTO

#### Abstract

This document describes how to native compile ActiveMQ for use in a C++ environment. The version of ActiveMQ used is 3.2 in this howto. To compile you'll need GCC 4.0.2, or later, with both Java, and C/C++ support.

#### Tools Setup

If you don't already have GCC 4.0.2 installed you need to download and build it. See GCC manuals for complete instructions on how to build GCC but below is a short descriptions of the steps involved. The GCC build steps assumes that you already have an older GCC compiler installed.

*   Unpack GCC into an arbitrary directory, for example /opt/gccbuild, and then create a separate output directory. Your directory structure should look similar to this;
    
            /opt/gccbuild/gcc-4.0.2
            /opt/gccbuild/output
    
*   Go to the output directory and run configure.
    
            cd /opt/gccbuild/output
            ../gcc-4.0.2/configure --prefix=/opt/gcc402
                                   --enable-shared
                                   --enable-threads=posix
                                   --enable-languages=c,c++,java
    
*   Run make.
    
            make bootstrap
            make install
    

*   Download ActiveMQ and copy the JARs to a new empty directory /opt/app, including
    
            activeio-1.1.jar
            activemq-core-3.2.jar
            commons-logging-1.0.3.jar
            concurrent-1.3.4.jar
            geronimo-spec-j2ee-jacc-1.0-rc4.jar
            geronimo-spec-j2ee-management-1.0-rc4.jar
            geronimo-spec-jms-1.1-rc4.jar
            geronimo-spec-jta-1.0.1B-rc4.jar
            log4j-1.2.8.jar
    

#### Write the Glue Code

Either access the ActiveMQ classes directly from C++ or write a facade object in Java that handles all startup and shutdown logic of ActiveMQ. Save the glue files in the same directory as for the ActiveMQ jars.

An CNI example using a Java object starting the MQ.

##### Bootstrap.cpp

#include <gcj/cni.h>
#include <iostream>
#include <java/lang/System.h>
#include <java/lang/Throwable.h>
#include <java/io/PrintStream.h>
#include "MQAdapter.h"

using namespace std;

int main(int argc, char* argv\[\])
{
    cout << "Entering main" << endl;
    using namespace java::lang;

    try
    {
        // Create and startup Java VM
        JvCreateJavaVM(NULL) ;
        JvAttachCurrentThread(NULL, NULL) ;

        System::out->println(JvNewStringLatin1("Java println")) ;

        // Start ActiveMQ
        MQAdapter* pAdapter = new MQAdapter() ;
        pAdapter->start() ;

        // Send a message
        pAdapter->send(JvNewStringLatin1("Hello World!")) ;

        // Shutdown ActiveMQ
        pAdapter->stop() ;
     
        JvDetachCurrentThread() ;
    }
    catch( Throwable *t )
    {
        System::err->println(JvNewStringLatin1("Exception")) ;
        t->printStackTrace() ;
    }
}

##### MQAdapter.java

import org.activemq.*;
import java.util.Hashtable ;
import javax.jms.*;
import javax.naming.*;

public class MQAdapter
{
    private InitialContext         jndiContext ;
    private QueueConnectionFactory factory ;
    private QueueConnection        connection ;
    private QueueSession           session ;
    private QueueSender            sender ;
    private Queue                  queue ;

    public MQAdapter()
    {
    }

    public void start()
    {
        try
        {
            Hashtable props = new Hashtable() ;
            props.put(Context.INITIAL\_CONTEXT\_FACTORY, "org.activemq.jndi.ActiveMQInitialContextFactory") ;
            props.put(Context.PROVIDER_URL, "tcp://localhost:61616") ;
            props.put("queue.MyQueue", "example.MyQueue") ;

            jndiContext = new InitialContext(props) ;
        
            // Create and configure JMS connection factory
            factory = (QueueConnectionFactory)jndiContext.lookup("ConnectionFactory") ;

            // Lookup Queue
            queue = (Queue)jndiContext.lookup("MyQueue") ;

            // Create a JMS connection
            connection = (QueueConnection)factory.createQueueConnection() ;
            System.out.println("Created connection: " + connection) ;

            // Create a JMS session
            session = connection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE) ;
            System.out.println("Created session: " + session) ;

            // Create JMS sender
            sender  = session.createSender(queue) ;
        }
        catch( Exception e )
        {
            e.printStackTrace() ;

            try
            {
                if( connection != null )
                    connection.close() ;
            } catch( JMSException jmse )
            { /\* ignore */ }
        }
    }

    public void stop()
    {
        try
        {
            if( connection != null )
                connection.close() ;
        } catch( JMSException e )
        { /\* ignore */ }
    }

    public void send(String msg)
    {
        TextMessage message ;

        try
        {
            message = session.createTextMessage(msg) ;
            sender.send(message) ;
        }
        catch( JMSException e )
        {
            e.printStackTrace() ;
        }
    }
}

#### Compile the Java and C++ Code

The Java code must be BC compiled to be able to dynamically link required classes as needed, see reference for more information on BC compilation. Use the suggested script to compile all ActiveMQ JARs and create a class map database.

Note

Using -Bsymbolic does not seem to work, use -symbolic instead.

    compile.sh:

    #!/bin/sh

    # Create new classmap database
    gcj-dbtool -n classmap.db

    for JAR_FILE in \`find -iname "*.jar"\`
    do
        echo "Compiling ${JAR_FILE} to native"
        gcj -shared -findirect-dispatch -fjni -fPIC -Wl,-symbolic -o ${JAR\_FILE}.so ${JAR\_FILE}
        gcj-dbtool -a classmap.db ${JAR\_FILE} ${JAR\_FILE}.so
    done

*   Run the above script and set environment property GCJ_PROPERTIES.
    
               ./compile.sh
               export GCJ_PROPERTIES="gnu.gcj.precompiled.db.path=/opt/app/classmap.db"
    

*   Java compile MQAdapter.java
    
               gcj --classpath=./geronimo-spec-jms-1.1-rc4.jar:./activemq-core-3.2.jar -C MQAdapter.java
    

*   Generate CNI header for MQAdapter.class
    
               gcjh MQAdapter
    

*   JAR the Java glue code
    
               fastjar cf MQAdapter.jar MQAdapter.class
    

*   Native compile the Java JAR into a shared library, add output directory to LD\_LIBRARY\_PATH.
    
               gcj -shared -findirect-dispatch -fjni -fPIC -Wl,-symbolic -o MQAdapter.so MQAdapter.jar
               export LD\_LIBRARY\_PATH=$LD\_LIBRARY\_PATH:/opt/app
    

*   Compile the C++ code
    
               g++ -c Bootstrap.cpp
    

*   Link Bootstrap with the Java code
    
               gcj -o Bootstrap Bootstrap.o -L /opt/app -lgcj -lstdc++ activeio-1.1.jar.so activemq-core-3.2.jar.so
                   commons-logging-1.0.3.jar.so concurrent-1.3.4.jar.so geronimo-spec-jms-1.1-rc4.jar.so
                   geronimo-spec-j2ee-management-1.0-rc4.jar.so geronimo-spec-j2ee-jacc-1.0-rc4.jar.so
                   geronimo-spec-jta-1.0.1B-rc4.jar.so log4j-1.2.8.jar.so MQAdapter.so
    

Now, if everything went ok you should be able to run the app. with ./Bootstrap.

#### References

[How to BC compile with GCJ](http://gcc.gnu.org/wiki/How%20to%20BC%20compile%20with%20GCJ)

[The state of Java on Linux](http://www.redhat.com/magazine/012oct05/features/java/)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=35868))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();