import Immutable from 'immutable'

import {
  Scenarios
} from '../data'

import {
  r,
  run,
  Models
} from '../db'


const EmptyMap = new Immutable.Map


const ensureScenarioState = async (bot, user) => {
  let createQuery = Models.UserState.insert({
    id    : user.id,
    bots  : {
      [bot.get('id')] : {
        scenario: bot.get('scenario', EmptyMap).toJS()
      }
    }
  })

  let selectQuery = Models.UserState.get(user.id)('bots')(bot.get('id'))('scenario')

  let scenarioState = await run(
    Models.UserState.get(user.id).do(
      record =>
        r.branch(
          record.eq(null),
          createQuery.do(result => selectQuery),
          selectQuery
        )
    )
  )

  return scenarioState
}


const saveScenarioState = async (bot, user, state) =>
  run(
    Models.UserState.get(user.id).update({
      bots: {
        [bot.get('id')] : {
          scenario      : r.literal(state)
        }
      }
    })
  )


const ensureScenario = async (bot, user) => {
  let state = await ensureScenarioState(bot, user)

  // if descriptor or descriptor.id is null or undefined check for bot descriptor

  let scenario = await state.source === 'local'
    ? Scenarios[state.id]
    : null

  if (scenario === null || scenario === undefined)
    return await bot.sendTextMessage(user.id, `This bot can't find its scenario 😱`)

  return {
    scenario,
    state
  }
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

  let { scenario, state } = await ensureScenario(bot, messaging.sender)

  if (scenario === null || scenario === undefined)
    return

  try {
    let payload = await scenario.resolve(bot, messaging, { ...state })

    await saveScenarioState(bot, messaging.sender, payload.context)

    if (payload.should_continue)
      await resolve({ bot, messaging: { sender: messaging.sender, ...payload.messaging } })
  } catch(error) {
    console.error(error)
  }
}


export default {
  resolve
}
