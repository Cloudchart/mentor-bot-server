import Operation from '../operation'


const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })


export default class extends Operation {

  static type = 'message';

  constructor(config) {
    super(config)

    this.text           = config.text
    this.quick_replies  = config.quick_replies

    this.config         = config
  }


  resolve = async (bot, messaging, context, next) => {
    await bot.sendSenderAction(messaging.sender.id, 'typing_on')

    let quick_replies = (Array.isArray(this.quick_replies) && this.quick_replies || []).map(title => ({
      content_type  : 'text',
      title         : title,
      payload       : title.toLowerCase()
    }))

    let text = this.text.trim().replace(/\n\s+/g, '\n')

    if (quick_replies.length > 0)
      await bot.sendQuickReply(messaging.sender.id, text, quick_replies)
    else
      await bot.sendTextMessage(messaging.sender.id, text)

    next()
  }


}
