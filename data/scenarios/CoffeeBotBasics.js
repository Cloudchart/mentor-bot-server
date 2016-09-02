import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-basics',

  operations: [
    new Operations['message']({
      text  : `
                This course have these main parts:
                How to choose and buy coffee,
                coffee equipment and how to brew coffee.
      `
    }),

    new Operations['message']({
      label         : 'first',
      text          : `
        Would you like to read the first part, how to buy and choose coffee?
      `,
      quick_replies : ['No', 'Yes']
    }),

    new Operations['input']({
      branch  : {
        'yes' : 'first-yes',
        'no'  : 'second'
      }
    }),

    new Operations['message']({
      text    : `I don't get it.`,
      next    : 'first',
    }),

    new Operations['card-list']({
      label   : 'first-yes',
      tags    : ['buying'],
      next    : 'second',
      course  : {
        id      : 'coffee-bot-basics',
        source  : 'local',
      },
      branch  : {
        '404' : 'first-404',
      }
    }),

    new Operations['message']({
      label         : 'first-404',
      text          : `This course has no cards.`,
    }),

    new Operations['message']({
      label         : 'second',
      text          : `
        Would you like to read the second part, coffee equipment?
      `,
      quick_replies : ['No', 'Yes']
    }),

    new Operations['input']({
      branch  : {
        'yes' : 'second-yes',
        'no'  : 'third'
      }
    }),

    new Operations['message']({
      text  : `I don't get it.`,
      next  : 'second',
    }),

    new Operations['card-list']({
      label   : 'second-yes',
      tags    : ['grinder'],
      next    : 'third',
      course  : {
        id      : 'coffee-bot-basics',
        source  : 'local',
      },
      branch  : {
        '404' : 'second-404',
      }
    }),

    new Operations['message']({
      label         : 'second-404',
      text          : `This course has no cards.`,
    }),

    new Operations['message']({
      label         : 'third',
      text          : `
        Would you like to read the third part, basic brewing?
      `,
      quick_replies : ['No', 'Yes']
    }),

    new Operations['input']({
      branch  : {
        'yes' : 'third-yes',
        'no'  : 'end'
      }
    }),

    new Operations['message']({
      text  : `I don't get it.`,
      next  : 'third',
    }),

    new Operations['card-list']({
      label   : 'third-yes',
      tags    : ['brewing'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-basics',
        source  : 'local',
      },
      branch  : {
        '404' : 'third-404',
      }
    }),

    new Operations['message']({
      label : 'end',
      text  : `Ok, it seems now that you know the basics.`,
    }),
  ]

})
