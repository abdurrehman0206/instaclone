import React from "react";
import "./Loader.css";
import { AiFillInstagram } from "react-icons/ai";
function Loader() {
  return (
    <div className="loader--container">
      <AiFillInstagram className="loader--icon" />
    </div>
  );
}

export default Loader;
