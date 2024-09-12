import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Header from "./components/header";
import LayoutSpecial from "./components/layout_no_footer";
import TarotReader from "./pages/tarotReader/tarotReader";
import ReaderProfile from "./pages/readerProfile";

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
          path: "/reader",
          element: <TarotReader />,
        },
        {
          path: "/dichvu",
          element: <ReaderProfile />,
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
