import React from "react";
import Logo from "../../assets/caridentlogo2.png";
import { ModeToggle } from "../mode-toggle";
import LoginDialog from "../LoginPopup/LoginDialog";

const Navbar = () => {
  return (
    <>
      <div className="bg-background-95 sticky top-0 z-50 border-b border-slate-100 backdrop-blur-sm dark:border-gray-800 dark:bg-zinc-950/60">
        <div className="container">
          <nav className="flex items-center justify-between">
            <a
              href="#"
              className="mt-2 flex items-center text-gray-800 dark:text-white sm:text-2xl"
            >
              <img src={Logo} alt="Logo" className="mb-3 mr-1 inline h-10" />
              <p className="max-sm:hidden">Carident</p>
            </a>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <p className="max-sm:hidden">
                <LoginDialog />
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
