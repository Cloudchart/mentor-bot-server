import { Scenario } from '../../scenario'


export default new Scenario({

  id: 'coffee-bot-main-ru',

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
      branch  : {
        '404' : '404',
      },
      // timeout : {
      //   delay : 60 * 60 * 1000,
      //   next  : 'course-chooser-delay'
      // },
      next    : 'finish',
    },

    {
      label : '404',
      type  : 'message',
      text  : `
        Cейчас не понял. Повторите, пожалуйста.
      `,
      next  : 'course-chooser',
    },

    {
      label : 'course-chooser-delay',
      type  : 'message',
      text  : `
        Хотите продолжить курс?
      `,
      quick_replies: ['Выходим', 'Продолжить']
    },

    {
      type      : 'input',
      branch    : {
        'Выходим'     : 'exit',
        'Продолжить'  : 'course-chooser',
      }
    },

    {
      type  : 'message',
      label : 'finish',
      next  : 'chooser',
      text  : `
        Отлично, вы завершили этот курс!
      `
    },

  ]

})
