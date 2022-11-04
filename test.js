import dayjs from 'dayjs';

const today = dayjs()
console.log(today)

const postDate = dayjs('2022-11-11T12:10:27.638Z').format();
console.log(postDate)

console.log(today.diff(postDate,'day'))
