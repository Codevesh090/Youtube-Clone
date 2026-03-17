import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const SignIn = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading , setloading] = useState(false)
  const [status, setstatus] = useState("")
  const [statusSuccess, setstatusSuccess] = useState(false)
  const navigate = useNavigate();
  
  async function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>){
   e.preventDefault();
   setloading(true);
  
  if(!email || !password){
    setloading(false)
    setstatusSuccess(false)
    setstatus("All fields are required")
    
    setTimeout(() => {
      setstatus("")
    }, 2000);

    return;
  }

   try{
   const response = await axios.post("http://localhost:3000/signin",{
    email:email,
    password:password
   },{
    withCredentials:true,
    //We don't need of headers as axios set that by itself already
   })

   if(response.data.success === true){
    setemail("")
    setpassword("")
    setstatus(response.data.message)
    setstatusSuccess(true)

    setTimeout(() => {
      setloading(false)
      navigate("/")
    },600);
    
   }}catch(error:unknown){
    if(axios.isAxiosError(error)){
      const message = error.response?.data?.message
      setstatus(message || "Signin failed")
      setstatusSuccess(false)
      setTimeout(() => {
        setstatus("")
      },2000);
    }else{
      setstatus("Unknown error occured")
      setstatusSuccess(false)
      setTimeout(() => {
        setstatus("")
      },2000);
    }
   }finally{
    setloading(false)
   } //finally means chahe try ho ya catch iske andar likha code chalega hi chalega .


  }
  

  return (
    <div className='flex flex-row justify-center items-center min-h-screen bg-black'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
       <h1 className='font-bold text-white text-5xl'>Sign In</h1>
       <input type='email' placeholder='Email address' value={email} onChange={(e)=>{setemail(e.target.value)}} className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6'/>
       <input type='password' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <h1 className="text-[16px] text-white">New to Youtube? <span className="font-semibold text-red-500 hover:cursor-pointer"><Link to={"/signup"}>Join Youtube</Link></span></h1>
       <button disabled={loading} className='bg-red-600 text-white rounded-lg w-30 h-10 font-semibold flex items-center justify-center' type='submit' >{loading ? (<div className='w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin'></div>):("Log In")}</button>
       { status && (<h1 className={`${statusSuccess ? "text-green-500":"text-red-500" }`} >{status}</h1>)} 
       </form>
    </div>
  )
}


export default SignIn