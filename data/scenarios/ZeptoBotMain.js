import { Scenario } from '../../scenario'


export default new Scenario({

  id: 'zepto-bot-main',

  operations: [

    {
      type  : 'message',
      text  : `
        Hello. I am a test version of the Zepto Publishing Bot.
        You should pass through me if you want to get your game published.
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
      label   : 'course-chooser',
      type    : 'course-chooser',
      next    : 'finish',
      branch  : {
        'empty' : 'no courses',
        '404'   : '404'
      },
      // timeout : {
      //   delay : 60 * 1000,
      //   next  : 'delay'
      // }
    },

    {
      label   : '404',
      type    : 'message',
      text    : `
        Say what?
      `,
      next    : 'course-chooser'
    },

    {
      label   : 'finish',
      type    : 'message',
      text    : `
        Ok, you've finished this course.
      `,
      next    : 'chooser'
    },

    {
      label   : 'delay',
      type    : 'message',
      text    : `
        I'm still waiting for you.
      `,
      next    : 'course-chooser'
    },

    {
      label   : 'no courses',
      type    : 'message',
      text    : `
        This bot has no courses yet.
      `
    }

  ]

})
