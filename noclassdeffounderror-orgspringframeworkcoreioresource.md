Apache ActiveMQ ™ -- NoClassDefFoundError - org.springframework.core.io.Resource 

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [Exceptions](exceptions.html) > [NoClassDefFoundError - org.springframework.core.io.Resource](noclassdeffounderror-orgspringframeworkcoreioresource.html)


If you get an exception like this

java.lang.NoClassDefFoundError - org/springframework/core/io/Resource

### Cause

You were probably trying to use the [XML Configuration](xml-configuration.html) mechanism, which uses Spring, but without having the Spring jar on your classpath.

### Solution

Add the Spring jar to your classpath.

