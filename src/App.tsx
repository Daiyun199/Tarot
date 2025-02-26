import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import LayoutSpecial from "./components/layout_no_footer";
import ZodiacHome from "./pages/zodiac";
import TarotReader from "./pages/tarotReader/tarotReader";
import ReaderProfile from "./pages/readerProfile";
import ResetPasswordPage from "./pages/reset_password";
import ZodiacDetail from "./pages/zodiac-detail";
import BookingCalendar from "./pages/bookingCalendar/bookingCalendar";
import { logout } from "./redux/features/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Profile from "./pages/profile";
import { toast } from "react-toastify";
import ReaderManagement from "./pages/ReaderManagement/readerManagement";
import CheckoutPage from "./pages/checkout/checkout";
import CheckoutCompletePage from "./pages/checkout/checkoutComplete";
import TransactionHistory from "./pages/transactionHistory/TransactionHistory";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import OrderSuccessPage from "./pages/checkout/orderSuccessPage";
import TransactionFailurePage from "./pages/checkout/transactionFailure";
import ProtectedRoute from "./components/protectRoute/protectRoute";

function App() {
  const dispatch = useDispatch();
  const { user, loginTime } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user && loginTime) {
      const currentTime = Date.now();
      const elapsed = currentTime - loginTime;
      const remainingTime = 3600000 - elapsed;

      if (remainingTime <= 0) {
        dispatch(logout());
      } else {
        const timer = setTimeout(() => {
          dispatch(logout());
          toast.info("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loginTime, dispatch]);
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
          path: "/reader",
          element: <TarotReader />,
        },
        {
          path: "/dichvu/:id",
          element: <ReaderProfile />,
        },
        {
          path: "/calendar/:readerId/:serviceId",
          element: <BookingCalendar />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/transactionHistory",
          element: <TransactionHistory />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/checkout-complete/:orderId",
          element: <CheckoutCompletePage />,
        },
        {
          path: "/success",
          element: <OrderSuccessPage />,
        },
        {
          path: "/fail",
          element: <TransactionFailurePage />,
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
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/reader-management",
      element: (
        <ProtectedRoute allowedRoles={["Reader"]}>
          <ReaderManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["Admin"]}>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
