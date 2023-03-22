import "./App.css";
import Login from "../src/components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import PostOverview from "./components/PostOverview";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function App() {

  function DynamicRouting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const user = useSelector(state => state.userReducer);
  
    useEffect(() => {
  
      const userData = JSON.parse(localStorage.getItem("user"));
      if(userData){
        dispatch({type: "LOGIN_SUCCESS", payload: userData})
        navigate("/posts");
      } else{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
    }, []);

    return(
      <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/posts" element={<PostOverview />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
        </Routes>
    )
  }

  return (
    <div className="app-bg">
      <Router>
        <NavBar />
      <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
