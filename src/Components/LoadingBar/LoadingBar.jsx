import React from "react";
import "./LoadingBar.css";
function LoadingBar() {
  return (
    <div className="loading--wrapper">
      <h4>Posting...</h4>
      <div className="loadingbar--container">
        <div className="loadingbar"></div>
      </div>
    </div>
  );
}

export default LoadingBar;
