import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'planeta-bot-main',

  operations: [

    {
      label   : 'start',
      type    : 'message',
      text    : `Let's try a quiz!`
    },

    {
      label   : 'survey',
      type    : 'survey',
      survey  : {
        id      : 'first-survey',
        source  : 'local',
      },
      branch  : {
        '50'  : 'survey-50',
        '100' : 'survey-100',
      }
    },

    {
      type  : 'message',
      text  : `
        Учи еще.
      `,
      next  : 'start'
    },

    {
      label   : 'survey-50',
      type    : 'message',
      text    : `
        Так себе.
      `,
      next    : 'start'
    },

    {
      label   : 'survey-100',
      type    : 'message',
      text    : `
        Молодец!
      `,
      next    : 'start'
    },


  ]

})
