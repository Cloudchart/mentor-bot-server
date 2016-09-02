import {
  Messenger
} from '../bots'

import Execution from '../execution'

import FB from '../bots/messenger/api'


Messenger.on('message', Execution.resolve)
Messenger.on('postback', Execution.resolve)


Messenger.start()
