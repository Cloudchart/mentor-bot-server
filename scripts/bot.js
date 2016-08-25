import {
  Messenger
} from '../bots'


Messenger.on('message', ({ bot, messaging: { sender, message } }) => {
  if (!message.is_echo)
    bot.sendTextMessage(sender.id, 'Message received.')
})


Messenger.start()
