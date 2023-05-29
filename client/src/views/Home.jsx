import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { RiLiveFill } from "react-icons/ri";
import Contacts from "../components/Contacts";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Stories from "../components/Stories";
import UploadPost from "../components/UploadPost";
import useAuthStore from "../features/auth/useAuthStore";
import Posts from "../features/post/Posts";
import usePostsStore from "../features/post/usePostsStore";
const Home = () => {
  const [addPostModal, setAddPostModal] = useState(false);
  const {
    currentUser: { firstname, profilePic },
    accessToken,
  } = useAuthStore((state) => state.currentUser);

  const posts = usePostsStore((state) => state.posts);
  const isLoading = usePostsStore((state) => state.isLoading);
  const fetching = usePostsStore((state) => state.fetching);
  const isError = usePostsStore((state) => state.isError);
  const fetchAllPost = usePostsStore((state) => state.fetchAllPost);

  const API_URL = "http://localhost:9999/api";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      fetching();

      await axios
        .get(`${API_URL}/post/getAllPosts`, config)
        .then((response) => {
          console.log(response.data);
          fetchAllPost(response.data);
        })
        .catch((err) => {
          console.log(err);
          isError(err);
        });
    };

    // const fetchAllUser = async () => {
    //   loading();
    //   await axios
    //     .get(`${API_URL}/user/users`, config)
    //     .then((response) => {
    //       getUser(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    if (!isLoading) {
      fetchPosts();
      // fetchAllUser();
    }
  }, []);

  return (
    <div className="relative w-full h-auto bg-black ">
      <Header />

      <div className="relative top-[60px] w-full flex justify-center">
        {/* sidemenu */}
        <div className=" bg-black hidden xl:block sticky top-16  h-[calc(100vh-70px)] max-w-[280px] w-full py-5 px-2  overflow-y-auto">
          <SideMenu />
        </div>
        {/* newsfeed */}
        <div className="w-full md:max-w-xl p-3 md:p-5 bg-black">
          {/* Stories */}
          <Stories />
          <div
            onClick={() => setAddPostModal(true)}
            className="w-full h-auto px-3 py-4 bg-[#111] rounded-xl mt-3"
          >
            <div className="w-full h-full flex gap-3 items-center justify-center pb-3">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={`http://localhost:9999/profile/${profilePic}`}
                alt=""
              />
              <span className="py-2 px-3 w-full bg-white/10 rounded-full text-white/30 cursor-pointer">
                What's on your mind? {firstname}
              </span>
            </div>
            <div className="w-full flex justify-around items-center py-2 border-t border-white/20">
              <div className="flex gap-2 cursor-pointer">
                <RiLiveFill className="text-red-500 text-xl" />
                <p className="text-sm text-white/50">Live video</p>
              </div>
              <div className="flex gap-2 cursor-pointer">
                <IoMdPhotos className="text-green-500 text-xl" />
                <p className="text-sm text-white/50">Photo/video</p>
              </div>
              <div className="flex gap-2 cursor-pointer">
                <BiHappyAlt className="text-yellow-500 text-xl" />
                <p className="text-sm text-white/50">Feeling/activity</p>
              </div>
            </div>
          </div>

          {/* upload post */}
          <UploadPost
            active={addPostModal}
            close={() => setAddPostModal(false)}
          />

          {/* posts */}
          <Posts posts={posts} />
        </div>

        {/* events & users */}
        <div className="bg-black hidden md:block sticky top-16 h-[calc(100vh-70px)] max-w-[280px] w-full py-5 px-2  overflow-y-auto">
          <div className="w-full px-2">
            <header className="flex justify-between items-center">
              <span className="text-base text-white/50 font-mono">
                Friend requests
              </span>
              <span className="text-xs text-blue-400 font-mono">See All</span>
            </header>
            <div className="flex justify-start gap-3 items-center border-b border-white/20 py-3">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.6435-1/128131566_1401162046721063_3715506702234565360_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeG2RpP4g-UuE76SBllHUq8DBrs8hHnRWX8GuzyEedFZf7UFc9z1AXCR1q3vgyfMN8m1szQXFmZO4E6Adog25uFj&_nc_ohc=ju3ZroxzQegAX9eX97h&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCaPSduulAAY9fjNxZ5A4cP9eOrCHl4XsIG-W2IYqAR4Q&oe=63A06B93"
                alt=""
              />
              <div>
                <p className="text-lg text-white font-bold">John Doe</p>
                <span className="flex gap-2 cursor-pointer">
                  <button className="text-white bg-blue-500 py-1 px-2 rounded-lg">
                    Confirm
                  </button>
                  <button className="text-white bg-stone-700 py-1 px-2 rounded-lg">
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-2">
            <span className="text-base text-white/50 font-mono py-2">
              Contacts
            </span>
            <Contacts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
