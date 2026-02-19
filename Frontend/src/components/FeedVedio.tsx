const FeedVedio = () => {
  return (
    <div className='flex flex-col items-left gap-1 mt-15'>
      <div className='bg-black w-80 h-50 rounded-xl mt-2 ml-2 inline-block'></div>
      <div className=' h-20 inline-block w-80 ml-2'>

      <div className=' h-12 flex flex-row justify-center items-center gap-2'>
      <div className=' rounded-full w-10 h-10 overflow-hidden'>
        <img src='/Img.jpeg' alt="channel img" />
      </div>{/*Icons*/}
      <div className=' w-60 h-12 line-clamp-2 font-medium leading-5 pt-1 '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, ipsum numquam, dolorem voluptate sint, doloremque asperiores perferendis quaerat nulla quasi autem fugit minima? Ex doloribus eveniet cumque pariatur illum quis.</div>{/*Vedio Title*/}
      </div>{/*Icon + Vedio Title */} 

      <div className=' h-8 pl-16 text-[12px] leading-4 text-gray-500 font-medium'>
      <div>Dhruv Rathee</div>{/*Channel NAME*/}
      <div className='flex flex-row items-center gap-1 '>
        <h1>44m Views</h1>
        <div className='w-1 h-1 rounded-full bg-gray-500'></div>
        <h1>3 years ago</h1>
      </div>{/*vIEWS and Timeline */}

      </div> 

      </div>{/*Big box*/}
      
    </div>
  )
}

export default FeedVedio