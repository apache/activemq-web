      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- AMQP Build Notes 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.AMQP](apachenmsamqp.html) > [AMQP Build Notes](amqp-build-notes.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

Default build
=============

Executing **nant** in the project home directory will produce two builds:

*   Debug/Release .NET 2.0 x86 in the \\net-2.0 folder built with Visual Studio 2008
*   Debug/Release .NET 4.0 x86 in the \\net-4.0 folder built with Visual Studio 2010

Your build system must have Visual Studio 2008, Visual Studio 2010, or both to produce the desired build.

Dependencies and restrictions
=============================

The version dependencies on Visual Studio and the x86-only restrictions are artefacts of the delivery mechanism for the vendor\\QPid\\Apache.QPID support libraries. These restrictions are important to understand for using this provider and for packaging this provider for your application.

Support library components (x86 only)
-------------------------------------

The support libraries consist of two parts:

*   Native C++ Qpid Messaging (qpid*.dll, boost*.dll)
*   .NET interop binding between .NET and the native C++ code (org.apache.qpid.messaging.dll)

The C++ support libraries are compiled with specific versions of Visual Studio and linked to the corresponding MSVC runtime libraries. In this release of Apache.NMS.AMQP only the x86 versions of Apache.QPID are provided.

Running the Apache.NMS.AMQP provider in an x64 environment or in a .NET application choosing AnyCPU will not work correctly. Please choose **x86** for your application _Platform target_.

Run time library staging
------------------------

When your application runs make sure that all of the Apache.QPID support library dll files are copied to the final execution directory. When the support library files are not in same folder as _org.apache.qpid.messaging.dll_ then the Apache.NMS.AMQP provider may not load correctly. Having the support files on your application's PATH is not sufficient for successful loading.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=46633323))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();