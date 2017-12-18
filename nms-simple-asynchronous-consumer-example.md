      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- NMS Simple Asynchronous Consumer Example 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Examples](nms-examples.html) > [NMS Simple Asynchronous Consumer Example](nms-simple-asynchronous-consumer-example.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

The sample shows how to create an NMS Consumer to consume messages asynchronously.

/\*
 \* Licensed to the Apache Software Foundation (ASF) under one or more
 \* contributor license agreements.  See the NOTICE file distributed with
 \* this work for additional information regarding copyright ownership.
 \* The ASF licenses this file to You under the Apache License, Version 2.0
 \* (the "License"); you may not use this file except in compliance with
 \* the License.  You may obtain a copy of the License at
 \*
 \*     http://www.apache.org/licenses/LICENSE-2.0
 \*
 \* Unless required by applicable law or agreed to in writing, software
 \* distributed under the License is distributed on an "AS IS" BASIS,
 \* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 \* See the License for the specific language governing permissions and
 \* limitations under the License.
 */

using System;
using System.Threading;
using Apache.NMS;
using Apache.NMS.Util;

namespace Apache.NMS.ActiveMQ.Test
{
public class TestMain
{
    protected static AutoResetEvent semaphore = new AutoResetEvent(false);
    protected static ITextMessage message = null;
    protected static TimeSpan receiveTimeout = TimeSpan.FromSeconds(10);

    public static void Main(string\[\] args)
    {
        // Example connection strings:
        //    activemq:tcp://activemqhost:61616
        //    stomp:tcp://activemqhost:61613
        //    ems:tcp://tibcohost:7222
        //    msmq://localhost

        Uri connecturi = new Uri("activemq:tcp://activemqhost:61616");

        Console.WriteLine("About to connect to " + connecturi);

        // NOTE: ensure the nmsprovider-activemq.config file exists in the executable folder.
        IConnectionFactory factory = new NMSConnectionFactory(connecturi);

        using(IConnection connection = factory.CreateConnection())
        using(ISession session = connection.CreateSession())
        {
             // Examples for getting a destination:
             //
             // Hard coded destinations:
             //    IDestination destination = session.GetQueue("FOO.BAR");
             //    Debug.Assert(destination is IQueue);
             //    IDestination destination = session.GetTopic("FOO.BAR");
             //    Debug.Assert(destination is ITopic);
             //
             // Embedded destination type in the name:
             //    IDestination destination = SessionUtil.GetDestination(session, "queue://FOO.BAR");
             //    Debug.Assert(destination is IQueue);
             //    IDestination destination = SessionUtil.GetDestination(session, "topic://FOO.BAR");
             //    Debug.Assert(destination is ITopic);
             //
             // Defaults to queue if type is not specified:
             //    IDestination destination = SessionUtil.GetDestination(session, "FOO.BAR");
             //    Debug.Assert(destination is IQueue);
             //
             // .NET 3.5 Supports Extension methods for a simplified syntax:
             //    IDestination destination = session.GetDestination("queue://FOO.BAR");
             //    Debug.Assert(destination is IQueue);
             //    IDestination destination = session.GetDestination("topic://FOO.BAR");
             //    Debug.Assert(destination is ITopic);
            IDestination destination = SessionUtil.GetDestination(session, "queue://FOO.BAR");

            Console.WriteLine("Using destination: " + destination);

            // Create a consumer and producer
            using(IMessageConsumer consumer = session.CreateConsumer(destination))
            using(IMessageProducer producer = session.CreateProducer(destination))
            {
                // Start the connection so that messages will be processed.
                connection.Start();
		producer.DeliveryMode = MsgDeliveryMode.Persistent;
                producer.RequestTimeout = receiveTimeout;

                consumer.Listener += new MessageListener(OnMessage);

                // Send a message
                ITextMessage request = session.CreateTextMessage("Hello World!");
                request.NMSCorrelationID = "abc";
                request.Properties\["NMSXGroupID"\] = "cheese";
                request.Properties\["myHeader"\] = "Cheddar";

                producer.Send(request);

                // Wait for the message
                semaphore.WaitOne((int) receiveTimeout.TotalMilliseconds, true);

                if(message == null)
                {
                    Console.WriteLine("No message received!");
                }
                else
                {
                    Console.WriteLine("Received message with ID:   " + message.NMSMessageId);
                    Console.WriteLine("Received message with text: " + message.Text);
                }
            }
        }
    }

    protected static void OnMessage(IMessage receivedMsg)
    {
        message = receivedMsg as ITextMessage;
        semaphore.Set();
    }
}
}

### [Overview](overview.html)

*   [Home](index.html)
*   [FAQ](faq.html)
*   [Download](download.html)

### [Using NMS](using-nms.html)

*   [NMS Overview](apachenms.html)
*   [Getting Started](nms.html)
*   [NMS API Reference](nms-api.html)
*   [ActiveMQ](apachenmsactivemq.html)
*   [Stomp](apachenmsstomp.html)
*   [MSMQ](apachenmsmsmq.html)
*   [Tibco EMS](apachenmsems.html)
*   [WCF](apachenmswcf.html)

### Search

   

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](http://activemq.apache.org/contributing.html)
*   [Discussion Forums](http://activemq.apache.org/discussion-forums.html)
*   [Mailing Lists](http://activemq.apache.org/mailing-lists.html)
*   [IRC](irc://irc.codehaus.org/activemq)
*   [Articles](articles.html)
*   [Site](site.html)
*   [Team](http://activemq.apache.org/team.html)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25202010))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();