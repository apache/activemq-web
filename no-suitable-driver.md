Apache ActiveMQ ™ -- No suitable driver 

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [Exceptions](exceptions.html) > [No suitable driver](no-suitable-driver.html)


### Symptoms

I get an exception saying **No suitable driver** when initialising the JDBC driver.

### Reason

ActiveMQ tries to auto-detect the JDBC driver so that it can deduce the ultimate database's SQL dialect. Some JDBC drivers are not yet auto-recognised. Here's [how to configure the language adapater class to use or to provide us with details of your driver so we can add support for it to ActiveMQ](jdbc-support.html).

### See

*   [JDBC Support](jdbc-support.html)
*   [Persistence](persistence.html)
*   [How to configure a new database](how-to-configure-a-new-database.html)

