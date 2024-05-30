import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaLinkedinIn } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const Signin = ({ handleSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    // call api
  }

  return (
    <>
      <div className={"p-4"}>
        <h1 className="text-2xl text-white font-semibold text-center mb-4 ">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3 ">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" placeholder="Choose a Username" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>

          <div>
            <Label htmlFor="email">Password</Label>
            <div className="relative">
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
              />

              {showPassword ? (
                <FaEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 "
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 "
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <Button className="mt-4" >Create Account</Button>
        </form>
        <p
          className="text-center text-gray-500 text-sm my-3 hover:text-blue-700 cursor-pointer"
          onClick={() => handleSignIn(false)}
        >
          Already have an Account? Log in
        </p>
      </div>
    </>
  );
};

export default Signin;
