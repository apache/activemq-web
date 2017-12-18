      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- How do I use the SSL Transport 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Community](community.html) > [FAQ](faq.html) > [ActiveMQ-CPP Usage FAQs](activemq-cpp-usage-faqs.html) > [How do I use the SSL Transport](how-do-i-use-the-ssl-transport.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

The first thing you need to do in order to use the SSL Transport in ActiveMQ-CPP is to build the library with SSL support enabled, for that see the [Build FAQs](building-faqs.html).

Once you have a build that supports the SSL protocol then its pretty simple, just replace the use of the _TCP_ Transport in your connection URI with SSL, for example:

tcp://broker1:61616

becomes:

ssl://broker1:61616

You should note that in order to validate that the certificate that the broker sends is the one we want we must validate the "Common Name (CN)" field from the certificate against the host-name in the URI. If you have trouble connecting to the broker one of the first things to check it if your host-name matches the broker certificate common name.

That's almost it, there's just a couple other things you need might need to do. The SSL transport needs to know whether or not to trust the certificate that the Broker sends to it, for this you need to set a property in the Decaf library (this is the native library ActiveMQ-CPP uses for cross platform support). The property you set tells the library where to find either the Broker's Certificate or the Certificate of the Authority that signed the broker's certificate. If you are using the Failover Transport (which you should be) in conjunction with the SSL Transport then its best to set the property to point to the certificate that signed all your broker's certificates. Here's what the code looks like:

#include <decaf/lang/System.h>

...

decaf::lang::System::setProperty( "decaf.net.ssl.trustStore", "<path to Certificate file>/certificate.pem" );

One thing to note here is that since we are using OpenSSL as our SSL Engine the Certificate needs to be in PEM format.

### [Overview](index.html)

*   [Index](index.html)
*   [News](news.html)
*   [Getting Started](getting-started.html)
*   [Tutorials](tutorials.html)
*   [API](api.html)
*   [FAQ](faq.html)
*   [Download](download.html)

### [Connectivity](connectivity.html)

*   [Stomp](stomp-support.html)
*   [OpenWire](openwire-support.html)

### [Using ActiveMQ-CPP](using-activemq-cpp.html)

*   [Getting Started](getting-started.html)
*   [CMS API Overview](cms-api-overview.html)
*   [Example](example.html)
*   [Configuring](configuring.html)

### Search

    
  

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](http://activemq.apache.org/contributing.html)
*   [Discussion Forums](http://activemq.apache.org/discussion-forums.html)
*   [Mailing Lists](http://activemq.apache.org/mailing-lists.html)
*   [IRC](irc://irc.codehaus.org/activemq)
*   [IRC Log](http://servlet.uwyn.com/drone/log/hausbot/activemq)
*   [Site](site.html)
*   [Team](http://activemq.apache.org/team.html)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)
*   [Creating Distributions](creating-distributions.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=21792569))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();