Apache ActiveMQ ™ -- How do I configure 10s of 1000s of Queues in a single broker 

[Community](community.html) > [FAQ](faq.html) > [Configuration](configuration.html) > [How do I configure 10s of 1000s of Queues in a single broker](how-do-i-configure-10s-of-1000s-of-queues-in-a-single-broker.html)


Scaling to tens of thousands of Queues in a single broker is relatively straightforward - but requires some configuration changes from the default.

Reducing Threads
----------------

With the default configuration, ActiveMQ is configured to use a dispatch thread per Queue - you can use set the optimizedDispatch property on the destination policy entry - see [configuring Queues](per-destination-policies.html).

ActiveMQ can optionally use internally a thread pool to control dispatching of messages - but as a lot of deployment operating systems are good at handling a large number of threads, this is off by default. To enable this option, either set the ACTIVEMQ\_OPTS to disable dedicated task runners in the start up script, INSTALL\_DIR/bin/activemq -e.g.

ACTIVEMQ_OPTS="-Xmx512M -Dorg.apache.activemq.UseDedicatedTaskRunner=false"  

or you can set ACTIVEMQ_OPTS in /etc/activemq.conf.

**Note:** From ActiveMQ 5.6 onwards the dedicated task runner is disabled by default (see .jira-issue { padding: 0 0 0 2px; line-height: 20px; } .jira-issue img { padding-right: 5px; } .jira-issue .aui-lozenge { line-height: 18px; vertical-align: top; } .jira-issue .icon { background-position: left center; background-repeat: no-repeat; display: inline-block; font-size: 0; max-height: 16px; text-align: left; text-indent: -9999em; vertical-align: text-bottom; } [AMQ-3667](https://issues.apache.org/jira/browse/AMQ-3667?src=confmacro) ).

To reduce the number of threads used for the transport - take a look at using the NIO transport - see [Configuring Transports](configuring-transports.html)

Here is an [example](http://svn.apache.org/repos/asf/activemq/trunk/assembly/src/sample-conf/activemq-scalability.xml) of this in use in one of the provided sample broker configuration files.

Reducing Memory Consumption
---------------------------

Reduce the memory used per thread - see [reducing memory consumption](javalangoutofmemory.html)

Reduce number of file descriptors
---------------------------------

ActiveMQ uses the amqPersistenceAdapter by default for persistent messages. Unfortunately, this persistence adapter (as well as the kahaPersistenceAdapter) opens a file descriptor for each queue. When creating large numbers of queues, you'll quickly run into the limit for your OS.

You can either choose another [persistence option](persistence.html)

or - try out the new [KahaDB](kahadb.html) in version 5.3 and higher

Increase the limit on file descriptors per process
--------------------------------------------------

Try [googling for the OS you are using](http://tinyurl.com/o9qs2f)
