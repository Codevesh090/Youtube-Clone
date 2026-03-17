import { Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import YourChannel from "./pages/YourChannel";

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/YourChannel" element={<YourChannel />} />
    </Routes>
    </div>
  )
}

export default App


{/*
  What is left ?
  1.Create the YourVedios page fully using tailwind and also add a back button which takes use agin to feed page
  2.Then make th upload vedio button function such that when we say upload video then this time the video will get save not only into cloud but into the database.
  3.Now shift that upload button from main feed page to Your channel page
  4.Now , make the channel creation real , like when user creates the channel then data go to db and channel:true in db and also when we click on "YOUR CHANNEL" then loading happens and all our data came in from the db and we can see our channel , on channel your uploaded videos are also has to be visible.  
  5.Now user click on any vedio the vedio page opens and in route the userid goes everytime .
  6.Use pagination 
  7.Then add like , subscriber , comments and infinite comments feature 
  8.transcoding and vedio see when we hover mouse on vedio line and also auto generation of thubnail from video .
  9.Put the password visible , not visible eyes on signin and signup
  10. Subscriber Folder + Like Videos Folder 

  Flow
  User Signup -> Then signIn(if channel=true then "Your Channel Button" Else "Create Channel Button") -> Feed Page -> Your Channel button -> Your Channel page -> Upload video -> Click on any vedio on any page -> Open Video Page -> There you see Recommendations + Subcribe button + Like Button + Infinite nested Comments and normal comments
*/}
