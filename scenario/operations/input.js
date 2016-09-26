import GA from '../../google'
import Operation from '../operation'


export default class extends Operation {

  static type = 'input'

  constructor(config) {
    super(config)

    this.timeout  = config.timeout

    // this.config   = config
  }


  resolveSideEffect = async (bot, messaging, context, branch) => {
    // noop
  }


  resolveTimeout = async (bot, messaging, context, next) => {
    let step = this.next

    if (this.timeout && this.timeout.hasOwnProperty('next'))
      step = this.timeout.next

      await GA.collect_event({
        user        : messaging.sender.id,
        category    : 'input',
        action      : 'input-timeout',
        label       : step || 'next',
      })

    return next({ next: step })
  }


  resolveMessage = async (bot, messaging, context, next) => {
    let query = messaging.message.quick_reply
      ? messaging.message.quick_reply.payload.trim().toLowerCase()
      : messaging.message.text.trim().toLowerCase()

    let branch = this.branch.hasOwnProperty(query)
      ? this.branch[query]
      : null

    await this.resolveSideEffect(bot, messaging, context, branch)

    await GA.collect_event({
      user        : messaging.sender.id,
      category    : 'input',
      action      : 'input-select',
      label       : query,
    })

    if (branch)
      await GA.collect_event({
        user        : messaging.sender.id,
        category    : 'input',
        action      : 'input-goto',
        label       : this.scenario.id + ':' + Object.keys(this.scenario.labels).find(key => this.scenario.labels[key] === branch),
      })

    return next({ next: branch })
  }


  resolvePostback = async (bot, messaging, context, next) => {
    return next()
  }

  resolvePostbackWithMenu = async (bot, messaging, context, next) => {
    switch (messaging.postback.payload) {
      case 'RESTART':
        return next({ restart: true })
      case 'SAVED CARDS':
        await bot.sendTextMessage(messaging.sender.id, `Not implemented.`)
        return
    }

    return this.resolvePostback(bot, messaging, context, next)
  }


  resolveDefault = async (bot, messaging, context, next) => {
    // noop
    return
  }


  resolve = async (bot, messaging, context, next) => {
    if (messaging.timeout)
      return this.resolveTimeout(bot, messaging, context, next)

    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    if (messaging.postback)
      return this.resolvePostbackWithMenu(bot, messaging, context, next)

    return this.resolveDefault(bot, messaging, context, next)
  }


}
