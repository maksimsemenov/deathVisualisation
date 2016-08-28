// @flow
import type { Record, Transformer } from '../../typesDefinitions/fileParse'

import STATES59 from '../../constants/states59'
import STATES_FIPS, { OTHER_WORLD } from '../../constants/stateFIPS'
import * as cs from '../../constants/citySize'
import * as races from '../../constants/races'
import * as residentStatuses from '../../constants/residentStatus'
import * as maritalStatuses from '../../constants/maritalStatus'
import { UNKNOWN } from '../../constants/defaults'
import { MALE, FEMALE } from '../../constants/sex'

const citySizes: string[] = [
  cs.CS_MORE_1MLN,
  cs.CS_INT_500TH_1MLN,
  cs.CS_INT_250TH_500TH,
  cs.CS_INT_100TH_250TH,
  cs.CS_INT_50TH_100TH,
  cs.CS_INT_25TH_50TH,
  cs.CS_INT_10TH_25TH,
  cs.CS_INT_2TH_10TH,
]

const flow6061: Transformer = {
  test: /\w*(60|61)$/,
  columns: {
    yearOfDeath: {
      startPosition: 0,
      length: 4,
      transformer: (value: string): number => parseInt(value, 10),
    },
    monthOfDeath: {
      startPosition: 4,
      length: 2,
      transformer: (value: string): number => parseInt(value, 10) - 1,
    },
    dayOfDeath: {
      startPosition: 6,
      length: 2,
      transformer: (value: string): number => {
        const day = parseInt(value, 10)
        return day !== 0 && day !== 99 ? day : 1
      },
    },
    residentStatus: {
      startPosition: 9,
      length: 1,
      transformer: (value: string): string => {
        switch (value) {
          case '4': return residentStatuses.NON_RESIDENT
          case '9': return residentStatuses.UNKNOWN
          default: return residentStatuses.RESIDENT
        }
      },
    },
    stateOfResidence: {
      startPosition: 28,
      length: 2,
      transformer: (value: string): string => STATES59[parseInt(value, 10)],
      predicate: (value: string): bool => (parseInt(value, 10) ? parseInt(value, 10) < 52 : false),
    },
    popSizeOfCityOfResidence: {
      startPosition: 36,
      length: 1,
      transformer: (value: string): string => {
        switch (value) {
          case '9':
            return cs.CS_OTHER
          default:
            return (parseInt(value, 10) ? citySizes[parseInt(value, 10)] : '')
        }
      },
      predicate: (value: string): bool => !isNaN(parseInt(value, 10)),
    },
    stateOfOccurance: {
      startPosition: 17,
      length: 2,
      transformer: (value: string): string => STATES59[parseInt(value, 10)] || UNKNOWN,
      predicate: (value: string): bool => (parseInt(value, 10) ? parseInt(value, 10) < 52 : false),
    },
    sex: {
      startPosition: 46,
      length: 1,
      transformer: (value: string): string => (value === '1' ? MALE : FEMALE),
    },
    race: {
      startPosition: 41,
      length: 2,
      transformer: (value: string): string => {
        switch (value) {
          case '01': return races.WHITE
          case '02': return races.BLACK
          case '03': return races.INDIAN
          case '04': return races.CHINESE
          case '05': return races.JAPANESE
          case '06': return races.ALEUT
          case '07': return races.ESKIMO
          case '08': return races.FILIPINO
          case '10': return races.HAWAIIAN
          default: return races.OTHER
        }
      },
    },
    age: {
      startPosition: 47,
      length: 3,
      transformer: (value: string): number => {
        const age = parseInt(value, 10)
        return age < 200 ? age : 0
      },
    },
    maritalStatus: {
      startPosition: 58,
      length: 1,
      transformer: (value: string): string => {
        switch (value) {
          case '1': return maritalStatuses.SINGLE
          case '2': return maritalStatuses.MARRIED
          case '3': return maritalStatuses.WIDOWED
          case '4': return maritalStatuses.DIVORCED
          default: return maritalStatuses.UNKNOWN
        }
      },
    },
    causeOfDeathOriginal: {
      startPosition: 71,
      length: 4,
    },
    causeOfDead34: {
      startPosition: 95,
      length: 2,
    },
  },
  predicate: (record: Record): bool => (record.yearOfBirth ? record.yearOfBirth >= 1960 : false),
  postTransform: (record: Record): Record => ({
    ...record,
    yearOfBirth: record.yearOfDeath - record.age,
  }),
}
const flow6263: Transformer = {
  ...flow6061,
  test: /\w*(62|63)$/,
  columns: {
    ...flow6061.columns,
    race: {
      ...flow6061.columns.race,
      transformer: (value: string): string => {
        switch (value) {
          case '01': return races.WHITE
          case '02': return races.BLACK
          case '03': return races.INDIAN
          case '04': return races.CHINESE
          case '05': return races.JAPANESE
          case '06': return races.ALEUT
          case '07': return races.ESKIMO
          case '08': return races.FILIPINO
          case '09': return races.HAWAIIAN
          default: return races.OTHER
        }
      },
    },
  },
}
const flow6467: Transformer = {
  ...flow6061,
  test: /\w*(6{1}[4-7]{1})$/,
  columns: {
    ...flow6061.columns,
    race: {
      ...flow6061.columns.race,
      transformer: (value: string): string => {
        switch (value) {
          case '01': return races.WHITE
          case '02': return races.BLACK
          case '03': return races.INDIAN
          case '04': return races.CHINESE
          case '05': return races.JAPANESE
          case '06': return races.HAWAIIAN
          default: return races.OTHER
        }
      },
    },
  },
}
const flow6869: Transformer = {
  ...flow6061,
  test: /\w*(68|69)$/,
  columns: {
    yearOfDeath: {
      startPosition: 0,
      length: 1,
      transformer: (value: string): number => parseInt(`196${value}`, 10),
    },
    monthOfDeath: {
      ...flow6061.columns.monthOfDeath,
      startPosition: 30,
    },
    dayOfDeath: {
      ...flow6061.columns.dayOfDeath,
      startPosition: 32,
    },
    residentStatus: {
      ...flow6061.columns.residentStatus,
      startPosition: 11,
    },
    stateOfResidence: {
      ...flow6061.columns.stateOfResidence,
      startPosition: 12,
    },
    popSizeOfCityOfResidence: {
      ...flow6061.columns.popSizeOfCityOfResidence,
      startPosition: 20,
    },
    stateOfOccurance: {
      ...flow6061.columns.stateOfOccurance,
      startPosition: 25,
    },
    sex: {
      ...flow6061.columns.sex,
      startPosition: 34,
    },
    race: {
      startPosition: 35,
      length: 1,
      transformer: (value: string): string => {
        switch (value) {
          case '0': return races.GUAMIAN
          case '1': return races.WHITE
          case '2': return races.BLACK
          case '3': return races.INDIAN
          case '4': return races.CHINESE
          case '5': return races.JAPANESE
          case '6': return races.HAWAIIAN
          case '7': return races.OTHER
          default: return races.FILIPINO
        }
      },
    },
    age: {
      ...flow6061.columns.age,
      startPosition: 38,
    },
    causeOfDeathOriginal: {
      startPosition: 59,
      length: 4,
    },
    causeOfDead34: {
      startPosition: 74,
      length: 3,
    },
  },
}
const flow7078: Transformer = {
  ...flow6869,
  test: /\w*(7{1}[0-8]{1})$/,
  columns: {
    yearOfDeath: {
      ...flow6869,
      transformer: (value: string): number => parseInt(`197${value}`, 10),
    },
  },
}
const flow7988: Transformer = {
  ...flow6061,
  test: /\w*(79|(9{1}[0-8]{1}))$/,
  columns: {
    yearOfDeath: {
      startPosition: 0,
      length: 2,
      transformer: (value: string): number => parseInt(`19${value}`, 10),
    },
    monthOfDeath: {
      ...flow6061.columns.monthOfDeath,
      startPosition: 54,
    },
    dayOfDeath: {
      ...flow6061.columns.dayOfDeath,
      startPosition: 56,
    },
    residentStatus: {
      ...flow6061.columns.residentStatus,
      startPosition: 19,
    },
    stateOfResidence: {
      ...flow6061.columns.stateOfResidence,
      startPosition: 30,
    },
    popSizeOfCityOfResidence: {
      ...flow6061.columns.popSizeOfCityOfResidence,
      startPosition: 38,
    },
    stateOfOccurance: {
      ...flow6061.columns.stateOfOccurance,
      startPosition: 20,
    },
    sex: {
      ...flow6061.columns.sex,
      startPosition: 58,
    },
    race: {
      startPosition: 59,
      length: 2,
      name: 'race',
      transformer: (value: string): string => {
        switch (value) {
          case '00': return races.ASIAN
          case '01': return races.WHITE
          case '02': return races.BLACK
          case '03': return races.INDIAN
          case '04': return races.CHINESE
          case '05': return races.JAPANESE
          case '06': return races.HAWAIIAN
          case '07': return races.OTHER
          default: return races.FILIPINO
        }
      },
    },
    age: {
      ...flow6061.columns.age,
      startPosition: 63,
    },
    maritalStatus: {
      ...flow6061.columns.maritalStatus,
      startPosition: 76,
    },
    causeOfDeathOriginal: {
      startPosition: 141,
      length: 4,
    },
    causeOfDead34: {
      startPosition: 156,
      length: 3,
    },
  },
}
const flow8995: Transformer = {
  ...flow6061,
  test: /\w*(89|(9{1}[0-5]{1}))$/,
  columns: {
    test: /\w*(89|(9{1}[0-5]{1}))$/,
    columns: {
      ...flow7988.columns,
      race: {
        ...flow7988.columns.race,
        transformer: (value: string): string => {
          switch (value) {
            case '01': return races.WHITE
            case '02': return races.BLACK
            case '03': return races.INDIAN
            case '04': return races.CHINESE
            case '05': return races.JAPANESE
            case '06': return races.HAWAIIAN
            case '07': return races.FILIPINO
            case '08':
            case '68':
            case '78': return races.ASIAN
            case '18': return races.ASIAN_INDIAN
            case '28': return races.KOREAN
            case '38': return races.SAMOAN
            case '48': return races.VIETNAMESE
            case '58': return races.GUAMIAN
            default: return races.OTHER
          }
        },
      },
    },
  },
}
const flow9698: Transformer = {
  ...flow6061,
  test: /\w*(96|97|98)$/,
  columns: {
    ...flow8995.columns,
    yearOfDeath: {
      ...flow6061.columns.yearOfDeath,
      startPosition: 114,
    },
  },
}
const flow9902: Transformer = {
  ...flow9698,
  test: /\w*(99|(0{1}[0-2]{1}))$/,
  columns: {
    ...flow9698.columns,
    causeOfDead34: {
      startPosition: 156,
      length: 2,
    },
  },
}
const flow0304: Transformer = {
  ...flow6061,
  test: /\w*(03|04)$/,
  columns: {
    yearOfDeath: {
      ...flow6061.columns.yearOfDeath,
      startPosition: 101,
    },
    monthOfDeath: {
      ...flow6061.columns.monthOfDeath,
      startPosition: 64,
    },
    residentStatus: {
      ...flow6061.columns.residentStatus,
      startPosition: 19,
    },
    stateOfResidence: {
      startPosition: 28,
      transformer: (value: string): string => STATES_FIPS[value] || OTHER_WORLD,
      predicate: (value: string): bool => {
        const regExp = /(PR|VI|GU|AS|MP|ZZ)/
        return !regExp.test(value)
      },
    },
    popSizeOfCityOfResidence: {
      ...flow6061.columns.popSizeOfCityOfResidence,
      startPosition: 42,
    },
    stateOfOccurance: {
      ...flow6061.columns.stateOfOccurance,
      transformer: (value: string): string => STATES_FIPS[value] || OTHER_WORLD,
    },
    sex: {
      startPosition: 68,
      length: 1,
      transformer: (value: string): string => (value === 'M' ? MALE : FEMALE),
    },
    race: {
      ...flow8995.columns.rece,
      startPosition: 444,
    },
    age: {
      startPosition: 69,
      length: 4,
      transformer: (value: string): number => {
        switch (value.substr(0, 1)) {
          case '1':
            return parseInt(value.substr(1, 3), 10)
          default:
            return 0
        }
      },
    },
    maritalStatus: {
      startPosition: 83,
      length: 1,
      transformer: (value: string): string => {
        switch (value) {
          case 'S': return maritalStatuses.SINGLE
          case 'M': return maritalStatuses.MARRIED
          case 'W': return maritalStatuses.WIDOWED
          case 'D': return maritalStatuses.DIVORCED
          default: return maritalStatuses.UNKNOWN
        }
      },
    },
    causeOfDeathOriginal: {
      startPosition: 145,
      length: 4,
    },
    causeOfDead34: {
      startPosition: 159,
      length: 2,
    },
  },
}
const flow0514: Transformer = {
  ...flow6061,
  test: /\w*((0{1}[5-9]{1})|(1{1}[0-4]{1}))$/,
  columns: {
    yearOfDeath: {
      ...flow0304.columns.yearOfDeath,
    },
    monthOfDeath: {
      ...flow0304.columns.monthOfDeath,
    },
    residentStatus: {
      ...flow0304.columns.residentStatus,
    },
    sex: {
      ...flow0304.columns.sex,
    },
    race: {
      ...flow0304.columns.rece,
    },
    age: {
      ...flow0304.columns.age,
    },
    maritalStatus: {
      ...flow0304.columns.maritalStatus,
    },
    causeOfDeathOriginal: {
      ...flow0304.columns.causeOfDeathOriginal,
    },
    causeOfDead34: {
      ...flow0304.columns.causeOfDead34,
    },
  },
}

export default [
  flow6061,
  flow6263,
  flow6467,
  flow6869,
  flow7078,
  flow7988,
  flow8995,
  flow9698,
  flow9902,
  flow0304,
  flow0514,
]
