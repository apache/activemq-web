      .maincontent { overflow:hidden; }        SyntaxHighlighter.defaults\['toolbar'\] = false; SyntaxHighlighter.all();  Apache ActiveMQ ™ -- LDAP Broker Discovery Mechanism 

[ActiveMQ](http://activemq.apache.org "The most popular and powerful open source Message Broker") [ASF](http://www.apache.org "The Apache Software Foundation")

[Using ActiveMQ 5](using-activemq-5.html) > [LDAP Broker Discovery Mechanism](ldap-broker-discovery-mechanism.html)

[Download](download.html) | [JavaDocs](http://activemq.apache.org/maven/apidocs/index.html) [More...](javadocs.html) | [Source](source.html) | [Forums](discussion-forums.html) | [Support](support.html)

Configuring network topologies can be quite tedious when the number of brokers in the system is large. To help ease the configuration overhead for these types of situations, a broker can be configured to look up its broker connections using a LDAP v3 directory server.

Note

The basic feature was added to satisfy [AMQ-358](https://issues.apache.org/activemq/browse/AMQ-358). There are known problems and limitations with this implementation. These deficiencies have been addressed in [AMQ-1587](https://issues.apache.org/activemq/browse/AMQ-1587). The features discussed on this page require the patch attached to JIRA issue [AMQ-1587](https://issues.apache.org/activemq/browse/AMQ-1587). This patch should apply cleanly to the ActiveMQ 5.0.0 release or the current development trunk.

LDAP v3 Directory Server Compliance
-----------------------------------

The following table lists a known subset of directory servers and their compliance to work with the LDAP discovery feature. Most LDAP v3 directory servers will support this feature if they properly implement the [RFC2307](http://www.ietf.org/rfc/rfc2307.txt) schemas. In order to support the persistent search capabilities the server must implement the extension defined in [draft-ietf-ldapext-psearch-03.txt](http://www.ietf.org/proceedings/01aug/I-D/draft-ietf-ldapext-psearch-03.txt).

Vendor

Product

Version

[RFC2307](http://www.ietf.org/rfc/rfc2307.txt)

[draft-ietf-ldapext-psearch-03.txt](http://www.ietf.org/proceedings/01aug/I-D/draft-ietf-ldapext-psearch-03.txt)

Apache

ApacheDS

1.0.x

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

Microsoft

Active Directory

Windows 2000  
Windows 2003

![(warning)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/warning.png)

![(error)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/error.png)

Microsoft

Active Directory

Windows 2003 R2

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

![(error)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/error.png)

Sun

OpenDS

0.9.x

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

OpenLDAP

OpenLDAP

2.3.x  
2.4.x

![(tick)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/check.png)

![(error)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/error.png)

![(warning)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/warning.png) LDAP v3 directory server which do not support [RFC2307](http://www.ietf.org/rfc/rfc2307.txt) by default. Support can be added by manually importing them. See vendor specific setup requirements on how to do this.  
![(error)](https://cwiki.apache.org/confluence/s/en_GB/5997/6f42626d00e36f53fe51440403446ca61552e2a2.1/_/images/icons/emoticons/error.png) LDAP v3 directory servers which do not support the [draft-ietf-ldapext-psearch-03.txt](http://www.ietf.org/proceedings/01aug/I-D/draft-ietf-ldapext-psearch-03.txt).

LDAP Network Connector Properties
---------------------------------

Property

Default

Required

Description

uri

null

**Yes**

The URI of the LDAP v3 Server to connect to (i.e. ldap://host:port, failover://(ldap://host1:port,ldap://host2:port).

base

null

**Yes**

The RDN base used as the root for the search criteria.

user

null

**Yes**, if not using anonymousAuthentication

The username needed to bind to the server.

password

null

**Yes**, if not using anonymousAuthentication

The password needed to bind to the server.

anonymousAuthentication

false

**Yes**, if not using user/password

Enable if you want to bind to the server anonymously. This is recommended over using user/password properties since your login credentials will not be stored in an unencrypted XML file.

searchEventListener

false

No

Enable if you want the broker to stay in sync with changes made to entries matching the search criteria.

searchScope

ONELEVEL_SCOPE

No

Can be any of search scopes defined by javax.naming.directory.SearchControls class.  
OBJECT_SCOPE - search the named object defined by base.  
ONELEVEL_SCOPE - search one level of the base.  
SUBTREE_SCOPE - search entire subtree rooted at the base.

searchFilter

(&(objectClass=ipHost)(objectClass=ipService))

No

Can be any filter that conforms to [RFC2254](http://www.ietf.org/rfc/rfc2254.txt). If a custom one is specified the actual search filter used will be (&(&(objectClass=ipHost)(objectClass=ipService))(USER CUSTOM))

Other Properties

All of the properties defined in [Networks of Brokers](http://activemq.apache.org/networks-of-brokers.html) are also available to the ldapNetworkConnector. Any of the properties defined for a normal networkConnector will be used as connection parameters to any discovered brokers matching the search criteria.

Example 1: Simple Network of Brokers
------------------------------------

### Network Configuration

Topology

LDAP v3 Directory Structure

Entry

![](ldap-broker-discovery-mechanism.data/Example1-Topology.jpg)

![](ldap-broker-discovery-mechanism.data/Example1-DirectoryStructure.jpg)

![](ldap-broker-discovery-mechanism.data/Example1-Entry.jpg)

### ActiveMQ Configuration (activemq.xml)

**srv-a.mydomain.com**

<broker brokerName="srv-a.mydomain.com" ...>
   ...

   <networkConnectors>
      <ldapNetworkConnector uri="ldap://myldap.mydomain.com:389"
                            base="dc=brokers,dc=mydomain,dc=com"
                            anonymousAuthentication="true"
                            searchFilter="(cn=*)"
                            searchScope="SUBTREE_SCOPE"
                            />
   </networkConnectors>

   ...
</broker>

**srv-b.mydomain.com**

<broker brokerName="srv-b.mydomain.com" ...>
   ...

   <networkConnectors/>
      <!\-\- NO NETWORK CONNECTORS -->
   </networkConnectors>

   ...
</broker>

Example 2: Larger Network of Brokers
------------------------------------

### Network Configuration

Topology

LDAP v3 Directory Structure

![](ldap-broker-discovery-mechanism.data/Example2-Topology.jpg)

![](ldap-broker-discovery-mechanism.data/Example2-DirectoryStructure.jpg)

### ActiveMQ Configuration (activemq.xml)

**srv-a.mydomain.com**

<broker brokerName="srv-a.mydomain.com" ...>
   ...

   <networkConnectors>
      <ldapNetworkConnector uri="ldap://myldap.mydomain.com:389"
                            base="dc=brokers-for-srv-a,dc=mydomain,dc=com"
                            anonymousAuthentication="true"
                            searchFilter="(cn=*)"
                            searchScope="SUBTREE_SCOPE"
                            networkTTL="2"
                            />
      <!\-\- networkTTL=2 since we want messages to flow from srv-a to srv-c -->
   </networkConnectors>

   ...
</broker>

**srv-b.mydomain.com**

<broker brokerName="srv-b.mydomain.com" ...>
   ...

   <networkConnectors/>
      <ldapNetworkConnector uri="ldap://myldap.mydomain.com:389"
                            base="dc=brokers-other,dc=mydomain,dc=com"
                            anonymousAuthentication="true"
                            searchFilter="(cn=*)"
                            searchScope="SUBTREE_SCOPE"
                            />
   </networkConnectors>

   ...
</broker>

**srv-c.mydomain.com**

<broker brokerName="srv-c.mydomain.com" ...>
   ...

   <networkConnectors/>
      <!\-\- NO NETWORK CONNECTORS -->
   </networkConnectors>

   ...
</broker>

**srv-d.mydomain.com**

<broker brokerName="srv-d.mydomain.com" ...>
   ...

   <networkConnectors/>
      <ldapNetworkConnector uri="ldap://myldap.mydomain.com:389"
                            base="dc=brokers-other,dc=mydomain,dc=com"
                            anonymousAuthentication="true"
                            searchFilter="(cn=*)"
                            searchScope="SUBTREE_SCOPE"
                            />
   </networkConnectors>

   ...
</broker>

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

[Privacy Policy](http://activemq.apache.org/privacy-policy.html) \- ([edit this page](https://cwiki.apache.org/confluence/pages/editpage.action?pageId=77126))

© 2004-2011 The Apache Software Foundation.  
Apache ActiveMQ, ActiveMQ, Apache, the Apache feather logo, and the Apache ActiveMQ project logo are trademarks of The Apache Software Foundation. All other marks mentioned may be trademarks or registered trademarks of their respective owners.  
[Graphic Design By Hiram](http://hiramchirino.com)

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www."); document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")); var pageTracker = \_gat.\_getTracker("UA-1347593-1"); pageTracker.\_initData(); pageTracker.\_trackPageview();