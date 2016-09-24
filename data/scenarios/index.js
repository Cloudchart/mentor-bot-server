import CoffeeBotMainScenario from './CoffeeBotMainScenario'
import CoffeeBotMainEn from './CoffeeBotMainEn'
import CoffeeBotMainRu from './CoffeeBotMainRu'

import CoffeeBotRecipes from './CoffeeBotRecipes'
import CoffeeBotRecipesEn from './CoffeeBotRecipesEn'
import CoffeeBotRecipesRu from './CoffeeBotRecipesRu'

import CoffeeBotBasics from './CoffeeBotBasics'
import CoffeeBotBasicsEn from './CoffeeBotBasicsEn'
import CoffeeBotBasicsRu from './CoffeeBotBasicsRu'

import PlanetaBotMain from './PlanetaBotMain'
import ZeptoBotMain from './ZeptoBotMain'
import ZeptoBotBasics from './ZeptoBotBasics'

const Scenarios = [

  CoffeeBotMainScenario,
  CoffeeBotMainEn,
  CoffeeBotMainRu,

  CoffeeBotRecipes,
  CoffeeBotRecipesEn,
  CoffeeBotRecipesRu,

  CoffeeBotBasics,
  CoffeeBotBasicsEn,
  CoffeeBotBasicsRu,

  PlanetaBotMain,
  ZeptoBotMain,
  ZeptoBotBasics,

].reduce((memo, scenario) => {
  memo[scenario.id] = scenario
  return memo
}, {})


export default Scenarios
