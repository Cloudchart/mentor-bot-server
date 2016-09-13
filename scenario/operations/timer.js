// @flow

import Operation from '../operation'


type OperationConfig = {
  label   : ?string,
  next    : ?string,
  timers  : Array<TimerConfig>
}


type TimerConfig = {
  duration  : number,
  label     : ?string,
  action    : ?string,
}


export default class extends Operation {

  static type = 'timer';

  constructor(config : OperationConfig) {
    super(config)

    this.timers = this.instantiateTimers(config.timers)

    this.config = config
  }


  instantiateTimers(timers: Array<TimerConfig>) {

  }


  async resolveTimer(
    bot       : any,
    messaging : any,
    context   : any
  ) {
    console.log(context)
  }


  async resolve(
    bot       : any,
    messaging : any,
    context   : any,
    next      : Function
  ) {
    await this.resolveTimer(bot, messaging, context)
    next()
  }


}
