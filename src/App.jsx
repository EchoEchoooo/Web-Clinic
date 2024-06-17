import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Landing from "@/routes/Landing";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Appointments from "./routes/Appointments";
import Reports from "./routes/Reports";
import Dashboard from "./routes/Dashboard";
import AdminDashboard from "./routes/AdminDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClinicLayout from "./components/ClinicLayout";
import AdminLayout from "./components/AdminLayout";
import { AuthProvider } from '@/context/Authycontext';
import DentistDashboard from "@/routes/DentistDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "appointments/",
        element: <Appointments />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "reports/",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/",
    element: <ClinicLayout />,
    children: [
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "dentists/",
        element: <DentistDashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "admin/",
        element: <AdminDashboard />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
