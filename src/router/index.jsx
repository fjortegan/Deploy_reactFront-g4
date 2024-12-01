import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import NotFound from "../pages/not_found_404";
import Login from "../pages/auth";
import LayoutPrivate from "../layout/LayoutPrivate";
import Requests from "../pages/requests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/api/:name",
    element: <LayoutPrivate />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Requests />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
