Apache ActiveMQ ™ -- What happens when the journal size is exceeded 

[Community](community.html) > [FAQ](faq.html) > [Persistence Questions](persistence-questions.html) > [What happens when the journal size is exceeded](what-happens-when-the-journal-size-is-exceeded.html)


If the "preferred" size is exceeded then the last log files keeps growing until the first log files can be overwritten. When a log file is overwritten, it's size is reset to the "preferred" size.

