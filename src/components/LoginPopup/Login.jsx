import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { login } from "@/services/auth.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long."),
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
      console.log(`Login response:`, response);
      if (response.data.token) {
        console.log(`Setting token to ${response.data.token}`);
        window.localStorage.setItem('token', response.data.token);
      }

      toast({
        title: "Login successful",
        description: response.message,
        status: "success",
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response.data.message ||  error.message,
        status: "error",
      });
    }
  }

  return (
    <>
      <div className="space-y-2">
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
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <FaEyeSlash
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
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
            <Button className="mt-4">Submit</Button>
          </form>
        </Form>

        <p
          className="text-center text-gray-500 text-sm my-3 hover:text-blue-700 cursor-pointer"
          onClick={() => handleSignIn("register")}
        >
          No Account? Signup here
        </p>
      </div>
    </>
  );
};

export default Login;
