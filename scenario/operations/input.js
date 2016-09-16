import Operation from '../operation'


export default class extends Operation {

  static type = 'input'

  constructor(config) {
    super(config)

    this.timeout  = config.timeout

    this.config   = config
  }


  resolveSideEffect = async (bot, messaging, context, branch) => {
    // noop
  }


  resolveTimeout = async (bot, messaging, context, next) => {
    let step = this.next

    if (this.timeout && this.timeout.hasOwnProperty('next'))
      step = this.timeout.next

    next({ next: step })
  }


  resolveMessage = async (bot, messaging, context, next) => {
    let query = messaging.message.quick_reply
      ? messaging.message.quick_reply.payload.trim().toLowerCase()
      : messaging.message.text.trim().toLowerCase()

    let branch = this.branch.hasOwnProperty(query)
      ? this.branch[query]
      : null

    await this.resolveSideEffect(bot, messaging, context, branch)

    next({ next: branch })
  }


  resolvePostback = async (bot, messaging, context, next) => {
    next()
  }


  resolveDefault = async (bot, messaging, context, next) => {
    // noop
  }


  resolve = async (bot, messaging, context, next) => {
    if (messaging.timeout)
      return this.resolveTimeout(bot, messaging, context, next)

    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    if (messaging.postback)
      return this.resolvePostback(bot, messaging, context, next)

    this.resolveDefault(bot, messaging, context, next)
  }


}
