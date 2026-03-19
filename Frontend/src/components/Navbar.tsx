import { Link } from 'react-router-dom'
import UploadVedio from './UploadVedio'
import ChannelButton from './ChannelButton'
import YourVideoButton from './YourVideoButton'
import {useState} from 'react'

const Navbar = () => {
  const [showUploadVedio, setshowUploadVedio] = useState(false)
  const [buttonState, setbuttonState] = useState(true)

  return (
    <div className="bg-[#0F0F0F] border-red-500 border-b-4 h-15 w-full shadow-lg fixed top-0 left-0 flex flex-row items-center justify-center gap-2 ">
     
     <button disabled={showUploadVedio} className={`${showUploadVedio ? ("bg-gray-600"):("bg-green-500")} w-30 h-10 rounded-lg hover:bg-gray-700`} onClick={()=>{setshowUploadVedio(true)}} >Upload Video</button> 

     <Link to={"/signin"}> <button className='bg-white w-20 h-10 rounded-lg hover:bg-gray-300'>← Log out</button></Link>
     
     {buttonState ? (<ChannelButton setbuttonState = {setbuttonState} />):(<YourVideoButton />) }
     
     
     {showUploadVedio && <UploadVedio setshowUploadVedio = {setshowUploadVedio} />}
    </div>
  )
}

export default Navbar



//type -> only the public vedios are public and visible on feed  , not any other vedio 