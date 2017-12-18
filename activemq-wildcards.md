      .maincontent { overflow:hidden; }   Apache ActiveMQ ™ -- ActiveMQ Wildcards 

ActiveMQ [ASF](http://www.apache.org)

[Index](index.html) > [Apache.NMS](apachenms.html) > [NMS Providers](nms-providers.html) > [Apache.NMS.ActiveMQ](apachenmsactivemq.html) > [ActiveMQ Advanced Features](activemq-advanced-features.html) > [ActiveMQ Destination Features](activemq-destination-features.html) > [ActiveMQ Wildcards](activemq-wildcards.html)

[Download](download.html) | [API](nms-api.html) | [Source](source.html) | [Forums](http://activemq.apache.org/discussion-forums.html) | [Support](http://activemq.apache.org/support.html)

We support destination wildcards to provide easy support for federated name hierarchies. This concept has been popular in financial market data for some time as a way of organizing events (such as price changes) into hierarchies and to use wildcards for easy subscription of the range of information you're interested in.

For example imagine you are sending price messages from a stock exchange feed. You might use some kind of destination such as

*   `PRICE.STOCK.NASDAQ.ORCL` to publish Oracle Corporation's price on NASDAQ and
*   `PRICE.STOCK.NYSE.IBM` to publish IBM's price on the New York Stock Exchange

A subscriber could then use exact destinations to subscribe to exactly the prices it requires. Or it could use wildcards to define hierarchical pattern matches to the destinations to subscribe from.

### Wildcards supported

We support the following wildcards which are fairly standard practice; wildcards are not part of the JMS specification so are custom enhancements.

*   `.` is used to separate names in a path
*   `*` is used to match any name in a path
*   `>` is used to recursively match any destination starting from this name

For example using the example above, these subscriptions are possible

Subscription

Meaning

`PRICE.>`

Any price for any product on any exchange

`PRICE.STOCK.>`

Any price for a stock on any exchange

`PRICE.STOCK.NASDAQ.*`

Any stock price on NASDAQ

`PRICE.STOCK.*.IBM`

Any IBM stock price on any exchange

**Note:** Don't specify any string after '>' on your wildcard expression, it will be ignored. E.g. using a wildcard `PRICE.>.IBM` will also match `PRICE.STOCK.NASDAQ.FB.` Using '>' really matches everything till the end of the destination name.

### Custom path separator

As of version 5.5.0 we support [plugin](http://activemq.apache.org/interceptors.html) that allows clients to use customer path separator. So instead of

`FOO.BAR.*`

you can use

`FOO/BAR/*`

To

    <plugins>
       .....
       <destinationPathSeparatorPlugin/>
    </plugins>

Please note that you should add this plugin as last if you want it to work properly with other plugins (such as [security](http://activemq.apache.org/security.html) for example).

A default path separator this plugin will use is `/`. You can customize it further using `pathSeparator` property.

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=25201944))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();