import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import { db } from "../../firebase";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      // await getDoc(doc(db, "users", currentUser.uid)).then((doc) => {
      //
      //   if (doc.exists()) {
      //     setPostCount(doc.data().posts.length);
      //   }
      // });
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setUserPosts(doc.data().posts);
          setPostCount(doc.data().posts.length);
        }
      });
    };
    getStats();
    return () => {
      getStats();
    };
  }, []);
  const userPostElement = userPosts.map((post) => {
    return (
      <div className="userpost--thumbnail" key={post.postId}>
        <img src={post.postImage} alt="userPost" />
      </div>
    );
  });
  return (
    <div className="userprofile--wrapper">
      <div className="userprofile--container">
        <div className="userprofile">
          <div className="userprofile--pic">
            <img src={currentUser.photoURL} alt="" />
          </div>
          <div className="userprofile--details">
            <h4>{currentUser.email.split("@")[0]}</h4>
            <div className="userprofile--stats">
              <p>{postCount} posts</p>
              <p>{followersCount} followers</p>
              <p>{followingCount} following</p>
            </div>
            <h4 className="bold">{currentUser.displayName}</h4>
          </div>
        </div>
        <div className="userposts--grid">
          {userPosts.length > 0 ? userPostElement : <Loader />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
