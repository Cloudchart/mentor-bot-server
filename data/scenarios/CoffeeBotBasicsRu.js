import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-basics-ru',

   operations: [
    {
      label         : 'first',
      type          : 'message',
      text          : `
        Этот курс содержит три основных блока: выбор зёрен, правильного кофейного оборудования и как делать кофе. Хотите пройти первую часть курса, про выбор зёрен?
      `,
      quick_replies : ['Нет', 'Да']
    },

    {
      type    : 'input',
      branch  : {
        'Да'  : 'first-yes',
        'Нет' : 'second'
      }
    },

    {
      type  : 'message',
      text  : `Сейчас не понял. Повторите, пожалуйста.`,
      next  : 'first',
    },

    {
      label   : 'first-yes',
      type    : 'card-list',
      tags    : ['buying-ru'],
      course  : {
        id      : 'coffee-bot-basics-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'first-delay'
      },
      next    : 'second',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },
    {
      label : 'first-delay',
      type  : 'message',
      text  : `Вам ещё интересно или вы хотите пропустить эту часть?`,
      quick_replies : ['Пропустить', 'Интересно']
    },
    {
      type    : 'input',
      branch  : {
        'Интересно' : 'first-yes',
        'Пропустить'  : 'second'
      }
    },

    {
      label         : 'second',
      type          : 'message',
      text          : `
        Хотите пройти вторую часть курса, посвященную кофейному оборудованию?
      `,
      quick_replies : ['Нет', 'Да']
    },

    {
      type    : 'input',
      branch  : {
        'Да'  : 'second-yes',
        'Нет' : 'third'
      }
    },

    {
      type  : 'message',
      text  : `Сейчас не понял. Повторите, пожалуйста.`,
      next  : 'second',
    },

    {
      label   : 'second-yes',
      type    : 'card-list',
      tags    : ['equipment-ru'],
      course  : {
        id      : 'coffee-bot-basics-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'second-delay'
      },
      next    : 'third',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },
    {
      label : 'second-delay',
      type  : 'message',
      text  : `Вам ещё интересно или вы хотите пропустить эту часть?`,
      quick_replies : ['Пропустить', 'Интересно']
    },
    {
      type    : 'input',
      branch  : {
        'Интересно' : 'second-yes',
        'Пропустить'  : 'third'
      }
    },

    {
      label         : 'third',
      type          : 'message',
      text          : `
        Хотите пройти третью чусть курса, посвященную основам варки?
      `,
      quick_replies : ['Нет', 'Да']
    },

    {
      type    : 'input',
      branch  : {
        'Да'  : 'third-yes',
        'Нет' : 'end'
      }
    },

    {
      type  : 'message',
      text  : `Сейчас не понял. Повторите, пожалуйста.`,
      next  : 'third',
    },

    {
      label   : 'third-yes',
      type    : 'card-list',
      tags    : ['brewing-ru'],
      course  : {
        id      : 'coffee-bot-basics-ru',
        source  : 'local',
      },
      timeout : {
        delay : 60 * 2 * 1000,
        next  : 'third-delay'
      },
      next    : 'end',
      skip_button_label : 'Далее',
      save_button_label : 'Сoхранить',
      skip_button_hint  : 'Здесь все понятно, идем дальше.',
      save_button_hint  : 'Карточка сохранена, Все сохраненные карточки будут доступны в специальном разделе меню.',
    },
    {
      label : 'third-delay',
      type  : 'message',
      text  : `Вам ещё интересно или вы хотите пропустить эту часть?`,
      quick_replies : ['Пропустить', 'Интересно']
    },
    {
      type    : 'input',
      branch  : {
        'Интересно' : 'third-yes',
        'Пропустить'  : 'end'
      }
    },

    {
      label : 'end',
      type  : 'message',
      text  : `
        Похоже, теперь вы знаете основы.
      `,
    },
    {
      label         : 'endquestion',
      type          : 'message',
      text          : `
        Вам понравился этот курс?
      `,
      quick_replies : ['Нет', 'Да']
    },
    {
      type    : 'input',
      branch  : {
        'Да'  : 'liked-basics',
        'Нет' : 'disliked-basics'
      },
    },
    {
      type    : 'message',
      label   : 'liked-basics',
      text    : 'Спасибо!',
      next    : 'quit',
    },
    {
      type    : 'message',
      label   : 'disliked-basics',
      text    : 'Жаль. Расскажите, почему вам не понравилось на почту team@insights.vc!',
      next    : 'quit',
    },
  ]

})
