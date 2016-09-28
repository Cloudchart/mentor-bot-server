import {
  Scenario
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-basics-en',

   operations: [
    {
      label         : 'first',
      type          : 'message',
      text          : `
        This course have these main parts: How to choose and buy coffee, coffee equipment and how to brew coffee.
        Would you like to go throught the first part, how to choose and buy coffee?
      `,
      quick_replies : ['No', 'Yes']
    },

    {
      type    : 'input',
      branch  : {
        'Yes' : 'first-yes',
        'No'  : 'second'
      }
    },

    {
      type    : 'message',
      text    : `Say what?`,
      next    : 'first',
    },

    {
      label   : 'first-yes',
      type    : 'card-list',
      tags    : ['buying-en'],
      course  : {
        id      : 'coffee-bot-basics-en',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'first-delay'
      },
      next    : 'second',
    },
    {
      label : 'first-delay'    
      type  : 'message',
      text  : `Are you still interested or would like to quit?`,
      quick_replies : ['Quit', 'Interested']
    },
    {
      type    : 'input',
      branch  : {
        'Interested' : 'first-yes',
        'Quit'  : 'second'
      }
    },

    {
      label         : 'second',
      type          : 'message',
      text          : `
        Would you like go through the second part, coffee equipment?
      `,
      quick_replies : ['No', 'Yes']
    },

    {
      type    : 'input',
      branch  : {
        'yes' : 'second-yes',
        'no'  : 'third'
      }
    },

    {
      type  : 'message',
      text  : `Say what?`,
      next  : 'second',
    },

    {
      label   : 'second-yes',
      type    : 'card-list',
      tags    : ['equipment-en'],
      next    : 'third',
        timeout : {
          delay : 60 * 2 * 1000,
          next  : 'second-delay'
        },
      course  : {
        id      : 'coffee-bot-basics-en',
        source  : 'local',
      },
    },
    {
      label : 'second-delay'    
      type  : 'message',
      text  : `Are you still interested or would like to quit?`,
      quick_replies : ['Quit', 'Interested']
    },
    {
      type    : 'input',
      branch  : {
        'Interested' : 'second-yes',
        'Quit'  : 'third'
      }
    },

    {
      label         : 'third',
      type          : 'message',
      text          : `
        Would you like go throught the third part, basic brewing?
      `,
      quick_replies : ['No', 'Yes']
    },

    {
      type    : 'input',
      branch  : {
        'yes' : 'third-yes',
        'no'  : 'end'
      }
    },

    {
      type  : 'message',
      text  : `Say what?`,
      next  : 'third',
    },

    {
      label   : 'third-yes',
      type    : 'card-list',
      tags    : ['brewing-en'],
        timeout : {
          delay : 60 * 2 * 1000,
          next  : 'third-delay'
        },
      course  : {
        id      : 'coffee-bot-basics-en',
        source  : 'local',
      },
      next    : 'end',
    },
    {
      label : 'third-delay'    
      type  : 'message',
      text  : `Are you still interested or would like to quit?`,
      quick_replies : ['Quit', 'Interested']
    },
    {
      type    : 'input',
      branch  : {
        'Interested' : 'third-yes',
        'Quit'  : 'end'
      }
    },
    
    {
      label : 'end',
      type  : 'message',
      text  : `
        Ok, it seems like you know the basics now.
      `,
    },
    {
      label         : 'endquestion',
      type          : 'message',
      text          : `
        Did you like this course?
      `,
      quick_replies : ['No', 'Yes']
    },
    {
      type    : 'input',
      branch  : {
        'Yes'  : 'liked-basics',
        'No' : 'disliked-basics'
      },

  ]

})
