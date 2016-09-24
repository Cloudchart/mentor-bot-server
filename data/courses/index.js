import CoffeeBotBasics from './CoffeeBotBasics'
import CoffeeBotBasicsEn from './CoffeeBotBasicsEn'
import CoffeeBotBasicsRu from './CoffeeBotBasicsRu'
import CoffeeBotRecipes from './CoffeeBotRecipes'
import CoffeeBotRecipesEn from './CoffeeBotRecipesEn'
import CoffeeBotRecipesRu from './CoffeeBotRecipesRu'
import ZeptoBotBasics from './ZeptoBotBasics'


const Courses = [

  CoffeeBotBasics,
  CoffeeBotBasicsEn,
  CoffeeBotBasicsRu,
  CoffeeBotRecipes,
  CoffeeBotRecipesEn,
  CoffeeBotRecipesRu,

  ZeptoBotBasics,

].reduce((memo, course) => {
  memo[course.id] = course
  return memo
}, {})


export default Courses
