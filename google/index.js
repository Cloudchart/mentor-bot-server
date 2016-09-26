import fetch from 'node-fetch'
import qs from 'querystring'


const collect_screen = ({ user, app_name, content }) => {
  const query = qs.stringify({
    v     : '1',
    t     : 'screenview',
    tid   : process.env.GOOGLE_TOKEN,
    cid   : user,
    an    : app_name,
    cd    : content,
  })

  return fetch(`https://www.google-analytics.com/collect?${query}`, {
    method  : 'POST',
    headers : {
      'Accepts'       : 'application/json',
      'Content-Type'  : 'application/json',
    }
  }).catch(console.error)
}

const collect_event = ({ user, category, action, label, interactive }) => {
  const query = qs.stringify({
    v     : '1',
    t     : 'event',
    tid   : process.env.GOOGLE_TOKEN,
    cid   : user,
    ec    : category,
    ea    : action,
    el    : label,
    ni    : !interactive
  })

  return fetch(`https://www.google-analytics.com/collect`, {
    method  : 'POST',
    headers : {
      'Accepts'       : 'application/json',
      'Content-Type'  : 'application/json',
    },
    body    : query
  }).catch(console.error)
}


export default {
  collect_screen,
  collect_event,
}
