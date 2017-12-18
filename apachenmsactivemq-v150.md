      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Apache.NMS.ActiveMQ v1.5.0 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Downloads](activemq-downloads.html) > [Apache.NMS.ActiveMQ v1.5.0](apachenmsactivemq-v150.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

New and Noteworthy
------------------

This release adds some great new features to the NMS ActiveMQ library and fixes several bugs found in the 1.4.0 release.

##### New in this version

*   New startupMaxReconnectAttempts option in the failover transport.
*   Fixed a memory leak in the Inactivity Monitoring code.
*   Fixed a bug that could cause the Failover to not work.
*   Fixed a bug that caused SSL Certs to not be loaded in some cases.
*   Several other bugfixes for issues found since v1.4.0 was released.
*   Added support for participation in .NET Distributed Transactions (MSDTC).
*   Added .NET 4.0 build.
*   Many more fixes and internal improvements.

API Documentation
-----------------

Refer to the API for this release [here](nms-api.html)

Apache.NMS.ActiveMQ Client Downloads
------------------------------------

Description

Download Link

PGP Signature File

Version

Apache.NMS.ActiveMQ Source code

[Apache.NMS.ActiveMQ-1.5.0-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.5.0/Apache.NMS.ActiveMQ-1.5.0-src.zip)

[Apache.NMS.ActiveMQ-1.5.0-src.zip.asc](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.5.0/Apache.NMS.ActiveMQ-1.5.0-src.zip.asc)

1.5.0.2235

Apache.NMS.ActiveMQ Binary Assemblies

[Apache.NMS.ActiveMQ-1.5.0-bin.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.5.0/Apache.NMS.ActiveMQ-1.5.0-bin.zip)

[Apache.NMS.ActiveMQ-1.5.0-bin.zip.asc](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.5.0/Apache.NMS.ActiveMQ-1.5.0-bin.zip.asc)

1.5.0.2235

  

**NOTE:** Compatible with ActiveMQ Broker versions in the 4.X and 5.X family.

SVN Tag Checkout
----------------

svn co https://svn.apache.org/repos/asf/activemq/activemq-dotnet/Apache.NMS.ActiveMQ/tags/1.5.0/

Changelog
---------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12311201&styleName=Html&version=12315640)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25201687))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();