Apache ActiveMQ ™ -- ActiveMQ Command Line Tools Reference 

[Community](community.html) > [FAQ](faq.html) > [Using Apache ActiveMQ](using-apache-activemq.html) > [ActiveMQ Command Line Tools Reference](activemq-command-line-tools-reference.html)


Command Line Tools
==================

The current script contains the entire functionality to manage activemq.

*   [activemq](activemq-command-line-tools-reference.html) \- runs an activemq broker  
    (see [Unix Shell Script](unix-shell-script.html))

In versions prior 5.4.1 some management functionalities beyond controlling the service itself where part of the "activemq-admin" script.  
This script is currently still part of the distribution to provide access to this for Windows users-

*   [activemq-admin](activemq-command-line-tools-reference.html) \- manages a broker instance

In versions prior to 5.0 the functionality of activemq-admin script was scattered over multiple scripts, such as:

*   [shutdown](activemq-command-line-tools-reference.html) \- shutdowns an activemq broker
*   [list](activemq-command-line-tools-reference.html) \- lists all running brokers in the specified JMX context
*   [query](activemq-command-line-tools-reference.html) \- queries the JMX context for broker statistics and information
*   [bstat](activemq-command-line-tools-reference.html) \- predefined query that displays useful broker statistics
*   [browse](activemq-command-line-tools-reference.html) \- browse the messages of a specific queue
*   [purge](activemq-command-line-tools-reference.html) \- delete selected destination's messages that matches the message selector

activemq script  
  

---------------------

**Description of this script is valid for Windows platform.** For Unix platform it is valid for broker versions prior to 5.4.0. With version 5.4.0 and later, ActiveMQ comes with enhanced [Unix Shell Script](unix-shell-script.html)

Script Name

activemq.bat, activemq

Task Usage

_activemq \[options\] \[config\]_ or _java -jar run.jar start \[options\] \[config\]_

Description

Script to run an activemq broker either by specifying a broker configuration file or through a broker URI configuration.

**Options:**

Option Name

Syntax

Example

Description

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

activemq --help

Display the help messages for the activemq script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq

Runs a broker using the default 'xbean:activemq.xml' as the broker configuration file.

activemq xbean:myconfig.xml

Runs a broker using the file myconfig.xml as the broker configuration file that is located in the classpath.

activemq xbean:file:./conf/broker1.xml

Runs a broker using the file broker1.xml as the broker configuration file that is located in the relative file path ./conf/broker1.xml

activemq xbean:file:C:/ActiveMQ/conf/broker2.xml

Runs a broker using the file broker2.xml as the broker configuration file that is located in the absolute file path C:/ActiveMQ/conf/broker2.xml

activemq broker:(tcp://localhost:61616, tcp://localhost:5000)?useJmx=true

Runs a broker with two transport connectors and JMX enabled.Â¹

activemq broker:(tcp://localhost:61616, network:tcp://localhost:5000)?persistent=false

Runs a broker with 1 transport connector and 1 network connector with persistence disabled.Â¹

For details on how to configure using broker URI refer to: [Broker Configuration URI](broker-configuration-uri.html)

activemq-admin
--------------

As of ActiveMQ 5.x, the above standalone utilities have been incorporated into the activemq-admin command (with the exception of the activemq script), as follows:

*   [activemq-admin stop](activemq-command-line-tools-reference.html)
*   [activemq-admin list](activemq-command-line-tools-reference.html)
*   [activemq-admin query](activemq-command-line-tools-reference.html)
*   [activemq-admin bstat](activemq-command-line-tools-reference.html)
*   [activemq-admin browse](activemq-command-line-tools-reference.html)

The syntax of each task remains as described below. Note also that the activemq command is still supported.

### stop task

Task Name

stop

Task Usage

_activemq-admin stop \[options\] \[broker names\]_

Description

Script to stop a running activemq broker. This task requires that JMX is enabled.

**Options:**

Option Name

Syntax

Example

Description

Stop All Option

--all

stop --all

Stops all registered brokers in the specified JMX context

JMX URL Option

--jmxurl <url>

--jmxurl service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

Change the JMX service url to connect to. By default it connects to: service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

JMX Authentication Option

--jmxuser user --jmxpassword password

--jmxuser smx --jmxpassword smx

For cases where username/password based authentication of the JMX client is required. Not set by default.

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

--help

Display the help messages for the stop script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq-admin stop

Stops the only running broker in the default JMX context. It assumes that there is only one running broker.

activemq-admin stop --jmxurl service:jmx:rmi:///jndi/rmi://remotehost:1099/jmxrmi --all

Stops all the running broker in the specified JMX context.

activemq-admin stop localhost

Stops the broker named 'localhost' in the default JMX context.

activemq-admin stop localhost remotehost

Stops the brokers 'localhost' and 'remotehost' in the default JMX context.

### list task

Task Name

list

Task Usage

_activemq-admin list \[options\]_

Description

Script to list the names of all running brokers in the specified JMX context. This task requires that JMX is enabled.

**Options:**

Option Name

Syntax

Example

Description

JMX URL Option

--jmxurl <url>

--jmxurl service:jmx:rmi:///jndi/rmi://remotehost:1099/jmxrmi

Change the JMX service url to connect to. By default it connects to: service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

JMX Authentication Option

--jmxuser user --jmxpassword password

--jmxuser smx --jmxpassword smx

For cases where username/password based authentication of the JMX client is required. Not set by default.

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

--help

Display the help messages for the list script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq-admin list

Lists the names of all running brokers in the default JMX context.

activemq-admin list --jmxurl service:jmx:rmi:///jndi/rmi://remotehost:1099/jmxrmi

List the names of all running brokers in the specified JMX context.

### query task

Task Name

query

Task Usage

_activemq-admin query \[options\]_

Description

Script to query the specified JMX context for mbean attributes and information. This script requires that JMX is enabled.

**Options:**

Option Name

Syntax

Example

Description

Predefined Query Option

-Q<type>=<name>

-QTopic=TEST.FOO, -QBroker=*host

Predefined object name query option that queries a specific type of mbean object based on its type and selected identifier. Refer to the mbean reference table below for details.

-xQ<type>=<name>

-xQTopic=ActiveMQ.Advisory.*, -xQNetworkConnector=*

Predefined object name query option that removes all mbeans that matches the query from the search result. Refer to the mbean reference table below for details.

Object Name Query Option

--objname <object name query>

--objname Type=**Connect**,BrokerName=local*

Query option loosely based on the JMX object name format, which lets you filter mbeans based on their object name information. Refer to the mbean reference table below for details.

--xobjname <object name query>

--xobjname Type=Topic,Destination=ActiveMQ.Advisory.*

Object name query that removes all mbeans that matches the query from the search result. Refer to the mbean reference table below for details.

View Option

--view <view list>

--view Type,BrokerName,Destination,EnqueueCount,DequeueCount

Lets you specify the attributes and object name information to view. If the view is omitted, all attributes and information will be displayed.

JMX URL Option

--jmxurl <url>

--jmxurl service:jmx:rmi:///jndi/rmi://remotehost:1099/jmxrmi

Change the JMX service url to connect to. By default it connects to: service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

JMX Authentication Option

--jmxuser user --jmxpassword password

--jmxuser smx --jmxpassword smx

For cases where username/password based authentication of the JMX client is required. Not set by default.

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

--help

Display the help messages for the query script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq-admin query

Display all attributes and object name information of all registered mbeans in the default JMX context.

activemq-admin query -QTopic=TEST.FOO

Display all the attributes and object name information of the destination topic 'TEST.FOO'

activemq-admin query -QQueue=*

Display all the attributes and object name information of all registered queues.

activemq-admin query -QTopic=*.FOO -xQTopic=ActiveMQ.Advisory.*

Display all the attributes and object name information of all topics that ends with '.FOO' except those that also begins with 'ActiveMQ.Advisory.'.

activemq-admin query -QBroker=local???? --view Type,BrokerName,EnqueueCount,DequeueCount

Display the object type, broker name, enqueue count, and dequeue count information for all 9-letter brokers that begins with 'local'.

activemq-admin query --objname Type=**Connect**,BrokerName=localhost -xQNetworkConnector=*

Display all the attributes and object name information for all connections and connectors for broker 'localhost' except its network connectors.

activemq-admin query --objname Type=Connection --xobjname Type=Connection,BrokerName=localhost

Display all the attributes and object name information for all registered connections except those belonging to broker 'localhost'.

activemq-admin query -QQueue=???? --objname Type=Connection --xobjname BrokerName=remote*

Display all the attributes and object name information for all 4-letter queues and connections except those belonging to a broker that begins with 'remote'.

**ActiveMQ MBean Reference:**

Mbean Type

Properties / ObjectName

Attributes

Broker

*   **Type**=Broker
*   **BrokerName**=<broker identifier>

*   BrokerId
*   TotalEnqueueCount
*   TotalDequeueCount
*   TotalConsumerCount
*   TotalMessages
*   TotalMessagesCached
*   MemoryLimit
*   MemoryPercentageUsed

Destination

*   **Type**=Queue|Topic
*   **Destination**=<destination identifier>
*   **BrokerName**=<name of broker>

*   EnqueueCount
*   DequeueCount
*   ConsumerCount
*   Messages
*   MessagesCached

NetworkConnector

*   **Type**=NetworkConnector
*   **BrokerName**=<connector identifierr>

Connector

*   **Type**=Connector
*   **ConnectorName**=<connector identifier>
*   **BrokerName**=<name of broker>

*   EnqueueCount
*   DequeueCount

Connection

*   **Type**=Connection
*   **Connection**=<connection identifier>
*   **BrokerName**=<name of broker>

*   EnqueueCount
*   DequeueCount
*   DispatchQueueSize
*   Active
*   Blocked
*   Connected
*   Slow

### bstat task

Task Name

bstat

Task Usage

_activemq-admin bstat_ \[broker name\]

Description

Predefined query script that displays useful statistics regarding a broker and its components.

**Examples:**

Example

Description

activemq-admin bstat

Display useful statistics for all registered brokers in the default JMX context.

activemq-admin bstat localhost

Display useful statistics for the registered broker 'localhost'.

### browse task

Task Name

browse

Task Usage

_activemq-admin browse --amqurl <broker url> \[options\] <destinations>_ or _java -jar run.jar browse --amqurl <broker url> \[options\] <destinations>_

Description

Script to browse selected destinations' messages.  The browse operation may not return all messages due to limitations of broker configuration and system resources.

**Options:**

Option Name

Syntax

Example

Description

Broker URL Option

--amqurl <url>

--amqurl tcp://localhost:61616

Specify the broker URL to connect to.

Message Selector Option

--msgsel "<msgsel1,msgsel2,...>"

--msgsel "JMSMessageID='*:10',JMSPriority>5"

Allows you to filter the specific messages to view. Place the entire selector criteria in double quotes " ". You can use wildcard queries by enclosing the string message property in ' '. Other than using wildcard queries to filter string properties, other queries follows the message selector format.

Group View Option

-V\[header | custom | body\]

-Vheader, -Vcustom, -Vbody

Let's you specify a specific group of message attributes to view. The header view shows all the standard JMS message headers. The custom view shows all the custom fields added to each JMS message. The body view shows the message body of the JMS message.

Specific View Option

--view <attr1>,\[header:|custom:\]<attr2>,...

--view JMSMessageID='*:10',custom:MyCustomField

Let's you specifically select a specific message attribute. It allows you to select specific attributes from the JMS and custom headers. You could add the tags header: and custom: to explicitly specify where the attribute belongs to. Refer to the message header table below for details.

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

--help

Display the help messages for the browse script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq-admin browse --amqurl tcp://localhost:61616 TEST.FOO

Prints the JMS message header, custom message header, and message body of the messages in the queue 'TEST.FOO'

activemq-admin browse --amqurl tcp://localhost:61616 -Vheader,body TEST.FOO

Prints the JMS message header and message body of the messages in the queue 'TEST.FOO'

activemq-admin browse --amqurl tcp://localhost:61616 -Vheader --view custom:MyCustomField TEST.FOO TEST.BAR

Prints all the JMS message header and the custom field 'MyCustomField' of the messages in the queue 'TEST.FOO' and 'TEST.BAR'.

activemq-admin browse --amqurl tcp://localhost:61616 --msgsel "JMSMessageID='*:10',JMSPriority>5" TEST.FOO

Prints all the attributes of the messages in the queue 'TEST.FOO' that has a JMSMessageID that matches the wildcard query *:10 and has a JMSPriority greater than 5.

**JMS Message Header Reference:**

Header Name

Header Type

JMSCorrelation ID

String

JMSDelivery Mode

int (1-Non-Persistent, 2-Persistent)

JMSDestination

javax.jms.Destination

JMSExpiration

long

JMSMessageID

String

JMSPriority

int

JMSRedelivered

boolean

JMSReplyTo

javax.jms.Destination

JMSTimestamp

long

JMSType

String

### purge task

Task Name

purge

Task Usage

_activemq-admin purge_ \[purge-options\] <destinations>

Description

Delete selected destination's messages that matches the message selector.

**Options:**

Option Name

Syntax

Example

Description

JMX URL Option

--jmxurl <url>

--jmxurl service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

Change the JMX service url to connect to. By default it connects to: service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi

JMX Authentication Option

--jmxuser user --jmxpassword password

--jmxuser smx --jmxpassword smx

For cases where username/password based authentication of the JMX client is required. Not set by default.

Message Selector Option

--msgsel "<msgsel1,msgsel2,...>"

--msgsel "JMSMessageID='*:10',JMSPriority>5"

Allows you to filter the specific messages to view. Place the entire selector criteria in double quotes " ". You can use wildcard queries by enclosing the string message property in ' '. Other than using wildcard queries to filter string properties, other queries follows the message selector format.

System Define Option

-D<key>=<value>

-Dactivemq.home=c:/ActiveMQ

Sets a systems property. i.e Systems.getProperty("activemq.home"); will return c:/ActiveMQ

Help Option

-h or -? or --help

--help

Display the help messages for the browse script.

Version Option

--version

activemq --version

Display the activemq version information.

**Examples:**

Example

Description

activemq-admin purge FOO.BAR

Delete all the messages in queue FOO.BAR

activemq-admin purge --msgsel "JMSMessageID='*:10',JMSPriority>5" FOO.*

Delete all the messages in the destinations that matches FOO.* and has a JMSMessageID in", the header field that matches the wildcard *:10, and has a JMSPriority field > 5 in the", queue FOO.BAR  
To use wildcard queries, the field must be a string and the query enclosed in ''

### dstat task

Task Name

dstat

Task Usage

_activemq-admin dstat_ \[destination type\]

Description

Predefined query script that displays useful statistics regarding destinations on a broker.

**Examples:**

Example

Description

activemq-admin dstat

Display useful statistics for all destinations on the broker in the default JMX context.

activemq-admin dstat topics

Display useful statistics for the Topics that currently exist on the Broker.
