import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-basics',

   operations: [
    new Operations['message']({
      label         : 'first',
      text          : `
        Этот курс содержит три основных блока: выбор зёрен, правильного кофейного оборудования и как делать кофе. Хотите пройти первую часть курса, про выбор зёрен?
      `,
      quick_replies : ['Нет', 'Да']
    }),

    new Operations['input']({
      branch  : {
        'Да' : 'first-yes',
        'Нет'  : 'second'
      }
    }),

    new Operations['message']({
      text    : `I don't get it.`,
      next    : 'first',
    }),

    new Operations['card-list']({
      label   : 'first-yes',
      tags    : ['buying_russian'],
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
        Хотите пройти вторую часть курса, посвященную кофейному оборудованию?
      `,
      quick_replies : ['Нет', 'Да']
    }),

    new Operations['input']({
      branch  : {
        'Да' : 'second-yes',
        'Нет'  : 'third'
      }
    }),

    new Operations['message']({
      text  : `I don't get it.`,
      next  : 'second',
    }),

    new Operations['card-list']({
      label   : 'second-yes',
      tags    : ['equipment_russian'],
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
        Хотите пройти третью чусть курса, посвященную основам варки?
      `,
      quick_replies : ['Нет', 'Да']
    }),

    new Operations['input']({
      branch  : {
        'Да' : 'third-yes',
        'Нет'  : 'end'
      }
    }),

    new Operations['message']({
      text  : `I don't get it.`,
      next  : 'third',
    }),

    new Operations['card-list']({
      label   : 'third-yes',
      tags    : ['brewing_russian'],
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
      text  : `
        Похоже, теперь вы знаете основы.
      `,
    }),
  ]

})
