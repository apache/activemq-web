 ActiveMQ - Source Repository     

ActiveMQ

* * *

Last Published: 2012-10-05  | Version: 5.7.0

[ActiveMQ](./ "ActiveMQ")

* * *

##### Modules

*   [ActiveMQ :: All JAR bundle](activemq-all/index.html "ActiveMQ :: All JAR bundle")
*   [ActiveMQ :: Camel](activemq-camel/index.html "ActiveMQ :: Camel")
*   [ActiveMQ :: Console](activemq-console/index.html "ActiveMQ :: Console")
*   [ActiveMQ :: Core](activemq-core/index.html "ActiveMQ :: Core")
*   [ActiveMQ :: File Server](activemq-fileserver/index.html "ActiveMQ :: File Server")
*   [ActiveMQ :: JAAS](activemq-jaas/index.html "ActiveMQ :: JAAS")
*   [ActiveMQ :: Blueprint](activemq-blueprint/index.html "ActiveMQ :: Blueprint")
*   [ActiveMQ :: Apache Karaf](activemq-karaf/index.html "ActiveMQ :: Apache Karaf")
*   [ActiveMQ :: LevelDB](activemq-leveldb/index.html "ActiveMQ :: LevelDB")
*   [ActiveMQ :: Openwire Generator](activemq-openwire-generator/index.html "ActiveMQ :: Openwire Generator")
*   [ActiveMQ :: Optional](activemq-optional/index.html "ActiveMQ :: Optional")
*   [ActiveMQ :: Pool](activemq-pool/index.html "ActiveMQ :: Pool")
*   [ActiveMQ :: RA](activemq-ra/index.html "ActiveMQ :: RA")
*   [ActiveMQ :: RAR](activemq-rar/index.html "ActiveMQ :: RAR")
*   [ActiveMQ :: Run Jar](activemq-run/index.html "ActiveMQ :: Run Jar")
*   [ActiveMQ :: Spring](activemq-spring/index.html "ActiveMQ :: Spring")
*   [ActiveMQ :: Tooling](activemq-tooling/index.html "ActiveMQ :: Tooling")
*   [ActiveMQ :: Web](activemq-web/index.html "ActiveMQ :: Web")
*   [ActiveMQ :: Web Demo](activemq-web-demo/index.html "ActiveMQ :: Web Demo")
*   [ActiveMQ :: Web Console](activemq-web-console/index.html "ActiveMQ :: Web Console")
*   [ActiveMQ :: XMPP](activemq-xmpp/index.html "ActiveMQ :: XMPP")
*   [ActiveMQ :: Integration Tests](tests/index.html "ActiveMQ :: Integration Tests")
*   [ActiveMQ :: Assembly](apache-activemq/index.html "ActiveMQ :: Assembly")
*   [ActiveMQ :: KahaDB](kahadb/index.html "ActiveMQ :: KahaDB")

##### Project Documentation

*   [Project Information](project-info.html "Project Information")
    *   [About](index.html "About")
    *   [Project Summary](project-summary.html "Project Summary")
    *   [Project Modules](modules.html "Project Modules")
    *   [Project License](license.html "Project License")
    *   [Project Team](team-list.html "Project Team")
    *   **Source Repository**
    *   [Issue Tracking](issue-tracking.html "Issue Tracking")
    *   [Mailing Lists](mail-lists.html "Mailing Lists")
    *   [Dependency Management](dependency-management.html "Dependency Management")
    *   [Dependencies](dependencies.html "Dependencies")
    *   [Dependency Convergence](dependency-convergence.html "Dependency Convergence")
    *   [Continuous Integration](integration.html "Continuous Integration")
    *   [Plugin Management](plugin-management.html "Plugin Management")
    *   [Project Plugins](plugins.html "Project Plugins")
    *   [Distribution Management](distribution-management.html "Distribution Management")
*   [Project Reports](project-reports.html "Project Reports")

 [![Built by Maven](./images/logos/maven-feather.png)](http://maven.apache.org/ "Built by Maven") 

Overview
--------

This project uses [Subversion](http://subversion.apache.org/) to manage its source code. Instructions on Subversion use can be found at [http://svnbook.red-bean.com/](http://svnbook.red-bean.com/).

Web Access
----------

The following is a link to the online source repository.

[http://svn.apache.org/viewvc/activemq/tags/activemq-5.7.0](http://svn.apache.org/viewvc/activemq/tags/activemq-5.7.0)

Anonymous access
----------------

The source can be checked out anonymously from SVN with this command:

$ svn checkout https://svn.apache.org/repos/asf/activemq/tags/activemq-5.7.0 activemq-parent

Developer access
----------------

Everyone can access the Subversion repository via HTTP, but Committers must checkout the Subversion repository via HTTPS.

$ svn checkout https://svn.apache.org/repos/asf/activemq/tags/activemq-5.7.0 activemq-parent

To commit changes to the repository, execute the following command to commit your changes (svn will prompt you for your password)

$ svn commit --username your-username -m "A message"

Access from behind a firewall
-----------------------------

For those users who are stuck behind a corporate firewall which is blocking HTTP access to the Subversion repository, you can try to access it via the developer connection:

$ svn checkout https://svn.apache.org/repos/asf/activemq/tags/activemq-5.7.0 activemq-parent

Access through a proxy
----------------------

The Subversion client can go through a proxy, if you configure it to do so. First, edit your "servers" configuration file to indicate which proxy to use. The file's location depends on your operating system. On Linux or Unix it is located in the directory "~/.subversion". On Windows it is in "%APPDATA%\\Subversion". (Try "echo %APPDATA%", note this is a hidden directory.)

There are comments in the file explaining what to do. If you don't have that file, get the latest Subversion client and run any command; this will cause the configuration directory and template files to be created.

Example: Edit the 'servers' file and add something like:

\[global\]
http-proxy-host = your.proxy.name
http-proxy-port = 3128

