import { Scenario } from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-main-en',

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
      label : 'chooser-intro',
      type  : 'message',
      text  : `Now select a course.`
    },

    {
      label   : 'course-chooser',
      type    : 'course-chooser',
      branch  : {
        '404' : '404'
      },
      timeout : {
        delay : 60 * 60 * 1000,
        next  : 'course-chooser-delay'
      },
      next    : 'finish',
    },

    {
      label : '404',
      type  : 'message',
      text  : `Say what?`,
      next  : 'chooser',
    },

    {
      label         : 'course-chooser-delay',
      type          : 'message',
      text          : `Do you want to continue or quit?`,
      quick_replies : ['Quit', 'Continue']
    },

    {
      type      : 'input',
      branch    : {
        'Quit'      : 'exit',
        'Continue'  : 'course-chooser',
      }
    },

    {
      type  : 'message',
      label : 'finish',
      next  : 'chooser-intro',
      text  : `Ok, you finished this course.`
    },

  ]

})
