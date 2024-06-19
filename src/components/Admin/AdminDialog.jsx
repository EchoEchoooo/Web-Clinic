import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewAdmin from "./NewAdmin.jsx";
import { useState } from "react";

export default function AdminDialog() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> New Admin</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <NewAdmin handleSignIn={setShowSignIn} />
      </DialogContent>
    </Dialog>
  );
}
