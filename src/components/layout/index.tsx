import Header from "../header";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
import "./index.scss";
function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
