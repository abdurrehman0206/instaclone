import React, { useState, useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Loader from "../Loader/Loader";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getPosts = () => {
      onSnapshot(collection(db, "userPosts"), (doc) => {
        const posts = doc.docs.map((doc) => doc.data());
        setPosts(posts.reverse());
        setLoading(false);
      });
    };
    getPosts();
    return () => {
      getPosts();
    };
  }, []);
  const postElements = posts.map((post) => {
    return (
      <PostCard
        key={post.postId}
        postId={post.postId}
        caption={post.caption}
        photoURL={post.userPhoto}
        username={post.userName}
        postImage={post.image}
        comments={post.comments}
        likes={post.likes}
        timestamp={post.time}
      />
    );
  });
  if (loading) {
    return <Loader />;
  }
  return <div className="posts--container">{postElements}</div>;
}

export default Posts;
