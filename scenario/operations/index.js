import Input from './input'
import Message from './message'
import Image from './image'
import Scenario from './scenario'
import CourseChooser from './course_chooser'
import CardList from './card_list'
import Survey from './survey'
import Timer from './timer'

export default [

  Input,
  Message,
  Image,
  Scenario,
  CourseChooser,
  CardList,
  Survey,
  Timer,

].reduce((memo, operation) => {
  memo[operation.type] = operation
  return memo
}, {})
