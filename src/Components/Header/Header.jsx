import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import CreatePost from "../CreatePost/CreatePost";
function Header() {
  const nav = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const dropMenu = () => {
    document.querySelector(".dropdown").classList.toggle("active");
  };

  document.addEventListener("click", (e) => {
    const has1 = e.target.classList.contains("profile--pic");
    if (!has1) {
      document.querySelector(".dropdown").classList.remove("active");
    }
  });

  const handleSignout = () => {
    signOut(auth).then(() => {
      nav("/login");
    });
  };
  const createPost = () => {
    document.getElementById("createpost").classList.add("active");
  };
  return (
    <div className="header--container">
      <div className="header--logo">
        <img src={logo} alt="Instagram Logo" />
      </div>
      <div className="header--search">
        <AiOutlineSearch className="search--logo" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="header--nav">
        <BiHome className="nav--icons" />
        <RiMessengerLine className="nav--icons" />
        <MdOutlineAddBox className="nav--icons" onClick={createPost} />
        <CreatePost className="createpost" />
        <FaRegCompass className="nav--icons" />
        <AiOutlineHeart className="nav--icons" />
        <div className="profile" onClick={dropMenu}>
          <img className="profile--pic" src={currentUser.photoURL} alt="" />
          <div className="dropdown">
            <p onClick={handleSignout}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
