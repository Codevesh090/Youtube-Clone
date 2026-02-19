import { Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    </div>
  )
}

export default App