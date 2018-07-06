Apache ActiveMQ ™ -- I get errors building the code whats wrong 

[Community](community.html) > [FAQ](faq.html) > [Errors](errors.html) > [I get errors building the code whats wrong](i-get-errors-building-the-code-whats-wrong.html)


We currently use a multi-project maven build system, which can be a little fragile. If you are ever having problems building we suggest you try the following in the root _activemq_ directory

mvn clean
rm -rf ~/.m2/repository
mvn

You may also want to [disable the unit tests](how-do-i-build-but-disable-the-unit-tests.html)

