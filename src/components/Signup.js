import React from "react";
import "../components/Signup.css";
import social from "../images/social-desktop.png";
import socialMobile from "../images/social-mobile.png";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <div className="container login-container">
        <div className="row">
          <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
            <img
              className="social"
              style={{ height: "85 %" }}
              src={social}
              alt="just-a-page"
            />
            <img
              className="socialMobile"
              src={socialMobile}
              alt="another-page"
            />
          </div>

          <div className="col-md-5 col-sm-12">
            <div className="card shadow">
              <div className="card-body px-5">
                <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
                <form>
                  <input
                    type="text"
                    className="p-2 mt-4 mb-2 form-control input-bg"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    className="p-2 mb-2 form-control input-bg"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="p-2 mb-2 form-control input-bg"
                    placeholder="Full Name"
                  />
                  <input
                    type="password"
                    className="p-2 mb-2 form-control input-bg"
                    placeholder="Password"
                  />
                  <div className="mt-3 d-grid">
                    <button
                      type="submit"
                      className="custom-btn custom-btn-blue"
                    >
                      Sign Up
                    </button>
                    <div className="mt-4">
                      <hr className="text-muted" />
                      <h4 className="text-muted text-center">OR</h4>
                      <hr className="text-muted" />
                    </div>
                    <div className="mt-3 mb-5 d-grid">
                      <button className="custom-btn custom-btn-white">
                        <span className="text-muted">
                          Already have an account?
                        </span>
                        <Link to="/login" className="ms-1 text-infor fw-bold">
                          Login In
                        </Link>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
