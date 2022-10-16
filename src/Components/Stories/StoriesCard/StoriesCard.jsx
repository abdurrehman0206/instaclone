import React from "react";
import "./StoriesCard.css";
function StoriesCard(props) {
  return (
    <div className="stories--user">
      <img src={props.photoURL} alt="story" />
      <p className="username">{props.username}</p>
    </div>
  );
}

export default StoriesCard;
