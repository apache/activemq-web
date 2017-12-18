Apache ActiveMQ ™ -- MasterSlave 

[Features](features.html) > [Clustering](clustering.html) > [MasterSlave](masterslave.html)


Introduction to Master / Slave
------------------------------

The following are the different kinds of Master/Slave configurations available:

Master Slave Type

Requirements

Pros

Cons

[Shared File System Master Slave](shared-file-system-master-slave.html)

A shared file system such as a SAN

Run as many slaves as required. Automatic recovery of old masters

Requires shared file system

[JDBC Master Slave](jdbc-master-slave.html)

A Shared database

Run as many slaves as required. Automatic recovery of old masters

Requires a shared database. Also relatively slow as it cannot use the high performance journal

[Replicated LevelDB Store](replicated-leveldb-store.html)

ZooKeeper Server

Run as many slaves as required. Automatic recovery of old masters. Very fast.

Requires a ZooKeeper server.

If you are using a shared network file system such as a SAN we recommend a [Shared File System Master Slave](shared-file-system-master-slave.html). If you are happy to dispense with the high performance journal and are using pure JDBC as your persistence engine then you should use [JDBC Master Slave](jdbc-master-slave.html) instead. For those willing to try out new tech, the [Replicated LevelDB Store](replicated-leveldb-store.html) gives speeds similar to a SAN solution without the hassle of having to setup a highly available shared file system.

