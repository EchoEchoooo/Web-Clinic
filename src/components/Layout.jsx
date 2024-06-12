import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <main className="min-h-screen dark:bg-zinc-950">
      <Navbar />
      <Outlet />
    </main>
  );
};
export default Layout;
