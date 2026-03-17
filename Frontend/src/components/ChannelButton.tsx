import CreateChannel from './CreateChannel'
import { useState } from 'react'

interface props {
  setbuttonState : React.Dispatch<React.SetStateAction<boolean>>
}


const ChannelButton = ({setbuttonState}:props) => {
  const [showCreateChannel, setshowCreateChannel] = useState(false)
  return (
    <div>
      <button disabled={showCreateChannel} className={` ${showCreateChannel ? ("bg-gray-600"):("bg-red-600")} text-white font-semibold w-40 h-10 rounded-lg `} onClick={()=>{setshowCreateChannel(true)}}> + Create Channel</button>
      {showCreateChannel && <CreateChannel setshowCreateChannel = {setshowCreateChannel} setbuttonState = {setbuttonState} />}
    </div>
  )
}

export default ChannelButton