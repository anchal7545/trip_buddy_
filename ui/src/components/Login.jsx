/** @format */

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";

const Login = () => {
  const [login, { data, error, isLoading, isSuccess, isError }] =
    useLoginMutation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { email, password } = user;

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(user);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error);
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/");
    
    }
  }, [isError, isSuccess, isLoading, isAuthenticated]);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden bg-image sm:grid place-items-center text-white bg-[url('/images/sign.jpg')] bg-no-repeat bg-cover">
        <h1 className="text-center font-extralight z-10 text-3xl">
          Let's Travel Together
        </h1>
      </div>

      <div className="w-1/2 z-20 bg-white mx-auto ">
        <h1 className="text-center mt-12 text-2xl font-light">Login</h1>
        <p className="text-center text-gray-400 text-sm mt-3">
          Doesn't have an account yet ?{" "}
          <Link to="/signup" className="text-black font-bold">
            Sign Up
          </Link>
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-12 flex flex-col items-center space-y-6"
        >
          <div className="space-y-3">
            <label htmlFor="" className="block">
              Email
            </label>
            <div className="relative">
              <svg
                className="left-3 pr-3 md:pr-2 top-1/2 absolute"
                style={{ transform: "translateY(-50%)" }}
                width="31px"
                height="31px"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#b9b9b9"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polygon points="56 20 32 12 8 20 8 52 56 52 56 20"></polygon>
                  <polyline points="48 28 32 36 16 28"></polyline>
                </g>
              </svg>
              <input
                type="text"
                name="email"
                value={email}
                onChange={changeHandler}
                className="border placeholder:font-light text-sm px-8 lg:px-12 focus:outline-none rounded-full py-2"
                placeholder="Enter your Email"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="" className="block">
              Password
            </label>
            <div className="relative w-fit h-fit ">
              <svg
                style={{ transform: "translateY(-50%)" }}
                className="left-2 pr-1 top-1/2 absolute "
                fill="#e0e0e0"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M8,9.25468928 L8,6 C8,3.790861 9.790861,2 12,2 C14.209139,2 16,3.790861 16,6 L16,9.25468928 C17.8134841,10.5196354 19,12.6212549 19,15 C19,18.8659932 15.8659932,22 12,22 C8.13400675,22 5,18.8659932 5,15 C5,12.6212549 6.1865159,10.5196354 8,9.25468928 L8,9.25468928 Z M15,8.67363116 L15,6 C15,4.34314575 13.6568542,3 12,3 C10.3431458,3 9,4.34314575 9,6 L9,8.67363116 C9.90925538,8.24169105 10.9264027,8 12,8 C13.0735973,8 14.0907446,8.24169105 15,8.67363116 Z M12,21 C15.3137085,21 18,18.3137085 18,15 C18,11.6862915 15.3137085,9 12,9 C8.6862915,9 6,11.6862915 6,15 C6,18.3137085 8.6862915,21 12,21 Z M11,14 L11,14.381966 C11,15.0395948 11.1531131,15.6881921 11.4472136,16.2763932 L11.7236068,16.8291796 C11.7759518,16.9338696 11.882953,17 12,17 C12.117047,17 12.2240482,16.9338696 12.2763932,16.8291796 L12.5527864,16.2763932 C12.8468869,15.6881921 13,15.0395948 13,14.381966 L13,14 C13,13.4477153 12.5522847,13 12,13 C11.4477153,13 11,13.4477153 11,14 Z M10,14 C10,12.8954305 10.8954305,12 12,12 C13.1045695,12 14,12.8954305 14,14 L14,14.381966 C14,15.1948399 13.8107418,15.9965503 13.4472136,16.7236068 L13.1708204,17.2763932 C12.9490834,17.7198673 12.4958191,18 12,18 C11.5041809,18 11.0509166,17.7198673 10.8291796,17.2763932 L10.5527864,16.7236068 C10.1892582,15.9965503 10,15.1948399 10,14.381966 L10,14 Z"></path>{" "}
                </g>
              </svg>
              <input
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
                className="border text-sm placeholder:font-light px-8 lg:px-12  focus:outline-none rounded-full py-2"
                placeholder="Enter your Password"
              />
              <svg
                style={{ transform: "translateY(-50%)" }}
                className="right-3 top-1/2 absolute "
                width="20px"
                height="20px"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    clip-rule="evenodd"
                    d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z"
                    fill="#000000"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
              <svg
                style={{ transform: "translateY(-50%)" }}
                className="right-3 top-1/2 absolute "
                width="20px"
                height="20px"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    clip-rule="evenodd"
                    d="M17.7469 15.4149C17.9855 14.8742 18.1188 14.2724 18.1188 14.0016C18.1188 11.6544 16.2952 9.7513 14.046 9.7513C11.7969 9.7513 9.97332 11.6544 9.97332 14.0016C9.97332 16.3487 12.0097 17.8886 14.046 17.8886C15.3486 17.8886 16.508 17.2515 17.2517 16.2595C17.4466 16.0001 17.6137 15.7168 17.7469 15.4149ZM14.046 15.7635C14.5551 15.7635 15.0205 15.5684 15.3784 15.2457C15.81 14.8566 16 14.2807 16 14.0016C16 12.828 15.1716 11.8764 14.046 11.8764C12.9205 11.8764 12 12.8264 12 14C12 14.8104 12.9205 15.7635 14.046 15.7635Z"
                    fill="#000000"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="M1.09212 14.2724C1.07621 14.2527 1.10803 14.2931 1.09212 14.2724C0.96764 14.1021 0.970773 13.8996 1.09268 13.7273C1.10161 13.7147 1.11071 13.7016 1.11993 13.6882C4.781 8.34319 9.32105 5.5 14.0142 5.5C18.7025 5.5 23.2385 8.33554 26.8956 13.6698C26.965 13.771 27 13.875 27 13.9995C27 14.1301 26.9593 14.2399 26.8863 14.3461C23.2302 19.6702 18.6982 22.5 14.0142 22.5C9.30912 22.5 4.75717 19.6433 1.09212 14.2724ZM3.93909 13.3525C3.6381 13.7267 3.6381 14.2722 3.93908 14.6465C7.07417 18.5443 10.6042 20.3749 14.0142 20.3749C17.4243 20.3749 20.9543 18.5443 24.0894 14.6465C24.3904 14.2722 24.3904 13.7267 24.0894 13.3525C20.9543 9.45475 17.4243 7.62513 14.0142 7.62513C10.6042 7.62513 7.07417 9.45475 3.93909 13.3525Z"
                    fill="#000000"
                    fill-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </div>
            <Link
              to="/forgot"
              className="text-xs text-gray-400 block text-right"
            >
              forgot password ?
            </Link>
          </div>
          <button
            disabled={isLoading}
            className="bg-black hover:scale-105 duration-500 text-white block hover:bg-gray-900 rounded-full px-8 py-2"
          >
            Continue
          </button>

          <p className="text-xs text-gray-400">or sign in with</p>

          <div className="flex items-center justify-center sm:justify-around">
            <div className="border cursor-pointer hover:scale-105 duration-500 flex mr-2 rounded px-4 lg:px-8 py-2">
              <svg
                className="mr-3"
                width="26px"
                height="26px"
                viewBox="-0.5 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <button>Google</button>
            </div>

            <div className="border ml-2 flex cursor-pointer hover:scale-105 duration-500 rounded px-4 lg:px-8 py-2">
              <svg
                className="mr-3"
                width="26px"
                height="26px"
                viewBox="126.445 2.281 589 589"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle
                    cx="420.945"
                    cy="296.781"
                    r="294.5"
                    fill="#3c5a9a"
                  ></circle>
                  <path
                    d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
                    fill="#ffffff"
                  ></path>
                </g>
              </svg>
              <button>Facebook</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
