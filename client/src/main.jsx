import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginCard from "./pages/LoginCard.jsx";
import Dashboard from "./pages/DashboardLayout.jsx";
import SummaryLayout from "./pages/SummaryLayout.jsx";
import SignupCard from "./pages/SignupCard.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginCard />,
      },
      {
        path: "signup",
        element: <SignupCard />,
      },
    ],
  },

  {
    path: "/app",
    element: <Dashboard />,
  },
  {
    path: "/summary",
    element: <SummaryLayout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
