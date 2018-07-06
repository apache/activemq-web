Apache ActiveMQ ™ -- How do I prevent autoconf from enabling OpenSSL support 

[Index](index.html) > [Community](community.html) > [FAQ](faq.html) > [Building FAQs](building-faqs.html) > [OpenSSL Support](openssl-support.html) > [How do I prevent autoconf from enabling OpenSSL support](how-do-i-prevent-autoconf-from-enabling-openssl-support.html)

In some cases you may not want to build in support for OpenSSL, since the Autotools script do this automatically we have provided a means to disable this, just add the _disable-ssl_ options to your configure and no SSL support will be added:

./configure --disable-ssl

