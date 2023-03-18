import React, { useState } from "react";
import { BiHappyAlt } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import { RiLiveFill } from "react-icons/ri";
import Post from "../features/post/Post";
import Contacts from "./Utils/Contacts";
import Header from "./Utils/Header";
import SideMenu from "./Utils/SideMenu";
import UploadPost from "./Utils/UploadPost";
const Main = () => {
  const [addPostModal, setAddPostModal] = useState(false);

  return (
    <div className=" w-full h-full bg-black/90">
      <Header />

      <div className="bg-black h-full w-full relative top-[60px]">
        <div className="max-w-6xl mx-auto h-full w-full flex ">
          {/* sidemenu */}
          <div className="hidden lg:block sticky top-16  h-[calc(100vh-80px)] max-w-[280px] w-full py-5 px-2  overflow-y-auto">
            <SideMenu />
          </div>
          {/* newsfeed */}
          <div className="w-full h-full p-5">
            <div
              onClick={() => setAddPostModal(true)}
              className="w-full h-auto px-3 py-4 bg-[#111] rounded-xl"
            >
              <div className="w-full h-full flex gap-3 items-center justify-center pb-3">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.6435-1/128131566_1401162046721063_3715506702234565360_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeG2RpP4g-UuE76SBllHUq8DBrs8hHnRWX8GuzyEedFZf7UFc9z1AXCR1q3vgyfMN8m1szQXFmZO4E6Adog25uFj&_nc_ohc=ju3ZroxzQegAX9eX97h&_nc_ht=scontent.fmnl13-1.fna&oh=00_AfCaPSduulAAY9fjNxZ5A4cP9eOrCHl4XsIG-W2IYqAR4Q&oe=63A06B93"
                  alt=""
                />
                <span className="py-2 px-3 w-full bg-white/10 rounded-full text-white/30 cursor-pointer">
                  What's on your mind? John Reygun
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
            <Post />
          </div>

          {/* events & users */}
          <div className="hidden md:block sticky top-16  h-[calc(100vh-80px)] max-w-[280px] w-full py-5 px-2 overflow-y-auto">
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
    </div>
  );
};

export default Main;
