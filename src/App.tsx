import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import LayoutSpecial from "./components/layout_no_footer";
import ZodiacHome from "./pages/zodiac";
import ZodiacList from "./components/zodiac_list";
import TarotReader from "./pages/tarotReader/tarotReader";
import ReaderProfile from "./pages/readerProfile";
import ResetPasswordPage from "./pages/reset_password";
import ZodiacDetail from "./pages/zodiac-detail";

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
          path: "/zodiacs",
          element: <ZodiacHome />,
        },
        {
          path: "/zodiacs/:id",
          element: <ZodiacDetail />,
        },
        {
          path: "/test",
          element: <ZodiacList />,
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
      path: "/",
      element: <LayoutSpecial />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/reset-password",
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
