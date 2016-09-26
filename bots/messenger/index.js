import { r, run, Models } from '../../db'
import Bot from './bot'


const KnownMessagingTypes = ['message', 'delivery', 'read', 'postback']

let callbacks = {}


const ensureUser = async (bot, user_id) => {
  let global_id = 'messenger:' + user_id
  let user = await Models.User.load(global_id).catch(error => null)

  if (user === null) {
    Models.User.clear(global_id)

    let profile = await bot.getUserProfile(user_id)
    await run(
      Models.User.insert({
        ...profile,
        id: global_id
      })
    )

    user = await Models.User.load(global_id)
  }

  return user
}


const handleUpdate = ({ new_val, old_val }) => {
  let { messaging, ...attributes } = new_val

  const bot = new Bot(attributes)

  messaging.forEach(async messaging => {
    let messagingType = KnownMessagingTypes.find(name => messaging.hasOwnProperty(name))

    console.log(JSON.stringify(messaging, null, 2))

    if (!messagingType)
      console.error(`Unrecognizable messaging: ${JSON.stringify(messaging, null, 2)}`)

    if (messaging.message && messaging.message.is_echo === true)
      return

    let user = await ensureUser(bot, messaging.sender.id)

    callbacks[messagingType] && callbacks[messagingType].forEach(callback => callback({ bot, messaging }))
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
  start
}
