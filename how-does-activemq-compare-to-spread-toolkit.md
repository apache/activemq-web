Apache ActiveMQ ™ -- How does ActiveMQ compare to Spread Toolkit 

[Community](community.html) > [FAQ](faq.html) > [General](general.html) > [How does ActiveMQ compare to Spread Toolkit](how-does-activemq-compare-to-spread-toolkit.html)


Spread Toolkit is a C++ library for messaging and only has [partial support for JMS](http://www.spread.org/JMS4Spread/docs/). It doesn't support durable messaging, transactions, XA or full JMS 1.1. It is also dependent on a native code Spread daemon running on the machine.

Apache ActiveMQ on the other hand is the JMS provider used in [Apache Geronimo](http://geronimo.apache.org) and is J2EE 1.4 certified in Geronimo and is 100% pure Java. ActiveMQ supports transient and durable messaging, transactions, XA, J2EE 1.4, JMS 1.1, JCA 1.5 as well as heaps of different features like [Message Groups](message-groups.html) and [Clustering](clustering.html)

Performance guides
------------------

If you're not convinced by performance reports then please do try running performance tests yourself. You might wanna check out our overview of [Performance](performance.html) or try using out the [ActiveMQ Performance Module Users Manual](activemq-performance-module-users-manual.html)

The Commercial Providers on the [Support](support.html) page may also be able to help diagnose performance issues, suggest changes, etc...

