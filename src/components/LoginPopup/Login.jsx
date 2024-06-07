import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button";
import { login } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
    "Password must contain at least one uppercase character, one lowercase character, one digit, and one non-alphanumeric character."
  ),
});

const Login = ({ handleSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await login(values.email, values.password);
      if (response.token) {
        window.localStorage.setItem('token', response.token);
      }
      toast({
        title: "Login successful",
        description: response.message,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
      });
    }
  }

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 p-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} {...field} />
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-4" >Submit</Button>
          </form>
        </Form>
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
