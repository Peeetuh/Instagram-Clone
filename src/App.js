import "./App.css";
import Login from "../src/components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import PostOverview from "./components/PostOverview";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-bg">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/posts" element={<PostOverview />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
