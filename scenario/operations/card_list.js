import Immutable from 'immutable'
import InputOperation from './input'

import {
  Courses
} from '../../data'

import {
  r, run,
  Models
} from '../../db'


const ensureUserState = async (bot, user) => {
  await run(
    Models.UserState.get(user.id).do(
      record =>
        r.branch(record.ne(null), null, Models.UserState.insert({ id: user.id }))
    )
  )

  return await Models.UserState.load(user.id)
}

let EmptyMap = new Immutable.Map
let EmptyList = new Immutable.List


export default class extends InputOperation {

  static type = 'card-list';

  constructor(config) {
    super(config)

    this.tags     = config.tags
    this.course   = config.course
    this.timeout  = config.timeout

    this.config = config
  }


  prepare = async (bot, user) => {
    let userState = await ensureUserState(bot, user)

    this.shown_cards    = userState.getIn(['courses', this.course.id, 'shown_cards'], EmptyList)
    this.selected_card  = userState.getIn(['courses', this.course.id, 'selected_card'], EmptyMap)
  }


  updateUserState = async (user) =>
    await run(
      Models.UserState.get(user.id).update({
        courses: {
          [this.course.id]: {
            shown_cards   : r.literal(this.shown_cards.toJS()),
            selected_card : r.literal(this.selected_card.toJS())
          }
        }
      })
    )


  resolveMessage = async (bot, messaging, context, next) => {
    await this.prepare(bot, messaging.sender)

    this.shown_cards = this.selected_card.equals(EmptyMap)
      ? EmptyList
      : this.shown_cards.push(this.selected_card)
    this.selected_card = EmptyMap

    await this.updateUserState(messaging.sender)

    next({ next: this.index })
  }


  resolveDefault = async (bot, messaging, context, next) => {
    await this.prepare(bot, messaging.sender)

    let course = this.course.source === 'local'
      ? Courses[this.course.id]
      : null

    if (course === null || course === undefined)
      next({ next: this.branch['404'] })

    let shown_cards_ids = this.shown_cards.map(card => card.get('id'))

    let card = course.cards.find(({ id, tags }) => {
      let having_tag = this.tags.indexOf(tags[0]) > -1
      let shown = shown_cards_ids.includes(id)

      return having_tag && !shown
    })

    if (card === null || card === undefined) {
      this.shown_cards = EmptyList
      this.selected_card = EmptyMap

      await this.updateUserState(messaging.sender)

      return next()
    }

    this.selected_card = new Immutable.Map({ id: card.id })

    await this.updateUserState(messaging.sender)

    for (let block of [].concat(card.blocks)) {
      if (block)
        switch (block.type) {
          case 'image':
            await bot.sendSenderAction(messaging.sender.id, 'typing_on')
            await bot.sendImage(messaging.sender.id, block.url)
            break
          case 'video':
            await bot.sendSenderAction(messaging.sender.id, 'typing_on')
            await bot.sendVideo(messaging.sender.id, block.url)
            break
        }
    }

    let quick_replies = [
      {
        content_type  : 'text',
        title         : 'Got it',
        payload       : 'got it',
      }, {
        content_type  : 'text',
        title         : 'Save',
        payload       : 'save',
      }
    ]

    let content = card.content.trim().replace(/\n\s+/g, '\n')

    await bot.sendQuickReply(messaging.sender.id, content.length > 317 ? content.substring(0, 317) + '...' : content , quick_replies)

  }


}
