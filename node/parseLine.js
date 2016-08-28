// @flow
import type { Record, Transformer, Column } from '../typesDefinitions/fileParse'

import { defaultRecord } from '../constants/defaults'

function* columns(obj: { [key: string]: Column }) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}

const parseLine = (line: string, transformer: Transformer): ?Record => {
  const temp: Record = defaultRecord
  let predicateCheck: bool = true
  if (transformer.columns) {
    for (const [columnName, column] of columns(transformer.columns)) {
      const value = line.substr(column.startPosition, column.length)
      if (!column.predicate || (column.predicate && column.predicate(value))) {
        const result = column.transformer ? column.transformer(value) : value
        temp[columnName] = result
      } else {
        predicateCheck = false
      }
    }
  }
  if (!predicateCheck || (transformer.predicate && !transformer.predicate(temp))) {
    return undefined
  }
  if (transformer.postTransform) { return transformer.postTransform(temp) }
  return temp
}

export default parseLine
