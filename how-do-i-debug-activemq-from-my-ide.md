Apache ActiveMQ ™ -- How do I debug ActiveMQ from my IDE 

[Community](community.html) > [FAQ](faq.html) > [Developing ActiveMQ](developing-activemq.html) > [How do I debug ActiveMQ from my IDE](how-do-i-debug-activemq-from-my-ide.html)


One option is to run your broker in the same JVM as your application; see [How To Unit Test JMS Code](how-to-unit-test-jms-code.html).

Or you can try uncommenting ACTIVEMQ\_DEBUG\_OPTS in your activemq start script (bin/activemq or bin\\activemq.bat) and start remote debugging in your IDE.

For IDEA, see this article [http://www.javaranch.com/journal/200408/DebuggingServer-sideCode.html](http://www.javaranch.com/journal/200408/DebuggingServer-sideCode.html)

