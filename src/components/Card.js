import React from "react";
import "./Card.css";
import moreAction from "../images/more-action.png";

function Card() {
  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body px-2 ">
          <div className="row">
            <div className="col-6 d-flex">
              <img
                className="p-2 post-profile-pic"
                alt="profile-pic"
                src="https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNlbGZpZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
              />
              <div className="mt-2">
                <p className="fs-6 fw-bold">Title</p>
                <p className="location">Description</p>
              </div>
            </div>
            <div className="col-6">
              <img
                className="float-end fs-3 p-2 mt-2"
                alt="more action"
                src={moreAction}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <img
                className="p-2 img-fluid"
                style={{ borderRadius: "15px" }}
                alt="post pic"
                src="https://images.unsplash.com/photo-1533227935323-22ca46e5e899?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-6 d-flex">
              <i class="ps-2 fs-4 fa-regular fa-heart"></i>
              <i class="ps-3 fs-4 fa-regular fa-comment"></i>
              <i class="ps-3 fs-4 fa-solid fa-location-arrow"></i>
            </div>
            <div className="col-6">
              <span className="pe-2 fs-6 fw-bold float-end"> 200 likes</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span className="p-2 text-muted">2 Hours Ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
