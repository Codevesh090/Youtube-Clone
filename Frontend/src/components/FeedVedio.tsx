interface VedioData {
  Thumbnail:string
  Title:string
  ProfilePicture:string
  Views:number
  ChannelName:string
  createdAt:string
}


const FeedVedio = (prop:VedioData) => {

  function Timeago (CreatedTime:string){
  const createdDate = new Date(CreatedTime); //As the createdAt is in string form "2026-02-24T10:15:30.000Z" , so it convert it into date object and then into milliseconds
  const currentDate = new Date();
  const timePassed = currentDate.getTime()-createdDate.getTime() //we get timePasses in milliseconds 

  const seconds = Math.floor(timePassed/1000);
  const minutes = Math.floor(seconds/60);
  const hours =Math.floor(minutes/60);
  const days = Math.floor(hours/24);
  const months = Math.floor(days/30);
  const years = Math.floor(months/12);

  if(seconds<60)return `${seconds} ${seconds<2 ? ("second"):("seconds")} ago`
  if(minutes<60)return `${minutes} ${minutes<2 ? ("minute"):("minutes")} ago`
  if(hours<24)return `${hours} ${hours<2 ? ("hour"):("hours")} ago`
  if(days<31)return `${days} ${days<2 ? ("day"):("days")} ago`
  if(months<12)return `${months} ${months<2 ? ("month"):("months")} ago`
  return `${years} ${years<2 ? ("year"):("years")} ago`

  }
  return (
    <div className='flex flex-col items-left gap-1 mt-15'>
      <div className=' w-80 h-50 rounded-xl mt-2 ml-2 inline-block overflow-hidden border border-white/20'>
        <img src={prop.Thumbnail} alt="feed Vedio" className="w-full h-full object-cover"/>
      </div>
      <div className=' h-20 inline-block w-80 ml-2'>

      <div className=' h-12 flex flex-row justify-center items-center gap-2'>
      <div className=' rounded-full w-10 h-10 overflow-hidden'>
        <img src={prop.ProfilePicture} alt="channel img" />
      </div>{/*Icons*/}
      <div className=' w-60 h-12 line-clamp-2 font-medium leading-5 pt-1 text-white '>{prop.Title}</div>{/*Vedio Title*/}
      </div>{/*Icon + Vedio Title */} 

      <div className=' h-8 pl-16 text-[12px] leading-4 text-gray-500 font-medium'>
      <div>{prop.ChannelName}</div>{/*Channel NAME*/}
      <div className='flex flex-row items-center gap-1 '>
        <h1>{prop.Views} Views</h1>
        <div className='w-1 h-1 rounded-full bg-gray-500'></div>
        <h1>{Timeago(prop.createdAt)}</h1>
      </div>{/*vIEWS and Timeline */}

      </div> 

      </div>{/*Big box*/}
      
    </div>
  )
}

export default FeedVedio