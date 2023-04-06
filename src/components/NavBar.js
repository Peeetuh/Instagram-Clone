import React from "react";
import "../components/NavBar.css";
import logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.userReducer);
  // console.log(user);
  const logoutHandler = () => {
    //need to get userId from user
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  };

  console.log(user);
  return (
    <div>
      <nav className="navbar bg-white shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5" to="/posts">
            <img alt="logo" src={logo} height="45px" />
          </NavLink>
          <form className="d-flex me-md-5" role="search">
            <input
              className="searchbox form-control me-2 txt-muted"
              type="search"
              placeholder="Search"
            />
            <NavLink className="nav-link text-dark fs-5 searchIcon" href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </NavLink>
            <NavLink className="nav-link text-dark fs-5" to="/posts">
              <i className="fa-solid fa-house"></i>
            </NavLink>
            {/* {user.user._id ? 
              <a className="nav-link text-dark fs-5" href="/home">
                <i className="fa-regular fa-heart"></i>
              </a>
             :  ""} */}
            <div className="dropdown">
              {user.user._id ? (
                <>
                  {" "}
                  <a
                    className="btn"
                    href="/home" //subject to change (3)
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      className="navbar-profile-pic"
                      alt="profile-pic"
                      src={user.user.profileImg}
                    />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item mt-0" to="/myprofile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/login" //subject to change
                        onClick={() => logoutHandler()}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
