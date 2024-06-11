import Logo from "../../assets/caridentlogo2.png";
import { ModeToggle } from "../mode-toggle";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  CalendarCheck, CircleUser,
  LayoutDashboard,
  LogOut, Menu,
  NotebookText, Package2, Search,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Input } from "@/components/ui/input.jsx";

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
            <header className=" justify-between bg-background sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6">
              <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                  href="#"
                  className="flex items-center"
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="mb-3 h-10"
                  />
                  <p className="text-2xl text-gray-800 dark:text-white max-md:hidden">Carident</p>
                </Link>
                <NavLink
                  to="/dashboard"
                  className="text-red-500 hover:text-foreground transition-colors"
                  activeClassName="!text-cyan-500 !hover:text-cyan-500"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dentists"
                  className="text-red-500 hover:text-foreground transition-colors"
                  activeClassName="text-cyan-500"
                >
                  Dentists
                </NavLink>
                <NavLink
                  to="/admin"
                  className="text-red-500 hover:text-foreground transition-colors"
                  activeClassName="text-cyan-500"
                >
                  Admin
                </NavLink>
                <NavLink
                  to="/appointments"
                  className="text-red-500 hover:text-foreground transition-colors"
                  activeClassName="text-cyan-500"
                >
                  Appointments
                </NavLink>
                <NavLink
                  to="/reports"
                  className="text-red-500 hover:text-foreground transition-colors"
                  activeClassName="text-cyan-500"
                >
                  Reports
                </NavLink>
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={Logo}
                        alt="Logo"
                        className="mb-3 h-10"
                      />
                      <p className="text-2xl text-gray-800 dark:text-white">Carident</p>
                    </Link>
                    <Link
                      href="#"
                      className="text-foreground hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dentists
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Admin
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Appointments
                    </Link>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Reports
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2">
                <ModeToggle />
                {renderRoleSpecificButton()}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
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
            </header>
        </div>
      </div>
    </>
  );
};

export default AuthNav;
