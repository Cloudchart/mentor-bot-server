// @flow

import Immutable from 'immutable'
import DataLoader from 'dataloader'
import { r, run } from '../db'

type ModelConfig = {
  modelName : string,
  tableName : string,
}

type RecordType = {
  id: string,
}

const compareRecords = (ids: Array<string>) =>
  (a: RecordType, b: RecordType) => {
    let aIndex = ids.indexOf(a.id)
    let bIndex = ids.indexOf(b.id)
    return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0
  }


export default (modelConfig: ModelConfig) => {

  const { modelName, tableName } = modelConfig

  const Table = r.table(tableName)

  const dataLoader = new DataLoader((ids: Array<string>) => {
    return run(Table.getAll(...ids))
      .then(cursor => cursor.toArray())
      .then(records => records.sort(compareRecords(ids)))
      .then(records => records.map(record => Immutable.fromJS(record)))
  })

  const load      = (id)  => dataLoader.load(id)
  const loadMany  = (ids) => dataLoader.loadMany(ids)
  const clear     = (id)  => dataLoader.clear(id)
  const clearAll  = ()    => dataLoader.clearAll()


  const start = async () => {
    // Create table if doesn't exists
    await run(
      r.tableList().do(
        tables =>
          r.branch(
            tables.contains(tableName),
            null,
            r.tableCreate(tableName)
          )
      )
    )

    // Look for data changes
    run(Table.changes()).then(cursor => cursor.each((error, { old_val, new_val }) => {
      if (!old_val && new_val) {
        // Create
        // Do nothing
        console.log('Created user state')
        return
      }

      if (old_val && new_val) {
        // Update
        console.log('Updated user state')
        dataLoader.clear(old_val.id)
        return
      }

      if (old_val && !new_val) {
        // Delete
        console.log('Deleted user state')
        dataLoader.clear(old_val.id)
        return
      }
    }))
  }

  Table.modelName = modelName
  Table.load      = load
  Table.loadMany  = loadMany
  Table.clear     = clear
  Table.clearAll  = clearAll

  Table.start     = start

  return Table

}
