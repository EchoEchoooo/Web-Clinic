import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button";
import { login } from "@/services/auth";

const Login = ({ handleSignIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(username, password)
      const { token, expiration } = response.data
    } catch (error) {

    }
  }

  return (
    <>
      <div className={"p-4"}>
        <h1 className="mb- text-center text-2xl font-semibold text-gray-600">
          Log in
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
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
          <Button className="mt-4" >Submit</Button>
        </form>
        <p
          className="my-3 cursor-pointer text-center text-sm text-gray-500 hover:text-blue-700"
          onClick={handleSignIn}
        >
          No Account? Signup here
        </p>
      </div>
    </>
  );
};

export default Login;
