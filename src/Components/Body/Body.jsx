import "./Body.css";
import React from "react";
import SideBar from "../SideBar/SideBar";
import Stories from "../Stories/Stories";
import Posts from "../Posts/Posts";
function Body() {
  return (
    <div className="body--container">
      <div className="left">
        {/* <Stories /> */}
        <Posts />
      </div>
      <div className="right">
        <SideBar />
      </div>
    </div>
  );
}

export default Body;
