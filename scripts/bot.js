// @flow

import {
  Messenger
} from '../bots'

import Execution from '../execution'

import {
  start
} from '../db'


start().then(() => {

  Messenger.on('message', Execution.resolve)
  Messenger.on('postback', Execution.resolve)

  Messenger.start()

})
