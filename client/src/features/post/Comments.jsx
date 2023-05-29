import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuthStore from "../auth/useAuthStore";
import usePostsStore from "./usePostsStore";

const Comments = ({ postId }) => {
  const [activeDelBtn, setActiveDelBtn] = useState({
    id: "",
    active: false,
  });

  const { currentUser, accessToken } = useAuthStore(
    (state) => state.currentUser
  );
  const fetching = usePostsStore((state) => state.fetching);
  const isLoading = usePostsStore((state) => state.isLoading);
  const addComment = usePostsStore((state) => state.addComment);
  const comments = usePostsStore((state) => state.comments);

  const API_URL = "http://localhost:9999/api/post";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    const fetchComments = async () => {
      fetching();
      await axios
        .get(`${API_URL}/comments`, config)
        .then((result) => {
          console.log(result.data);
          addComment(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (!isLoading) fetchComments();
  }, []);

  const deleteComment = async (commentId) => {
    try {
      const alertMsg = window.confirm("Do you want to remove this comment?");

      if (alertMsg) {
        const response = await axios.delete(
          `${API_URL}/deleteComment`,
          {
            commentId,
            postId,
          },
          config
        );
        console.log(response);
      }

      // insert the response data to post
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {comments?.map(({ index, comment, users, createdAt }) => {
        return (
          <div
            key={index}
            // onClick={(e) => {
            //   setActiveDelBtn({
            //     id: commentId,
            //     active: false,
            //   });
            // }}
            className="py-1 flex gap-x-3 items-start"
          >
            <Link to={`/profile/${users.user_uid}`}>
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={`http://localhost:9999/profile/${profilePic}`}
                alt=""
              />
            </Link>

            <div className="bg-white/10 rounded-2xl p-2 leading-[10px]">
              <span className="text-[13px] text-white font-semibold">
                <Link
                  to={`/profile/${users.user_uid}`}
                  className="hover:underline"
                >
                  {firstname} {surname}
                </Link>{" "}
                <span className="text-[10px] text-white/50">
                  {moment(createdAt).fromNow()}
                </span>
              </span>
              <p className="text-base text-white/80">{comment}</p>
            </div>

            <span
              className={`${
                currentUser.user_uid !== user_uid ? "hidden" : "block"
              } hover:bg-white/10 rounded-full p-1 relative`}
            >
              <BsThreeDots
                onClick={(e) => {
                  setActiveDelBtn({
                    id: commentId,
                    active: !activeDelBtn.active,
                  });
                  e.stopPropagation();
                }}
                className="text-white/80 text-base"
              />

              <span
                onClick={() => deleteComment(commentId)}
                className={`${
                  activeDelBtn.id === commentId && activeDelBtn.active
                    ? "block"
                    : "hidden"
                } absolute top-6 px-3 py-1 bg-white/10 text-center cursor-pointer rounded-md`}
              >
                <p className="text-white/80">delete</p>
              </span>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
