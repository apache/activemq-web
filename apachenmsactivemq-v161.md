      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- Apache.NMS.ActiveMQ v1.6.1 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Downloads](activemq-downloads.html) > [Apache.NMS.ActiveMQ v1.6.1](apachenmsactivemq-v161.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

New and Noteworthy
------------------

This is a bugfix release for the NMS.ActiveMQ client library. Along with some bug fixes though we've also added support for better discovery transport agents and we now support HTTP discovery using the ActiveMQ broker's HTTP discovery registry.

##### NMS.ActiveMQ Updates

The change log for this release is below.

*   Don't fire transport interrupted event when no resume is possible
*   dispatch paused, waiting for outstanding dispatch interruption processing to complete..
*   Better logging for XATransaction
*   Improve the discovery transport to be more robust and allow easier plugin of new agents.
*   Add an HTTP based discovery agent to the discovery transport feature.
*   Individual Acknowledgement seems not working in NMS

API Documentation
-----------------

Refer to the API for this release [here](nms-api.html)

Download Here
-------------

Description

Download Link

PGP Signature File

Version

Apache.NMS.ActiveMQ Source code

[Apache.NMS.ActiveMQ-1.6.1-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.1-src.zip)

[Apache.NMS.ActiveMQ-1.6.1-src.zip.asc](http://www.apache.org/dist/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.1-src.zip.asc)

1.6.0.3208

Apache.NMS.ActiveMQ Binary Assemblies

[Apache.NMS.ActiveMQ-1.6.1-bin.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.1-bin.zip)

[Apache.NMS.ActiveMQ-1.6.1-bin.zip.asc](http://www.apache.org/dist/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.1-bin.zip.asc)

1.6.0.3208

SVN Tag Checkout
----------------

svn co [https://svn.apache.org/repos/asf/activemq/activemq-dotnet/Apache.NMS.ActiveMQ/tags/1.6.1/](https://svn.apache.org/repos/asf/activemq/activemq-dotnet/Apache.NMS.ActiveMQ/tags/1.6.1/)

Changelog
---------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12311201&version=12324792)

### [Overview](overview.html)

*   [Home](index.html)
*   [FAQ](faq.html)
*   [Download](download.html)

### [Using NMS](using-nms.html)

*   [NMS Overview](apachenms.html)
*   [Getting Started](nms.html)
*   [NMS API Reference](nms-api.html)
*   [ActiveMQ](apachenmsactivemq.html)
*   [Stomp](apachenmsstomp.html)
*   [MSMQ](apachenmsmsmq.html)
*   [Tibco EMS](apachenmsems.html)
*   [WCF](apachenmswcf.html)

### Search

   

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](http://activemq.apache.org/contributing.html)
*   [Discussion Forums](http://activemq.apache.org/discussion-forums.html)
*   [Mailing Lists](http://activemq.apache.org/mailing-lists.html)
*   [IRC](irc://irc.codehaus.org/activemq)
*   [Articles](articles.html)
*   [Site](site.html)
*   [Team](http://activemq.apache.org/team.html)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=34836166))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();