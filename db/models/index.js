import User from './user'
import UserState from './user_state'


const Models = [

  User,
  UserState

].reduce((memo, model) => { memo[model.modelName] = model ; return memo }, {})


module.exports = Models

export default Models
