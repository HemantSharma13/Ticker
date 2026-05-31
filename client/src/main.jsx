import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/DashboardLayout.jsx";
import SummaryLayout from "./pages/SummaryLayout.jsx";
import SignupPage from "./pages/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
