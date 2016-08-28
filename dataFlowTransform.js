// @flow
import fs from 'fs'
import path from 'path'
import join from 'lodash/join'
import parseFile from './node/parseFile'
import output from './constants/output'
import flowTransformers from './node/transformers/flow'

const sourceFolder = './data/rawData'

const flowFolderPath = './data/flow'
const folderStat = fs.statSync(flowFolderPath)
if (!folderStat.isDirectory() && !folderStat.isFile()) { fs.mkdirSync(flowFolderPath) }

const writeStream = fs.createWriteStream('data/mortFlow.csv')
writeStream.write(join(output, ',').concat('\n'))


const files = fs.readdirSync(sourceFolder)
files.forEach(fileName => {
  const transformer = flowTransformers.filter(tr => tr.test.test(fileName))[0]
  if (transformer) {
    console.log(`Start parsing ${fileName}`) // eslint-disable-line no-console
    const sourcePath = path.join(sourceFolder, fileName)
    parseFile(sourcePath, transformer).then((results) => {
      const toWrite = results.map(result => join(output.map(column => result[column]), ','))

      // Write separate file for each data
      const fileWriteStream = fs.createWriteStream(path.join(flowFolderPath, `${fileName}.csv`))
      fileWriteStream.write(join(output, ',').concat('\n')) // Write header string
      fileWriteStream.write(join(toWrite, '\n'), 'UTF-8', () => { fileWriteStream.close() })

      // Write sample file for each data
      const sampleWriteStream = fs.createWriteStream(path.join(flowFolderPath, `${fileName}-sample.csv`)) // eslint-disable-line max-len
      sampleWriteStream.write(join(output, ',').concat('\n')) // Write header string
      sampleWriteStream.write(
        join(toWrite.slice(0, 100), '\n'),
        'UTF-8',
        () => { fileWriteStream.close() }
      )

      // Write to main file
      try {
        writeStream.write(join(toWrite, '\n'), 'UTF-8', () => {
          console.log(`Finished parsing ${fileName}`) // eslint-disable-line no-console, max-len
        })
      } catch (err) {
        console.log(`Couldn\'t write to main stream file ${fileName}`, err) // eslint-disable-line no-console, max-len
      }
    })
  }
})
