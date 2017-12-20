Apache ActiveMQ ™ -- How do I configure ActiveMQ to use AIO server transport 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [Configuration](Community/FAQ/configuration.md) > [How do I configure ActiveMQ to use AIO server transport](Community/FAQ/ConfigurationCommunity/FAQ/Configuration/Community/FAQ/Configuration/how-do-i-configure-activemq-to-use-aio-server-transport.md)


For Windows XP:

1\. Download AIO (Asynchronous IO for Java) from IBM ([http://www.alphaworks.ibm.com/tech/aio4j](http://www.alphaworks.ibm.com/tech/aio4j)).

2\. Unzip the downloaded file and copy the following files:

*   ibmaio.dll
*   ibmaio-1.0.jar

3\. Place ibmaio.dll into Windows System32 folder. (You may need to restart afterwards for this to take effect)

4\. Include ibmaio-1.0.jar in the classpath.

5\. Edit ActiveMQ's configuration file (**activemq.xml**, found in the conf folder). Look the following snippet:  

<!\-\- ==================================================================== \-\->
<!\-\- ActiveMQ Broker Configuration -->
<!\-\- ==================================================================== -->
<broker>
 <connector>
  <tcpServerTransport uri="tcp://localhost:61616" backlog="1000" useAsyncSend="true" maxOutstandingMessages="50"/>
 </connector>
    .
    .
</broker>   

  

Change the connector settings, change **tcpServerTransport** to **serverTransport** and remove the unneeded parameters):  

<connector>
 <serverTransport uri="activeio:aio://<ip address>:<port>" />
</connector>
 

  

Example:  

    
<connector>
 <serverTransport uri="activeio:aio://192.168.0.162:61616" />
</connector>
 

