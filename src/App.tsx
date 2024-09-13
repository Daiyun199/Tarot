import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Header from "./components/header";
import LayoutSpecial from "./components/layout_no_footer";
import ZodiacHome from "./pages/zodiac";
import ZodiacList from "./components/zodiac_list";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/zodiac",
          element: <ZodiacHome />,
        },
        {
          path: "/test",
          element: <ZodiacList />,
        },
      ],
    },
    {
      path: "/login",
      element: <LayoutSpecial />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
