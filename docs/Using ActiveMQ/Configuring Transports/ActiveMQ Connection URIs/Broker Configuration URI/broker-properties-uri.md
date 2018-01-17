Apache ActiveMQ ™ -- Broker Properties URI 

[Using ActiveMQ](using-activemq.md) > [Configuring Transports](Using ActiveMQ/configuring-transports.md) > [ActiveMQ Connection URIs](Using ActiveMQ/Configuring Transports/activemq-connection-uris.md) > [Broker Configuration URI](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/broker-configuration-uri.md) > [Broker Properties URI](Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/Broker Configuration URIUsing ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/Broker Configuration URI/Using ActiveMQ/Configuring Transports/ActiveMQ Connection URIs/Broker Configuration URI/broker-properties-uri.md)


Broker Properties URI
---------------------

From version 4.2 of ActiveMQ onwards the Broker Properties URI allows you to [run a configured broker](Using ActiveMQ/run-broker.md) by referencing a properties file which could be on the classpath, a local file or a remote URL.

#### Syntax

**properties:name**

Where name is some name which is resolved on the classpath, as a local file or a remote URL which points to the properties file used to configure the broker.

##### Example URI

The following examples show variations in using the URI

properties:/foo/bar.properties
properties:foo.properties
properties:http://foo.com/foo.properties

Here is [an example properties file](http://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/config/broker.properties)

\## ---------------------------------------------------------------------------
\## Licensed to the Apache Software Foundation (ASF) under one or more
\## contributor license agreements.  See the NOTICE file distributed with
\## this work for additional information regarding copyright ownership.
\## The ASF licenses this file to You under the Apache License, Version 2.0
\## (the "License"); you may not use this file except in compliance with
\## the License.  You may obtain a copy of the License at
\## 
\## http://www.apache.org/licenses/LICENSE-2.0
\## 
\## Unless required by applicable law or agreed to in writing, software
\## distributed under the License is distributed on an "AS IS" BASIS,
\## WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
\## See the License for the specific language governing permissions and
\## limitations under the License.
\## ---------------------------------------------------------------------------
\# START SNIPPET: example
useJmx = false
persistent = false
brokerName = Cheese
\# END SNIPPET: example

