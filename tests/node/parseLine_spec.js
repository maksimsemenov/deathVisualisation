import { expect } from 'chai'
import parseLine from '../../node/parseLine'
import flow6878 from '../../node/transformers/flow6878'

describe('ParseLine', () => {
  it('Should parse given line', () => {
    const line = '4080      22210040091019121003080712220030919  525299      001 00300130080030              000000302101001 020141090                                                                                                02001 041090                                                             ' // eslint-disable-line
    const result = {
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
    }
    expect(parseLine(line, flow6878)).to.deep.equal(result)
  })
  it('Should filter according root transformer predicate', () => {
    const line = '4080      22210040091019121003080712220170919  525299      001 00300130080030              000000302101001 020141090                                                                                                02001 041090                                                             ' // eslint-disable-line
    expect(parseLine(line, flow6878)).to.equal(undefined)
  })
  it('Should filter according state predicate', () => {
    const line = '4080      22520040091019121003080712220030919  525299      001 00300130080030              000000302101001 020141090                                                                                                02001 041090                                                             ' // eslint-disable-line
    expect(parseLine(line, flow6878)).to.equal(undefined)
  })
  it('Should filter according city size predicate', () => {
    const line = '4080      2221004009Z019121003080712220030919  525299      001 00300130080030              000000302101001 020141090                                                                                                02001 041090                                                             ' // eslint-disable-line
    expect(parseLine(line, flow6878)).to.equal(undefined)
  })
})
