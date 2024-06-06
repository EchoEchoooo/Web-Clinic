import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "./Login";
import Signin from "./Signin";
import { useState } from "react";

export default function LoginDialog() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div className="flex space-x-4">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button className="min-w-32 px-8">Register</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{showLogIn ? "Login" : "Sign In"}</DialogTitle>
          </DialogHeader>
          {showLogIn ? (
            <Login handleSignIn={setShowLogIn} />
          ) : (
            <Signin handleSignIn={setShowLogIn} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button className="min-w-32 px-8">Login</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{showSignIn ? "Sign In" : "Login"}</DialogTitle>
          </DialogHeader>
          {showSignIn ? (
            <Signin handleSignIn={setShowSignIn} />
          ) : (
            <Login handleSignIn={setShowSignIn} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
