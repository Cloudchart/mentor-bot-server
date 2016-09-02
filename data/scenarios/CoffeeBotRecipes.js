import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-recipes',

  operations: [

    new Operations['message']({
      label : 'start',
      text  : `
        Currently I can only guide you on two recipes, it's Moka pot and Aeropress.
        Which one you're interested in?
      `,
      quick_replies:  ['Moka pot', 'Aeropress']
    }),

    new Operations['input']({
      branch  : {
        'moka pot'  : 'moka pot',
        'aeropress' : 'aeropress',
      }
    }),

    new Operations['message']({
      text    : `I don't get it.`,
      next    : 'start',
    }),

    new Operations['card-list']({
      label   : 'moka pot',
      tags    : ['moka'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'moka pot 404',
      }
    }),

    new Operations['message']({
      label         : 'moka pot 404',
      text          : `This course has no cards.`,
    }),

    new Operations['card-list']({
      label   : 'aeropress',
      tags    : ['aeropress'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'aeropress 404',
      }
    }),

    new Operations['message']({
      label         : 'aeropress 404',
      text          : `This course has no cards.`,
    }),

    new Operations['message']({
      label   : 'end',
      text    : 'Now enjoy your coffee!',
    }),


  ]

})
