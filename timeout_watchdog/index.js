// @flow

import { Map, Set } from 'immutable'

import { r, run, Models } from '../db'

let EmptyMap          = new Map
let TimeoutCache      = new Map
let Callbacks         = new Set
let nextExecution     = Infinity
let executionTimeout  = null


const init = async () => {
  let records = await run(
    r.table('users_states').filter(record => record('bots').values().filter(bot => bot('resolve_timeout_at').ne(null)).count().gt(0))
  ).then(cursor => cursor.toArray())


  records.forEach(
    record =>
      Object.keys(record.bots).forEach(
        bot_id => {
          let resolve_timeout_at = record.bots[bot_id].resolve_timeout_at
          if (resolve_timeout_at !== null || resolve_timeout_at !== undefined)
            start(record.id, bot_id, resolve_timeout_at)
        }
      )
  )

  console.log('Timeout watchdog initialized')

  restart()
}


const on = (
  callback: Function
) =>
  Callbacks = Callbacks.add(callback)


const execute = () => {
  let now = Date.now()

  let timeouts = TimeoutCache.groupBy(
    (value, key) =>
      value <= now ? 'curr' : 'next'
  )

  TimeoutCache = timeouts.get('next', EmptyMap)

  timeouts.get('curr', EmptyMap).forEach(
    (value, key) =>
      Callbacks.forEach(
        callback =>
          callback(...key.split(':'))
      )
  )

  restart()
}


const restart = () => {
  console.log("Watchdog: restart")

  clearTimeout(executionTimeout)

  nextExecution = Infinity

  TimeoutCache.forEach(
    (value, key) => {
      nextExecution = Math.max(0, Math.min(nextExecution, value))
    }
  )

  if (nextExecution < Infinity)
    executionTimeout = setTimeout(execute, nextExecution - Date.now())
}


const start = (user_id: string, bot_id: string, delay: number) => {
  TimeoutCache = TimeoutCache.set(user_id + ':' + bot_id, delay)
  restart()
}


const stop = (user_id: string, bot_id: string) => {
  TimeoutCache = TimeoutCache.delete(user_id + ':' + bot_id)
  restart()
}


export default {
  init,
  on,
  start,
  stop,
}
