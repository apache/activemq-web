Apache ActiveMQ ™ -- How to enable SSL support on Windows 

[Index](index.html) > [Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [Building FAQs](Index/Community/FAQ/building-faqs.md) > [OpenSSL Support](openssl-CommunityCommunity/Community/support.md) > [How to enable SSL support on Windows](Index/Community/FAQ/Building FAQs/OpenSSL Support/how-to-enable-ssl-support-on-windows.md)

To enable support for SSL on Windows you first need to obtain a build of the OpenSSL libraries for Windows (See the OpenSSL site for details). Once you have the OpenSSL package for Windows installed you need to add the HAVE_OPENSSL preprocessor directive to the ActiveMQ-CPP library build's project file and set the include and library paths there as well. When you link the library to your app and run you will need to have the location of the OpenSSL libraries on your PATH or copy the libraries to the System folder.

