import React, { useState, useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import { db } from "../../firebase";
import { doc, collection, getDocs, onSnapshot } from "firebase/firestore";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = () => {
      onSnapshot(collection(db, "userPosts"), (doc) => {
        const posts = doc.docs.map((doc) => doc.data());
        setPosts(posts.reverse());
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
  return <div className="posts--container">{postElements}</div>;
}

export default Posts;
