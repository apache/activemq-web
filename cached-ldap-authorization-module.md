      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- Cached LDAP Authorization Module 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Features](features.html) > [Security](security.html) > [Cached LDAP Authorization Module](cached-ldap-authorization-module.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Available since 5.6

Cached LDAP authorization module is an implementation of an default authorization module that initializes and updates data from LDAP. It supports all standard features like defining wildcard policy entries and entry for temporary destinations.

Initializing
------------

We provide two ldif files for easy starting. The first one is for [Apache Directory Server](http://directory.apache.org/) ([ldif](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/security/activemq-apacheds.ldif)), which we use in embedded mode for testing. For an example on how to initialize the embedded ApacheDS with this ldif file take a look at [CachedLDAPSecurityTest](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/java/org/apache/activemq/security/CachedLDAPSecurityTest.java)

The other one is for [OpenLDAP](http://www.openldap.org/) ([ldif](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/security/activemq-openldap.ldif))

The provided ldif and examples assume `dc=activemq,dc=apache,dc=org` suffix to be used for entries, so the configuration similar to the one shown in the following snippet

suffix          "dc=activemq,dc=apache,dc=org"
rootdn          "cn=admin,dc=activemq,dc=apache,dc=org"
\# Cleartext passwords, especially for the rootdn, should
\# be avoid.  See slappasswd(8) and slapd.conf(5) for details.
\# Use of strong authentication encouraged.
rootpw          {SSHA}lfAYn54xCFghgQv5B2Kqn3d3eLojqxtS

should be put into your `slapd.conf`

To initialize your (properly configured) OpenLDAP do something like

ldapadd -x -D "cn=admin,dc=activemq,dc=apache,dc=org" -w sunflower -f activemq-openldap.ldif

Configuring
-----------

Once entries are in LDAP, you can configure the module to load entries from there. A default values are adapted for embedded Apache DS server, so all you have to do in that case is add your plugin to the broker xml conf

<authorizationPlugin>
    <map>
        <cachedLDAPAuthorizationMap/>
    </map>
</authorizationPlugin>

For the OpenLDAP case, you should define more parameters

<authorizationPlugin>
    <map>
        <cachedLDAPAuthorizationMap
            connectionURL="ldap://localhost:389"
            connectionUsername="cn=admin,dc=activemq,dc=apache,dc=org"
            connectionPassword="sunflower"
            queueSearchBase="ou=Queue,ou=Destination,ou=ActiveMQ,dc=activemq,dc=apache,dc=org"
            topicSearchBase="ou=Topic,ou=Destination,ou=ActiveMQ,dc=activemq,dc=apache,dc=org"
            tempSearchBase="ou=Temp,ou=Destination,ou=ActiveMQ,dc=activemq,dc=apache,dc=org"
            refreshInterval="300000"
            legacyGroupMapping="false"
        />
    </map>
</authorizationPlugin>

Full examples of configurations for [Apache DS](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/security/activemq-apacheds.xml) and [OpenLDAP](https://svn.apache.org/repos/asf/activemq/trunk/activemq-unit-tests/src/test/resources/org/apache/activemq/security/activemq-openldap.xml)

The list of all properties for `cachedLDAPAuthorizationMap`

property

default value

description

version

connectionURL

ldap://localhost:1024

LDAP Server connection address

connectionUsername

uid=admin,ou=system

Dn to be used for connecting to the server

connectionPassword

secret

Password to be used for connecting to the server

connectionProtocol

s

Connection protocol to be used for connecting to the server

authentication

simple

Authentication method to be used when connecting to the server

queueSearchBase

ou=Queue,ou=Destination,ou=ActiveMQ,ou=system

Base dn of queue related entries

5.7 and later

topicSearchBase

ou=Topic,ou=Destination,ou=ActiveMQ,ou=system

Base dn of topic related entries

5.7 and later

tempSearchBase

ou=Temp,ou=Destination,ou=ActiveMQ,ou=system

Base dn of temporary destinations related entries

5.7 and later

refreshInterval

-1

Interval (in milliseconds) of pulling changes from the server, -1 means pulling is off, see #Updates for more info

legacyGroupMapping

true

Should permission group members be configured as CN and not a full DN

5.7 and later

Updates
-------

Many LDAP servers supports so called "persistent search" feature which allows applications to receive changes in LDAP in a "push" manner. By default this plugin assumes that LDAP server supports this feature and will "register" to get live updates.

For servers that doesn't support this yet (like OpenLDAP), we provide "pull" updates. In this case you need to set `refreshInterval` property, which will define the update period for the plugin (so in this case, updates will not be immediately applied)

### [Overview](overview.html)

*   [Index](index.html)
*   [News](news.html)
*   [New Features](new-features.html)
*   [Getting Started](getting-started.html)
*   [FAQ](faq.html)
*   [Articles](articles.html)
*   [Books](books.html)
*   [Download](download.html)
*   [License](http://www.apache.org/licenses/)

### Search

    
  

### Sub Projects

*   [Artemis](http://activemq.apache.org/artemis/)
*   [Apollo](http://activemq.apache.org/apollo "ActiveMQ Apollo")
*   [CMS](http://activemq.apache.org/cms/)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")

### [Community](community.html)

*   [Support](support.html)
*   [Contributing](contributing.html)
*   [Discussion Forums](discussion-forums.html)
*   [Mailing Lists](mailing-lists.html)
*   [IRC](irc.html)
*   [IRC Log](http://javabot.evanchooly.com/logs/%23apache-activemq/today)
*   [Security Advisories](security-advisories.html)
*   [Site](site.html)
*   [Sponsorship](http://www.apache.org/foundation/sponsorship.html)
*   [Projects Using ActiveMQ](projects-using-activemq.html)
*   [Users](users.html)
*   [Team](team.html)
*   [Thanks](thanks.html)

### [Features](features.html)

*   [Advisory Message](advisory-message.html)
*   [Clustering](clustering.html)
*   [Cross Language Clients](cross-language-clients.html)
*   [Enterprise Integration Patterns](enterprise-integration-patterns.html)
*   [JMX](jmx.html)
*   [JMS to JMS Bridge](jms-to-jms-bridge.html)
*   [MasterSlave](masterslave.html)
*   [Message Groups](message-groups.html)
*   [Networks of Brokers](networks-of-brokers.html)
*   [Performance](performance.html)
*   [Persistence](persistence.html)
*   [Security](security.html)
*   [Virtual Destinations](virtual-destinations.html)
*   [Visualisation](visualisation.html)
*   [More ...](features.html)

### [Connectivity](connectivity.html)

*   [Ajax](ajax.html)
*   [AMQP](amqp.html)
*   [Axis and CXF Support](axis-and-cxf-support.html)
*   [C Integration](c-integration.html)
*   [C++](activemq-c-clients.html)
*   [C# and .Net Integration](http://activemq.apache.org/nms/)
*   [CMS](http://activemq.apache.org/cms/)
*   [J2EE](j2ee.html)
*   [JBoss Integration](jboss-integration.html)
*   [Jetty](http://docs.codehaus.org/display/JETTY/Integrating+with+ActiveMQ)
*   [JNDI Support](jndi-support.html)
*   [NMS](http://activemq.apache.org/nms/ "NMS is the .Net Messaging API")
*   [REST](rest.html)
*   [RSS and Atom](rss-and-atom.html)
*   [Spring Support](spring-support.html)
*   [Stomp](stomp.html)
*   [Tomcat](tomcat.html)
*   [Unix Service](unix-service.html)
*   [WebLogic Integration](weblogic-integration.html)
*   [XMPP](xmpp.html)
*   [More ...](connectivity.html)

### [Using ActiveMQ 5](using-activemq-5.html)

*   [Getting Started](version-5-getting-started.html)
*   [Initial Configuration](version-5-initial-configuration.html)
*   [Running a Broker](version-5-run-broker.html)
*   [Embedded Brokers](how-do-i-embed-a-broker-inside-a-connection.html)
*   [Command Line Tools](activemq-command-line-tools-reference.html)
*   [Configuring Transports](configuring-version-5-transports.html)
*   [Examples](version-5-examples.html)
*   [Web Samples](version-5-web-samples.html)
*   [Monitoring the Broker](how-can-i-monitor-activemq.html)
*   [Xml Configuration](version-5-xml-configuration.html)
*   [Xml Reference](xml-reference.html)
*   [More ...](using-activemq-5.html)

### [Tools](tools.html)

*   [Web Console](web-console.html)
*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)

### [Support](support.html)

*   [Issues](http://issues.apache.org/jira/browse/AMQ)
*   [Roadmap](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:roadmap-panel)
*   [Change log](http://issues.apache.org/activemq/browse/AMQ?report=com.atlassian.jira.plugin.system.project:changelog-panel)

### [Developers](developers.html)

*   [Source](source.html)
*   [Building](building.html)
*   [Developer Guide](developer-guide.html)
*   [Becoming a committer](becoming-a-committer.html)
*   [Code Overview](code-overview.html)
*   [Wire Protocol](wire-protocol.html)
*   [Release Guide](release-guide.html)

### Tests

*   [Maven2 Performance Plugin](activemq-performance-module-users-manual.html)
*   [Benchmark Tests](benchmark-tests.html)
*   [JMeter System Tests](jmeter-system-tests.html)
*   [JMeter Performance Tests](jmeter-performance-tests.html)
*   [Integration Tests](integration-tests.html)

### Project Reports

*   [JUnit Reports](junit-reports.html)
*   [Source XRef](source-xref.html)
*   [Test Source XRef](test-source-xref.html)
*   [Xml Reference](xml-reference.html)

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=27821805))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();