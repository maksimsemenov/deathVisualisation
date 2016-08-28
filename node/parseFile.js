// @flow
import type { Transformer, Record } from '../typesDefinitions/fileParse'

import readline from 'readline'
import fs from 'fs'
import parseLine from './parseLine'

const parseFile = (filePath: string, transformer: Transformer) => (
  new Promise((resolve, reject) => {
    const result: Record[] = []
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    })
    rl.on('line', (line) => {
      const record = parseLine(line, transformer)
      if (record) { result.push(record) }
    })
    rl.on('close', () => { resolve(result) })
  })
)

export default parseFile
