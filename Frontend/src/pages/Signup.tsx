import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex flex-row justify-center items-center min-h-screen bg-black'>
      <form className='flex flex-col justify-center items-center gap-4'>
       <h1 className='font-bold text-white text-5xl'>Sign up</h1>
       <input type='email' placeholder='Email address' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6'/>
       <input type='password' placeholder='Password' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <input type='text' placeholder='Enter Your First Name' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <input type='text' placeholder='Enter Your Last Name' className='border-2 border-red-600 text-red-500/80 font-semibold rounded-lg w-80 h-10 pl-6' />
       <div className="flex flex-col items-center gap-3 w-72 rounded-xl bg-white p-4 shadow-lg">
       <label className="text-2xl font-semibold text-red-600">Choose your gender</label>
       <select className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700 shadow-sm transition  hover:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none">
       <option value="">Select gender</option>
       <option value="Male">Male</option>
       <option value="Female">Female</option>
       <option value="Transgender">Transgender</option>
       </select>
       </div>
       <div className='flex flex-col items-center gap-2 bg-white w-60 h-25 rounded-lg'>
        <label className='text-2xl text-red-600 font-semibold pt-1.5'>Select your Birthday</label>
        <input type='date' className='text-black border-2 border-red-600 rounded-lg px-4 py-2 focus:border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none transition' />
       </div>
       <Link to={"/signin"}><button className='bg-red-600 text-white rounded-lg w-30 h-10 font-semibold'>Signup Now</button></Link>
      </form>
    </div>
  )
}

export default Signup