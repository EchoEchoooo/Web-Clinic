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
  const [dialogType, setDialogType] = useState("login"); // new state to manage dialog type

  return (
    <div className="flex space-x-4">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button variant="register" className="min-w-32 px-8" onClick={() => setDialogType("register")}>Register</Button>
          </div>
        </DialogTrigger>
        <DialogTrigger asChild>
          <div>
            <Button className="min-w-32 px-8" onClick={() => setDialogType("login")}>Login</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogType === "login" ? "Login" : "Register"}</DialogTitle>
          </DialogHeader>
          {dialogType === "login" ? (
            <Login handleSignIn={setDialogType} />
          ) : (
            <Signin handleSignIn={setDialogType} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
