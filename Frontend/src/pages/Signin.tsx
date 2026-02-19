import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='flex flex-row justify-center items-center min-h-screen bg-black'>
      <form className='flex flex-col justify-center items-center gap-4'>
       <h1 className='font-bold text-white text-5xl'>Sign In</h1>
       <input type='email' placeholder='Email address' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6'/>
       <input type='password' placeholder='Password' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <h1 className="text-[16px] text-white">New to Polo? <span className="font-semibold text-red-500 hover:cursor-pointer"><Link to={"/signup"}>Join Polo-lolo</Link></span></h1>
       <Link to={"/"}><button className='bg-red-600 text-white rounded-lg w-30 h-10 font-semibold'>Log In</button></Link>
       </form>
    </div>
  )
}

export default SignIn