import Navbar from '../components/Navbar'
import FeedVedio from'../components/FeedVedio'

const FeedPage = () => {
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-4 ">
      <FeedVedio />
    </div>
    </>
    
  )
}

export default FeedPage