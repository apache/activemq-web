      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ-CPP 3.5.0 Release 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Overview](overview.html) > [Download](download.html) > [ActiveMQ-CPP 3.5.0 Release](activemq-cpp-350-release.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

New and Noteworthy
------------------

This is a new Major release of ActiveMQ-CPP with several new APIs and internal changes meant to improve overall stability of the C++ client. Besides a large amount of bug fixing and memory fixing this release also features a lot of new features in the CMS API:

*   Added Message Transformation capabilities for incoming and outgoing messages.
*   You can now query for the type of a Message property so you can choose the best getter method.
*   MapMessage and StreamMessage object now expose an API to find out what type a value is before you try to get a value using one of the getter methods.
*   Polling consumers now can set a Message available listener.
*   Stomp clients can configure the destination prefixes for the Destination types (Queues, Topics...).
*   StreamMessage now has a reset method to allow object reuse.
*   Added an AdvisorySupport class to make dealing with advisory topics easier.
*   Added support for non-blocking sends to Message Producers.

  

**NOTE:** Compatible with ActiveMQ Broker versions in the 4.X and 5.X family

API
---

This release is based on the CMS 2.4 API.

Check out the API for this release [here](http://activemq.apache.org/cms/api_docs/activemqcpp-3.4.0/html)

Download Here
-------------

Description

Download Link

PGP Signature file of download

Source code for Windows

[activemq-cpp-library-3.5.0-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.zip)

[activemq-cpp-library-3.5.0-src.zip.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.zip.asc)

Source code for Unix (gzipped)

[activemq-cpp-library-3.5.0-src.tar.gz](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.tar.gz)

[activemq-cpp-library-3.5.0-src.tar.gz.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.tar.gz.asc)

Source code for Unix (bz2)

[activemq-cpp-library-3.5.0-src.tar.bz2](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.tar.bz2)

[activemq-cpp-library-3.5.0-src.tar.bz2.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.5.0-src.tar.bz2.asc)

SVN Tag Checkout
----------------

svn co https://svn.apache.org/repos/asf/activemq/activemq-cpp/tags/activemq-cpp-3.5.0/

Changelog
---------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12311207&styleName=Html&version=12316380)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=30745456))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();