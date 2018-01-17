Apache ActiveMQ ™ -- Can I modify messages on a queue 

[Community](community.md) > [FAQ](CommunityCommunity/Community/faq.md) > [JMS](Community/FAQCommunity/FAQ/Community/FAQ/jms.md) > [Can I modify messages on a queue](Community/FAQ/JMSCommunity/FAQ/JMS/Community/FAQ/JMS/can-i-modify-messages-on-a-queue.md)


Can I modify messages on a queue?
---------------------------------

The short answer is no. In JMS messages are immutable once they have been sent. If you find you need to modify messages its recommended that you create a consumer with some selector which matches the messages you wish to update, consume them and send new modified messages, either to another queue or if you are careful, back to the original queue. (If you are using the same queue, be careful not to get into a loop where your selector matches messages you are sending yourself - you may wish to use some JMS header to avoid this loop).

