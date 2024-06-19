import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewDentist from "./NewDentist.jsx";
import { useState } from "react";

export default function DentistDialog() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> New Dentist</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <NewDentist handleSignIn={setShowSignIn} />
      </DialogContent>
    </Dialog>
  );
}
