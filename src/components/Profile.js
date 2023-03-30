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
import { updatedBio } from "../redux/updateBio";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const [timeStamp, setTimeStamp] = useState('');
  const [image, setImage] = useState({ preview: "", data: "" });
  
  const [profileImg, setProfileImg] = useState({ preview: "", data: ""});
  const [myAllPosts, setMyAllPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false); //
  
  const [showBioProfile, setShowBioProfile] = useState(false); //

  const [bio, setBio] = useState("");
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

  const handleEditBioProfileClose = () => setShowBioProfile(false); //
  const handleEditBioShow = () => setShowBioProfile(true);

  const handleEditProfileClose = () => setShowEditProfile(false); //
  const handleEditPostShow = () => setShowEditProfile(true);

  //  function addTimeStamp(){
  //   const now = new Date();
  //   const timeStampString = now.toLocaleString();
  //   setTimeStamp(timeStampString);
  // }
  

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
      Swal.fire({
        icon: "success",
        title: "Successfully Posted!",
      });

      const now = new Date();
      const timeStampString = now.toLocaleString();
      setTimeStamp(timeStampString);
      
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
      if (updateProfileImg.status === 200) {
        setShowEditProfile(false);
        Swal.fire({
          icon: "success",
          title: "Successfully added new profile pic!",
        });
        dispatch(updatedProfileImg(request.profileImg));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured editting profile picture",
        });
      }
  };

  const editBio = async () => {
    
    const request = {  
      bio: bio,
    };

    const updateBio = await axios.put(
      `${API_BASE_URL}/users/:id/bio`,
      request,
      CONFIG_OBJ
    );

    
    setBio(request.bio); // sets our profileImg 
    // api call to update the profileImg.
    
    // setLoading(false);
    if (updateBio.status === 200) {
      setShowBioProfile(false);
      Swal.fire({
        icon: "success",
        title: "Successfully added bio!",
      });
      dispatch(updatedBio(request.bio));
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



let followingArr = user.user.following;
let followerArr = user.user.followers;
// let followingArr = user.user.follo
//   console.log(followingArr.length);
// console.log(user.user.following);ß
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
          <p className="ms-3 fs-5">
            {user.user.bio}
          </p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between mt-3">
          <div className="d-flex justify-content-equal mx-auto">
            <div className="count-section pe-4 pe-md-5 text-center fw-bold">
              <h4>{myAllPosts.length}</h4>
              <p>Posts</p>
            </div>
            <div className="count-section px-4 px-md-5 text-center fw-bold">
              <h4>{followerArr.length}</h4>
              <p>Followers</p>
            </div>
            <div className="ps-md-5 ps-4 text-center fw-bold">
              <h4>{followingArr.length}</h4>
              <p>Following</p>
            </div>
          </div>
          <div className="mx-auto mt-md-0 mt-3">
            
          <a
                    className="btn"
                    href="/home" //subject to change (3)
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                  >
                    <button 
                    className="custom-btn custom-btn-white me-md-3">
                  <span className="fs-6">Edit Profile</span>
            </button>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                    <button 
                  className="custom-btn custom-btn-white me-md-3"
                  onClick={handleEditPostShow}>
                   <span className="fs-6">Edit Profile Pic</span>
            </button>
                    </li>
                    <li>
                    <button 
                  className="custom-btn custom-btn-white me-md-3"
                  onClick={handleEditBioShow}>
                   <span className="fs-6">Edit Profile Bio</span>
            </button>
                    </li>
                  </ul>

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
              style={{minHeight: "270px"}}
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
      
      <Modal show={showEditProfile} onHide={handleEditProfileClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Edit Profile Picture</span>
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

      <Modal show={showBioProfile} onHide={handleEditBioProfileClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Update Bio</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control"
                      placeholder="Add Bio"
                      id="floatingTextarea"
                      style={{height: "150px"}}
                    ></textarea>
                    <label for="floatingTextarea">Add Bio</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-md-12 mt-3 text-center">
                    {/* <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> */}
                  </div>
                  <button
                    onClick={() => editBio()}
                    className="custom-btn custom-btn-pink float-end"
                  >
                    <span className="fs-6 fw-600">Edit Bio</span>
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
                  {/* {loading ? (
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
                  )} */}
                  {/* <div className="col-md-12 mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div> */}
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


