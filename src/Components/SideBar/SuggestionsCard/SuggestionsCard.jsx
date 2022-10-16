import React from "react";
import "./SuggestionsCard.css";
function SuggestionsCard(props) {
  return (
    <div className="suggestion--wrapper">
      <div className="suggestion">
        <img src={props.img} alt="profile" />
        <div className="suggestion--details">
          <h5>{props.name}</h5>
          <p>{props.username}</p>
        </div>
      </div>
      <a href="#">Follow</a>
    </div>
  );
}

export default SuggestionsCard;
