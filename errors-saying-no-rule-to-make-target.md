Apache ActiveMQ ™ -- Errors saying "no rule to make target" 

[Index](index.html) > [Community](community.html) > [FAQ](faq.html) > [Building FAQs](building-faqs.html) > [Solaris Platform](solaris-platform.html) > [Errors saying "no rule to make target"](errors-saying-no-rule-to-make-target.html)

If you get errors when building on solaris that indicate that there is no rule to make a target file one thing to check is if the file is really in your build tree. If you extracted the source archive with the sun Tar command then you may be missing files. Sun uses an old version of Tar that doesn't work well with the archives that we create using new versions of GNU Tar. If you don't have GNU Tar installed then another work around is to grab the .zip file and use the gunzip command to extract it.

