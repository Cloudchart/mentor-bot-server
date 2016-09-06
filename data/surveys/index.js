import FirstSurvey from './FirstSurvey'

const Surveys = [

  FirstSurvey,

].reduce((memo, survey) => {
  memo[survey.id] = survey
  return memo
}, {})


export default Surveys
