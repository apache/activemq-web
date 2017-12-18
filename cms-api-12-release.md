      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- CMS API 1.2 Release 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Overview](overview.html) > [Download](download.html) > [CMS API 1.2 Release](cms-api-12-release.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

New and Noteworthy
------------------

This is a minor release of the C++ Messaging Service (CMS). This release is was done as part of releasing ActiveMQ-CPP 2.1.1 and contains the following updates:

*   Made read methods of BytesMessage const so that asynchronous consumers (onMessage) don't have to use const_cast.

API
---

Check out the API for this release [here](http://activemq.apache.org/cms/api_docs/cms-1.2)

Download Here
-------------

Description

Download Link

PGP Signature file of download

Source code for Windows

[cms-1.2-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/cms-1.2-src.zip)

[cms-1.2-src.zip.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/cms-1.2-src.zip.asc)

Source code for Unix

[cms-1.2-src.tar.gz](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/cms-1.2-src.tar.gz)

[cms-1.2-src.tar.gz.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/cms-1.2-src.tar.gz.asc)

SVN Tag Checkout
----------------

svn co https://svn.apache.org/repos/asf/activemq/activemq-cpp/tags/cms-1.2/

Changelog
---------

The following issues were resolved as part of the [ActiveMQ-CPP 2.1.1 Release](activemq-cpp-211-release.html)  

JIRA Issues Macro: JIRA project does not exist or you do not have permission to view it.

 

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=69271))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();