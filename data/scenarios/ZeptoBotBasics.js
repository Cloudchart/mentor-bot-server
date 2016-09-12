import { Scenario } from '../../scenario'


export default new Scenario({

  id  : 'zepto-bot-basics',

  operations  : [

    {
      type    : 'message',
      text    : `
        This is a basic publishing course by Zeptolab.
      `
    },

    {
      type    : 'card-list',
      tags    : ['english'],
      course  : {
        id      : 'zepto-bot-basics',
        source  : 'local'
      },

    }

  ]

})
