import Immutable from 'immutable'
import Operation from '../operation'

import {
  Courses
} from '../../data'


const mapCourseToElement = (courseDescriptor) => {
  let course = courseDescriptor.source === 'local'
    ? Courses[courseDescriptor.id]
    : null

  if (course === null || course === undefined)
    return null

  return {
    title     : course.author,
    subtitle  : course.name,
    buttons   : [
      {
        type    : 'postback',
        title   : course.name,
        payload : JSON.stringify({ ...courseDescriptor, operation: 'course-chooser' })
      }
    ]
  }
}

const EmptyList = new Immutable.List


const getCourses = async (bot) =>
  bot.get('courses', EmptyList).toJS()


export default class extends Operation {

  static type = 'course-chooser';

  constructor(config) {
    super(config)

    this.config = config
  }


  resolvePostback = async (bot, messaging, context, next) => {
    let payload = JSON.parse(messaging.postback.payload)

    if (payload.operation !== 'course-chooser')
      return next({ next: this.branch['404'] })

    let courses = await getCourses(bot)

    let course  = payload.source === 'local'
      ? Courses[payload.id]
      : null

    if (course === null || course === undefined)
      return next({ next: this.branch['404'] })

    next({ scenario: course.scenario })
  }

  resolveMessage = async (bot, messaging, context, next) => {
    next({ next: this.branch['404'] })
  }

  resolve = async (bot, messaging, context, next) => {
    if (messaging.postback)
      return this.resolvePostback(bot, messaging, context, next)

    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    let courses = await getCourses(bot)

    if (courses.length === 0)
      return next({ next: this.branch['empty'] })

    try {
      let elements = courses.map(mapCourseToElement)
      await bot.sendGenericMessage(messaging.sender.id, elements)
    } catch(error) {
      console.error(error)
    }
  }


}
