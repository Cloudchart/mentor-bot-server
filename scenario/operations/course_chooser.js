import Immutable from 'immutable'
import Operation from '../operation'

import {
  Courses
} from '../../data'


const EmptyList = new Immutable.List


const getCoursesDescriptors = async (bot) =>
  bot.get('courses', EmptyList).toJS()


const getCourses = async (bot) =>
  getCoursesDescriptors(bot)
    .then(descriptors => Promise.all(descriptors.map(getCourse)))
    .then(courses => courses.filter(course => course !== null && course !== undefined))


const getCourse = async ({ source, id }) =>
  source === 'local' ? Courses[id] : null


const findCourseById = (bot, query) =>
  getCourses(bot)
    .then(courses => courses.find(({ id }) => id === query))


const findCourseByName = (bot, query) =>
  getCourses(bot)
    .then(courses => courses.find(({ name }) => name.toLowerCase() === query))


export default class extends Operation {

  static type = 'course-chooser';

  constructor(config) {
    super(config)

    this.config = config
  }


  resolveCourse = async (bot, messaging, course, next) => {
    if (course === null || course === undefined)
      return next({ next: this.branch['404'] })

    if (course.scenario === null || course.scenario === undefined) {
      await bot.sendTextMessage(messaging.sender.id, `This course doesn't have a scenario 😱.`)
      return next()
    }

    next({ scenario: course.scenario })
  }


  resolvePostback = async (bot, messaging, context, next) => {
    let payload = JSON.parse(messaging.postback.payload)

    if (payload.type !== 'course')
      return next({ next: this.branch['404'] })

    let course = await findCourseById(bot, payload.id)

    await this.resolveCourse(bot, messaging, course, next)
  }


  resolveMessage = async (bot, messaging, context, next) => {
    let query = messaging.message.text.trim().toLowerCase()
    let course = await findCourseByName(bot, query)

    await this.resolveCourse(bot, messaging, course, next)
  }


  resolvePrompt = async (bot, messaging, context, next) => {
    let courses = await getCourses(bot)

    if (courses.length === 0)
      return next({ next: this.branch['empty'] })

    await bot.sendCourseList(messaging.sender.id, courses)
  }


  resolve = async (bot, messaging, context, next) => {
    if (messaging.postback)
      return this.resolvePostback(bot, messaging, context, next)

    if (messaging.message)
      return this.resolveMessage(bot, messaging, context, next)

    await this.resolvePrompt(bot, messaging, context, next)
  }


}
