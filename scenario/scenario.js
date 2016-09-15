// @flow

import Operation from './operation'
import Operations from './operations'

import type { BotType } from '../bots'

type MessagingType = {
  sender      : {
    id        : string
  }
}

type ContextType = {
  parent      : ContextType,
  next        : number
}

type ScenarioConfig = {
  id          : string,
  operations  : Array<any>,
  config      : any
}


class Scenario {

  id          : string
  operations  : Array<any>
  config      : any
  valid       : boolean

  constructor({ id, operations, ...config} : ScenarioConfig) {
    this.id         = id
    this.operations = operations
    this.config     = config

    this.instantiateOperations()
    this.resolveLabels()
  }

  instantiateOperations = () => {
    let valid = true

    let operations = this.operations.map(operationConfig => {
      if (operationConfig instanceof Operation)
        return operationConfig

      let { type, ...attributes } = operationConfig

      if (Operations[type])
        return new Operations[type](attributes)

      valid = false
    })

    this.valid      = valid
    this.operations = operations
  }

  resolveLabels = () => {
    let labels = this.operations.reduce((memo, operation, ii) => {
      operation.index = ii

      if (operation.label)
        memo[operation.label] = operation.index

      return memo
    }, {})

    this.operations.forEach(operation => {
      if (operation.next === null || operation.next === undefined) {
        operation.next = operation.index + 1
      } else {
        let label = labels[operation.next]
        if (label === null || label === undefined) {
          operation.next = -1
        } else {
          operation.next = label
        }
      }

      if (operation.timeout) {
        operation.timeout = {
          ...operation.timeout,
          next : labels[operation.timeout.next]
        }
      }

      if (operation.branch) {
        operation.branch = Object.keys(operation.branch).reduce((memo, name) => {
          let label = labels[operation.branch[name]]
          if (label === null || label === undefined) {
            memo[name] = -1
          } else {
            memo[name] = label
          }
          return memo
        }, {})
      }
    })
  }


  resolveOperation = async (
    operation : Operation,
    bot       : BotType,
    messaging : MessagingType,
    context   : ContextType
  ) => {
    let scenario        = null
    let next_step       = null
    let next_messaging  = null
    let should_continue = false

    const next = (payload = {}) => {
      scenario        = payload.scenario
      next_step       = payload.next
      next_messaging  = payload.messaging
      should_continue = true
    }

    await operation.resolve(bot, messaging, context, next)

    return {
      next            : next_step,
      scenario        : scenario,
      messaging       : next_messaging,
      should_continue : should_continue,
    }
  }


  resolve = async (bot: BotType, messaging: MessagingType, context: ContextType, next: Function) => {
    console.log('Resolving scenario', this.id)

    let operation_index = context.next || 0
    let operation       = this.operations[operation_index]

    // Return up one level or start from the beginning
    if (context.next === -1 || operation === null || operation === undefined) {
      let parent_context = context.parent
      if (parent_context === null || parent_context === undefined)
        parent_context = { ...context, next: 0 }

      return {
        should_continue : true,
        context         : parent_context,
      }
    }

    let next_context    = { ...context }
    let payload         = await this.resolveOperation(operation, bot, messaging, context)

    if (payload.should_continue)
      next_context.next = payload.next === null || payload.next === undefined ? operation.next : payload.next

    if (payload.scenario)
      next_context = { ...payload.scenario, parent: next_context }

    return {
      context         : next_context,
      messaging       : payload.messaging,
      should_continue : payload.should_continue,
    }

  }


}


export default Scenario
