import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleSignin } from "../Auth";
import useAuthStore from "../features/auth/useAuthStore";
const Signin = () => {
  const loginStart = useAuthStore((state) => state.loginStart);
  const loginError = useAuthStore((state) => state.loginError);
  const [passwdShow, setPasswdShow] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    profilePic: [],
  });

  const navigate = useNavigate();

  const signinUser = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("firstname", user.firstname);
    formdata.append("surname", user.surname);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("profilePic", user.profilePic);

    loginStart();
    await axios
      .post("http://localhost:9999/api/auth/signin", formdata, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        loginError(error);
        console.log(error);
      });
  };

  return (
    <div className="relative bg-black w-full h-screen">
      <div className="bg-black w-full py-3 border-b border-white/10 z-50 shadow-md">
        <header className="bg-black max-w-6xl mx-auto w-full flex justify-between items-center px-5">
          <Link to="/" className="flex gap-1 items-center">
            <span className="py-1 px-2 rounded-md bg-blue-400 text-white text-xl font-bold">
              P
            </span>
            <h1 className="text-blue-400 text-2xl font-bold  cursor-pointer">
              Pesbook
            </h1>
          </Link>
          {/* <span>
            <BsFillSunFill className="text-white text-2xl" />
          </span> */}
        </header>
      </div>
      <div className="max-w-6xl w-full px-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5 flex-col md:flex-row justify-between items-center">
        <div className="hidden md:block max-w-lg">
          <span className="flex items-end ">
            <h1 className="text-blue-500 text-4xl md:text-7xl font-bold">
              Pesbook.
            </h1>
            <span className="text-white text-3xl md:text-4xl font-semibold">
              com
            </span>
          </span>
          <p className="text-white text-xl md:text-3xl font-mono">
            A New Social Media Website for Kupal's.
          </p>
        </div>

        <div className="userform max-w-md w-full rounded-xl p-5   bg-white">
          <form
            onSubmit={signinUser}
            className="w-full"
            encType="multipart/form-data"
          >
            <h1 className="text-3xl font-bold ">Register Account.</h1>

            <div className="py-5 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                  type="text"
                  value={user.firstname}
                  name="firstname"
                  placeholder="First name"
                  autoComplete="off"
                  required
                />
                <input
                  onChange={(e) =>
                    setUser({ ...user, surname: e.target.value })
                  }
                  className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                  type="text"
                  value={user.surname}
                  name="surname"
                  placeholder="Surname"
                  autoComplete="off"
                  required
                />
              </div>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                type="text"
                value={user.email}
                name="email"
                placeholder="Email address"
                autoComplete="off"
                required
              />

              <div className="relative w-full">
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                  type={passwdShow ? "text" : "password"}
                  value={user.password}
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
                <span
                  onClick={() => setPasswdShow(!passwdShow)}
                  className="absolute right-0 top-1 text-[12px] p-2 cursor-pointer"
                >
                  {!passwdShow ? "SHOW" : "HIDE"}
                </span>
              </div>

              <input
                onChange={(e) =>
                  setUser({ ...user, profilePic: e.target.files[0] })
                }
                type="file"
                name="profilePic"
                accept="image/png,image/jpeg,image/jpg"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-blue-500
      hover:file:bg-violet-100
    "
              />
              <button
                id="login-btn"
                type="submit"
                name="login"
                className="bg-blue-500 text-white py-2 rounded-md"
              >
                SIGN UP
              </button>

              <Link to="/login" className="text-sm text-black ">
                {" "}
                Already have an Account
              </Link>
            </div>
          </form>
          <center className="text-black/50 text-sm">OR</center>
          <div className="flex gap-5 justify-center items-center py-3">
            <button
              onClick={googleSignin}
              className="border p-2 shadow-md bg-white text-black rounded-full flex items-center gap-3 shrink-0"
            >
              {/* <span className="text-sm">Signin with Google</span> */}
              <img
                className="w-8 h-8 object-cover bg-white"
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt=""
              />
            </button>
            <button className="border p-2 shadow-md bg-white text-black rounded-full flex items-center gap-3 shrink-0">
              {/* <span className="text-sm">Signin with Facebook</span> */}

              <img
                className="w-8 h-8 object-cover bg-white"
                src="https://www.svgrepo.com/show/111202/facebook.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
