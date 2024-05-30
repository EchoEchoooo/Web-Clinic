import Logo from "../../assets/caridentlogo2.png";
import { ModeToggle } from "../mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  NotebookText,
  Settings
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import DentistDialog from "../Dentist/DentistDialog";
import AdminDialog from "../Admin/AdminDialog";

const AuthNav = () => {
  const location = useLocation();

  const renderRoleSpecificButton = () => {
    if (location.pathname.includes("/admindashboard")) {
      return <AdminDialog />;
    } else if (location.pathname.includes("/dashboard")) {
      return <DentistDialog />;
    }
    return null;
  };

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
              {renderRoleSpecificButton()}
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
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>View Dentists</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/admindashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>View Admins</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to="/appointments">
                      <DropdownMenuItem>
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        <span>Appointments</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/reports">
                      <DropdownMenuItem>
                        <NotebookText className="mr-2 h-4 w-4" />
                        <span>Reports</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link to="/">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AuthNav;
