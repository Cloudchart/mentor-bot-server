import Immutable from 'immutable'
import Operation from '../operation'

import {
  Courses
} from '../../data'


let ShownCards = {
}


let SelectedCards = {
}


export default class extends Operation {

  static type = 'card-list';

  constructor(config) {
    super(config)

    this.tags   = config.tags
    this.course = config.course

    this.config = config
  }


  resolveMessage = async (bot, messaging, context, next) => {
    ShownCards[messaging.sender.id].push(SelectedCards[messaging.sender.id])
    SelectedCards[messaging.sender.id] = null
    next({ next: this.index })
  }


  resolve = async (bot, messaging, context, next) => {
    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    ShownCards[messaging.sender.id] || (ShownCards[messaging.sender.id] = [])

    let course = this.course.source === 'local'
      ? Courses[this.course.id]
      : null

    if (course === null || course === undefined)
      next({ next: this.branch['404'] })

    let card = course.cards.find(({ id, tags }) => {

      let having_tag = this.tags.indexOf(tags[0]) > -1
      let not_shown = ShownCards[messaging.sender.id].indexOf(id) === -1

      return having_tag && not_shown
    })

    if (card === null || card === undefined) {
      ShownCards[messaging.sender.id] = null
      SelectedCards[messaging.sender.id] = null
      return next()
    }

    SelectedCards[messaging.sender.id] = card.id

    let quick_replies = [
      {
        content_type  : 'text',
        title         : 'Skip',
        payload       : 'skip',
      }, {
        content_type  : 'text',
        title         : 'Remember',
        payload       : 'remember',
      }
    ]

    await bot.sendQuickReply(messaging.sender.id, card.content.length > 317 ? card.content.substring(0, 317) + '...' : card.content , quick_replies)

  }


}
