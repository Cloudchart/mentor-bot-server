import { Scenario } from '../../scenario'


export default new Scenario({

  id  : 'zepto-bot-basics',

  operations  : [

    {
      type    : 'message',
      text    : `
        This is a basic publishing course by Zeptolab.
      `
    },

    {
      label   : 'choose',
      type    : 'message',
      text    : `
        Do you want to see the cards to skip to quiz?
      `,
      quick_replies : ['Cards', 'Quiz']
    },

    {
      type    : 'input',
      branch  : {
        'cards' : 'cards',
        'quiz'  : 'survey',
      }
    },

    {
      type    : 'message',
      text    : `
        Say what?
      `,
      next    : 'choose'
    },

    {
      label   : 'cards',
      type    : 'card-list',
      tags    : ['english'],
      course  : {
        id      : 'zepto-bot-basics',
        source  : 'local'
      },
      next    : 'exit'
    },

    {
      label   : 'survey',
      type    : 'survey',
      next    : 'exit',
      survey  : {
        id      : 'zepto-survey',
        source  : 'local',
      },
      branch  : {
        '100' : 'survey-100',
      }
    },

    {
      type    : 'message',
      text    : `
        Let's try again.
      `,
      next    : 'exit',
    },

    {
      label   : 'survey-100',
      type    : 'message',
      text    : `
        Send a message to review@zeptolab.com.
      `
    }

  ]

})
