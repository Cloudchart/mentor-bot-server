// @flow

import Models from './models'

export { r, run } from './db'

export { Models }

export const start = async () => {
  for (let modelName in Models )
    await Models[modelName].start()
}
