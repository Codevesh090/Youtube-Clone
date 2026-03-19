import { MdOutlineMenu } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const YourChannel = () => {
  return (
    <div>
    <div className="min-h-screen flex flex-col bg-black">

    {/* Navbar */}
    <header className="w-full bg-[#0F0F0F] shadow-md">
    <div className="bg-[#0F0F0F] h-14 flex items-center justify-between">
      <div className="flex gap-2 items-center">
      <img src="/Youtube.svg" className="pl-18"/>
      <p className="text-white font-bold text-3xl">YOUTUBE</p>
      </div>
      <div className="flex gap-2 pr-2">
        <button className="w-30 h-10 bg-green-600 rounded-xl ">Upload button</button>
        <button className="w-30 h-10 bg-purple-500 rounded-xl ">Go Back</button>
      </div>
    </div> {/*Navbar*/}
    </header>
   
   {/*Sidebar*/}
  <div className="relative">
  <div className="fixed bottom-0 left-0 w-16 h-screen bg-[#0F0F0F] text-amber-50">
    
    <div className="mt-3.5 flex flex-col items-center gap-7">
      
      <div className="flex flex-col items-center">
        <MdOutlineMenu className="text-3xl" />
      </div>

      <div className="flex flex-col items-center">
        <GoHomeFill className="text-2xl" />
        <p className="text-[10px]">Home</p>
      </div>

      <div className="flex flex-col items-center">
        <SiYoutubeshorts className="text-2xl" />
        <p className="text-[10px]">Shorts</p>
      </div>

      <div className="flex flex-col items-center">
        <MdSubscriptions className="text-2xl" />
        <p className="text-[10px]">Subscriptions</p>
      </div>

      <div className="flex flex-col items-center">
        <FaUserCircle className="text-2xl" />
        <p className="text-[10px]">You</p>
      </div>

    </div>

  </div>
</div>
  
   {/*Sidebar*/}


    {/* Main Body */}
    <main className="flex-1 bg-black flex flex-col items-center gap-2">
    <div className="w-[1285px] h-[208px] rounded-xl bg-white mt-2 ml-10 overflow-hidden">
      <img src="/channelBanner.jpg" alt="bannerImg" />
    </div>

    <div className="w-[1284px] h-[250px] ml-11  flex items-center gap-8">
    <div className="bg-white w-[180px] h-[180px] rounded-full overflow-hidden flex items-center justify-center"><img src="/100xprofile.jpg" alt="bannerImg" /></div>
   
   <div className="w-250 h-55 flex flex-col gap-2 mt-8">
      <h1 className="text-5xl font-semibold font-sans text-white">100x school</h1>

      <div className="flex gap-2 text-[13px] items-center">
        <h1 className="text-white font-semibold">@100xSchool</h1>
        <div className="rounded-full bg-[#696969] w-1 h-1"></div>
        <h1 className="text-[#696969]">5.65m subscribers</h1>
        <div className="rounded-full bg-[#696969] w-1 h-1"></div>
        <h1 className="text-[#696969]">1.6k videos</h1>
      </div>
      
      <div className="w-[500px]">
        <p className="text-[13px] text-[#696969] line-clamp-2">
          It's youtube clone made by devesh. This project took very much time to make,
          it is not a boring project but a creative and fast paced work hjsvchksdvcdsjcvdsiyjsdfcuydscfsdkhsdcvskdcvsdkhvsdhcdh,cvdsc kydscksd
        </p>

        <span className="text-[13px] text-white cursor-pointer">
          more
        </span>
      </div>

      <div className="flex flex-row gap-2">
      <button className="bg-[#363636] rounded-full w-25 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Subscribe</button>
      <button className="bg-[#363636] rounded-full w-16 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Join</button>
      <button className="bg-[#363636] rounded-full w-32 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Visit Community</button>
      </div>

  </div>
  </div>

<div className="w-[1284px] ml-11 ">

{/*Home , Videos , Playlists , Podcasts , Posts*/}
 <div className="text-white font-medium flex flex-row gap-8 items-center">
 <div className="flex flex-col items-center gap-3 ">
  <h1 className="text-[#696969] hover:text-white">Home</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-white">Videos</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-[#696969] hover:text-white">Shorts</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-[#696969] hover:text-white">Live</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-[#696969] hover:text-white">Podcasts</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-[#696969] hover:text-white">Playlists</h1>
 </div>

 <div className="flex flex-col items-center gap-3">
  <h1 className="text-[#696969] hover:text-white">Posts</h1>
 </div>

 <div>
 <FiSearch className="text-xl font-bold text-[#696969] hover:text-white"/>
 </div>

 </div>
{/*Divider*/}


{/*Divider*/}
<div className="h-px flex-1 bg-[#696969] mt-3"></div>
{/*Divider*/}
</div>


<div className="w-[1284px] ml-11 grid grid-cols-5">




{/*full card 1 ------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/vBYsTGvVLpQ/mqdefault_6s.webp?du=3000&sqp=CNDj6c0G&rs=AOn4CLCjQps3rv6eNlGGkrINZ235frHutw"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 2 ------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/F2KWxUBXYSY/mqdefault_6s.webp?du=3000&sqp=CMr56c0G&rs=AOn4CLD5Jjb2R0C8XhjsRRU2BeDWe7qJ_A"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 3------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/I4Q6a1uKUCg/mqdefault_6s.webp?du=3000&sqp=CJD16c0G&rs=AOn4CLCHYIoNePn_-8iId-kvfrUYre6IEA"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 4 ------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/yvCpPg8gkLQ/mqdefault_6s.webp?du=3000&sqp=CNDt6c0G&rs=AOn4CLB_Bby3PQeBuNkXYKk5xyfCXbMoUw"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 5 ------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/RCGP4gyRvNc/mqdefault_6s.webp?du=3000&sqp=COaN6s0G&rs=AOn4CLB7IO6BsVNxsSyuAettrmjoGyqLiw"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 6------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/pX2P5qAJIrY/mqdefault_6s.webp?du=3000&sqp=CKKV6s0G&rs=AOn4CLBAePcKfSfbJEX-M5KJjLAVE_rUIw"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}

{/*full card 7------------------------------------------------------------------------------------------*/}
<div className="w-[260px] h-[222px] flex flex-col items-center gap-1">

  {/*vedio card*/}
  <div className="w-[250px] h-[140px] rounded-xl overflow-hidden mt-1">
  <img 
    src="https://i.ytimg.com/an_webp/DPntgF9sJ2U/mqdefault_6s.webp?du=3000&sqp=CLv86c0G&rs=AOn4CLAqkhISDr64r7dPLDVSQJECa6F38A"
    className="w-full h-full object-cover"
  />
 </div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-[250px] text-white font-semibold leading-5 text-sm pl-1">
    How a College Dropout is building One of India's Early Crypto Startup | ft. Aryan
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>1.9k views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>5 days ago</h1>
 </div>


</div>
{/*full card --------------------------------------------------------------------------------------------*/}


</div>




  </main>


  </div>
  </div>


  )
}

export default YourChannel