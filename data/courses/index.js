import CoffeeBotBasics from './CoffeeBotBasics'
import CoffeeBotRecipes from './CoffeeBotRecipes'
import ZeptoBotBasics from './ZeptoBotBasics'


const Courses = [

  CoffeeBotBasics,
  CoffeeBotRecipes,
  ZeptoBotBasics,

].reduce((memo, course) => {
  memo[course.id] = course
  return memo
}, {})


export default Courses
