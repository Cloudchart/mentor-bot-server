import { Scenario } from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-recipes-en',

  operations: [

    {
      label : 'start',
      type  : 'message',
      text  : `
        Пока что я знаю только о четырёх методах приготовления кофе: Кемекс / Харио, Аэропресс, Гейзерная кофеварка и Френчпресс (без нажатия)
      `,
      quick_replies:  ['Кемекс', 'Аэропресс', 'Гейзер', 'Френчпресс']
    },

    {
      type    : 'input',
      branch  : {
        'Гейзер'     : 'moka pot',
        'Аэропресс'  : 'aeropress',
        'Кемекс'     : 'chemex',
        'Френчпресс' : 'frenchpress',
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
      text    : 'Наслаждайтесь вашим кофе!',
    },


  ]

})
