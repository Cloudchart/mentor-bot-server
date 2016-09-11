import Immutable from 'immutable'
import FB from './api'

const Letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const mapCourseToGenericTemplateElement = (course, ii) => ({
  title     : course.author.trim(),
  subtitle  : course.name.trim(),
  buttons   : [
    {
      type    : 'postback',
      title   : course.name,
      payload : JSON.stringify({
        id    : course.id,
        type  : 'course'
      })
    }
  ]
})


const mapAnswerToGenericTemplateElement = (answer, ii) => ({
  title     : answer.content.trim(),
  buttons   : [
    {
      type    : 'postback',
      title   : Letters[ii],
      payload : JSON.stringify({
        id    : answer.id,
        type  : 'answer'
      })
    }
  ]
})


class Bot {

  constructor(attributes) {
    this.attributes = Immutable.fromJS(attributes)
  }


  get = (path, defaultValue) => {
    path = Array.isArray(path) ? path : path.toString().split('.')
    return this.attributes.getIn(path, defaultValue)
  }


  sendCourseList = (recipient_id, courses) =>
    this.sendGenericMessage(
      recipient_id,
      courses.map(mapCourseToGenericTemplateElement)
    )


  sendSurveyAnswers = (recipient_id, answers) =>
    this.sendGenericMessage(
      recipient_id,
      answers.map(mapAnswerToGenericTemplateElement)
    )


  sendTextMessage = (recipient_id, message_text) =>
    FB.sendTextMessage(
      this.get('access_token'),
      recipient_id,
      message_text,
    )

  sendQuickReply = (recipient_id, message_text, quick_replies) =>
    FB.sendQuickReply(
      this.get('access_token'),
      recipient_id,
      message_text,
      quick_replies,
    )

  sendButtonMessage = (recipient_id, message_text, buttons) =>
    FB.sendButtonMessage(
      this.get('access_token'),
      recipient_id,
      message_text,
      buttons,
    )

  sendGenericMessage = (recipient_id, elements) =>
    FB.sendGenericMessage(
      this.get('access_token'),
      recipient_id,
      elements,
    )

  sendImage = (recipient_id, url) =>
    FB.sendImage(
      this.get('access_token'),
      recipient_id,
      url
    )

  sendVideo = (recipient_id, url) =>
    FB.sendVideo(
      this.get('access_token'),
      recipient_id,
      url
    )

  sendSenderAction = (recipient_id, sender_action) =>
    FB.sendSenderAction(
      this.get('access_token'),
      recipient_id,
      sender_action,
    )


}


export default Bot
