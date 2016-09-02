import CoffeeBotMainScenario from './CoffeeBotMainScenario'
import CoffeeBotRecipes from './CoffeeBotRecipes'
import CoffeeBotBasics from './CoffeeBotBasics'

const Scenarios = [

  CoffeeBotMainScenario,
  CoffeeBotRecipes,
  CoffeeBotBasics,

].reduce((memo, scenario) => {
  memo[scenario.id] = scenario
  return memo
}, {})


export default Scenarios
