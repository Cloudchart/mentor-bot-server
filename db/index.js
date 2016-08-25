import r from 'rethinkdb'
import url from 'url'

let { host, port, auth, path } = url.parse(process.env.DATABASE_URL)
let [user, password] = (auth || '').split(':')

let config = {
  host,
  port,
  db        : path.slice(1),
  user      : user || 'admin',
  password  : password || '',
}

const connection = r.connect(config)

const run = async (expr) => expr.run(await connection)

export {
  r,
  run
}
