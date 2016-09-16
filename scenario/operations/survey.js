import Immutable from 'immutable'

import {
  Surveys
} from '../../data'

import Operation from '../operation'


const Letters = 'abcdefghijklmnopqrstuvwxyz'


let AnsweredSurveys = new Immutable.Map
let EmptyMap        = new Immutable.Map
let EmptyList       = new Immutable.List


let getSurvey = async (descriptor) =>
  descriptor.source === 'local'
    ? Surveys[descriptor.id]
    : null


let getNextQuestion = async (sender, surveyDescriptor) => {
  let survey                = await getSurvey(surveyDescriptor)
  console.log(surveyDescriptor)
  let answeredQuestionsIds  = AnsweredSurveys.getIn([sender.id, survey.id, 'questions'], EmptyMap).keySeq()
  return survey.questions.find(({ id }) => !answeredQuestionsIds.includes(id))
}


let calculatePercentage = async (sender, surveyDescriptor) => {
  let survey    = await getSurvey(surveyDescriptor)
  let questions = AnsweredSurveys.getIn([sender.id, survey.id, 'questions'], EmptyMap)

  let correctAnswers = survey.questions.filter(question => {
    let correctAnswerId = question.answers.find(({ isCorrect }) => isCorrect === true).id
    return questions.get(question.id) === correctAnswerId
  })

  return Math.floor(correctAnswers.length * 100 / questions.size)
}


export default class extends Operation {

  static type = 'survey';

  constructor(config) {
    super(config)

    this.survey   = config.survey
    this.config   = config
  }


  sendQuestion = async (bot, messaging, question) => {
    let canBeSentAsQuickReplies = question.answers.every(({ content }) => content.trim().length <= 20)

    let quick_replies = question.answers.map((answer, ii) => ({
      title         : answer.content.trim(),
      payload       : Letters[ii],
      content_type  : 'text'
    }))

    if (canBeSentAsQuickReplies) {
      await bot.sendQuickReply(messaging.sender.id, question.content, quick_replies).catch(console.error)
    } else {
      await bot.sendTextMessage(messaging.sender.id, question.content).catch(console.error)
      await bot.sendSurveyAnswers(messaging.sender.id, question.answers).catch(console.error)
    }
  }


  sendAnswerReaction = async (bot, sender, question, answer) => {
    let reaction = answer.reaction || question.reaction

    if (reaction === null || reaction === undefined)
      return

    return bot.sendTextMessage(sender.id, reaction)
  }


  resolveMessage = async (bot, messaging, context, next) => {
    let letter = messaging.message.quick_reply
      ? messaging.message.quick_reply.payload
      : messaging.message.text.trim().toLowerCase()

    let question = await getNextQuestion(messaging.sender, this.survey)
    let answer = question.answers[Letters.indexOf(letter)]

    if (letter.length > 1 || answer === null || answer === undefined) {
      await bot.sendTextMessage(messaging.sender.id, `Say what?`)
      return this.resolveDefault(bot, messaging, context, next)
    }

    AnsweredSurveys = AnsweredSurveys.setIn([messaging.sender.id, this.survey.id, 'questions', question.id], answer.id)

    await this.sendAnswerReaction(bot, messaging.sender, question, answer)
    return this.resolveDefault(bot, messaging, context, next)
  }


  resolvePostback = async (bot, messaging, context, next) => {
    let payload = JSON.parse(messaging.postback.payload)

    let question = await getNextQuestion(messaging.sender, this.survey)
    let answer = question.answers.find(({ id }) => id === payload.id)

    if (payload.type !== 'answer' || answer === null || answer === undefined) {
      await bot.sendTextMessage(messaging.sender.id, `Say what?`)
      return this.resolveDefault(bot, messaging, context, next)
    }

    AnsweredSurveys = AnsweredSurveys.setIn([messaging.sender.id, this.survey.id, 'questions', question.id], answer.id)

    await this.sendAnswerReaction(bot, messaging.sender, question, answer)
    return this.resolveDefault(bot, messaging, context, next)
  }


  resolveDefault = async (bot, messaging, context, next) => {
    let nextQuestion = await getNextQuestion(messaging.sender, this.survey)

    if (nextQuestion)
      return await this.sendQuestion(bot, messaging, nextQuestion)

    let percentage = await calculatePercentage(messaging.sender, this.survey)

    AnsweredSurveys = AnsweredSurveys.deleteIn([messaging.sender.id, this.survey.id])

    let branch = Object.keys(this.branch || {})
      .map((value) => parseFloat(value))
      .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
      .reverse()
      .find((value) => value <= percentage)


    if (branch !== null && branch !== undefined)
      return next({ next: this.branch[branch.toString()] })

    next()
  }


  resolve = async (bot, messaging, context, next) => {
    try {
      if (messaging.message)
        return this.resolveMessage(bot, messaging, context, next)

      if (messaging.postback)
        return this.resolvePostback(bot, messaging, context, next)

      return this.resolveDefault(bot, messaging, context, next)
    } catch(error) {
      console.error(error)
    }
  }


}
