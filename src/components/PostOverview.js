import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import "./PostOverview.css";
import Footer from "./Footer";

function PostOverview() {
  const [allPosts, setAllPosts] = useState([]);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      //prettier-ignore
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  };

  const getAllPosts = async () => {
    // console.log("getAllPosts");
    const response = await axios.get(`${API_BASE_URL}/allposts`);

    if (response.status === 200) {
      setAllPosts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured while getting all postes",
      });
    }
  };

  const deletePost = async (postId) =>{
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
    if(response.status === 200){
      getAllPosts();
    }
  }
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div>
    <div className="container mt-md-5 mt-3">
      <div className="row">
        {allPosts.map((post) => {
          return (
            <div className="col-md-4 mb-2" key={post._id}>
              <Card postData={post} getAllPosts={getAllPosts} deletePost={deletePost}/>
            </div>
          );
        })}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default PostOverview;
