import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import usePostsStore from "../features/post/usePostsStore";
const ViewPost = () => {
  const { postId } = useParams();
  const post = usePostsStore((state) => state.posts);
  const fetchPost = usePostsStore((state) => state.fetchSelectedPost);
  const isLoading = usePostsStore((state) => state.isLoading);
  const fetching = usePostsStore((state) => state.fetching);
  useState(() => {
    const fetchSelectedPost = async () => {
      const API_URL = "http://localhost:9999/api/post";
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      fetching();
      await axios
        .get(`${API_URL}/viewPost/${postId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  return (
    <div className="w-full bg-black h-screen">
      {/* post image container */}
      <div className="w-full">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default ViewPost;
