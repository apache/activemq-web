Apache ActiveMQ ™ -- I cannot connect to ActiveMQ from JConsole 

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [I cannot connect to ActiveMQ from JConsole](i-cannot-connect-to-activemq-from-jconsole.html)


Make sure that the machine you are talking to has a valid **java.rmi.server.hostname-property** value

e.g. on unix (OS X, Linux, Solaris)

export ACTIVEMQ\_OPTS=$ACTIVEMQ\_OPTS -Djava.rmi.server.hostname=<hostname> 
activemq

or on Windows

SET ACTIVEMQ\_OPTS=%ACTIVEMQ\_OPTS% -Djava.rmi.server.hostname=<hostname> 
activemq

