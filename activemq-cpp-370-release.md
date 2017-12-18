      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- ActiveMQ-CPP 3.7.0 Release 

[ActiveMQ](http://activemq.apache.org/) [ASF](http://www.apache.org)

[Index](index.html) > [Overview](overview.html) > [Download](download.html) > [ActiveMQ-CPP 3.7.0 Release](activemq-cpp-370-release.html)

[Download](download.html) | [API](api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](support.html)

New and Noteworthy
------------------

This is a new Major release of ActiveMQ-CPP, a lot of bugs have been fixed that were found in the v3.6.0 release which should reduce memory consumption and improve overall stability. Some new features have been added as well.

*   Added support of Optimized Acknowledge
*   Added support for Non-blocking redelivery.
*   Removed dependence on the APR-Util library.
*   Supports priority backup for Failover Transport
*   Supports the cluster rebalancing feature.
*   Message Audits to filter duplicates on Failover.
*   A lot of other little bug fixes and improvements.

  

**NOTE:** Compatible with ActiveMQ Broker versions in the 4.X and 5.X family

API
---

This release is based on the CMS 3.1 API.

Check out the API for this release [here](http://activemq.apache.org/cms/api_docs/activemqcpp-3.7.0/html)

Download Here
-------------

Description

Download Link

PGP Signature file of download

Source code for Windows

[activemq-cpp-library-3.7.0-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.zip)

[activemq-cpp-library-3.7.0-src.zip.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.zip.asc)

Source code for Unix (gzipped)

[activemq-cpp-library-3.7.0-src.tar.gz](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.tar.gz)

[activemq-cpp-library-3.7.0-src.tar.gz.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.tar.gz.asc)

Source code for Unix (bz2)

[activemq-cpp-library-3.7.0-src.tar.bz2](http://www.apache.org/dyn/closer.cgi/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.tar.bz2)

[activemq-cpp-library-3.7.0-src.tar.bz2.asc](http://www.apache.org/dist/activemq/activemq-cpp/source/activemq-cpp-library-3.7.0-src.tar.bz2.asc)

SVN Tag Checkout
----------------

svn co https://svn.apache.org/repos/asf/activemq/activemq-cpp/tags/activemq-cpp-3.7.0/

Changelog
---------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12311207&styleName=Html&version=12324161)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=31821651))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();