      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- ActiveMQ-CPP product version number 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Overview](overview.html) > [Download](download.html) > [ActiveMQ-CPP, libtool and packaging notes](activemq-cpp-libtool-and-packaging-notes.html) > [ActiveMQ-CPP product version number](activemq-cpp-product-version-number.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

_This is a DRAFT proposal and has not been adopted as official policy by this project._

In order to facilitate the correct use of libtool and the preparation of binary packages for distribution on Debian, Red Hat, etc, it is beneficial to have a written policy on version numbers.

### Product version number

These numbers represent the release of the product. E.g. 2.1.2

For the ActiveMQ-CPP project, the numbers have the format MAJOR.MINOR.REVISION, and the following meanings:

*   MAJOR: a change in the MAJOR number is necessary for anything that changes binary compatibility (e.g. changing a function prototype or class definition), or when major internal changes occur
*   MINOR: a change in the MINOR number is necessary whenever new functionality is added without breaking binary compatibility (e.g. adding a new class), or when anything other than very minor internal changes occur
*   REVISION: a change in the REVISION number is made for any other type of change that does not justify a change to MINOR or MAJOR

Further to the above, it is envisaged that a user who has a packaging system (such as Debian):

*   may choose to have more than one major version installed on the same system concurrently (e.g. 2.1.2 and 3.4.5)
*   may only have one variation of each major version installed (e.g. it is not intended to have 2.1.2 and 2.3.0 concurrently)

### libtool ABI version number

This number represents an ABI version. It is an integer, e.g., the number 5.

The ABI version number does not need to be the same as the product version number.

An increment in the libtool version number is mandatory when one of the following occurs:

*   any new structs, classes or function prototypes are added
*   the definition of any structs, classes or function prototypes are modified
*   any structs, classes or function prototypes are removed

Note that in the first case above, binary compatibility with existing applications is maintained. In the second and third case, binary compatibility is lost, and the libtool `age' variable must also be changed.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=72722))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();