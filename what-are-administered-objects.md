Apache ActiveMQ ™ -- What are administered objects 

[Community](community.html) > [FAQ](faq.html) > [JMS](jms.html) > [What are administered objects](what-are-administered-objects.html)


What are administered objects?
------------------------------

Administered objects refers to objects that are configured in [JNDI](jndi-support.html) and then accessed by a JMS client. So they are simply client-side objects typically either a ConnectionFactory or a Destination (such as a Queue or Topic).

Note that administered objects are only used for JNDI. JNDI can then be used as a level of indirection between the JNDI API and the concrete API of the JMS provider. So looking up objects in JNDI avoids you having a runtime dependency on ActiveMQ. Given that we are only talking about one ConnectionFactory object and a few Destination objects, this is not a huge big deal though ![(smile)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/smile.png)

Often folks get very confused with JNDI. e.g. in RMI / EJB scenarios JNDI provides client side proxies; this is not the case with JMS, as the JMS client is the client side proxy to the broker.

An alternative approach to creating administered objects in JNDI is to just use the [Spring Support](spring-support.html) and let dependency injection be an alternative to JNDI.

### See Also

*   [How do I create new destinations](how-do-i-create-new-destinations.html)
*   [How do I embed a Broker inside a Connection](how-do-i-embed-a-broker-inside-a-connection.html)
*   [How does ConnectionFactory relate to the Broker](how-does-connectionfactory-relate-to-the-broker.html)
