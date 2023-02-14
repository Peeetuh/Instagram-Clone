import React from "react";
import "../components/NavBar.css";
import logo from "../images/logo.png";

function NavBar() {
  return (
    <div>
      <nav className="navbar bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand ms-5">
            <img alt="logo" src={logo} height="45px" />
          </a>
          <form className="d-flex me-md-5" role="search">
            <input
              className="searchbox form-control me-2 txt-muted"
              type="search"
              placeholder="Search"
            />
            <a className="nav-link text-dark fs-5 searchIcon" href="#">
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <a className="nav-link text-dark fs-5" href="#">
              <i class="fa-solid fa-house"></i>
            </a>
            <a class="nav-link text-dark fs-5" href="#">
              <i class="fa-regular fa-heart"></i>
            </a>
            <a class="nav-link text-dark fs-5" href="#">
              <i class="fa-solid fa-circle"></i>
            </a>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
