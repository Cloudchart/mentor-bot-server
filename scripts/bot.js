// @flow

import {
  Messenger
} from '../bots'

import TimeoutWatchdog from '../timeout_watchdog'


import Execution from '../execution'

import {
  start
} from '../db'


start().then(async () => {

  await TimeoutWatchdog.init()

  Messenger.on('message', Execution.resolve)
  Messenger.on('postback', Execution.resolve)

  Messenger.start()

})
