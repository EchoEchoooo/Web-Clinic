import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import New_Admin from "./Admin";
import { useState } from "react";

export default function AdminDialog() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> New Admin</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <New_Admin handleSignIn={setShowSignIn} />
      </DialogContent>
    </Dialog>
  );
}
