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
          <span>Đăng nhập</span>
          <span>Đăng ký</span>
        </div>
        <div className="footer__top__section">
          <span className="title">LIÊN HỆ</span>
          <span>Hotline:</span>
          <span>Email:</span>
        </div>
      </div>
      <div className="footer__bottom"></div>
    </div>
  );
}

export default Footer;
