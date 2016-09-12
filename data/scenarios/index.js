import CoffeeBotMainScenario from './CoffeeBotMainScenario'
import CoffeeBotRecipes from './CoffeeBotRecipes'
import CoffeeBotBasics from './CoffeeBotBasics'
import PlanetaBotMain from './PlanetaBotMain'
import ZeptoBotMain from './ZeptoBotMain'
import ZeptoBotBasics from './ZeptoBotBasics'

const Scenarios = [

  CoffeeBotMainScenario,
  CoffeeBotRecipes,
  CoffeeBotBasics,
  PlanetaBotMain,
  ZeptoBotMain,
  ZeptoBotBasics,

].reduce((memo, scenario) => {
  memo[scenario.id] = scenario
  return memo
}, {})


export default Scenarios
