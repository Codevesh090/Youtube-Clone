import { useNavigate } from "react-router-dom"
// import {useState} from 'react'
import axios from "axios";

const YourVideoButton = () => {
  


   const navigate = useNavigate();


   async function channelHandler(){
   try {
    const response = await axios.get(
      "http://localhost:3000/getChannelInfo",
      { withCredentials: true }
    );
    const channelInfo = response.data.channelInfo ;
    navigate(`/channel/${channelInfo.id}`);
   } catch (error:unknown) {
    if(axios.isAxiosError(error)){
    console.log(error.response?.data.message);
    navigate("/");
    }else{
      console.log("Unexpected server side error")
    }
    
  }
}

  return (
    <div>
      <button className="bg-purple-600 text-white font-semibold w-40 h-10 rounded-lg hover:bg-purple-900" onClick={channelHandler}> Your Channel</button>
    </div>
  )
}

export default YourVideoButton

//change the domain -> then id ke saath aur bhi info aayegi -> we set that info in states -> and then pass those states as props -> they catch those props and use it to show us the page 
//aadha yaha kiya hai ab aada your channel page par karunga 