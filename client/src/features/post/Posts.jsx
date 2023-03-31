import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  BsFillArrowRightCircleFill,
  BsThreeDots,
  BsTrash,
} from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuthStore from "../auth/useAuthStore";
import useUsersStore from "../users/useUsersStore";
import Comments from "./Comments";
import usePostsStore from "./usePostsStore";

const Posts = ({ posts }) => {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const { currentUser, accessToken } = useAuthStore(
    (state) => state.currentUser
  );
  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const getUser = useUsersStore((state) => state.getUser);

  const fetching = usePostsStore((state) => state.fetching);
  const isLoading = usePostsStore((state) => state.isLoading);
  const deletePost = usePostsStore((state) => state.deletePost);
  const addComment = usePostsStore((state) => state.addComment);

  const API_URL = "http://localhost:9999/api/post";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleDeletePost = async (id) => {
    try {
      const alertMsg = window.confirm("Do you want to remove this post?");

      if (alertMsg) {
        const response = await axios.delete(
          `${API_URL}/deletePost/${id}`,
          config
        );
        console.log(response);
        deletePost(id);
      }

      // insert the response data to post
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      fetching();

      const response = await axios.post(
        `${API_URL}/addComment`,
        {
          postId,
          comment,
        },
        config
      );

      addComment(response.data);

      setComment("");
      // insert the response data to post
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        posts?.map(
          ({
            postId,
            post_description,
            profilePic,
            firstname,
            surname,
            user_uid,
            postImgName,
            createdAt,
            comments,
          }) => {
            return (
              <div
                key={postId}
                className="w-full h-auto  bg-[#111] rounded-xl my-3"
              >
                <header className="flex justify-between items-center px-3 py-2">
                  <div className="flex gap-3 items-center">
                    <img
                      className={`w-10 h-10 object-cover rounded-full ${
                        users.isOnline ? "border-2 border-green-700" : ""
                      }`}
                      src={`http://localhost:9999/profile/${profilePic}`}
                      alt=""
                    />
                    <div className="leading-none">
                      <Link to={`/profile/${user_uid}`}>
                        <p className="text-base text-white/80 font-semibold cursor-pointer">
                          {firstname} {surname}
                        </p>
                      </Link>

                      <span className="text-sm text-white/50">
                        {moment(createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  {currentUser.user_uid === user_uid ? (
                    <BsTrash
                      onClick={() => handleDeletePost(postId)}
                      className="text-white/80 text-lg hover:text-red-500"
                    />
                  ) : (
                    <BsThreeDots className="text-white/80 text-base" />
                  )}
                </header>

                {/* caption */}
                <div className="w-full px-3 py-1">
                  <h1 className="text-white text-base">
                    {post_description.length > 150
                      ? post_description.substring(0, 150) + "..."
                      : post_description.length < 150
                      ? post_description
                      : ""}

                    {/* <span className="text-blue-500">see more...</span> */}
                  </h1>
                </div>

                <Link to={`post/${postId}`}>
                  <div className="w-full h-full bg-[#111] p-3">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      src={`http://localhost:9999/post/${postImgName}`}
                      alt=""
                    />
                  </div>
                </Link>
                <div className=" px-3">
                  <div className="flex gap-1 justify-around items-center border-y border-white/10 py-1 ">
                    <div
                      onClick={() => setLike(!like)}
                      className="w-full flex gap-2 justify-center items-center py-2 cursor-pointer hover:bg-white/10 rounded-lg duration-300"
                    >
                      {like ? (
                        <AiFillLike className="text-white text-2xl" />
                      ) : (
                        <AiOutlineLike className="text-white text-2xl" />
                      )}

                      <p className="text-base text-white/50">Like</p>
                    </div>
                    <div className="w-full flex gap-2 justify-center items-center py-2 cursor-pointer hover:bg-white/10 rounded-lg duration-300">
                      <FaRegCommentAlt className="text-white text-2xl" />
                      <p className="text-base text-white/50">Comment</p>
                    </div>
                    <div className="w-full flex gap-2 justify-center items-center py-2 cursor-pointer hover:bg-white/10 rounded-lg duration-300">
                      <RiShareForwardLine className="text-white text-2xl" />
                      <p className="text-base text-white/50">Share</p>
                    </div>
                  </div>
                  <div className="py-3">
                    {/* comments */}
                    <Comments postId={postId} comments={comments} />

                    <form
                      className=" py-2 flex gap-3 items-center"
                      onSubmit={(e) =>
                        handleAddComment(postId, e.preventDefault())
                      }
                    >
                      <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={`http://localhost:9999/profile/${currentUser.profilePic}`}
                        alt=""
                      />

                      <div className="relative w-full">
                        <input
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          className=" py-2 px-3 w-full bg-white/10 rounded-full text-white cursor-pointer focus:outline-none placeholder:text-white/20"
                          type="text"
                          placeholder="Write a comment..."
                        />

                        <button type="submit" disabled={!comment}>
                          <BsFillArrowRightCircleFill className="text-3xl absolute right-2 text-white/20 top-1/2 -translate-y-1/2" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          }
        )
      )}
    </>
  );
};

export default Posts;
