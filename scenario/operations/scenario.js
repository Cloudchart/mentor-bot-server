import Operation from '../operation'


const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })


export default class extends Operation {

  static type = 'scenario';

  constructor(config) {
    super(config)

    this.scenario_id  = config.scenario_id
    this.source       = config.source
    this.attributes   = config.attributes

    this.config       = config
  }


  resolve = async (bot, messaging, context, next) => {
    next({
      scenario  : {
        id          : this.scenario_id,
        source      : this.source,
        attributes  : typeof this.attributes === 'function' ? await this.attributes(bot, messaging) : this.attributes,
        next        : 0,
      }
    })
  }


}
