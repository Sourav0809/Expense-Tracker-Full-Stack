import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import React from "react";
const Authentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [onForgotPwd, setOnForgotPwd] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                           SWITCH LOGIN OR SIGN UP                          */
  /* -------------------------------------------------------------------------- */
  const setIsloggedInHandeler = () => {
    setLoggedIn((prev) => {
      return !prev;
    });
    setOnForgotPwd(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                           USER LOG IN AND SIGN UP                          */
  /* -------------------------------------------------------------------------- */

  const submitedFormHandeler = async (e) => {
    e.preventDefault();
    const submitedval = {
      email: userEmail,
      password: userPwd,
    };
    try {
      /* -------------------------------------------------------------------------- */
      /*                          FOR CREATING NEW ACCOUNT                          */
      /* -------------------------------------------------------------------------- */

      if (!loggedIn && !onForgotPwd) {
        console.log(submitedval);
      }

      /* -------------------------------------------------------------------------- */
      /*                                 FOR LOG IN                                 */
      /* -------------------------------------------------------------------------- */

      if (loggedIn && !onForgotPwd) {
        console.log(submitedval);
      }

      /* -------------------------------------------------------------------------- */
      /*                             FOR FORGOT PASSWORD                            */
      /* -------------------------------------------------------------------------- */

      if (onForgotPwd) {
        console.log("forgot passowrd handeler");
      }
    } catch (error) {}
    setUserEmail("");
    setUserPwd("");
  };

  return (
    <form className=" font-popins" onSubmit={submitedFormHandeler}>
      <h1
        className=" text-4xl p-6 mt-4 font-semibold "
        onClick={() => {
          location.reload();
        }}
      >
        expensiFy
      </h1>
      <div className=" m-auto  mt-28 lg:w-[70rem] w-full">
        <div className=" p-7 flex flex-col gap-3">
          <h1 className="text-5xl font-semibold">
            {!loggedIn ? "Create Account" : "Log In"}
          </h1>
          <div className=" mt-5">
            <button className=" w-[100%] bg-[#e0e0e0] rounded-md p-1 text-black text-lg flex gap-1 justify-center items-center ">
              <h1 className=" text-base">Connect With</h1>
              <FcGoogle className=" text-4xl" />
            </button>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your E-mail..."
              className="bg-[#e0e0e0] p-2 rounded-md"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              value={userEmail}
              required
            />
          </div>

          {!onForgotPwd && (
            <div className=" flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password..."
                className={`bg-[#e0e0e0] p-2 rounded-md `}
                onChange={(e) => {
                  setUserPwd(e.target.value);
                }}
                value={userPwd}
                required
              />
            </div>
          )}
          <div>
            {loggedIn && (
              <p
                className=" text-red-600 text-sm cursor-pointer w-fit"
                onClick={() => {
                  setOnForgotPwd(true);
                }}
              >
                {!onForgotPwd && "Forgot Password"}
              </p>
            )}
          </div>

          <div className=" mt-5">
            <button
              type="submit"
              className=" py-2 px-10 bg-[#1877f2] font-semibold text-white rounded-md"
            >
              {!loggedIn ? "Create Account" : "Log In"}
            </button>
          </div>

          <div className=" mt-5 w-fit">
            <h1>{!loggedIn ? "Already have an account?" : "New User?"}</h1>
            <h1
              onClick={setIsloggedInHandeler}
              className="text-[#1877f2] text-lg font-medium cursor-pointer font-sans"
            >
              {!loggedIn ? "Log In" : "Create New Account"}
            </h1>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Authentication;
