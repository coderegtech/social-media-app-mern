import React from "react";
import { AiFillShop } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import { MdGroups, MdOndemandVideo } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/useAuthStore";
const SideMenu = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const fullName = `${currentUser.firstname} ${currentUser.surname}`;

  return (
    <ul className="w-full h-full flex flex-col gap-1 ">
      <Link
        to={`/profile/${currentUser.user_uid}`}
        className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full"
      >
        <img
          className="w-8 h-8 object-cover object-center rounded-full"
          src={`http://localhost:9999/profile/${currentUser.profilePic}`}
          alt=""
        />
        <p className="text-white text-base font-mono">
          {fullName.replace(/\b\w/g, (name) => name.toUpperCase())}
        </p>
      </Link>
      <li className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <FaUserFriends className="text-3xl text-blue-400 " />
        <p className="text-white text-base font-mono">Friends</p>
      </li>
      <li className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <MdGroups className="text-3xl text-blue-400 " />
        <p className="text-white text-base font-mono">Groups</p>
      </li>
      <li className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <AiFillShop className="text-3xl text-blue-400 " />
        <p className="text-white text-base font-mono">Market</p>
      </li>
      <li className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <MdOndemandVideo className="text-3xl text-blue-400 " />
        <p className="text-white text-base font-mono">Watch</p>
      </li>
      <li className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-stone-800 duration-300 rounded-full">
        <ImClock className="text-3xl text-blue-400 " />
        <p className="text-white text-base font-mono">Memories</p>
      </li>
    </ul>
  );
};

export default SideMenu;
