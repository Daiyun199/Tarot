import "./checkoutCompletePage.scss";

function CheckoutCompletePage() {
  return (
    <div className="checkout-complete-page">
      <h1>Hoàn Tất Đơn Hàng</h1>

      <div className="content-wrapper">
        <div className="payment-info">
          <h2>Thông tin chuyển khoản</h2>
          <table>
            <tbody>
              <tr>
                <td>Ngân hàng:</td>
                <td>ABC Bank</td>
              </tr>
              <tr>
                <td>Số tài khoản:</td>
                <td>123456789</td>
              </tr>
              <tr>
                <td>Tên chủ tài khoản:</td>
                <td>Nguyễn Văn A</td>
              </tr>
              <tr>
                <td>Số tiền:</td>
                <td>520.000 VND</td>
              </tr>
              <tr>
                <td>Thời gian chuyển khoản:</td>
                <td>10:30, 21/10/2024</td>
              </tr>
              <tr>
                <td>Nội dung chuyển khoản:</td>
                <td>Thanh toán cho dịch vụ Premium Tarot</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          <div className="order-item">
            <div>
              <p>Tên sản phẩm: Premium Tarot</p>
              <p>Giá: 500.000 VND</p>
              <p>Ước tính giao hàng: 20.000 VND</p>
              <p><strong>Tổng: 520.000 VND</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCompletePage;
