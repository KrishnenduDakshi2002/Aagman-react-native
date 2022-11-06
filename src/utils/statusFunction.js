
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)


const StatusFunction = (startDate,endDate)=>{
    //in between 
    if(dayjs().isBetween(startDate,endDate,'day',"[]")) return "ongoing";
    //after
    else if(dayjs(startDate).isBefore(dayjs(),'day')) return "finished";
    else if (dayjs(endDate).isAfter(dayjs(),'day')) return "upcoming";
}

export {StatusFunction};