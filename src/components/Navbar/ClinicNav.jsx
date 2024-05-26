import { Button } from "../ui/button"
import Logo from "../../assets/caridentlogo2.png";
import { ModeToggle } from "../mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  LogOut,
  Settings,
  User
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DentistDialog from "../Dentist/DentistDialog";

const ClinicNav = () => {
  return (
    <>
      <div className="bg-background-95 sticky top-0 z-50 border-b border-slate-100 backdrop-blur-sm dark:border-gray-800 dark:bg-zinc-950/60">
        <div className="container">
          <nav className="flex items-center justify-between">
            <a href="#" className="mt-2 text-2xl text-gray-800 dark:text-white">
              <img src={Logo} alt="Logo" className="mb-3 mr-1 inline h-10" />
              Carident
            </a>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <DentistDialog />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Dialog>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
export default ClinicNav