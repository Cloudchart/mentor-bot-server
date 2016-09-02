import Input from './input'
import Message from './message'
import Scenario from './scenario'
import CourseChooser from './course_chooser'
import CardList from './card_list'

export default [

  Input,
  Message,
  Scenario,
  CourseChooser,
  CardList,

].reduce((memo, operation) => {
  memo[operation.type] = operation
  return memo
}, {})
