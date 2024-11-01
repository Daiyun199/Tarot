import { useEffect, useState } from "react";
import api from "../../config/axios";
import { QRCodeCanvas } from "qrcode.react";
import "./checkoutComplete.scss";

interface OrderDetail {
  id: string; 
  serviceName: string; 
  subtotal: number; 
}

function CheckoutCompletePage() {
  const [paymentLink, setPaymentLink] = useState<string>(""); 
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]); 

  useEffect(() => {
    const createPayment = async () => {
      try {
        const response = await api.post("PayOS/create");
        setPaymentLink(response.data.paymentLink);
      } catch (error) {
        console.error("Failed to create payment:", error);
      }
    };

    createPayment(); 
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get("Order/order-detail/get-all");
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails(); 
  }, []);

  return (
    <div className="checkout-complete-page">
      <h1>Hoàn Tất Đơn Hàng</h1>

      <div className="content-wrapper">
        <div className="qr-code-section">
          <h2>Quét mã QR để thanh toán</h2>
          {paymentLink ? (
            <QRCodeCanvas value={paymentLink} size={200} />
          ) : (
            <p>Đang tải mã QR...</p>
          )}
        </div>

        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          {orderDetails.map((item) => (
            <div className="order-item" key={item.id}>
              <div>
                <p>Tên sản phẩm: {item.serviceName}</p>
                <p>Giá: {item.subtotal.toLocaleString()} VND</p> 
                <p><strong>Tổng: {item.subtotal.toLocaleString()} VND</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckoutCompletePage;
