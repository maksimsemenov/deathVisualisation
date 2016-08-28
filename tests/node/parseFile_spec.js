import { expect } from 'chai'
import parseFile from '../../node/parseFile'
import flow6878 from '../../node/transformers/flow6878'

describe('ParseFile', () => {
  it('Should parse file and return array of records', () => {
    const sourcePath = './tests/node/TESTDATA'
    const result = [
      {
        yearOfDeath: 1974,
        residentStatus: 'Resident',
        stateOfResidence: 'Massachusetts',
        popSizeOfCityOfResidence: '500 000 to 1 000 000',
        stateOfOccurance: 'Massachusetts',
        dateOfDeath: Date.UTC(1974, 7, 7),
        sex: 'Male',
        race: 'Black',
        yearOfBirth: 1971,
        causeOfDeathOriginal: '001 ',
        causeOfDead34: '030',
      },
      {
        yearOfDeath: 1974,
        residentStatus: 'Resident',
        stateOfResidence: 'New Mexico',
        popSizeOfCityOfResidence: '500 000 to 1 000 000',
        stateOfOccurance: 'New Mexico',
        dateOfDeath: Date.UTC(1974, 8, 12),
        sex: 'Male',
        race: 'Black',
        yearOfBirth: 1971,
        causeOfDeathOriginal: '001 ',
        causeOfDead34: '030',
      },
      {
        yearOfDeath: 1974,
        residentStatus: 'Resident',
        stateOfResidence: 'Hawaii',
        popSizeOfCityOfResidence: '500 000 to 1 000 000',
        stateOfOccurance: 'Hawaii',
        dateOfDeath: Date.UTC(1974, 8, 24),
        sex: 'Male',
        race: 'Black',
        yearOfBirth: 1971,
        causeOfDeathOriginal: '001 ',
        causeOfDead34: '030',
      },
    ]
    return parseFile(sourcePath, flow6878).then((res) => {
      expect(res).to.deep.equal(result)
    })
  })
})
