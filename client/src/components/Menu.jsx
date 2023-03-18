import axios from "axios";
import React from "react";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useUsersStore from "../features/users/useUsersStore";
const Menu = () => {
  const logout = useUsersStore((state) => state.logout);
  const loginError = useUsersStore((state) => state.loginError);

  const error = useUsersStore((state) => state.error);

  const currentUser = useUsersStore((state) => state.currentUser);
  const fullName = `${currentUser.firstname} ${currentUser.surname}`;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .post("http://localhost:9999/api/auth/logout", {
        user_uid: currentUser.user_uid,
      })
      .then((response) => {
        console.log(response);
        logout();

        navigate("/login");
      })
      .catch((err) => {
        console.log(error);
        loginError(err);
      });
  };

  return (
    <div className="absolute top-12 -right-0 bg-[#111] w-72 rounded-xl p-2 border border-white/5">
      <ul className="w-full ">
        <Link
          to={`/profile/${currentUser.user_uid}`}
          className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-white/10 duration-300 rounded-xl cursor-pointer"
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
        <li
          onClick={handleLogout}
          className="py-2 px-3 flex items-center justify-start gap-3 hover:bg-white/10 duration-300 rounded-xl cursor-pointer"
        >
          <TbLogout className="text-2xl text-white " />
          <p className="text-white text-base font-mono">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
