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
        Пока что я знаю только о четырёх методах приготовления кофе: Кемекс / Харио, Аэропресс, Гейзерная кофеварка и Френчпресс (без нажатия)
      `,
      quick_replies:  ['Кемекс', 'Аэропресс', 'Гейзер', 'Френчпресс']
    }),

    new Operations['input']({
      branch  : {
        'Гейзер'     : 'moka pot',
        'Аэропресс'  : 'aeropress',
        'Кемекс'     : 'chemex',
        'Френчпресс' : 'frenchpress',
      }
    }),

    new Operations['message']({
      text    : `I don't get it.`,
      next    : 'start',
    }),

    new Operations['card-list']({
      label   : 'moka pot',
      tags    : ['moka_russian'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'moka pot 404',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'moka-pot-delay'
      }
    }),

    new Operations['message']({
      label         : 'moka-pot-delay',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    }),

    new Operations['input']({
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'moka pot',
      }
    }),

    new Operations['message']({
      label         : 'moka pot 404',
      text          : `This course has no cards.`,
      next          : 'end'
    }),
    

    new Operations['card-list']({
      label   : 'chemex',
      tags    : ['chemex_russian'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'chemex 404',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'chemex-delay'
      }
    }),

    new Operations['message']({
      label         : 'chemex-delay',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    }),

    new Operations['input']({
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'chemex',
      }
    }),

    new Operations['message']({
      label         : 'chemex 404',
      text          : `This course has no cards.`,
      next          : 'end'
    }),    


    new Operations['card-list']({
      label   : 'frenchpress',
      tags    : ['frenchpress_russian'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'frenchpress 404',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'frenchpress-delay'
      }
    }),

    new Operations['message']({
      label         : 'frenchpress-delay',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    }),

    new Operations['input']({
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'frenchpress',
      }
    }),

    new Operations['message']({
      label         : 'frenchpress 404',
      text          : `This course has no cards.`,
      next          : 'end'
    }),
    

    new Operations['card-list']({
      label   : 'aeropress',
      tags    : ['aeropress_russian'],
      next    : 'end',
      course  : {
        id      : 'coffee-bot-recipes',
        source  : 'local',
      },
      branch  : {
        '404' : 'aeropress 404',
      },
      timeout : {
        delay : 60 * 3 * 1000,
        next  : 'aeropress-delay'
      }
    }),

    new Operations['message']({
      label         : 'aeropress-delay',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    }),

    new Operations['input']({
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'aeropress',
      }
    }),


    new Operations['message']({
      label         : 'aeropress 404',
      text          : `This course has no cards.`,
      next          : 'end'
    }),

    new Operations['message']({
      label   : 'end',
      text    : 'Наслаждайтесь вашим кофе!',
    }),


  ]

})
