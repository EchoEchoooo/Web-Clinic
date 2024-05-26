import AdminNav from "./Navbar/AdminNav"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <main className="min-h-screen dark:bg-zinc-950">
      <AdminNav />
      <div className="container">
        <Outlet />
      </div>
    </main>
  )
}
export default AdminLayout