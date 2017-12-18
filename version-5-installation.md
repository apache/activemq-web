Apache ActiveMQ ™ -- Version 5 Installation 

[Using ActiveMQ 5](using-activemq-5.html) > [Version 5 Installation](version-5-installation.html)


*   [Download](download.html) a binary distribution of ActiveMQ and unpack it into some directory.

*   To run an ActiveMQ broker, type the following commands from the directory in which you have just unpacked the ActiveMQ distribution.

cd bin
activemq

The ActiveMQ broker should now run. You can configure the broker by specifying an [Xml Configuration](xml-configuration.html) file as a parameter to the _activemq_ command.

You can now run the [Examples](examples.html) using Ant.

See the [getting started guide](initial-configuration.html) for details of which jars you need to add to your classpath to start using ActiveMQ in your Java code

If you want to use JNDI to connect to your JMS provider then please view the [JNDI Support](jndi-support.html). If you are a Spring user you should read about [Spring Support](spring-support.html)

