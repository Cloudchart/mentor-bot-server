import fetch from 'node-fetch'
import qs from 'querystring'


const sendTextMessage = (access_token, recipient_id, message_text) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      message   : {
        text    : message_text
      }
    }
  })


const sendQuickReply = (access_token, recipient_id, message_text, quick_replies) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient     : {
        id          : recipient_id
      },
      message       : {
        text          : message_text,
        quick_replies : quick_replies,
      }
    }
  })


const sendButtonMessage = (access_token, recipient_id, message_text, buttons) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      message   : {
        attachment  : {
          type      : 'template',
          payload   : {
            template_type : 'button',
            text          : message_text,
            buttons
          }
        }
      }
    }
  })


const sendGenericMessage = (access_token, recipient_id, elements) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      message   : {
        attachment  : {
          type      : 'template',
          payload   : {
            template_type : 'generic',
            elements
          }
        }
      }
    }
  })


const sendImage = (access_token, recipient_id, url) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      message   : {
        attachment  : {
          type      : "image",
          payload   : {
            url     : url
          }
        }
      }
    }

  })


const sendVideo = (access_token, recipient_id, url) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      message   : {
        attachment  : {
          type      : "video",
          payload   : {
            url     : url
          }
        }
      }
    }

  })


const sendSenderAction = (access_token, recipient_id, sender_action) =>
  api({
    access_token,
    path  : 'me/messages',
    body  : {
      recipient : {
        id      : recipient_id
      },
      sender_action
    }
  })


const api = ({
  path,
  access_token,
  method,
  query,
  body
}) => {

  let url = `https://graph.facebook.com/v${process.env.FB_API_VERSION}/${path}?${qs.stringify({ ...query, access_token })}`

  return fetch(url, {
    method  : method || 'POST',
    body    : JSON.stringify(body),
    headers : {
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json'
    },
  })
    .then(result => result.json())
    .then(json => {
      console.log(JSON.stringify(json, null, 2))
      return json
    })
    .catch(console.error)

}


export default {
  api,
  sendTextMessage,
  sendImage,
  sendVideo,
  sendQuickReply,
  sendButtonMessage,
  sendGenericMessage,
  sendSenderAction,
}
