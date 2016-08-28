// @flow
export type Record = {
  yearOfDeath: number,
  residentStatus: string,
  stateOfResidence: string,
  popSizeOfCityOfResidence: string,
  stateOfOccurance: string,
  dateOfDeath: number,
  sex: string,
  race: string,
  age: number,
  maritalStatus: string,
  yearOfBirth: number,
  causeOfDeathOriginal: string,
  causeOfDead34: string
}

export type TransformerFunc = (value: string) => string | number
export type PredicateFunc = (value: string) => bool
export type Column = {
  startPosition: number,
  length: number,
  transformer?: TransformerFunc,
  predicate?: PredicateFunc,
}
export type Transformer = {
  test: RegExp,
  columns: { [key: string]: Column },
  predicate?: (record: Record) => bool,
  postTransform?: (record: Record) => Record,
}
