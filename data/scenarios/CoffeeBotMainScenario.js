import {
  Scenario,
  Operations,
} from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-main',

  operations: [

    {
      type  : 'message',
      text  : `
Кофебот создан с помощью сервиса Mentorbot. Образовательные боты по другим темам, а также возможность создать своего собственного бота - на getmentorbot.com
              `
    },

    {
      type  : 'message',
      text  : `
Привет, я Кофебот! Я расскажу о выборе и помоле кофе, основах приготовления, а также дам несколько рецептов.
              `
    },

    {
      label : 'chooser',
      type  : 'message',
      text  : `
А теперь выберите курс
              `
    },

    {
      label   : 'course-chooser',
      type    : 'course-chooser',
      next    : 'finish',
      branch  : {
        'empty' : 'no courses',
        '404'   : '404'
      },
      timeout : {
        delay : 60 * 60 * 1000,
        next  : 'course-chooser-delay'
      }
    },

    {
      type  : 'message',
      label : '404',
      next  : 'chooser',
      text  : `
        I don't get it.
      `
    },

    {
      label : 'course-chooser-delay',
      type  : 'message',
      text  : `
        Вы хотите продолжить или выходим?
      `,
      quick_replies: ['Выходим', 'Продолжить']
    },

    {
      type      : 'input',
      branch    : {
        'Выходим'      : 'exit',
        'Продолжить'  : 'course-chooser',
      }
    },

    {
      type  : 'message',
      label : 'finish',
      next  : 'chooser',
      text  : `
        Ок, вы завершили этот курс.
      `
    },

    {
      type  : 'message',
      label : 'no courses',
      text  : `
        This bot has no courses yes.
      `
    }

  ]

})
