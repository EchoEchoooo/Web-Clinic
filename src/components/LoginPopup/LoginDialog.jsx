import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Login from "./Login"
import Signin from "./Signin"
import { useState } from "react"

export default function LoginDialog() {
  const [showSignIn, setShowSignIn] = useState(false)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-8">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {showSignIn ? "Sign In" : "Login"}
          </DialogTitle>

        </DialogHeader>
        {showSignIn ? (
          <Signin handleSignIn={setShowSignIn} />
        ) : (
          <Login handleSignIn={setShowSignIn} />
        )}
      </DialogContent>
    </Dialog>
  )
}
