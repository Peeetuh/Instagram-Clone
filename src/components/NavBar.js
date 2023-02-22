import React from "react";
import "../components/NavBar.css";
import logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer);
  console.log(user);
  const logoutHandler = () => {
    //need to get userId from user
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5" to="/">
            <img alt="logo" src={logo} height="45px" />
          </NavLink>
          <form className="d-flex me-md-5" role="search">
            <input
              className="searchbox form-control me-2 txt-muted"
              type="search"
              placeholder="Search"
            />
            <a className="nav-link text-dark fs-5 searchIcon" href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <a className="nav-link text-dark fs-5" href="#">
              <i className="fa-solid fa-house"></i>
            </a>
            {user ? (
              <a className="nav-link text-dark fs-5" href="#">
                <i className="fa-regular fa-heart"></i>
              </a>
            ) : (
              ""
            )}
            <div className="dropdown">
              {user ? (
                <>
                  {" "}
                  <a
                    className="btn"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      className="navbar-profile-pic"
                      alt="profile-pic"
                      src="https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNlbGZpZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
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
                        href="#"
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
