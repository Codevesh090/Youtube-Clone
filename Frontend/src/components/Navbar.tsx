import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-red-600 h-15 w-full shadow-lg fixed top-0 left-0 flex flex-row items-center justify-center ">
     <Link to={"/signin"}> <button className='bg-white w-20 h-10 rounded-lg hover:bg-gray-300 shadow-white shadow '>Log out</button></Link>
    </div>
  )
}

export default Navbar