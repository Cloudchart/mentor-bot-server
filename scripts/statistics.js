import {
  r,
  run
} from '../db'


import {
  Courses
} from '../data'


let data = {}


const ensure_course = (id) => {
  let course = Courses[id]
  data[id] || (data[id] = {})
  course.cards.forEach(card => data[id][card.id] = {})
}


const process_record = (error, record) => {
  if (record.courses === null || record.courses === undefined)
    return

  Object.keys(record.courses).forEach(course_id => {
    let record_data     = record.courses[course_id]
    let course_complete = record_data.shown_cards.length === 0
    ensure_course(course_id)
    Object.keys(data[course_id]).forEach(card_id => {
      let is_saved  = !!record_data.saved_cards.find(({ id }) => id === card_id)
      let is_shown  = !!record_data.shown_cards.find(({ id }) => id === card_id)
      data[course_id][card_id][record.id] = is_saved
        ? 'save'
        : is_shown
          ? 'got it'
          : course_complete
            ? 'got it'
            : ''
    })
  })
}


run(
  r.table('users_states')
)
  .then(cursor => cursor.each(process_record))
  .then(() => console.log(JSON.stringify(data, null, 2)))
