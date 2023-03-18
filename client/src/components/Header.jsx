import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsMessenger, BsSearch } from "react-icons/bs";
import { RiNotification3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuthStore from "../features/auth/useAuthStore";
import Menu from "./Menu";
const Header = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  return (
    <div className="fixed top-0 w-full min-h-[60px]  bg-black py-2 border-b border-white/10 z-50">
      <header className="max-w-6xl mx-auto w-full flex justify-between items-center px-5">
        <Link to="/" className="flex gap-1 items-center">
          <span className="py-1 px-2 rounded-md bg-blue-400 text-white text-xl font-bold">
            P
          </span>
          <h1 className="text-blue-400 text-2xl font-bold cursor-pointer">
            Pesbook
          </h1>
        </Link>

        <div className="hidden md:block max-w-sm w-full">
          <form className="w-full bg-white/10 flex justify-center items-center p-1 rounded-full">
            <input
              className="w-full py-1 px-2 bg-transparent text-white focus:outline-none"
              type="text"
              placeholder="Search Name..."
            />
            <button className="p-2 bg-white/10 rounded-full">
              <BsSearch className="text-white text-xl" />
            </button>
          </form>
        </div>
        <ul className="flex gap-3 justify-center items-center ">
          <li className="p-3 bg-stone-900 rounded-full">
            <Link to="/">
              <AiFillHome className="text-lg md:text-xl text-white" />
            </Link>
          </li>

          <li className="p-3 bg-stone-900 rounded-full">
            <BsMessenger className="text-lg md:text-xl text-white" />
          </li>
          <li className="p-3 bg-stone-900 rounded-full">
            <RiNotification3Fill className="text-lg md:text-xl text-white" />
          </li>
          <li className="relative bg-stone-900 rounded-full">
            <img
              onClick={() => setDropDownMenu(!dropDownMenu)}
              className="w-10 h-10 object-cover object-center rounded-full"
              src={`http://localhost:9999/profile/${currentUser?.profilePic}`}
              alt=""
            />
            {dropDownMenu ? <Menu /> : null}
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
