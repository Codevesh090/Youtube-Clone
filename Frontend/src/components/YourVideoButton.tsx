import { useNavigate } from "react-router-dom"

const YourVideoButton = () => {
   const navigate = useNavigate();


   function yourChannelHandler(){
    navigate("/YourChannel")
   }


  return (
    <div>
      <button className="bg-purple-600 text-white font-semibold w-40 h-10 rounded-lg" onClick={yourChannelHandler}> Your Channel</button>
    </div>
  )
}

export default YourVideoButton