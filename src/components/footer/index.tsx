import { Link } from "react-router-dom";
import "./index.scss";
function Footer() {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__top__section">
          <span className="title">GIỚI THIỆU</span>
          <span>Hướng dẫn mua hàng</span>
          <span>Điều khoản dịch vụ</span>
        </div>
        <div className="footer__top__section">
          <span className="title">TÀI KHOẢN</span>
          <Link to="login" style={{ textDecoration: "none", color: "inherit" }}>
            <span>Đăng nhập</span>
          </Link>
          <Link
            to="register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>Đăng ký</span>
          </Link>
        </div>
        <div className="footer__top__section">
          <span className="title">LIÊN HỆ</span>
          <span>Hotline: 0583660660</span>
          <span>Email: thanhhuyvu.3939@gmail.com</span>
        </div>
      </div>
      <div className="footer__bottom"></div>
    </div>
  );
}

export default Footer;
