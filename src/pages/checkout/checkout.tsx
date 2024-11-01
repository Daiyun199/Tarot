import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import "./checkout.scss";

interface OrderItem {
  id: string;
  serviceName: string;
  subtotal: number;
}

function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    facebookLink: "",
    paymentMethod: "Chuyển khoản",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await api.get<OrderItem[]>("Order/order-detail/get-all");
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const orderDetails = orderItems.map(item => ({
        id: item.id,
      }));

      await api.post("Order/booking-order", orderDetails);

      navigate("/checkout-complete");
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Thông Tin Thanh Toán</h1>

      <div className="customer-order-container">
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
          {orderItems.map((item) => (
            <div className="order-item" key={item.id}>
              <img src="https://i.imgur.com/U0LKj2Q.png" alt="Product" />
              <div>
                <p>{item.serviceName}</p>
                <p>Giá: {item.subtotal.toLocaleString()} VND</p>
              </div>
            </div>
          ))}
          <div className="total-section">
            <p>Ước tính: {orderItems.reduce((total, item) => total + item.subtotal, 0).toLocaleString()} VND</p>
            <p><strong>Tổng: {orderItems.reduce((total, item) => total + item.subtotal, 0).toLocaleString()} VND</strong></p>
          </div>
          <button className="order-button" onClick={handleSubmit}>
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
