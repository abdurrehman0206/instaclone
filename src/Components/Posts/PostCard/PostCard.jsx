import React, { useState, useContext, useEffect } from "react";
import "./PostCard.css";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import InputEmoji from "react-input-emoji";
import { db } from "../../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { AuthContext } from "../../../Context/AuthContext";
function PostCard(props) {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [relativeTime, setRelativeTime] = useState("");
  let date = new Date(props.timestamp);
  // date = date.toUTCString();
  const getRelativeTime = (date) => {
    let nowData = new Date();
    let diff = nowData.getTime() - date.getTime();
    let diffDays = Math.floor(diff / (1000 * 3600 * 24));
    let diffHours = Math.floor(diff / (1000 * 3600));
    let diffMinutes = Math.floor(diff / (1000 * 60));
    let diffSeconds = Math.floor(diff / 1000);
    if (diffDays > 0) {
      setRelativeTime(diffDays + " days ago");
    } else if (diffHours > 0) {
      setRelativeTime(diffHours + " hours ago");
    } else if (diffMinutes > 0) {
      setRelativeTime(diffMinutes + " minutes ago");
    } else if (diffSeconds > 0) {
      setRelativeTime(diffSeconds + " seconds ago");
    }
  };
  useEffect(() => {
    setInterval(() => {
      getRelativeTime(date);
    }, 60000);
  }, [relativeTime]);
  useEffect(() => {
    getRelativeTime(date);
    var element = document.getElementById("comments");
    element.scrollTop = element.scrollHeight;
  }, [props.comments]);
  useEffect(() => {
    let cnt = 0;
    if (props.likes.length !== 0) {
      props.likes.map((like) => {
        cnt += 1;
        if (like.uid === currentUser.uid) {
          setIsLiked(true);
        }
        return like;
      });
      setLikes(cnt);
    } else {
      setLikes(0);
    }
  }, [props.likes]);
  const postComment = async () => {
    const docRef = doc(db, "userPosts", props.postId);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment: comment,
        user: currentUser.displayName,
      }),
    })
      .then((res) => {
        console.log(res);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
    setComment("");
  };
  const likePost = async () => {
    setIsLiked(true);
    const docRef = doc(db, "userPosts", props.postId);
    await updateDoc(docRef, {
      likes: arrayUnion({
        userName: currentUser.displayName,
        uid: currentUser.uid,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setIsLiked(false);
        console.log(err);
      });
  };
  const unlikePost = async () => {
    setIsLiked(false);
    const docRef = doc(db, "userPosts", props.postId);
    await updateDoc(docRef, {
      likes: arrayRemove({
        userName: currentUser.displayName,
        uid: currentUser.uid,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setIsLiked(true);
        console.log(err);
      });
  };
  const commentsElement = props.comments.map((comment, i) => {
    return (
      <div key={i} className="post--comments">
        <h4>{comment.user}</h4>
        <p>{comment.comment}</p>
      </div>
    );
  });
  return (
    <div className="postcard">
      <div className="post--header">
        <div className="post--header--left">
          <img src={props.photoURL} alt="user" />
          <h4>{props.username}</h4>
        </div>
        <div className="post--header--right">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className="post--image">
        <img src={props.postImage} alt="post" />
      </div>
      <div className="post--interection">
        <div className="post--interection--left">
          {isLiked ? (
            <AiFillHeart
              style={{ color: "#ED4956" }}
              className="interect--icons"
              onClick={unlikePost}
            />
          ) : (
            <AiOutlineHeart className="interect--icons" onClick={likePost} />
          )}

          <AiOutlineMessage className="interect--icons" />
          <FiSend className="interect--icons" />
        </div>
        <div className="post--interection--right">
          <BsBookmark className="interect--icons" />
        </div>
      </div>
      <div className="post--likes">
        <p>{likes} likes</p>
      </div>
      <div className="post--caption">
        <h4>{props.username}</h4>
        <p>{props.caption}</p>
      </div>
      <div id="comments" className="comments--container">
        {commentsElement}
      </div>
      <div className="post--time">
        <p>{relativeTime}</p>
      </div>
      <div className="post--footer">
        <InputEmoji
          cleanOnEnter
          placeholder="Add a comment..."
          value={comment || ""}
          onChange={(value) => setComment(value)}
          theme="light"
          borderRaduis="0px"
          borderColor="transparent"
          onEnter={postComment}
        />
        {/* <input type="text" placeholder="Add a comment ..." required /> */}
        <button onClick={postComment}>Post</button>
      </div>
    </div>
  );
}

export default PostCard;
