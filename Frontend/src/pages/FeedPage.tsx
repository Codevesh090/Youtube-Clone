import Navbar from '../components/Navbar'
import FeedVedio from'../components/FeedVedio'
import {useEffect , useState} from 'react'
import axios from "axios"


interface UserDetails{
  id:string
  channelName:string
  profilePicture:string
}

interface itemData {
  uploadId : string
  vedioUrl : string
  thumbnailUrl : string
  description : string
  title : string
  type : string
  likeCount : number
  views : number
  deleted : boolean
  createdAt : string
  updatedAt : string
  userId : string
  userid : UserDetails
}


const FeedPage = () => {
  
  const [vedios, setvedios] = useState<itemData[]>([]);
  const [loading,setloading] = useState(true);
  const [hasError, sethasError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [channelStatus, setchannelStatus] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {

  const fetchData = async () => {
    try {
      setloading(true);

      const response = await axios.get(
        "http://localhost:3000/getAllVedios"
      );

      const dataArray = response.data.data;
      setvedios(dataArray);
    } catch (error:unknown) {
      sethasError(true)
      if(axios.isAxiosError(error)){
        const message = error.response?.data?.message
        seterrorMessage(message);
      }else{
        seterrorMessage("Unexpected error occured")
      }
    }finally {
      setloading(false);
    }
  };


  const fetchChannelstatus = async()=>{
    try{
      //Case 1 -> when user logged in then channel (Your channel or Create Channel).When our request is successfull , agar user logged in hoga yaani tabhi authenticated hoga so this will never fail
      const channelStatus = await axios.get("http://localhost:3000/getChannelStatus",{
        withCredentials: true //WithCredentials:true ka matlab hai ki Browser, please send cookies along with this request bina credentials true kiye bina cookies nahi jaati hai request ke saath .
      });
      setchannelStatus(channelStatus.data.channelStatus.channel)
      setisLoggedIn(true);
    }catch{
       //Case 2 -> when user not logged in then channel (Create Channel only) then authenticated nahi hoga yaani logged in nahi hai , toh control catch par aayega and catch me we setted that show create channel only and when user go to create channel then also he can't able to create channel as not logged in , so he go to log in and then able to access things.
       setchannelStatus(false);
       setisLoggedIn(false);
    }
  }

  fetchData();
  fetchChannelstatus();
  }, []);
   
  return (
    <div className="min-h-screen flex flex-col bg-black">
    <div className='relative flex-1 bg-black'>
    <Navbar channelStatus={channelStatus} isLoggedIn={isLoggedIn}/>
    {loading && <div className='w-20 h-20 border-8 border-red-500 ml-173 mt-90 border-t-transparent rounded-full animate-spin'></div>}
    {hasError && !loading && <h1 className='text-red-500 text-5xl'>{errorMessage}</h1> }
    {!hasError && !loading && (<div className="grid grid-cols-4">{vedios && vedios.map((item) => (<FeedVedio key={item.createdAt} Thumbnail={item.thumbnailUrl} Title={item.title} ProfilePicture={item.userid.profilePicture} Views={item.views} ChannelName={item.userid.channelName} userId={item.userid.id} createdAt={item.createdAt} />))}</div>)} 
    </div>
    </div>
  )
}

export default FeedPage


//loading false -> see the grid 
//but if loading false and errorMessage is true then -> give the message not the grid

//if signin hai(means there is a token) toh check the channel status(create channel or your videos) and show on basis of that 
//if signin nahi hai (means no token )tab toh sirf create channel hi dikhye 
//In .map "key" is compulsory to give because it gives identity to each iteration otherwise it is difficult for react to know which item is which , everything gets messed up . 👁️ See it more understand it more ? 👁️


//The error came out is that fetch channel iNFO NEED AUTHMIDDLEWARE BUT GET ALL NOT BUT AS WE MADE BOTH THE REQUEST UNDER ONE USE EFFECT SO IF ONE FAILS OTHER ALSO FAILS
// WE CAN DO THIS LIKE IF 2ND FAILS NO PROBLEM MAKE THE CREATE CHANNEL TRUE , AND LOAD THE VIDEOS



//Note:
{/*
 React me agar humne commands is order me likhe hai ki phele errorMessage ko set karna and then loading ko
 seterrorMessage("Error");
 setloading(false);
 Toh react me yeh jaruri nahi hai ki , isi order me kaam hoga , kyuki react action hone par function ke pure code ko run karta hai and setstate ko register na ki turant execute and then once function completes toh jistne bhi setstate usne register kiye the wo un sabhi ko ek saath chalata hai na ki kisi order me,jisse esa bhi ho sakta hai ki phele setloading() work kare and then seterrorMessage() . Isiliye we used state -> hasError , kyuki let say loading pehle ho jaati false tab toh kuch time tak error kuch dikhta hai nahi as error is "" as default and then jab seterrorMessage() jaakar cahlta then hume screen par error dikhyi padta . But ab hasError se yeh kaam true,false se ho jaayega.
*/}