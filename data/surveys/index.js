import FirstSurvey from './FirstSurvey'
import Zepto from './Zepto'

const Surveys = [

  FirstSurvey,
  Zepto,

].reduce((memo, survey) => {
  memo[survey.id] = survey
  return memo
}, {})


export default Surveys
