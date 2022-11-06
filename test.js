import dayjs from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

import { StatusFunction } from '../../../src/utils/statusFunction';

const today = dayjs()
console.log(today)

const postDate = dayjs('2022-11-11T12:10:27.638Z').format();
console.log(postDate)

console.log(today.diff(postDate,'day'))


console.log(dayjs('2022-10-30').isBetween('2022-10-01', '2022-10-30','day', '[]'))

console.log(StatusFunction('2022-10-22','2022-10-22'))