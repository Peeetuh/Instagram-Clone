import "../components/Profile.css";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moreAction from "../images/horizontalMoreAction.png";
import "../components/Card.css";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatedProfileImg } from "../redux/updateProfileImg";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [profileImg, setProfileImg] = useState({ preview: "", data: ""});
  const [myAllPosts, setMyAllPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleEditClose = () => setShow(false);
  // const handleEditShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);
  



  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);

  const handleEditProfileClose = () => setShowEditProfile(false);
  const handleEditPostShow = () => setShowEditProfile(true);

  const handleFileSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleProfileFileSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setProfileImg(profileImg);
  };

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      //prettier-ignore
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  };

  const deletePost = async (postId) =>{
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
    if(response.status === 200){
      getMyPosts();
      setShow(false);
    }
  }

  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append("file", image.data);

    const response = await axios.post(`${API_BASE_URL}/uploadFile`, formData);
    return response;
  };

  const handleProfileImgUpload = async () => {
    let formData = new FormData();
    formData.append("file", image.data);

    const response = await axios.post(`${API_BASE_URL}/uploadFile`, formData);
    return response;
  };

  const getMyPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/myposts`, CONFIG_OBJ);

    if (response.status === 200) {
      setMyAllPosts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured while getting your posts",
      });
    }
  }

  const showDetail = (post) => {
    setPostDetail(post);
  }



  const addPost = async () => {
    if (image.preview === "") {
      Swal.fire({
        icon: "error",
        title: "Post image needs to be added.",
      });
    } else if (caption === "") {
      Swal.fire({
        icon: "error",
        title: "Post caption needs to be added!",
      });
    } else if (location === "") {
      Swal.fire({
        icon: "error",
        title: "Post location is needed!",
      });
    } else {
      setLoading(true);
      const imgResponse = await handleImgUpload();
      const request = {
        description: caption,
        location: location,
        image: `${API_BASE_URL}/files/${imgResponse.data.fileName}`,
      };
      // api call to create post
      const postResponse = await axios.post(
        `${API_BASE_URL}/createpost`,
        request,
        CONFIG_OBJ
      );
      setLoading(false);
      if (postResponse.status === 201) {
        navigate("/posts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured while creating post",
        });
      }
    }
  };

  
  const editProfilePic = async () => {
    
      const profileImgResponse = await handleImgUpload(); // uploads our image. // need to get our image.
      const request = await {  
        profileImg: `${API_BASE_URL}/files/${profileImgResponse.data.fileName}`,
      };
      // console.log(request.profileImg); //profile Img contains our tiger.jpg, data.fileName: "tiger.jpg";
      setProfileImg(request.profileImg); // sets our profileImg 
      // api call to update the profileImg.
      const updateProfileImg = await axios.patch(
        `${API_BASE_URL}/updateProfileImg`,
        request,
        CONFIG_OBJ
      );
      // setLoading(false);
      if (updateProfileImg.status === 200) {
        dispatch(updatedProfileImg(request.profileImg));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured editting profile picture",
        });
      }
  };

  useEffect(() => {
    getMyPosts();
  }, []);


  // {myAllPosts.map((post) => { 
  //   return (
  //     <div className="col-md-4 col-sm-12" key={post._id}>
  //       <div className="card" onClick={handleShow}>
  //       <img
  //       onClick={() => showDetail(post)}
  //       src={post.image}
  //       className="card-img-top"
  //       alt={post.description}
  //       />
  //     </div>
  // </div>
  //   );
  // })}

/*

*/

// console.log(user);
  return (
    <div className="container shadow mt-3 p-4">
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <img
            className="p-2 profile-pic img-fluid"
            alt="profile pic"
            src={user.user.profileImg}
          />
          <p className="ms-3 fs-5 fw-bold">{user.user.email}</p>
          <p className="ms-3 fs-5">{user.user.fullName}</p>
          <p className="ms-3 fs-5">UI/UX Designer @john | Follow @{user.user.fullName}</p>
          <p className="ms-3 fs-5">
            My portfolio on <a href="#">www.portfolio.com/john</a>
          </p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between mt-3">
          <div className="d-flex justify-content-equal mx-auto">
            <div className="count-section pe-4 pe-md-5 text-center fw-bold">
              <h4>{myAllPosts.length}</h4>
              <p>Posts</p>
            </div>
            <div className="count-section px-4 px-md-5 text-center fw-bold">
              <h4>0</h4>
              <p>Followers</p>
            </div>
            <div className="ps-md-5 ps-4 text-center fw-bold">
              <h4>0</h4>
              <p>Following</p>
            </div>
          </div>
          <div className="mx-auto mt-md-0 mt-3">
            <button 
            className="custom-btn custom-btn-white me-md-3"
            onClick={handleEditPostShow}>
              <span className="fs-6">Edit Profile</span>
            </button>
            <button
              className="custom-btn custom-btn-white"
              onClick={handlePostShow}
            >
              <span className="fs-6">Upload Post</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <hr />
        </div>
      </div>
      <div className="row mb-4">
      {myAllPosts.map((post) => { 
          return (
            <div className="col-md-4 col-sm-12" key={post._id}>
              <div className="card" onClick={handleShow}>
              <img
              onClick={() => showDetail(post)}
              src={post.image}
              className="card-img-top"
              alt={post.description}
              />
            </div>
        </div>
          );
        })}
        
      </div>
    

      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Upload Post</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={postDetail.image}
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-6 d-flex">
                  <img
                    className="p-2 post-profile-pic"
                    alt="profile-pic"
                    src="https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNlbGZpZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
                  />
                  <div className="mt-2 ms-2">
                    <p className="fs-6 fw-bold">{postDetail.location}</p>
                    <p className="location">{postDetail.description}</p>
                  </div>
                  <div className="dropdown ms-5">
                    <a
                      className="btn"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                    >
                      <img alt="more action" src={moreAction} />
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-regular fa-pen-to-square px-2"></i>
                          Edit Post
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={() => deletePost(postDetail._id)}>
                          <i className="fa-sharp fa-solid fa-trash px-2"></i>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span className="p-2 text-muted">2 Hours Ago</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 ms-2">
                  <p>Lorem Ipsum</p>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-6 d-flex">
                  <i className="ps-2 fs-4 fa-regular fa-heart"></i>
                  <i className="ps-3 fs-4 fa-regular fa-comment"></i>
                  <i className="ps-3 fs-4 fa-solid fa-location-arrow"></i>
                </div>
                <div className="col-12 mt-3 ms-2">
                  <span className="fs-6 fw-bold"> 200 likes</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

      
      <Modal show={showEditProfile} onHide={handleEditProfileClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Edit Profile</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="upload-box">
                <div className="dropZoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />
                  <div className="dropZoneOverlay">
                    {image.preview && (
                      <img src={image.preview} width="150" height="150" />
                    )}
                    <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                    <br />
                    Upload Photo From Computer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      onChange={(e) => setCaption(e.target.value)}
                      className="form-control"
                      placeholder="Add Caption"
                      id="floatingTextarea"
                    ></textarea>
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Add Location"
                    />
                    <label for="floatingInput">
                      <i className="fa-solid fa-location-pin pe-2"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-md-12 mt-3 text-center">
                  </div>
                  <button
                    onClick={() => (editProfilePic())}
                    className="custom-btn custom-btn-pink float-end"
                  >
                    <span className="fs-6 fw-600">Confirm Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPost} onHide={handlePostClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Upload Post</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="upload-box">
                <div className="dropZoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />
                  <div className="dropZoneOverlay">
                    {image.preview && (
                      <img src={image.preview} width="150" height="150" />
                    )}
                    <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                    <br />
                    Upload Photo From Computer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      onChange={(e) => setCaption(e.target.value)}
                      className="form-control"
                      placeholder="Add Caption"
                      id="floatingTextarea"
                    ></textarea>
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      onChange={(e) => setLocation(e.target.value)}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Add Location"
                    />
                    <label for="floatingInput">
                      <i className="fa-solid fa-location-pin pe-2"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {loading ? (
                    <div className="col-md-12 mt-3 text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-12 mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addPost()}
                    className="custom-btn custom-btn-pink float-end"
                  >
                    <span className="fs-6 fw-600">Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;

//margin bottom 3...
