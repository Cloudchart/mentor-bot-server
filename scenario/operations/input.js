import Operation from '../operation'

export default class extends Operation {

  static type = 'input'

  constructor(config) {
    super(config)
    this.config = config
  }


  resolveMessage = async (bot, messaging, context, next) => {
    let query = messaging.message.quick_reply
      ? messaging.message.quick_reply.payload.trim().toLowerCase()
      : messaging.message.text.trim().toLowerCase()

    if (this.branch.hasOwnProperty(query))
      return next({ next: this.branch[query] })

    next()
  }


  resolvePostback = async (bot, messaging, context, next) => {
    next()
  }


  resolve = async (bot, messaging, context, next) => {
    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    if (messaging.postback)
      return this.resolvePostback(bot, messaging, context, next)
  }


}
