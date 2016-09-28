import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-recipes-ru',

  operations: [

    {
      label : 'start',
      type  : 'message',
      text  : `
        Пока что я знаю только о четырёх методах приготовления кофе: Кемекс / V60, Аэропресс, Гейзерная кофеварка и Френчпресс (без нажатия)
      `,
      quick_replies:  ['V60', 'Аэропресс', 'Гейзер', 'Френчпресс']
    },

    {
      type    : 'input',
      branch  : {
        'Гейзер'     : 'moka pot',
        'Аэропресс'  : 'aeropress',
        'V60'     : 'chemex',
        'Френчпресс' : 'frenchpress',
      }
    },

    {
      type    : 'message',
      text    : `Выберите один из вариантов.`,
      next    : 'start',
    },

    {
      label   : 'moka pot',
      type    : 'card-list',
      tags    : ['moka-ru'],
      course  : {
        id      : 'coffee-bot-recipes-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'moka-pot-delay'
      },
      next    : 'end',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },

    {
      label         : 'moka-pot-delay',
      type          : 'message',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    },

    {
      type    : 'input',
      branch  : {
        'Забросил'  : 'exit',
        'Готовлю'   : 'moka pot',
      },
      next    : 'moka-pot-delay',
    },

    {
      label   : 'chemex',
      type    : 'card-list',
      tags    : ['chemex-ru'],
      course  : {
        id      : 'coffee-bot-recipes-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'chemex-delay'
      },
      next    : 'end',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },

    {
      label         : 'chemex-delay',
      type          : 'message',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    },

    {
      type    : 'input',
      branch  : {
        'Забросил'  : 'exit',
        'Готовлю'   : 'chemex',
      },
      next    : 'chemex-delay',
    },

    {
      label   : 'frenchpress',
      type    : 'card-list',
      tags    : ['frenchpress-ru'],
      course  : {
        id      : 'coffee-bot-recipes-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'frenchpress-delay'
      },
      next    : 'end',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },

    {
      label         : 'frenchpress-delay',
      type          : 'message',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    },

    {
      type    : 'input',
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'frenchpress',
      },
      next    : 'frenchpress-delay',
    },

    {
      label   : 'aeropress',
      type    : 'card-list',
      tags    : ['aeropress-ru'],
      course  : {
        id      : 'coffee-bot-recipes-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 3 * 1000,
        next  : 'aeropress-delay'
      },
      next    : 'end',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },

    {
      label         : 'aeropress-delay',
      type          : 'message',
      text          : `Вы ещё готовите или уже забросили?`,
      quick_replies : ['Забросил', 'Готовлю']
    },

    {
      type    : 'input',
      branch  : {
        'Забросил'     : 'exit',
        'Готовлю' : 'aeropress',
      },
      next    : 'aeropress-delay',
    },


    {
      label   : 'end',
      type    : 'message',
      text    : 'Наслаждайтесь вашим кофе!',
    },
    {
      label         : 'endquestion',
      type          : 'message',
      text          : `
        Вам понравилась эта инструкция?
      `,
      quick_replies : ['Нет', 'Да']
    },
    {
      type    : 'input',
      branch  : {
        'Да'  : 'liked-recipe',
        'Нет' : 'disliked-recipe'
      },


  ]

})
