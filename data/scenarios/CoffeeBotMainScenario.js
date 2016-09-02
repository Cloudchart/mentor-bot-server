import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-main',

  operations: [
    new Operations['message']({
      text  : `
        Hello. I am a test version of the CoffeeBot.
        I can teach you a thing or two about a coffee and can provide you with some recipes.
      `
    }),

    new Operations['message']({
      label : 'chooser',
      text  : `
        Now select a course that you would like to see.
      `
    }),

    new Operations['course-chooser']({
      branch: {
        'empty'     : 'no-courses',
        '404'       : '404',
      },
      next  : 'finish'
    }),

    new Operations['message']({
      label : '404',
      text  : `I don't get it.`,
      next  : 'chooser',
    }),

    new Operations['message']({
      label : 'finish',
      text  : `Ok, you've finished this course.`,
      next  : 'chooser',
    }),

    new Operations['message']({
      label : 'no-courses',
      text  : `This bot has no courses yes.`
    }),
  ]

})
