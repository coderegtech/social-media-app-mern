import axios from "axios";
import React, { useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import useAuthStore from "../features/auth/useAuthStore";
import usePostsStore from "../features/post/usePostsStore";

const UploadPost = ({ active, close }) => {
  const [desc, setDesc] = useState("");
  const [postImg, setPostImg] = useState([]);
  const [preview, setPreview] = useState();

  const addPost = usePostsStore((state) => state.addPost);
  const { currentUser, accessToken } = useAuthStore(
    (state) => state.currentUser
  );
  const fullName = `${currentUser.firstname} ${currentUser.surname}`;

  const inputRef = useRef(null);
  const dropWrapperRef = useRef(null);

  const onFileDragLeave = (e) => {
    e.preventDefault();
    dropWrapperRef.current.classList.replace(
      "border-white/50",
      "border-white/10"
    );
  };

  const onFileDragOver = (e) => {
    e.preventDefault();
    dropWrapperRef.current.classList.replace(
      "border-white/10",
      "border-white/50"
    );
  };

  const onFileDrop = (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const selectedFile = dt.files[0];
    setPostImg(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const fileHandler = (e) => {
    const selectedFile = e.target.files[0];
    setPostImg(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUploadPost = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("post_description", desc);
      formData.append("postImg", postImg);

      const API_URL = "http://localhost:9999/api/post";
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // insert the response data to post
      const response = await axios.post(`${API_URL}/addPost`, formData, config);
      addPost(response.data);
      // close the upload modal after submitting
      close();
      // handleUploadFile();
      setDesc("");
      setPreview(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={close}
      className={`${
        active ? "block" : "hidden"
      } fixed top-0 left-0 w-screen h-screen bg-black/80 z-50 flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full h-auto bg-[#111] rounded-xl p-3 m-3"
      >
        <header className="w-full flex justify-between items-center border-b border-white/10 py-2">
          <h1 className="text-white text-2xl font-semibold">Create post</h1>
          <span onClick={close} className="p-2 bg-white/10 rounded-full">
            <MdClose className="text-white text-xl" />
          </span>
        </header>
        <div className="w-full h-full rounded-xl">
          <div className="w-full h-full flex gap-3 items-center justify-between py-3 px-2">
            <div className=" flex gap-3 items-center justify-start">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={`http://localhost:9999/profile/${currentUser.profilePic}`}
                alt=""
              />
              <p className="text-white text-base font-semibold">
                {fullName.replace(/\b\w/g, (name) => name.toUpperCase())}
              </p>
            </div>
            <span>
              <BsImages className="text-green-500 text-2xl" />
            </span>
          </div>
          <form
            onSubmit={handleUploadPost}
            className="w-full h-full"
            encType="multipart/form-data"
          >
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
              value={desc}
              className="w-full h-16 bg-transparent text-white focus:outline-none font-mono placeholder:text-lg md:placeholder:text-xl placeholder:text-white/30 "
              placeholder={`What's on your mind? ${currentUser.firstname}`}
            ></textarea>
            <div
              ref={dropWrapperRef}
              onDragLeave={onFileDragLeave}
              onDragOver={onFileDragOver}
              onDrop={onFileDrop}
              className="border-2 border-dashed border-white/10 h-48 w-full rounded-xl p-2 z-40"
            >
              <div className="relative w-full h-full flex flex-col justify-center items-center ">
                <span
                  onClick={() => setPreview(null)}
                  className={`${
                    preview ? "block" : "hidden"
                  } absolute top-0 right-0 p-1 bg-white/10 rounded-full z-50`}
                >
                  <MdClose className="text-white text-sm" />
                </span>
                <input
                  id="postImg"
                  onChange={fileHandler}
                  ref={inputRef}
                  className="w-full h-full"
                  name="postImg"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,video/*"
                  hidden
                />

                <img
                  className={`${
                    preview ? "block" : "hidden"
                  } w-[80%] h-full object-contain absolute`}
                  src={preview}
                  alt=""
                />

                <BsImages
                  onClick={() => inputRef.current.click()}
                  className="text-white/50 text-3xl hover:text-white duration-200"
                />
                <span className="text-white/80 text-lg">Add photos/videos</span>
                <p className="text-white/50 text-sm">or drag and drop</p>
              </div>
            </div>

            <button
              disabled={!postImg}
              type="submit"
              className="w-full p-2 my-2 bg-blue-500 text-white/80 rounded-md"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
