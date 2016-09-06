import Operation from '../operation'


const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })


export default class extends Operation {

  static type = 'image';

  constructor(config) {
    super(config)

    this.url    = config.url

    this.config = config
  }


  resolve = async (bot, messaging, context, next) => {
    await bot.sendSenderAction(messaging.sender.id, 'typing_on')

    await bot.sendImage(messaging.sender.id, this.url)

    next()
  }


}
