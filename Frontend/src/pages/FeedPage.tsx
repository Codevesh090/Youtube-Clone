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
  const [errorMessage, seterrorMessage] = useState("")

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

  fetchData();
  }, []);
   
  return (
    <div className="min-h-screen flex flex-col bg-black">
    <div className='relative flex-1 bg-black'>
    <Navbar />
    {loading && <div className='w-20 h-20 border-8 border-red-500 ml-173 mt-90 border-t-transparent rounded-full animate-spin'></div>}
    {errorMessage && !loading && <h1 className='text-red-500'>{errorMessage}</h1> }
    {!errorMessage && !loading && (<div className="grid grid-cols-4">{vedios && vedios.map((item) => (<FeedVedio Thumbnail={item.thumbnailUrl} Title={item.title} ProfilePicture={item.userid.profilePicture} Views={item.views} ChannelName={item.userid.channelName} createdAt={item.createdAt} />))}</div>)}
    </div>
    </div>
  )
}

export default FeedPage


//loading false -> see the grid 
//but if loading false and errorMessage is true then -> give the message not the grid