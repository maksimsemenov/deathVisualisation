// @flow
import type { Transformer } from '../typesDefinitions/fileParse'

import fs from 'fs'
import path from 'path'
import join from 'lodash/join'

/* const parseData = (
  sourcePath: string,
  resultPath: string,
  resultColumns: string[],
  transformers: Transformer[],
) => {
  const filesList = fs.readdirSync(sourcePath)
  const outputFile = fs.createWriteStream(resultPath)
  outputFile.on('close', () => {
    console.log(`Write stream was closed. ${outputFile.bytesWritten()} bytes written`)
  })
  try {
    outputFile.write(join(resultColumns, ',').concat('/n'))
  } catch (error) {
    console.log('Couldn\'t write to file: ', error) // eslint-disable-line no-console
  }
}

export default parseData*/
