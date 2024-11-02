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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await api.get<{
          isSuccess: boolean;
          code: string | null;
          data: OrderItem[];
          message: string;
        }>("Order/order-detail/get-cart");

        if (Array.isArray(response.data.data)) {
          setOrderItems(response.data.data);
        } else {
          console.error("Expected an array but got:", response.data.data);
          setOrderItems([]);
        }
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

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await api.delete(`Order/order-detail/remove-from-cart/${itemId}`);
      setOrderItems(orderItems.filter((item) => item.id !== itemId));
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];

      console.log("Updated selectedItems:", newSelectedItems);
      return newSelectedItems;
    });
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một đơn hàng để đặt!");
      return;
    }
  
    console.log("Selected items for order submission:", selectedItems);
  
    try {
      const response = await api.post("Order/booking-order", selectedItems);
  
      console.log("Order submitted successfully. Response data:", response.data);

      const orderId = response.data.data.id;
  
      if (orderId) {
        console.log("Order ID:", orderId);
 
        alert("Đặt hàng thành công!");

        navigate(`/checkout-complete/${orderId}`);
      } else {
        console.error("No order ID found in the response.");
        alert("Có lỗi xảy ra khi nhận mã đơn hàng. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Đặt hàng không thành công. Vui lòng kiểm tra và thử lại.");
    }
  };
  
  const totalAmount = selectedItems.reduce((total, itemId) => {
    const item = orderItems.find((order) => order.id === itemId);
    return total + (item ? item.subtotal : 0);
  }, 0);

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
              <option value="Thanh toán khi nhận hàng">
                Thanh toán khi nhận hàng
              </option>
            </select>
          </div>
        </div>

        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          {orderItems.length === 0 ? (
            <p>Chưa có đơn hàng</p>
          ) : (
            <>
              {orderItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label>{item.serviceName}</label>
                    <p className="item-price">
                      Giá: {item.subtotal.toLocaleString()} VND
                    </p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              ))}

              <div className="total-section">
                <p>Ước tính: {totalAmount.toLocaleString()} VND</p>
                <p>
                  <strong>Tổng: {totalAmount.toLocaleString()} VND</strong>
                </p>
              </div>
              <button className="order-button" onClick={handleSubmit}>
                Đặt hàng
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
