import Immutable from 'immutable'
import request from 'request'


class Bot {

  constructor(attributes) {
    this.attributes = Immutable.fromJS(attributes)
  }


  sendTextMessage = (recipientId, messageText) => {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    }

    this.callSendAPI(messageData)
  }


  callSendAPI = (messageData) => {
    request({
      uri     : 'https://graph.facebook.com/v2.6/me/messages',
      qs      : { access_token: this.attributes.get('token') },
      method  : 'POST',
      json    : messageData
    }, (error, response, body) => {
      if (error)
        console.error(error)
      else
        console.log(body)
    })
  }


}


export default Bot
