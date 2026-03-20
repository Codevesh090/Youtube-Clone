import {useState , useRef} from 'react'
import { FaFileVideo } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";
import { motion } from "motion/react";
import axios from 'axios'


interface Props {
  setshowUploadVedio : React.Dispatch<React.SetStateAction<boolean>>
}

const UploadVedio = ({setshowUploadVedio}:Props) => {
   const [title, settitle] = useState("")
   const [Type, setType] = useState("")
   const [Description, setDescription] = useState("")
   const [video , setvideo] = useState<File|null >(null)
   const [image , setimage] = useState<File|null >(null)
   const [videoPreviewerUrl, setvideoPreviewerUrl] = useState("")
   const [imagePreviewerUrl, setimagePreviewerUrl] = useState("")
   const [vedioUploadPercent, setvedioUploadPercent] = useState(0)
   const [imageUploadPercent, setimageUploadPercent] = useState(0)
   const [dataUploadPercent, setdataUploadPercent] = useState(0)
   const [showloader, setshowloader] = useState(false);
   const [warning, setwarning] = useState(false);
   const [isSuccess, setisSuccess] = useState(false);
   const [dbError, setdbError] = useState("");

   
   const videoInputRef = useRef<HTMLInputElement>(null)
   const imageInputRef = useRef<HTMLInputElement>(null)

   function openVideoChooseFiles(){
   videoInputRef.current?.click()
   }

   function openImageChooseFiles(){
   imageInputRef.current?.click();
   }

  function goBackHandler(){
   setshowUploadVedio(false);
  }

   //function starts here 
   async function handleUpload(e:React.SyntheticEvent<HTMLFormElement>){
    e.preventDefault();
    if(!video || !image || !title || !Type || !Description){
    setwarning(true);
    return;
    }
   
    setwarning(false);
    setshowloader(true);  
    try {
    const preSignedResponse = await axios.post(
    "http://localhost:3000/getPresignedUrl"
    );

    const { putUrl: videoPutUrl, finalVedioUrl } = preSignedResponse.data;
    //yaha jo humne putUrl:videoPutUrl likha hai iska matlab hai , ki hum renaming kar rahe hai putUrl ki , yaani waha se putUrl hi aaya response me but we renamed it to videoPutUrl

    //uploaded the video on R2
     await axios.put(videoPutUrl, video, {
       headers: {
         "Content-Type": video.type,
       },
       onUploadProgress(progressEvent) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setvedioUploadPercent(percent);
        },
      });

      const videoUrlFinal = finalVedioUrl;


      //got the Image presigned url
      const thumbnailPreSignedUrl = await axios.post(
        "http://localhost:3000/getThumbnailPresignedUrl",
        { fileType: image.type }
      );

      const { putUrl: imagePutUrl, finalImageUrl } =
        thumbnailPreSignedUrl.data;

      //uploaded the image
      await axios.put(imagePutUrl, image, {
        headers: {
          "Content-Type": image.type,
        },
        onUploadProgress(progressEvent) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setimageUploadPercent(percent);
        },
      });

     const imageUrlFinal = finalImageUrl;

     //Uploaded video and Thumbnail on the db
      const { data } = await axios.post(
        "http://localhost:3000/uploadVideo",
       {
          vedioUrl: videoUrlFinal, 
          thumbnailUrl: imageUrlFinal,    
          description: Description,
          title: title,
          type: Type,
       },
       {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          onUploadProgress(progressEvent){
          const percent = Math.round(progressEvent.loaded*100)/progressEvent.total! // This ! is called as non-null assertion operator jiska kaam hota hai ki yeh typescript ko bolta hai -> trust me, this value is NOT null or undefined
          setdataUploadPercent(percent);
          }
        },
      );

      if (data.success) {
         setDescription("");
         setType("");
         settitle("");
      }
    setisSuccess(true);
     } catch (error) {
       if (axios.isAxiosError(error)) {
         const errorMessage = error.response?.data?.message;
         setshowloader(false);
         setdbError(errorMessage);
         setTimeout(() => {
          setshowUploadVedio(false);
         }, 2000);
       } else {
         setdbError("Unexpected error occurred");
         setTimeout(() => {
          setshowUploadVedio(false);
         }, 2000);
       }
     }

    }
  //------------------------- handler



   const totalProgress = vedioUploadPercent * 0.3 + imageUploadPercent * 0.3 + dataUploadPercent * 0.4//yaha 0.5 se multiply ka matlab hai ki pure progress bar ka 50% is equivalent to 100% of the vedio and left 50% s equivalent to 50% of thumbnail upload .
   if(isSuccess){
   setTimeout(() => {
   alert("Video and Thumbnail Uploaded successfully ")
   setshowUploadVedio(false)
   },500);
   }

   function vedioPreviewer(e:React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0] ?? null;
    if(!file)return ; 
    setvideo(file)
    
    const videoPreviewUrl = URL.createObjectURL(file); //this is used to make a temporary url from the file path we selected . 
    setvideoPreviewerUrl(videoPreviewUrl)
   }



   function imagePreviewer(e:React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0] ?? null;
    if(!file)return ; 
    setimage(file)
    
    const imagePreviewUrl = URL.createObjectURL(file); //this is used to make a temporary url from the file path we selected . 
    setimagePreviewerUrl(imagePreviewUrl)
   }
   



  return (
    <div>
    <div className='top-0 right-0 z-100 bg-black/30 w-full h-210 fixed'></div>
    <div className='top-16 rounded-lg right-70 z-200 bg-[#0F0F0F] w-220 h-180 fixed'>
      <form  onSubmit={handleUpload} className='flex flex-col justify-center items-center gap-4 pt-7'>
        
        <div className='flex gap-10 items-center'>
        <h1 className='text-white font-medium text-5xl'>Upload a vedio</h1>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="mt-2.5 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 " onClick={goBackHandler}>← Go back</motion.button>
        </div>


        <div className='flex gap-4 items-center justify-center'>
        <input type="text" placeholder="Enter video title here" value={title} onChange={(e) => settitle(e.target.value)} className="w-159 h-12 px-4 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 transition duration-200"/>
        <div>
        <select name="videoType" value={Type} onChange={(e)=>{setType(e.target.value)}} className="h-12 px-4 bg-gray-900 text-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 appearance-none cursor-pointer">
        <option value="">Select Video Type</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Unlisted">Unlisted</option>
        </select>
        </div>
        </div>

        <div className='flex gap-4 items-center justify-center'>
        <div className='w-100 h-62 bg-[#111828] rounded-xl flex justify-center items-center border border-gray-700 overflow-hidden'>
        {videoPreviewerUrl ? (<video src={videoPreviewerUrl} controls className='w-full h-full object-cover' />):(<motion.div whileTap={{ scale: 1.1 }} ><FaFileVideo onClick={openVideoChooseFiles} className='text-[#ffffff] text-9xl' /></motion.div>)}           
        <input type='file' accept='video/*' ref={videoInputRef} onChange={vedioPreviewer} className='hidden'></input> {/*Accept vedio of any type */}
        </div>{/*Vedio Upload*/}

   
        
        <div className='w-100 h-62 bg-[#111828] rounded-xl flex justify-center items-center border border-gray-700 overflow-hidden'>
        {imagePreviewerUrl ? (<img src={imagePreviewerUrl} alt='thumbnail img' className='w-full h-full object-cover' />):(<motion.div whileTap={{ scale: 1.1 }} ><FaFileImage onClick={openImageChooseFiles} className='text-[#ffffff] text-9xl' /></motion.div>)}
        <input type='file' accept='image/png,image/jpeg*' ref={imageInputRef} onChange={imagePreviewer} className='hidden'></input>
        </div>{/*Thumbnail Upload*/}
        </div>


        {/*Description*/}
        <textarea placeholder="Write Your Vedio description..." value={Description} onChange={(e)=>{setDescription(e.target.value)}} className="w-202  h-32 p-4 bg-gray-900 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition duration-200"/>
        {/*Description*/}
        
        {/*Loader*/}
        {showloader && <div className="w-100 bg-white rounded-sm">
          <div className="bg-red-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-sm h-4 flex items-center transition-all duration-200 ease-out justify-center" style={{ width: `${totalProgress}%` }}>{totalProgress}%</div> {/*CSS me width 50% ka matlab 50% hota hai but in Tailwind w-50 is not in the percentage yaani tailwind me percentage se kaam karna mushkil hai that is the reason we use inline-css and becasue we want to use the percentage so we used this inline css and not tailwind  */}
        </div>}
        {/*Loader*/}
         
         {/*Warning*/}
         {warning && <div className='text-red-600 font-medium'>Please fill all the required fields</div>}
         {/*Warning*/}

         {/*dbError*/}
         {dbError && (<div className="mt-3  flex items-start gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm shadow-sm"><span className="font-semibold">Error:</span><span>{dbError}</span></div>)}
         {/*dbError*/}

        <motion.button type='submit' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{type: "spring",stiffness: 300,damping: 20}} className='w-35 h-12 bg-white text-black font-medium text-lg rounded-2xl'>Upload Video</motion.button>
      </form>
    </div>
    </div>
  )
}

export default UploadVedio



//Ab jab hum vedio upload karte hai , toh kabhi bhi hum vedio ko database me store nahi karte hai balki ek "cloud" ya we can say in a "object-store" me save karte hai . Hum sirf vedio ka url hi apne database me save karte hai . Toh pura flow kaise ese hota hai ki  |   User clicks on upload vedio -> File Manager opens -> user selects the video  -> Frontend then asks backend for permission(preSigned Url) [ki kya mai yeh file upload kar du object-store par] -> Backend gives back the "permission(preSigned Url)" and also the "public vedio url"  after if {uploads fullfills all the checks} in response -> But abhi tak vedio upload nahi hui hai R2 bucket par , abhi sirf Backend ne permission di hai upload karne ki and also agar upload karoge toh uska path bata diya hai ki kis exact path or we can say space me hum store kar sakte hai apni vedio . Now , Frontend uploads directly to R2 means the object-store -> and then we put the public url of the vedio in the database -> And then we use that to display that video in our webpage .


//One Doubt -> Why not humne vedio upload ki and backend ne hi khud use object store me daal diya , why this work is done by frontend ?
//Solved -> Its because agar backend yeh kaam karne lag gaya , tab toh backend isi me fasa reh jaayega kyuki thousand of people jab millions of gb ki file ek backend par upload karne me lag jaayenge toh backend itni badi files ko hi karne me lag jaayega and baaki ssaare kaam delay hone lagenge , lags aayenge and backend slow ho jaayega . That's why backend sirf sabhi condition ko check karke yaani ki yeh jo upload hai ki sabhi conditions like vedio size is not more than 10mb or same like this conditions ko fulfill kar raha hai ki nahi use check karne ke baad hi permission dene ka kaam karta hai frontend ko and then frontend us kaam ko sambalta hai .
//Two Doubt -> Is it the vedio we upload is publically availiable 
//Solved -> Yes , the vedio will be publically availiable as it is not now only on your machine ,instead its on the cloud 



// 1. Sabse phele hum Cloudflare me bucket create karte hai and when we create the bucket we gets it location as R2_URL and get some credentials R2_ACCESS_KEY_ID AND R2_ACCESS_SECRET jiska hum use karte hai to prove that I am the right developer who made that bucket and now wants to use it because cloudflare esa nahi hai ki Bucket tumne banaya and use koi bhi use kare No!! , jiske paas right credentials hai wahi sirf access kar sakta hai us bucket ko .
// 2. After that what we do in our code , hum ek S3 client banate hai same like we use prisma to connect to any db , similiary S3 is client which help to connect to different clouds like with S3 we can connet to R2 bucket or AWS bucket . S3 ko mainly aws ne hi banaya tha and becasue R2 is aws compatible so cloudflare also uses the same client that is S3 but instead of the aws s3 bucket it uses its R2 bucket. So , we create the client S3 firstly
// 3. And then hum button click karte hai and choose the vedio and set jab vedio ki state "" -> "something means some file came in"  hoti hai toh   
//all upload then on ok else not
//only public videos are on feed page 
