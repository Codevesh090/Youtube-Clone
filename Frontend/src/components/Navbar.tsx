import { Link } from 'react-router-dom'
import ChannelButton from './ChannelButton'
import YourVideoButton from './YourVideoButton'
import {useState,useEffect} from 'react'


type Props = {
  channelStatus: boolean;
  isLoggedIn:boolean;
};

const Navbar = ({channelStatus,isLoggedIn}:Props) => {
  const [buttonState, setbuttonState] = useState(false)
   useEffect(() => {
    setbuttonState(channelStatus);
  }, [channelStatus]);
  return (
    <div className="bg-[#0F0F0F] border-red-500 border-b-4 h-15 w-full shadow-lg fixed top-0 left-0 flex flex-row items-center justify-end gap-2 ">

     <div className='flex gap-2 mr-2'>
     <Link to={"/signin"}> {isLoggedIn ? (<button className='bg-blue-500 w-25 h-10 rounded-lg hover:bg-gray-300'>← Log Out</button>):(<button className='bg-white w-23 h-10 rounded-lg hover:bg-gray-300'>← Log In</button>)}</Link> 
     {buttonState ? (<YourVideoButton />):(<ChannelButton setbuttonState = {setbuttonState} />)}
     </div>
    </div>
  )
}

export default Navbar



// jab tak load kare tab tak toh band rahe , create channel ----------------