// @flow

import {
  Map,
  Set,
  fromJS,
} from 'immutable'

import DataLoader from 'dataloader'
import { r, run } from '../db'

type ModelConfig = {
  modelName : string,
  tableName : string,
}

type RecordType = {
  id: string,
}

let Callbacks = new Map({
  create  : new Set,
  update  : new Set,
  delete  : new Set,
})

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
      .then(records => records.map(record => fromJS(record)))
  })

  const load      = (id)  => dataLoader.load(id)
  const loadMany  = (ids) => dataLoader.loadMany(ids)
  const clear     = (id)  => dataLoader.clear(id)
  const clearAll  = ()    => dataLoader.clearAll()


  const on = (event: string, callback: Function) => {
    Callbacks = Callbacks.set(event, Callbacks.get(event).add(callback))
  }

  const off = (event: string, callback: Function) => {
    Callbacks = Callbacks.set(event, Callbacks.get(event).delete(callback))
  }


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
    run(Table.changes()).then(cursor => cursor.each(async (error, { old_val, new_val }) => {
      if (!old_val && new_val) {
        Callbacks.get('create').forEach(
          callback =>
            callback(new_val)
        )
        return
      }

      if (old_val && new_val) {
        dataLoader.clear(old_val.id)
        Callbacks.get('update').forEach(
          callback =>
            callback(old_val, new_val)
        )
        return
      }

      if (old_val && !new_val) {
        dataLoader.clear(old_val.id)
        Callbacks.get('update').forEach(
          callback =>
            callback(old_val)
        )
        return
      }
    }))
  }

  Table.modelName = modelName

  Table.load      = load
  Table.loadMany  = loadMany
  Table.clear     = clear
  Table.clearAll  = clearAll

  Table.on        = on
  Table.off       = off

  Table.start     = start

  return Table

}
