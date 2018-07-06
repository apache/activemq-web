Apache ActiveMQ ™ -- Performance 

[Features](features.html) > [Performance](performance.html)


Performance
-----------

Performance differs greatly depending on many different factors

*   the network [topology](topologies.html)
*   transport [protocols](uri-protocols.html) used
*   [quality of service](qos.html)
*   hardware, network, JVM and operating system
*   number of producers, number of consumers
*   distribution of messages across destinations along with message size

To give you an idea of the kinds of performance you can expect from ActiveMQ we have a bunch of [JMeter Performance Tests](jmeter-performance-tests.html) that you can run on your hardware with the protocols of your choice.

The last test run we ran was on a small network of 2 dual CPU opteron linux boxes (64 bit) running SuSe and with Java 5 from Sun.

When running the server on one box and a single producer and consumer thread in separate VMs on the other box, using a single topic we got around 21-22,000 messages/second using 1-2K messages. Another test running the broker on a Intel Celeron CPU 2.40GHz we got 2000 messages/second on a durable queue with 1 producer and 1 consumer thread on another box. So your milleage may vary greatly on your environment.

### Performance Testing

We have a few tools to help you evaluate performance.

*   [ActiveMQ Performance Module Users Manual](activemq-performance-module-users-manual.html)
*   [Load Testing with Camel](load-testing-with-camel.html)
*   [JMeter Performance Tests](jmeter-performance-tests.html)

Performance guides
------------------

If you're not convinced by performance reports then please do try running performance tests yourself. You might wanna check out our overview of [Performance](performance.html) or try using out the [ActiveMQ Performance Module Users Manual](activemq-performance-module-users-manual.html)

The Commercial Providers on the [Support](support.html) page may also be able to help diagnose performance issues, suggest changes, etc...

