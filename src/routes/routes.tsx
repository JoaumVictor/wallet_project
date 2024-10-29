import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/homepage/homepage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);
