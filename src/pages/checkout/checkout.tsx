import React, { useState } from "react";
import "./checkout.scss";

function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    facebookLink: "",
    paymentMethod: "Chuyển khoản",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Xử lý logic khi nhấn "Đặt hàng"
    // Chuyển sang trang Hoàn tất đơn hàng
    console.log("Phương thức thanh toán đã chọn:", formData.paymentMethod);
  };

  return (
    <div className="checkout-page">
      <h1>Thông Tin Thanh Toán</h1>

      <div className="customer-info">
        <h2>Thông tin khách hàng</h2>
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Nhập họ tên"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email"
          />
        </div>
        <div className="form-group">
          <label>Link Facebook</label>
          <input
            type="text"
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleInputChange}
            placeholder="Nhập link Facebook"
          />
        </div>
        <div className="form-group">
          <label>Phương thức thanh toán</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="Chuyển khoản">Chuyển khoản</option>
            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
          </select>
        </div>
      </div>

      <div className="order-summary">
        <h2>Đơn hàng của bạn</h2>
        <div className="order-item">
          <img src="https://i.imgur.com/U0LKj2Q.png" alt="Product" />
          <div>
            <p>Gói trải bài cho câu hỏi đơn</p>
            <p>Giá: 500.000 VND</p>
          </div>
        </div>
        <div className="order-item">
          <img src="https://i.imgur.com/U0LKj2Q.png" alt="Product" />
          <div>
            <p>Gói trải bài cho 3 câu hỏi</p>
            <p>Giá: 500.000 VND</p>
          </div>
        </div>
        <div className="total-section">
          <p>Ước tính: 1.000.000 VND</p>
          <p><strong>Tổng: 1.000.000 VND</strong></p>
        </div>
        <button className="order-button" onClick={handleSubmit}>
          Đặt hàng
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
