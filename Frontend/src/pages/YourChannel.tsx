import { MdOutlineMenu } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

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
   <div className="w-18 h-[900px] fixed bg-[#0F0F0F] bottom-0 text-amber-50">
   <div className="mt-26 flex flex-col gap-7">
   <div className="flex flex-col justify-center items-center">
   <MdOutlineMenu  className="text-3xl"/>
   </div>
   <div className="flex flex-col justify-center items-center">
    <GoHomeFill className="text-2xl" />
    <p className="text-[10px]">Home</p>
   </div>
   <div className="flex flex-col justify-center items-center">
   <SiYoutubeshorts className="text-2xl" />
    <p className="text-[10px]">Shorts</p>
   </div>
   <div className="flex flex-col justify-center items-center">
   <MdSubscriptions className="text-2xl" />
    <p className="text-[10px]">Subscriptions</p>
   </div>
   <div className="flex flex-col justify-center items-center">
   <FaUserCircle  className="text-2xl"/>
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

    <div className="w-[1284px] h-[250px] ml-11 bg-[#0F0F0F] flex items-center gap-4">
    <div className="bg-white w-[180px] h-[180px] rounded-full overflow-hidden flex items-center justify-center"><img src="/100xprofile.jpg" alt="bannerImg" /></div>
    <div className="bg-white w-[1000px] h-[220px] ">
      <h1 className="text-5xl font-semibold font-sans">100x school</h1>
    </div>
    </div>
    
    </main>

    </div>
    </div>


  )
}

export default YourChannel