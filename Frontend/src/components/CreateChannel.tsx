import { motion } from "motion/react";
import { BiSolidImageAdd } from "react-icons/bi";
import { useState ,useRef} from "react";



interface Props {
  setshowCreateChannel : React.Dispatch<React.SetStateAction<boolean>>
  setbuttonState :React.Dispatch<React.SetStateAction<boolean>>
}

const CreateChannel = ({setshowCreateChannel,setbuttonState}:Props) => {
  const [bannerPreviewerUrl, setbannerPreviewerUrl] = useState("")
  const [profilePreviewerUrl, setprofilePreviewerUrl] = useState("")
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  



  function openBannerUpload(){
    bannerInputRef.current?.click()
  }

  function bannerPreview(e:React.ChangeEvent<HTMLInputElement>){
   const file = e.target.files?.[0] ?? null
   if(!file)return;
   const bannerUrl = URL.createObjectURL(file)
   setbannerPreviewerUrl(bannerUrl)
  }

   function profilePreview(e:React.ChangeEvent<HTMLInputElement>){
   const file = e.target.files?.[0] ?? null
   if(!file)return;
   const bannerUrl = URL.createObjectURL(file)
   setprofilePreviewerUrl(bannerUrl)
  }

  function openProfileUpload(){
  profileInputRef.current?.click()
  }

  function createChannelHandler(e:React.SyntheticEvent<HTMLFormElement>){
  e.preventDefault()
  setshowCreateChannel(false);
  setbuttonState(false);
  }



  return (
    <div>
    <div className='top-0 right-0 z-100 bg-black/30 w-full h-210 fixed'></div>
    <input type='file' accept='image/*' ref={profileInputRef} onChange={profilePreview} className='hidden'></input>
    <input type='file' accept='image/*' ref={bannerInputRef} onChange={bannerPreview} className='hidden'></input>
    <div className='top-16 rounded-xl right-120 z-200 bg-[#191919] w-130 h-100 fixed flex flex-col items-center justify-center'>
      <form  onSubmit={createChannelHandler}   className="flex flex-col items-center gap-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} transition={{type: "spring",stiffness: 300,damping: 20}} className="w-110 h-20 bg-[#212121] text-[#565656] rounded-xl flex items-center justify-center text-4xl overflow-hidden" onClick={openBannerUpload}> {bannerPreviewerUrl ? (<img src={bannerPreviewerUrl} alt="banner image" className="w-full h-full object-cover"/>):(<BiSolidImageAdd/>)}</motion.div>{/*Banner*/}
        <div className="w-110 h-40  rounded-xl flex items-center justify-between ">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 300,damping: 20}} className="w-35 h-35 bg-[#212121] rounded-full flex items-center justify-center text-4xl text-[#565656] overflow-hidden" onClick={openProfileUpload}>{profilePreviewerUrl ? (<img src={profilePreviewerUrl} alt="profile image" className="w-full h-full object-cover"/>):(<BiSolidImageAdd/>)}</motion.div>{/*Profile Picture*/}
          <div className="w-70 h-40 flex flex-col gap-2">
          <input type="text" placeholder="Enter Channel Name" className="w-70 h-15 px-4 bg-[#212121] text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-white transition duration-200"/>
          <textarea placeholder="Write Your Channel description..."className="w-70  h-25 p-4 bg-[#212121] text-white text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-white resize-none transition duration-200"/>
          </div>
        </div>{/*Channel Info*/}
        <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 300,damping: 20}} className='w-35 h-12 bg-white text-black font-medium text-lg rounded-lg'>Create Channel</motion.button>
      </form>
    </div>
    </div>
  )
}

export default CreateChannel

          //  <div className="w-70 h-15 bg-blue-600/20"></div>
          //  <div className="w-70 h-25 bg-pink-600/20"></div>