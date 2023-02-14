import "./App.css";
import Login from "../src/components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import PostOverview from "./components/PostOverview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-bg">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/posts" element={<PostOverview />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
