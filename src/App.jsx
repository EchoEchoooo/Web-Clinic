import React, { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider"
import Landing  from "@/routes/Landing";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Appointments from "./routes/Appointments";
import Reports from "./routes/Reports";
import Dashboard from "./routes/Dashboard";
import AdminDashboard from "./routes/AdminDashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClinicLayout from "./components/ClinicLayout";
import AdminLayout from "./components/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "appointments/",
        element: <Appointments />
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "reports/",
        element: <Reports />
      }
    ]
  },
  {
    path: "/",
    element: <ClinicLayout />,
    children: [
      {
        path: "dashboard/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "admindashboard/",
        element: <AdminDashboard />
      }
    ]
  }
]);

const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
