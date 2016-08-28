// @flow
import type { Record } from '../typesDefinitions/fileParse'
import STATES59 from './states59'

export const UNKNOWN = 'Unknown'
export const defaultRecord: Record = {
  yearOfDeath: 1959,
  residentStatus: UNKNOWN,
  stateOfResidence: STATES59[59],
  popSizeOfCityOfResidence: UNKNOWN,
  stateOfOccurance: UNKNOWN,
  dateOfDeath: Date.UTC(1959, 0, 1),
  sex: UNKNOWN,
  race: UNKNOWN,
  age: 0,
  maritalStatus: UNKNOWN,
  yearOfBirth: 1959,
  causeOfDeathOriginal: UNKNOWN,
  causeOfDead34: UNKNOWN,
}
