import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { AuthContext } from "../../Context/AuthContext";
import SuggestionsCard from "./SuggestionsCard/SuggestionsCard";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
function SideBar() {
  const { currentUser } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const getDatabase = async () => {
      await getDocs(collection(db, "users")).then((doc) => {
        let data = doc.docs.map((doc) => doc.data());
        data = data.filter((user) => user.uid !== currentUser.uid);
        setSuggestions(data);
      });
    };
    getDatabase();
    return () => {
      getDatabase();
    };
  }, [currentUser.uid]);
  const suggestionElement = suggestions.map((suggestion) => {
    return (
      <SuggestionsCard
        key={suggestion.uid}
        name={suggestion.email.split("@")[0]}
        username={suggestion.name}
        img={suggestion.photo}
      />
    );
  });
  return (
    <div className="sidebar--container">
      <div className="user--wrapper">
        <div className="user">
          <img src={currentUser.photoURL} alt="profile" />
          <div className="user--details">
            <h5>{currentUser.email.split("@")[0]}</h5>
            <p>{currentUser.displayName.split(" ")[0]}</p>
          </div>
        </div>
        <NavLink to="/login">Switch</NavLink>
      </div>
      <span>
        <h4>Suggestions For You</h4>
        <p>See All</p>
      </span>
      <div className="suggestions--section">{suggestionElement}</div>
    </div>
  );
}

export default SideBar;
