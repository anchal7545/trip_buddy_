/** @format */

import React, { useEffect, useState } from "react";
import { useResetMutation } from "../redux/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reset, { isLoading, isError, error, data, isSuccess }] =
  useResetMutation();
  const { token } = useParams();
  const naviagate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { password };
    reset({ token, body: userData });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error);
    }
    if (isSuccess) {
     naviagate("/")
      toast.success(data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex bg-teal-50 items-center min-h-screen justify-center">
      <form
        onSubmit={submitHandler}
        className="rounded w-1/2 flex space-y-6 items-center flex-col justify-center"
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-gray-600 text-start">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:outline-none focus:border-teal-200 text-center border px-6 rounded py-1"
            placeholder="password@123"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-gray-600 text-start">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="focus:outline-none text-center border focus:border-teal-200 px-6 rounded py-1"
            placeholder="password@123"
          />
        </div>
        <button className="px-4 py-1 mb-6 bg-black text-white rounded hover:scale-105 duration-500 hover:bg-gray-900">
          Update
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
