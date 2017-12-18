      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Apache.NMS.ActiveMQ v1.6.0 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Downloads](activemq-downloads.html) > [Apache.NMS.ActiveMQ v1.6.0](apachenmsactivemq-v160.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

New and Noteworthy
------------------

This release adds some great new features and fixes to the NMS.ActiveMQ API.

##### NMS.ActiveMQ Updates

This release adds several new features to the ActiveMQ client and fixes many bugs that have been reported since the last release.

*   Adds support for non-blocking redelivery.
*   Supports priority backups for Failover transport.
*   Supports an Optimized Ack mode for MessageConsumers.
*   Adds Message Audits to prevent duplicate deliveries on Failover.
*   Implements the ISession Recover method.
*   Adds support for purging locally created temp destinations.
*   Properly handles cluster client re-balancing in Failover Transport.
*   Plus a lot more fixes and stability improvements.

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

[Apache.NMS.ActiveMQ-1.6.0-src.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.0-src.zip)

[Apache.NMS.ActiveMQ-1.6.0-src.zip.asc](http://www.apache.org/dist/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.0-src.zip.asc)

1.6.0.3072

Apache.NMS.ActiveMQ Binary Assemblies

[Apache.NMS.ActiveMQ-1.6.0-bin.zip](http://www.apache.org/dyn/closer.cgi/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.0-bin.zip)

[Apache.NMS.ActiveMQ-1.6.0-bin.zip.asc](http://www.apache.org/dist/activemq/apache-nms/1.6.0/Apache.NMS.ActiveMQ-1.6.0-bin.zip.asc)

1.6.0.3072

SVN Tag Checkout
----------------

svn co https://svn.apache.org/repos/asf/activemq/activemq-dotnet/Apache.NMS.ActiveMQ/tags/1.6.0/

Changelog
---------

For a more detailed view of new features and bug fixes, see the [release notes](https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12311201&styleName=Html&version=12315987)

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=31823545))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();