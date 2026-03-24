import { motion } from "motion/react";
import { BiSolidImageAdd } from "react-icons/bi";
import { useState ,useRef} from "react";
import axios from "axios";
import { useEffect } from "react";



interface Props {
  setshowCreateChannel : React.Dispatch<React.SetStateAction<boolean>>
  setbuttonState :React.Dispatch<React.SetStateAction<boolean>>
}

const CreateChannel = ({setshowCreateChannel,setbuttonState}:Props) => {
  const [bannerPreviewerUrl, setbannerPreviewerUrl] = useState("")
  const [profilePreviewerUrl, setprofilePreviewerUrl] = useState("")
  const [banner, setbanner] = useState<File|null>(null);
  const [profileIcon, setprofileIcon] = useState<File|null>(null);
  const [channelName, setchannelName] = useState("");
  const [description, setdescription] = useState("")
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [showloader, setshowloader] = useState(false);
  const [bannerUploadPercent, setbannerUploadPercent] = useState(0);
  const [profilePictureUploadPercent, setprofilePictureUploadPercent] = useState(0);
  const [dbUploadPercent, setdbUploadPercent] = useState(0);
  const [fillWarning, setfillWarning] = useState(false);
  const [dbError, setdbError] = useState("");
  const [isSuccess, setisSuccess] = useState(false);
  const [goBack, setgoBack] = useState(true);


  function openBannerUpload(){
    bannerInputRef.current?.click()
  }

  function bannerPreview(e:React.ChangeEvent<HTMLInputElement>){
   const file = e.target.files?.[0] ?? null //?? ko Nullish Coalescing Operator bolte hain , jiska matlab hota hai ki agar ?? ke left side jo value hai wo null ya undefined hai toh right side use karo means "null" use karo . Iska fayda yeh hai ki , undefined nahi hoga so our app will never crash
   if(!file)return;
   setbanner(file);
   const bannerUrl = URL.createObjectURL(file)
   setbannerPreviewerUrl(bannerUrl)
  }

   function profilePreview(e:React.ChangeEvent<HTMLInputElement>){
   const file = e.target.files?.[0] ?? null
   if(!file)return;
   setprofileIcon(file)
   const profileUrl = URL.createObjectURL(file)
   setprofilePreviewerUrl(profileUrl)
  }

  function openProfileUpload(){
  profileInputRef.current?.click()
  }



  //main handler
  async function createChannelHandler(e:React.SyntheticEvent<HTMLFormElement>){
  e.preventDefault()
  if(!banner || !profileIcon || !channelName || !description){
    setfillWarning(true);
    return;
  }
  
  setgoBack(false);
  setshowloader(true); 
  try{
    //banner uploaded on R2
    const preSignedBannerUrlResponse = await axios.post("http://localhost:3000/getBannerPresignedUrl",{fileType: banner.type});
    const {putUrl:bannerPutUrl,finalUrl} = preSignedBannerUrlResponse.data;

    //As we have permission now so we uploaded on R2
    await axios.put(bannerPutUrl,banner,{
    headers:{
      "Content-Type":"banner.type"
    },
    onUploadProgress(progressEvent){
      const bannerUploadPercent = Math.round(progressEvent.loaded*100/progressEvent.total!)
      setbannerUploadPercent(bannerUploadPercent);
    }
    })

    const bannerFinalUrl = finalUrl;
    console.log(bannerFinalUrl);
    //banner uploaded on R2

    //profile Icon uploaded on R2
    const preSignedProfileIconUrlResponse = await axios.post("http://localhost:3000/getchannelIconPresignedUrl",{fileType:profileIcon.type})
    const {putUrl:profileIconPutUrl , channelIconfinalUrl} = preSignedProfileIconUrlResponse.data;
   
    //As we have permission now so we uploaded on R2
    await axios.put(profileIconPutUrl,profileIcon,{
      headers:{
        "Content-Type":"profileIcon.type"
      },
      onUploadProgress(progressEvent){
        const profilePictureUploadPercent =Math.round(progressEvent.loaded*100/progressEvent.total!);
        setprofilePictureUploadPercent(profilePictureUploadPercent);
      }
    })

    const profileIconFinalUrl = channelIconfinalUrl;
    console.log(profileIconFinalUrl);
    //profile Icon uploaded on R2


    //Uploaded in db
     await axios.post("http://localhost:3000/createChannel",
      {
       channel:true,
       channelName:channelName,
       bannerUrl:bannerFinalUrl,
       profilePicture:profileIconFinalUrl,
       description:description
      },{
        withCredentials: true,
        headers:{
          "Content-Type":"application/json"
        },
        onUploadProgress(progressEvent){
          const dbUploadPercent = Math.round(progressEvent.loaded*100/progressEvent.total!);
          setdbUploadPercent(dbUploadPercent);
        }
      }
    )
    //Uploaded in db
  setbanner(null);
  setprofileIcon(null);
  setdescription("");
  setchannelName("");
  setisSuccess(true);

  }catch(error:unknown){
    if(axios.isAxiosError(error)){
       const errorMessage = error.response?.data?.message;
       setshowloader(false);
       setdbError(errorMessage);
       setTimeout(() => {
        setshowCreateChannel(false);
       }, 2000);
    }else{
       setshowloader(false);
       setdbError("Unexpected Error Occured");
       setTimeout(() => {
        setshowCreateChannel(false);
       }, 2000);
    }
  }
  }

  const totalProgress = bannerUploadPercent * 0.3 + profilePictureUploadPercent * 0.3 + dbUploadPercent * 0.4 ;
  useEffect(() => {
     if (isSuccess) {
       setTimeout(() => {
         alert("Channel created successfully");
         setshowCreateChannel(false);
         setbuttonState(true);
         setgoBack(true);
       },100);
     }
   }, [isSuccess,setbuttonState,setshowCreateChannel]);
   //Humne yaha setbuttonState and setshowCreateChannel isliye daala , kyuki we used these in the useEffect function , Toh ESlint bolta hai ki agar hum useEffect ke andar kuch esa daalte hai jo bahar se aaya hai and changable hai , toh use bhi hume hamesha dependency me rakhna padta hai ,Matlab it just prewarn us ki tumne kuch states ka use kiya hai and kahi tum inhi states ko as dependency toh use nahi karne waala the if yes then tum bhul rahe ho ise dependency me daalo .
   //Yaha daro mat buttonState yaa showCreateChannel ke change hone par yeh code nahi chalega as humne yaha setbuttonState and setshowCreateChannel daala hai which is stable naa ki buttonState and showcreateChannel .Toh yaha useeffect ka function sirf totalProgress ke change hone par hi chalega .No need to worry 
   //Important point -> Hume kabhi bhi loader percentage par kaam nahi karna hai ki load 100% hua toh matlab success kyuki ,agar kisi process me error bhi aa gaya tab bhi loadingpercent of that becomes 100% instantly as loading percent only show the state of a function ki wo khatam hua ki nahi ,jisse hamara code phat jaayega , isliye use a state isSuccess to define success always. Use loadingpercent only for loader .
  return (
    <div>
    <div className='top-0 right-0 z-100 bg-black/30 w-full h-210 fixed'></div>
    <input type='file' accept='image/*' ref={profileInputRef} onChange={profilePreview} className='hidden'></input>
    <input type='file' accept='image/*' ref={bannerInputRef} onChange={bannerPreview} className='hidden'></input>
    <div className='top-16 rounded-xl right-120 z-200 bg-[#191919] w-130 h-110 fixed flex flex-col items-center justify-center'>
      <form  onSubmit={createChannelHandler}   className="flex flex-col items-center gap-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} transition={{type: "spring",stiffness: 300,damping: 20}} className="w-110 h-20 bg-[#212121] text-[#565656] rounded-xl flex items-center justify-center text-4xl overflow-hidden" onClick={openBannerUpload}> {bannerPreviewerUrl ? (<img src={bannerPreviewerUrl} alt="banner image" className="w-full h-full object-cover"/>):(<BiSolidImageAdd/>)}</motion.div>{/*Banner*/}
        <div className="w-110 h-40  rounded-xl flex items-center justify-between ">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 300,damping: 20}} className="w-35 h-35 bg-[#212121] rounded-full flex items-center justify-center text-4xl text-[#565656] overflow-hidden" onClick={openProfileUpload}>{profilePreviewerUrl ? (<img src={profilePreviewerUrl} alt="profile image" className="w-full h-full object-cover"/>):(<BiSolidImageAdd/>)}</motion.div>{/*Profile Picture*/}
          <div className="w-70 h-40 flex flex-col gap-2">
          
          <input type="text" placeholder="Enter Channel Name" value={channelName} onChange={(e)=>setchannelName(e.target.value)} className="w-70 h-15 px-4 bg-[#212121] text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-white transition duration-200"/>
          <textarea placeholder="Write Your Channel description..." value={description} onChange={(e)=>setdescription(e.target.value)} className="w-70  h-25 p-4 bg-[#212121] text-white text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-white resize-none transition duration-200"/>
         
          </div>
        </div>{/*Channel Info*/}

       
        {/*Loader*/}
        {showloader &&<div className="w-100 bg-white rounded-sm">
          <div className="bg-red-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-sm h-4 flex items-center transition-all duration-200 ease-out justify-center" style={{ width: `${totalProgress}%` }}>{totalProgress}%</div> {/*CSS me width 50% ka matlab 50% hota hai but in Tailwind w-50 is not in the percentage yaani tailwind me percentage se kaam karna mushkil hai that is the reason we use inline-css and becasue we want to use the percentage so we used this inline css and not tailwind  */}
        </div>}
        {/*Loader*/}
        
        {/*Fill all details warning*/}
        {fillWarning && <div className="text-red-600 font-medium">Please fill all the details</div>}
        {/*Fill all details warning*/}

        {/*DATABASE ERROR STATE*/}
        {dbError && (<div className="mt-3  flex items-start gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm shadow-sm"><span className="font-semibold">Error:</span><span>{dbError}</span></div>)}
        {/*DATABASE ERROR STATE*/}


        <div className="flex gap-5 items-center">
        <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 300,damping: 20}} className='w-35 h-12 bg-white mt-2 text-black font-medium text-lg rounded-lg'>Create Channel</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`mt-2.5 px-4 py-1.5 ${goBack ? ("bg-blue-600"):("bg-gray-500")} text-white text-sm font-medium rounded-full`} disabled={!goBack} onClick={()=>setshowCreateChannel(false)}>← Go back</motion.button>
        </div>

      </form>
    </div>
    </div>
  )
}

export default CreateChannel


          //Always pass the user id in the route when user opens a channel page because on basis of that route userId we take out the no. of uploads of video they made
          //channel page is universal anyone can open it and upload video is private . so make things according to that .
          //when we click on Your channel then what happens how that cahnnel page is opening and how the data is coming as we can apply same logic everywhere like when user click on user channel profile then cahnnel page opens but how ?
          //after this when we hover over a video thumbnail then video replay
          //two new things to learn pagination and infinite comments .
          //change video if once uploaded.
          //yeh page render ho raha hai and uspar sab likha hua hai .
          //will take it from cookies the user id and on basis of that user id we take out the info and then we set those info as props and then those props be distributed and we see your channel page
          //if only authentiacted one is allowed then how I just type the link and reach out there .
          //password eye 


//---------------------------------------------------------------------------------------------------------------

//Note:
//Don't ever put setState , setTimeout  , apiCalls in Component body . {What is component body ? search it if you don't know}
//But why ?
//Its because component body renders multiple times 
//So,let say if in component body , humne ek handleclick karke function likha hai jiske andar setCount() hai and uske neeche ek setbuttonState() likha hai  , toh click karte hi phele wo function run hoga yaani state change hoga which cause re-render , toh is time par re-render me ComponentBody wapas run hogi and kyuki Component Body me humne setButtonstate() likhkar rakha hai,which causes state change which causes re-render again , phir again Component bosy renders and again setButtonState aa jaayega and then again re-render and it happens infinitely again and again .....
//That's why kabhi bhi component body me don't put these things ever .

//Example code:
/* 
import { useState } from "react";

export default function InfiniteLoopExample() {
  const [count, setCount] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  function handleClick() {
    setCount(count + 1); // user action triggers re-render
  }

  // ❌ WRONG: state update inside component body
  setButtonState(true);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
*/



//------------------------------------------------------------------------------------------------------------


//Concept of rendering
// 1.UI do 1st render and shows initial state --> 2. Any action happens which cause a state to change like onClick the handleclick function runs which has setCount(2) which runs and changes the state of Count --> 3.Then state me koi change hua hai toh automatically new render hoga always which is 2nd render jise hi hum re-render kehte hai .
// 2.What if 1st Initial render ke baad we made te action three times then setCount(+1) then 2nd render , 3rd render and 4th render hoga but 1st ke baad jitne bhi render hote hai hum use re-render keh dete hai naa ki 2nd , 3rd or 4th render .
// 3.Agar {ek baar} me multiple states ikkathe change ho rahi hai , toh wo pura ek hi render me cover hoga, yaani ek group of changes in states ek baar me render hoga  , yeh nahi ki for every state change in a one way cause multiple renders .

//Simple Rendering Concept 
// 1st Render happens to show UI initially --> then any action se jab-jab state change hogi --> automatically 2d,3rd,4th render hoga yaani re-render hoga . 


//------------------------------------------------------------------------------------------------------------

