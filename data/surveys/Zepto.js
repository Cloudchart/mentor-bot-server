export default {

  id        : 'zepto-survey',
  name      : 'Zepto Survey',

  questions : [
    {
      id        : '1',
      content   : `
        What should I send to publisher in an introductory email?
      `,
      answers : [
        {
          id        : '1',
          content   : `
            prototype or any stable build of your game
          `,
        },

        {
          id        : 2,
          content   : `
            information about your company & project team
          `,
        },

        {
          id      : '3',
          content : `
            future plans (roadmap or feature list)
          `
        },

        {
          id        : '4',
          content   : `
            all of the above
          `,
          isCorrect : true
        }

      ]
    },

    {
      id      : '2',
      content : `
        What is most important for focus on in the prototype?
      `,
      answers : [
        {
          id        : '1',
          content   : `
            USP
          `,
          isCorrect : true
        },

        {
          id        : '2',
          content   : `
            Graphics & Special effects
          `,
        },

        {
          id        : '3',
          content   : `
            Characters
          `,
        },

        {
          id        : '4',
          content   : `
            Ask publisher
          `,
        },

      ]
    },

    {
      id      : '3',
      content : `
        If my game is already live, what 1/7/30 day retention numbers would most likely spark publisher interest?
      `,
      answers : [
        {
          id      : '1',
          content : `
            50/5/2
          `
        },

        {
          id        : '2',
          content   : `
            40/20/10
          `,
          isCorrect : true
        },

        {
          id        : '2',
          content   : `
            30/10/5
          `,
        },

        {
          id        : '2',
          content   : `
            45/15/5
          `,
        },
      ]
    },

  ]

}
