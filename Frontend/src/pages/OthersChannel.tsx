import { MdOutlineMenu } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import UploadVedio from '../components/UploadVedio';
import {motion} from 'motion/react';
import axios from "axios";
import { useParams } from "react-router-dom";

interface itemData {
  uploadId:string,
  thumbnailUrl: string,
  title: string,
  views:number,
  createdAt: Date
}

const OthersChannel = () => {
    const [showUploadVedio, setshowUploadVedio] = useState(false);
    const [channelName, setchannelName] = useState("");
    const [bannerUrl, setbannerUrl] = useState("");
    const [profilePicture, setprofilePicture] = useState("");
    const [description, setdescription] = useState("")
    const [subscriberCount, setsubscriberCount] = useState("");
    const [videoInfo, setvideoInfo] = useState<itemData[]>([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    
  const {userId} = useParams(); //App.tsx me <Route path="/othersChannel/:userid" element={<OthersChannel />} /> jo bhi variable in params likha hoga same naam likhna when deconstructing here . like userid in App.tsx and userid in useParams is same .

  useEffect(() => {
  
  
  const fetchothersChannelInfo = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        `http://localhost:3000/getothersChannelInfo/${userId}`
      );

      const otherschannelInfo = response.data.othersChannelInfo;

      setchannelName(otherschannelInfo.channelName);
      setbannerUrl(otherschannelInfo.bannerUrl);
      setprofilePicture(otherschannelInfo.profilePicture);
      setdescription(otherschannelInfo.description);
      setsubscriberCount(otherschannelInfo.subscriberCount);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        seterror(error.response?.data?.message);
      } else {
        seterror("Unexpected error");
      }
    }
  };
  

  const fetchothersChannelVideos = async()=>{
   try{
    const response = await axios.get(`http://localhost:3000/getothersChannelVideos/${userId}`);
    const othersvideoInfo = response.data.othersChannelVideosInfo; //tHIS is a array which contain video details [{Video details},{Video details},{Video details},{Video details}]
    setvideoInfo(othersvideoInfo);
   }catch(error:unknown){
    if(axios.isAxiosError(error)){
    seterror(error.response?.data.message)
    }else{
    seterror("Unexpected error happened")
    }
   }finally {
      setloading(false);
    }
  }


  fetchothersChannelInfo();
  fetchothersChannelVideos();
 }, [userId]);
    

const navigate = useNavigate();
function goBackHandleClick(){
navigate("/");
}

function Timeago(CreatedAt:Date){
  const createdAt = new Date(CreatedAt);
  const currentDate = new Date();
  const Timeago = currentDate.getTime()-createdAt.getTime();

  const seconds = Math.floor(Timeago/1000); //Converted milliseconds to seconds as 1sec = 1000milliseconds
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);
  const months = Math.floor(days/30);
  const years = Math.floor(months/12);

  if(seconds<60)return `${seconds} ${seconds<2 ? ("second"):("seconds")} ago`
  if(minutes<60)return `${minutes} ${minutes<2 ? ("minute"):("minutes")} ago`
  if(hours<24)return `${hours} ${hours<2 ? ("hour"):("hours")} ago`
  if(days<30)return `${days} ${days<2 ? ("day"):("days")} ago`
  if(months<12)return `${months} ${months<2 ? ("month"):("months")} ago`
  return `${years} ${years<2 ? ("year"):("years")} ago`

}



  return (
    <div className="bg-black top-0 left-0 w-full h-full fixed"> {/*Yaha humne bola ki place the point at 0,0 as(top-0 and left-0) coordinate of the screen and then from there do width full and hieght full */}
    {loading && (<div className='w-20 h-20 border-8 border-red-500 ml-173 mt-90 border-t-transparent rounded-full animate-spin'></div>)}
    {error && !loading && (<h1 className="text-5xl text-red-500 ml-170">{error}</h1>)}
    {!error && !loading && (<div className="min-h-screen flex flex-col bg-black">
    {/* Navbar */}
    <header className="w-full bg-[#0F0F0F] shadow-md">
    <div className="bg-[#0F0F0F] h-14 flex items-center justify-between">
      <div className="flex gap-2 items-center">
      <img src="/Youtube.svg" className="pl-18"/>
      <p className="text-white font-bold text-3xl">YOUTUBE</p>
      </div>
      <div className="flex gap-2 pr-2">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} disabled={showUploadVedio} className={`${showUploadVedio ? ("bg-gray-600"):("bg-green-500")} w-30 h-10 rounded-lg hover:bg-gray-700`} onClick={()=>{setshowUploadVedio(true)}} >Upload Video</motion.button>
        {showUploadVedio && <UploadVedio setshowUploadVedio = {setshowUploadVedio} />} 
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-30 h-10 bg-blue-600 rounded-xl text-white hover:bg-blue-900 " onClick={goBackHandleClick}>← Go Back</motion.button>
      </div>
    </div> {/*Navbar*/}
    </header>
   
   {/*Sidebar*/}
  <div className="relative">
  <div className="fixed bottom-0 left-0 w-19 h-screen bg-[#0F0F0F] text-amber-50">
    
    <div className="mt-3.5 flex flex-col items-center gap-10">
      
      <div className="flex flex-col items-center">
        <MdOutlineMenu className="text-3xl" />
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col items-center" onClick={goBackHandleClick}>
        <GoHomeFill className="text-2xl hover:text-red-500" />
        <p className="text-[10px]">Home</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col items-center" onClick={goBackHandleClick}>
        <SiYoutubeshorts className="text-2xl hover:text-red-500" />
        <p className="text-[10px]">Shorts</p>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex flex-col items-center" onClick={goBackHandleClick}>
        <MdSubscriptions className="text-2xl hover:text-red-500" />
        <p className="text-[10px]">Subscriptions</p>
      </motion.div>

      <motion.div className="flex flex-col items-center">
        <FaUserCircle className="text-2xl text-red-500" />
        <p className="text-[10px]">You</p>
      </motion.div>

    </div>

  </div>
</div>
  
   {/*Sidebar*/}


    {/* Main Body */}
    <main className="flex-1 bg-black flex flex-col items-center gap-2">
    <div className="w-321.25 h-52 rounded-xl bg-white mt-2 ml-10 overflow-hidden">
      {bannerUrl && (<img src={bannerUrl} alt="bannerImg" className="w-full h-full object-cover" />)}
    </div>

    <div className="w-321 h-62.5 ml-11  flex items-center gap-8">
    <div className="bg-white w-45 h-45 rounded-full overflow-hidden flex items-center justify-center">
      {profilePicture &&(<img src={profilePicture} alt="profileImg"className="w-full h-full object-cover"/>)}
    </div>
   
   <div className="w-250 h-55 flex flex-col gap-2 mt-8">
      <h1 className="text-5xl font-semibold font-sans text-white">{channelName}</h1>

      <div className="flex gap-2 text-[13px] items-center">
        <h1 className="text-white font-semibold">@{channelName}</h1>
        <div className="rounded-full bg-[#696969] w-1 h-1"></div>
        <h1 className="text-[#696969]">{subscriberCount} subscribers</h1>
        <div className="rounded-full bg-[#696969] w-1 h-1"></div>
        <h1 className="text-[#696969]">{videoInfo.length} videos</h1>
      </div>
      
      <div className="w-125">
        <p className="text-[13px] text-[#696969] line-clamp-2">
          {description}
        </p>

        <span className="text-[13px] text-white cursor-pointer">
          more
        </span>
      </div>

      <div className="flex flex-row gap-2">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-[#363636] rounded-full w-25 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Subscribe</motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-[#363636] rounded-full w-16 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Join</motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-[#363636] rounded-full w-32 h-10 text-white text-sm hover:bg-white hover:text-black hover:font-medium">Visit Community</motion.button>
      </div>

  </div>
  </div>

<div className="w-321 ml-11 ">

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


{/*full card 1 ------------------------------------------------------------------------------------------*/}
{/*To use .map remember three thing 1.It should be inside jsx means in a <div></div>  2.Always use key  3.In that <div> put that .map innside curly brackets covering {} . Which means .map is act like a variable or a function and as we know we cannot write a varible or a function ese hi in react we have to use {} if we are write that function or variable after return of component body  */}
<div className="w-321 ml-11 grid grid-cols-4 gap-4">
  {videoInfo.map((item) => (
    
  <div key={item.uploadId} className="w-65 h-55.5 flex flex-col items-center gap-1">{/*Yaha humne item.id isiliye nahi likha , kyuki the array I am getting have objects but all have the same id which cause confusion for react to handle this , so react is giving error*/}
  {/*humne yaha date ko key set kiya hai , but humne yaha .toString kyu kiya ? So esa isliye because key can only be string or number , so wo error de raha tha as created at ka data type "Date" tha */}
  
  {/*vedio card*/}
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="w-62.5 h-35 rounded-xl overflow-hidden mt-1">
  <img 
    src={item.thumbnailUrl}
    className="w-full h-full object-cover"
  />
 </motion.div>
 {/*vedio card*/}
 
 {/*title*/}
  <h1 className="line-clamp-2 w-62.5 text-white font-semibold leading-5 text-sm pl-1">
    {item.title}
  </h1>
 {/*title*/}

 <div className="flex items-center text-[12px] font-medium gap-2 mr-25 mb-5 text-[#5c5c5c]">
  <h1>{item.views} views</h1>
  <div className="w-1 h-1 bg-[#5c5c5c] rounded-full"></div>
  <h1>{Timeago(item.createdAt)}</h1>
 </div>

</div>))
}</div>
{/*full card --------------------------------------------------------------------------------------------*/}

  </main>


  </div>)}
  </div>


  )
}

export default OthersChannel


//clean up the mess and plan next

//Important bug to solve ----
//why if any error come then Yourchannel button gets disable why not it takes us to the yOUR CHANNEL Page and there on screen it shows the whatever the error came in .

//More Efficient way to do this :
{/* 
useEffect(() => {
  const fetchData = async () => {
    try {
      setloading(true);

      const [infoRes, videoRes] = await Promise.all([
        axios.get(`/getothersChannelInfo/${userId}`),
        axios.get(`/getothersChannelVideos/${userId}`)
      ]);

      const info = infoRes.data.othersChannelInfo;
      const videos = videoRes.data.othersChannelVideosInfo;

      setchannelName(info.channelName);
      setbannerUrl(info.bannerUrl);
      setprofilePicture(info.profilePicture);
      setdescription(info.description);
      setsubscriberCount(info.subscriberCount);
      setvideoInfo(videos);

    } catch (err) {
      seterror("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  fetchData();
}, [userId]);

*/}







//jab yeh button(this button is present in feed video) click hoga toh yeh function trigger hoga and that will make request at backend with the userid , the backend will find it and give the response back we took that response in , fill it where it needs to construct a new page .



