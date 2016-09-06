import CoffeeBotMainScenario from './CoffeeBotMainScenario'
import CoffeeBotRecipes from './CoffeeBotRecipes'
import CoffeeBotBasics from './CoffeeBotBasics'
import PlanetaBotMain from './PlanetaBotMain'

const Scenarios = [

  CoffeeBotMainScenario,
  CoffeeBotRecipes,
  CoffeeBotBasics,
  PlanetaBotMain,

].reduce((memo, scenario) => {
  memo[scenario.id] = scenario
  return memo
}, {})


export default Scenarios
