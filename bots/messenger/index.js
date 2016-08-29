import { r, run } from '../../db'
import Bot from './bot'


let callbacks = {}


const handleUpdate = ({ new_val, old_val }) => {
  let { messaging, ...attributes } = new_val

  const bot = new Bot(attributes)

  messaging.forEach(messaging => {
    console.log(messaging)
    if (messaging.message) {
      callbacks['message'] && callbacks['message'].forEach(callback => callback({ bot, messaging }))
    }
  })

  run(r.table('bots').get(new_val.id).replace(bot => bot.without('messaging')))
}


const start = () => {
  run(
    r.table('bots').filter({ type: 'messenger' }).changes({ includeInitial: true }).filter(r.row('new_val')('messaging').ne(null))
  ).then(cursor => cursor.each((error, record) => handleUpdate(record) ))
}


const on = (event, callback) => {
  callbacks[event] || (callbacks[event] = [])
  if (callbacks[event].indexOf(callback) === -1)
    callbacks[event].push(callback)
}


export default {
  on,
  start,
}
