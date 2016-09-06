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
        Hello. I am a test version of the CoffeeBot.
        I can teach you a thing or two about a coffee and can provide you with some recipes.
      `
    },

    {
      label : 'chooser',
      type  : 'message',
      text  : `
        Now select a course that you would like to see.
      `
    },

    {
      type    : 'course-chooser',
      next    : 'finish',
      branch  : {
        'empty' : 'no courses',
        '404'   : '404'
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
