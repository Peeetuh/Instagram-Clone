import React from "react";
import Card from "./Card";

function PostOverview() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <Card />
        </div>
        <div className="col-md-4">
          <Card />
        </div>
        <div className="col-md-4">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default PostOverview;
