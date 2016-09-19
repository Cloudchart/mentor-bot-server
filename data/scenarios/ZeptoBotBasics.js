import { Scenario } from '../../scenario'


export default new Scenario({

  id  : 'zepto-bot-basics',

  operations  : [

    {
      type    : 'message',
      text    : `
            This bot will help you to avoid common mistakes when dealing with publisher. Ready? Let's go.
              `
    },

    // {
    //   label   : 'choose',
    //   type    : 'message',
    //   text    : `
    //     Do you want to see the cards to skip to quiz?
    //   `,
    //   quick_replies : ['Cards', 'Quiz']
    // },
    //
    // {
    //   type    : 'input',
    //   branch  : {
    //     'cards' : 'cards',
    //     'quiz'  : 'survey',
    //   }
    // },
    //
    // {
    //   type    : 'message',
    //   text    : `
    //     Say what?
    //   `,
    //   next    : 'choose'
    // },

    {
      label   : 'cards',
      type    : 'card-list',
      tags    : ['english'],
      course  : {
        id      : 'zepto-bot-basics',
        source  : 'local'
      },
    },

    {
      label   : 'survey',
      type    : 'message',
      text    : `
        Ok. Now let's take a small quiz.
      `
    },

    {
      type    : 'survey',
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
        Let's try again. Please go through the bot one more time, this will save you and us time down the road.
      `,
      next    : 'exit',
    },

    {
      label   : 'survey-100',
      type    : 'message',
      text    : `
        Perfect! You know what to do, so please send a message to review@zeptolab.com
      `
    }

  ]

})
