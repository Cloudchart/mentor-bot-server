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
  ).catch(console.error)

  return Immutable.fromJS(await Models.UserState.load(user.id))
}

let EmptyMap = new Immutable.Map
let EmptyList = new Immutable.List


const DEFAULTS = {
  skip_button_label : `Got it`,
  save_button_label : `Save`,
  skip_button_hint  : `Ok, since this makes sense, let's continue.`,
  save_button_hint  : `This card is now saved. All saved cards are available in the menu.`
}

export default class extends InputOperation {

  static type = 'card-list';

  constructor(config) {
    super(config)

    this.tags     = config.tags
    this.course   = config.course
    this.timeout  = config.timeout

    this.skip_button_label = config.skip_button_label || DEFAULTS.skip_button_label
    this.save_button_label = config.save_button_label || DEFAULTS.save_button_label

    this.skip_button_hint = config.skip_button_hint || DEFAULTS.skip_button_hint
    this.save_button_hint = config.save_button_hint || DEFAULTS.save_button_hint

    this.config = config
  }


  prepare = async (bot, user) => {
    let userState = await ensureUserState(bot, user)

    this.shown_hints    = userState.getIn(['shown_hints'], EmptyList)
    this.shown_cards    = userState.getIn(['courses', this.course.id, 'shown_cards'], EmptyList)
    this.saved_cards    = userState.getIn(['courses', this.course.id, 'saved_cards'], EmptyList)
    this.selected_card  = userState.getIn(['courses', this.course.id, 'selected_card'], EmptyMap)
  }


  updateUserState = async (user) =>
    await run(
      Models.UserState.get(user.id).update({
        shown_hints : r.literal(this.shown_hints.toJS()),
        courses     : {
          [this.course.id]: {
            shown_cards   : r.literal(this.shown_cards.toJS()),
            saved_cards   : r.literal(this.saved_cards.toJS()),
            selected_card : r.literal(this.selected_card.toJS())
          }
        }
      })
    )


  getAnswer = (message) => {
    if (message.quick_reply !== null && message.quick_reply !== undefined)
      return message.quick_reply.payload

    let query = message.text.trim().toLowerCase()

    if (query === this.skip_button_label.toLowerCase())
      return 'skip'

    if (query === this.save_button_label.toLowerCase())
      return 'save'

    return false
  }


  sendSaveHint = (bot, user) =>
    bot.sendTextMessage(user.id, this.save_button_hint)


  sendSkipHint = (bot, user) =>
    bot.sendTextMessage(user.id, this.skip_button_hint)


  resolveMessage = async (bot, messaging, context, next) => {
    await this.prepare(bot, messaging.sender)

    this.shown_cards = this.selected_card.equals(EmptyMap)
      ? EmptyList
      : this.shown_cards.push(this.selected_card)

    let answer = this.getAnswer(messaging.message)

    if (!answer)
      return next({ next: this.index })

    if (answer === 'save' && !this.shown_hints.contains('card_save')) {
      await this.sendSaveHint(bot, messaging.sender)
      this.shown_hints = this.shown_hints.push('card_save')
    }

    if (answer === 'skip' && !this.shown_hints.contains('card_skip')) {
      await this.sendSkipHint(bot, messaging.sender)
      this.shown_hints = this.shown_hints.push('card_skip')
    }

    if (answer === 'save') {
      if (!this.saved_cards.find(card => card.get('id') === this.selected_card.get('id')))
        this.saved_cards = this.saved_cards.push(this.selected_card)
    }

    this.selected_card = EmptyMap

    await this.updateUserState(messaging.sender)

    return next({ next: this.index })
  }


  resolveDefault = async (bot, messaging, context, next) => {
    await this.prepare(bot, messaging.sender)

    let course = this.course.source === 'local'
      ? Courses[this.course.id]
      : null

    if (course === null || course === undefined)
      return next({ next: this.branch['404'] })

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
        title         : this.skip_button_label,
        payload       : 'skip',
      }, {
        content_type  : 'text',
        title         : this.save_button_label,
        payload       : 'save',
      }
    ]

    let content = card.content.trim().replace(/\n\s+/g, '\n')

    while (content.length > 320) {
      let first = content.substr(0, 320)
      first = first.substr(0, Math.min(first.length, first.lastIndexOf(' ')))
      content = content.substr(first.length)
      await bot.sendTextMessage(messaging.sender.id, first)
    }

    await bot.sendQuickReply(messaging.sender.id, content.trim(), quick_replies)

  }


}
