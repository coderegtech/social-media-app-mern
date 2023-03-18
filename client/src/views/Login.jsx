import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleSignin } from "../Auth";
import useUsersStore from "../features/users/useUsersStore";
const Login = () => {
  const loginStart = useUsersStore((state) => state.loginStart);
  const loginSuccess = useUsersStore((state) => state.loginSuccess);
  const loginError = useUsersStore((state) => state.loginError);

  // const [currentUser, setCurrentUser] = useState(null);
  const [passwdShow, setPasswdShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginStart();

    await axios
      .post(
        "http://localhost:9999/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        loginSuccess(response.data);
        navigate("/");
      })
      .catch((err) => {
        loginError(err);
        console.log(err);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative bg-black w-full h-screen">
      <div className="bg-black w-full py-3 border-b border-white/10 z-50 shadow-md ">
        <header className="max-w-6xl mx-auto w-full flex justify-between items-center px-5">
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

        <div className="userform max-w-md w-full rounded-xl px-5 py-5  bg-white">
          <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-3xl font-bold py-5">Login Here.</h1>

            <div className="flex flex-col gap-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                type="text"
                value={email}
                name="email"
                placeholder="Email..."
                autoComplete="off"
                required
              />
              <div className="relative w-full">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 border border-black/30 rounded-md focus:outline-1 focus:outline-blue-500"
                  type={passwdShow ? "text" : "password"}
                  value={password}
                  name="password"
                  placeholder="Password..."
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

              <button
                id="login-btn"
                type="submit"
                name="login"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="flex justify-between items-center">
            <Link to="/signin" className="text-sm text-black">
              {" "}
              Doesn't have an Account?
            </Link>

            <a href="#" className="text-sm text-blue-500 py-2">
              {" "}
              Forgot password?
            </a>
          </div>
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

export default Login;
