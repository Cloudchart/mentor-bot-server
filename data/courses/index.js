import CoffeeBotBasics from './CoffeeBotBasics'
import CoffeeBotRecipes from './CoffeeBotRecipes'


const Courses = [

  CoffeeBotBasics,
  CoffeeBotRecipes,

].reduce((memo, course) => {
  memo[course.id] = course
  return memo
}, {})


export default Courses
