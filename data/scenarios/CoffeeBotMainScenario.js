import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-main',

  operations: [

    {
      type  : 'message',
      text  : `
        This Coffeebot is powered by Mentorbot. Find more mentorbots and create your own at getmentorbot.com
      `
    },

    {
      type  : 'message',
      text  : `
        I can teach you how to buy, grind and brew coffee and give you a couble of recipes.
      `
    },

    {
      label : 'chooser',
      type  : 'message',
      text  : `
        Now select a course.
      `
    },

    {
      label   : 'course-chooser',
      type    : 'course-chooser',
      next    : 'finish',
      branch  : {
        'empty' : 'no courses',
        '404'   : '404'
      },
      timeout : {
        delay : 60 * 60 * 1000,
        next  : 'course-chooser-delay'
      }
    },

    {
      type  : 'message',
      label : '404',
      next  : 'chooser',
      text  : `
        I don't get it.
      `
    },

    {
      label : 'course-chooser-delay',
      type  : 'message',
      text  : `
        Do you want to continue or just exit?
      `,
      quick_replies: ['Quit', 'Continue']
    },

    {
      type      : 'input',
      branch    : {
        'quit'      : 'exit',
        'continue'  : 'course-chooser',
      }
    },

    {
      type  : 'message',
      label : 'finish',
      next  : 'chooser',
      text  : `
        Ok, you've finished this course.
      `
    },

    {
      type  : 'message',
      label : 'no courses',
      text  : `
        This bot has no courses yes.
      `
    }

  ]

})
