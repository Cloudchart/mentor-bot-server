import Immutable from 'immutable'

import {
  Scenarios
} from '../data'


const EmptyMap = new Immutable.Map


let Storage = {

}


const getScenario = async (storage_key, bot, messaging) => {
  let scenarioDescriptor = Storage[storage_key]

  if (scenarioDescriptor === null || scenarioDescriptor === undefined)
    scenarioDescriptor = bot.attributes.get('scenario')

  if (scenarioDescriptor === null || scenarioDescriptor === undefined) {
    await bot.sendTextMessage(messaging.sender.id, `This bot doesn't have a scenario yet 😱`)
    return null
  }

  scenarioDescriptor = scenarioDescriptor.toJS && scenarioDescriptor.toJS() || scenarioDescriptor

  let scenario = scenarioDescriptor.source === 'local'
    ? Scenarios[scenarioDescriptor.id]
    : null

  if (scenario === null || scenario === undefined) {
    await bot.sendTextMessage(messaging.sender.id, `This bot can't find its scenario 😱`)
    return
  }

  Storage[storage_key] = scenarioDescriptor
  return scenario
}


const resolve = async ({ bot, messaging }) => {
  // check if message is echo
  if (messaging.message && messaging.message.is_echo === true)
    return

  let storage_key = bot.id + ':' + messaging.sender.id

  // Find bot scenario
  let scenario = await getScenario(storage_key, bot, messaging).catch(console.error)

  // Return if no scenario found
  if (scenario === null || scenario === undefined)
    return


  let payload = await scenario.resolve(bot, messaging, { ...Storage[storage_key] })

  Storage[storage_key] = payload.context

  if (payload.should_continue)
    await resolve({ bot, messaging: { sender: messaging.sender, ...payload.messaging } })
}


export default {
  resolve
}
