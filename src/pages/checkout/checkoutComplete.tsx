import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import "./checkoutComplete.scss";

interface Account {
  id: string;
  name: string;
}

interface Service {
  id: string;
  accountId: string;
  name: string;
  price: number;
  account: Account;
}

interface ScheduleReader {
  dayOfWeek: string;
}

interface OrderDetail {
  id: string;
  orderId: string;
  serviceId: string;
  service: Service;
  scheduleReader: ScheduleReader;
}

interface OrderData {
  id: string;
  totalPrice: number;
  orderDetails: OrderDetail[];
}

function CheckoutCompletePage() {
  const params = useParams<{ orderId: string }>(); 
  const orderId = params.orderId;
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/Order/${orderId}`);

        if (response.data && response.data.isSuccess) {
          setOrderData(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setOrderData(null);
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        setOrderData(null);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const response = await api.post('/PayOS/create', {orderId});
      if (response.data && response.data.isSuccess) {
        console.log("Payment created successfully:", response.data);
      } else {
        console.error("Failed to create payment:", response.data);
      }
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  };

  return (
    <div className="checkout-complete-page">
      <h1>Hoàn Tất Đơn Hàng</h1>
  
      <div className="content-wrapper">
        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          {orderData === null ? (
            <p>Đang tải đơn hàng...</p>
          ) : (
            <>
              {orderData.orderDetails.map((item) => (
                <div className="order-item" key={item.id}>
                  <div>
                    <p>Tên dịch vụ: <strong>{item.service.name}</strong></p>
                    <p>Ngày: <strong>{new Date(item.scheduleReader.dayOfWeek).toLocaleDateString()}</strong></p>
                    <p>Tarot Reader: <strong>{item.service.account.name}</strong></p>
                  </div>
                </div>
              ))}
              <div className="total-price-container">
                <p className="total-price">
                  <strong>Tổng cộng: {orderData.totalPrice.toLocaleString()} VND</strong>
                </p>
                <p className="thank-you-message">Cảm ơn bạn đã ủng hộ Meowgic. Đơn hàng của bạn đã được nhận.</p>
                <button className="payment-button" onClick={handlePayment}>Thanh Toán</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

}

export default CheckoutCompletePage;
