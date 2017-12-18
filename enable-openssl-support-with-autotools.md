Apache ActiveMQ ™ -- Enable OpenSSL support with autotools 

[Index](index.html) > [Community](community.html) > [FAQ](faq.html) > [Building FAQs](building-faqs.html) > [OpenSSL Support](openssl-support.html) > [Enable OpenSSL support with autotools](enable-openssl-support-with-autotools.html)

When you build the ActiveMQ-CPP library using the GNU AutoTools the Configure script will automatically search for OpenSSL on your system and enable support for it in the code if its found. The search might fail if you have installed OpenSSL in a non-standard location in which case you can tell the configure script where to look using the _with-openssl_ option, see below for an example.

./configure --with-openssl=/opt/special/openssl

