      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- ActiveMQ-CPP, libtool and packaging notes 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Overview](overview.html) > [Download](download.html) > [ActiveMQ-CPP, libtool and packaging notes](activemq-cpp-libtool-and-packaging-notes.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

ActiveMQ-CPP, libtool and packaging notes
=========================================

### Introduction

This page attempts to summarise information to be considered

*   when configuring libtool
*   when packaging ActiveMQ for distribution on Debian, Red Hat, Solaris.

### Concepts

Product version numbers

*   Please see the notes on [ActiveMQ-CPP product version number](activemq-cpp-product-version-number.html)

SONAME

*   At runtime (when dynamic linking occurs) the SONAME embedded in the library must match the SONAME expected by the application.
*   To see the SONAME embedded in the library, objdump -p libactivemq-cpp-2.1.2.so | grep SONAME
*   To see the SONAMEs expected by an application, objdump -p | grep NEEDED
*   By default, libtool will use the library filename as the SONAME
*   Libtool's default behaviour can be modified by the soname_spec variable
*   Possible SONAMEs fro ActiveMQ CPP:
    *   libactivemq-cpp-2.1.2.so.0 (each executable will depend on a specific build and will refuse to work with any other build)
    *   libactivemq-cpp.so.0 (only one version can be installed at the same time)
    *   libactivemq2-cpp.so.0 (so that 2.x and 3.x can be installed simultaneously)

libtool -release

*   the -release argument tells libtool the release number
*   the release number could be the major version number, the complete version number, or the SVN revision number
*   libtool believes that any two releases are NOT compatible - for example, if an executable expects release number 5, and the library has release number 4 or 6, the executable will refuse to run

libtool -version-info current:revision:age

*   Allows binary compatibility between versions
*   The number at the end of the filename is the interface version number
*   Interface version number is NOT THE SAME as the product version number
*   Interface version number should increment each time the `interface' changes (new function prototypes, new function arguments, change in wire protocol, etc)
*   The `age' number is used to indicate backwards compatibility - if age=1, then this interface is backwards compatible with the previous version only, if age=2, then this interface is backwards compatible with the 2 previous versions

Debian package name

*   The package name includes the following from libtool: release number and interface number
*   for example, if interface version = 4, then the package name = libactivemq-cpp4
*   The product version number is not part of the Debian package name - it is used elsewhere in Debian's control files

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=72106))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();