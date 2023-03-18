import React from "react";
import { GrAdd } from "react-icons/gr";
import useAuthStore from "../features/auth/useAuthStore";

const Stories = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className=" max-h-[230px] h-full bg-[#111] rounded-xl flex gap-3 p-3 overflow-x-hidden">
      <div className="h-full min-w-[130px] bg-[#111] rounded-xl overflow-hidden shadow-lg border border-black/10">
        <div className="relative">
          <img
            className="h-[150px] object-cover"
            src={`http://localhost:9999/profile/${currentUser.profilePic}`}
            alt=""
          />
          <span className="w-10 h-10 absolute -bottom-5 left-1/2 -translate-x-1/2 border-2 border-black bg-blue-500 rounded-full grid place-items-center">
            <GrAdd className="text-2xl text-white invert" />
          </span>
        </div>

        <p className="text-white/80 text-center text-sm p-5">Create story</p>
      </div>

      {/* stories list */}
      <div className="flex gap-3 overflow-x-hidden">
        <div className="relative h-full min-w-[130px] bg-white rounded-xl overflow-hidden">
          <div className="story-img relative h-full">
            <img
              className=" h-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F275808.jpg&f=1&nofb=1&ipt=15fa7e0dcf3615604c64938ba1707f6a8f68991834e40f5895cf3ba6fab44266&ipo=images"
              alt=""
            />
            <span className="w-11 h-11 absolute top-2 left-2 border-4 border-blue-500 rounded-full grid place-items-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="http://localhost:9999/profile/1679063406891.jpeg"
                alt=""
              />
            </span>
          </div>

          <p className="absolute bottom-0 p-2 font-bold text-white text-sm ">
            John Reygun Danag
          </p>
        </div>

        <div className="relative h-full min-w-[130px] bg-white rounded-xl overflow-hidden">
          <div className="story-img relative h-full">
            <img
              className=" h-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fanimal-pet-kitten-cat-small-mammal-fauna-heal-blue-eye-close-up-nose-whiskers-vertebrate-domestic-lying-tabby-cat-norwegian-forest-cat-ginger-fur-small-to-medium-sized-cats-cat-like-mammal-carnivoran-domestic-short-haired-cat-domestic-long-haired-cat-609263.jpg&f=1&nofb=1&ipt=c551286b7e0e223d9223f9b032d19a5f3b5eabdf8be90701ad9691f47ccc3a42&ipo=images"
              alt=""
            />
            <span className="w-11 h-11 absolute top-2 left-2 border-4 border-blue-500 rounded-full grid place-items-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="http://localhost:9999/profile/1679065290406.jpeg"
                alt=""
              />
            </span>
          </div>

          <p className="absolute bottom-0 p-2 font-bold text-white text-sm ">
            Jhon Doe
          </p>
        </div>

        <div className="relative h-full min-w-[130px] bg-white rounded-xl overflow-hidden">
          <div className="story-img relative h-full">
            <img
              className=" h-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsurpriseplease.com%2Fuploads%2Fauto%2F554a68c5a06ab6a159bdb8f46af301d5.jpeg&f=1&nofb=1&ipt=189168e2d986368fabd438bc944029160d78c41b55af5d83a87bcd15c0bdeade&ipo=images"
              alt=""
            />
            <span className="w-11 h-11 absolute top-2 left-2 border-4 border-blue-500 rounded-full grid place-items-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="http://localhost:9999/profile/1679103626158.jpg"
                alt=""
              />
            </span>
          </div>

          <p className="absolute bottom-0 p-2 font-bold text-white text-sm ">
            Jane Doe
          </p>
        </div>

        <div className="relative h-full min-w-[130px] bg-white rounded-xl overflow-hidden">
          <div className="story-img relative h-full">
            <img
              className=" h-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F275808.jpg&f=1&nofb=1&ipt=15fa7e0dcf3615604c64938ba1707f6a8f68991834e40f5895cf3ba6fab44266&ipo=images"
              alt=""
            />
            <span className="w-11 h-11 absolute top-2 left-2 border-4 border-blue-500 rounded-full grid place-items-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="http://localhost:9999/profile/1679063406891.jpeg"
                alt=""
              />
            </span>
          </div>

          <p className="absolute bottom-0 p-2 font-bold text-white text-sm ">
            John Reygun Danag
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
