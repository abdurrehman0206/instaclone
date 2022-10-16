import React, { useState, useContext } from "react";
import "./CreatePost.css";
import { AuthContext } from "../../Context/AuthContext";
import LoadingBar from "../LoadingBar/LoadingBar";
import AddFile from "../../images/select.png";
import { db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function CreatePost() {
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  //HANDLE CLOSE
  const handleClose = () => {
    document.getElementById("createpost").classList.remove("active");
  };
  //REMOVE IMAGE
  const removeImage = () => {
    document.getElementById("preview").src = AddFile;
    document.getElementById("file").value = "";
  };
  //POST UPLOAD
  const postUpload = async (postId, caption, url) => {
    await setDoc(doc(db, "userPosts", postId), {
      postId: postId,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      userPhoto: currentUser.photoURL,
      time: new Date().getTime(),
      caption: caption,
      image: url,
      likes: [],
      comments: [],
    })
      .then((res) => {
        setUploading(false);
        console.log("POST RES:", res);
      })
      .catch((err) => {
        console.log("POST ERROR:", err);
      });
  };

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    const postId = new Date().getTime().toString();
    const file = e.target[0].files[0];
    const caption = e.target[1].value;
    const imageRef = ref(storage, postId);
    const uploadTask = await uploadBytesResumable(imageRef, file);
    if (uploadTask.state === "success") {
      getDownloadURL(imageRef)
        .then(async (url) => {
          await postUpload(postId, caption, url);
        })
        .then((res) => {
          handleClose();
          removeImage();
          e.target[1].value = "";
          console.log("IMAGE UPLOAD RES:", res);
        })
        .catch((err) => {
          console.log("IMAGE UPLOAD ERROR:", err);
        });
    }
  };
  return (
    <div id="createpost" className="createpost--wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="createpost--container">
          <div className="createpost--header">
            <h4>Create New Post</h4>
            <label onClick={handleClose} className="createpost--close">
              X
            </label>
          </div>

          <div className="createpost--body">
            <div className="preview--container">
              <img src={AddFile} id="preview" />
              <label className="remove--file" onClick={removeImage}>
                X
              </label>
            </div>

            <label className="select--file" htmlFor="file">
              Select a file
            </label>

            {/* {!uploading && <h4>Posting</h4>} */}
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              required
              accept="image/*"
              onChange={(e) => {
                document.getElementById("preview").src =
                  window.URL.createObjectURL(e.target.files[0]);
              }}
            />
            {uploading && <LoadingBar />}
          </div>
          <div className="createpost--footer">
            <img src={currentUser.photoURL} alt="" />
            <input type="text" required placeholder="Add Caption ..." />
            <button className={uploading ? "disable" : ""}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
