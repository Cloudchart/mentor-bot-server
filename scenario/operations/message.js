import GA from '../../google'
import Operation from '../operation'


const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })


export default class extends Operation {

  static type = 'message';

  constructor(config) {
    super(config)

    this.config = config

    this.resolveText()
    this.resolveQuickReplies()
  }


  resolveText = () =>
    this.text = (this.config.text || '').trim().replace(/\n\s+/g, '\n')


  resolveQuickReplies = () =>
    this.quick_replies = (Array.isArray(this.config.quick_replies) ? this.config.quick_replies : [])
      .map(quick_reply => ({
        title         : quick_reply,
        payload       : quick_reply.toLowerCase(),
        content_type  : 'text',
      }))


  resolve = async (bot, messaging, context, next) => {
    await bot.sendSenderAction(messaging.sender.id, 'typing_on')

    let message = this.text.trim()

    await GA.collect_event({
      user      : messaging.sender.id,
      category  : 'message',
      action    : 'message-show',
      label     :  message
    })

    if (this.quick_replies.length > 0) {
      await GA.collect_event({
        user      : messaging.sender.id,
        category  : 'message',
        action    : 'message-buttons-show',
        label     :  this.quick_replies.map(({ title }) => title).join(',')
      })

      await bot.sendQuickReply(messaging.sender.id, this.text, this.quick_replies)
    }

    if (this.quick_replies.length === 0) {
      await bot.sendTextMessage(messaging.sender.id, this.text)
    }

    next()
  }


}
