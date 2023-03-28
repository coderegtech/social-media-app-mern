import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuthStore from "../auth/useAuthStore";
import useUsersStore from "../users/useUsersStore";
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

  const isLoading = usePostsStore((state) => state.isLoading);
  const deletePost = usePostsStore((state) => state.deletePost);

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

  const handleAddComment = async (postId) => {};

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
                  <div className="pt-3">
                    <form
                      className="flex gap-3 items-center"
                      onSubmit={() => handleAddComment(postId)}
                    >
                      <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={`http://localhost:9999/profile/${currentUser.profilePic}`}
                        alt=""
                      />
                      <input
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className="py-2 px-3 w-full bg-white/10 rounded-full text-white cursor-pointer focus:outline-none placeholder:text-white/20"
                        type="text"
                        placeholder="Write a comment..."
                      />
                    </form>
                    {/* comments */}
                    <div className="py-3 flex gap-3 items-start">
                      <img
                        className="w-8 h-8 object-cover rounded-full"
                        src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.6435-1/128131566_1401162046721063_3715506702234565360_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeG2RpP4g-UuE76SBllHUq8DBrs8hHnRWX8GuzyEedFZf7UFc9z1AXCR1q3vgyfMN8m1szQXFmZO4E6Adog25uFj&_nc_ohc=ju3ZroxzQegAX9eX97h&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCaPSduulAAY9fjNxZ5A4cP9eOrCHl4XsIG-W2IYqAR4Q&oe=63A06B93"
                        alt=""
                      />
                      <div className="bg-white/10 rounded-2xl p-2 max-w-sm">
                        <p className="text-sm text-white/80">
                          this is a comment
                        </p>
                      </div>
                    </div>
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
