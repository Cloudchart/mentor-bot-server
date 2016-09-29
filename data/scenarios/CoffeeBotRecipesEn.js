import { Scenario } from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-recipes-en',

  operations: [

    {
      label : 'start',
      type  : 'message',
      text  : `
        I know only four basic recipes currently, it's Chemex/V60, Aeropress, Moka pot and Frenchpress (without actually pressing)
      `,
      quick_replies:  ['V60', 'Aeropress', 'Moka pot', 'French Press']
    },

    {
      type    : 'input',
      branch  : {
        'Moka pot'     : 'moka pot',
        'Aeropress'  : 'aeropress',
        'V60'     : 'chemex',
        'French Press' : 'frenchpress',
      }
    },

    {
      type    : 'message',
      text    : `Say what?`,
      next    : 'start',
    },

    {
      label   : 'moka pot',
      type    : 'card-list',
      tags    : ['moka-en'],
      course  : {
        id      : 'coffee-bot-recipes-en',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'moka-pot-delay'
      },
      next    : 'end',
    },

    {
      label         : 'moka-pot-delay',
      type          : 'message',
      text          : `Do you want to continue or quit?`,
      quick_replies : ['Quit', 'Continue']
    },

    {
      type    : 'input',
      branch  : {
        'quit'     : 'exit',
        'continue' : 'moka pot',
      },
      next    : 'moka-pot-delay',
    },

    {
      label   : 'chemex',
      type    : 'card-list',
      tags    : ['chemex-en'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes-en',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'chemex-delay'
      }
    },

    {
      label         : 'chemex-delay',
      type          : 'message',
      text          : `Do you want to continue or quit?`,
      quick_replies : ['Quit', 'Continue']
    },

    {
      type    : 'input',
      branch  : {
        'quit'      : 'exit',
        'continue'  : 'chemex',
      },
      next    : 'chemex-delay',
    },

    {
      label   : 'frenchpress',
      type    : 'card-list',
      tags    : ['frenchpress-en'],
      course  : {
        id      : 'coffee-bot-recipes-en',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'frenchpress-delay'
      },
      next    : 'end',
    },

    {
      label         : 'frenchpress-delay',
      type          : 'message',
      text          : `Do you want to continue or quit?`,
      quick_replies : ['Quit', 'Continue']
    },

    {
      type    : 'input',
      branch  : {
        'quit'      : 'exit',
        'continue'  : 'frenchpress',
      },
      next    : 'frenchpress-delay',
    },

    {
      label   : 'aeropress',
      type    : 'card-list',
      tags    : ['aeropress-en'],
      course  : {
        id      : 'coffee-bot-recipes-en',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 3 * 1000,
        next  : 'aeropress-delay'
      },
      next    : 'end',
    },

    {
      label         : 'aeropress-delay',
      type          : 'message',
      text          : `Do you want to continue or quit?`,
      quick_replies : ['Quit', 'Continue']
    },

    {
      type    : 'input',
      branch  : {
        'quit'     : 'exit',
        'continue' : 'aeropress',
      },
      next    : 'aeropress-delay',
    },


    {
      type    : 'message',
      label   : 'end',
      text    : 'Now enjoy your coffee!',
    },
    {
      label         : 'endquestion',
      type          : 'message',
      text          : `
        Did you like this manual?
      `,
      quick_replies : ['No', 'Yes']
    },
    {
      type    : 'input',
      branch  : {
        'Yes'  : 'liked-recipe',
        'No' : 'disliked-recipe'
      },
      {
        type    : 'message',
        label   : 'liked-recipe',
        text    : 'Thanks!',
        next    : 'quit',
      },
      {
        type    : 'message',
        label   : 'disliked-recipe',
        text    : 'Well, tell us why at team@insights.vc.',
        next    : 'quit',
      },

  ]

})
