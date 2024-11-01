import { useNavigate } from 'react-router-dom';
import './orderSuccess.scss';

function OrderSuccessPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const orderId = "ORD123456";
  const date = "2024-10-31T12:00:00Z";
  const tarotReader = "Nguyễn Văn A";
  const isPaid = true;

  return (
    <div className="order-success-page">
      <h1>Đơn Hàng Hoàn Tất</h1>
      <div className="order-summary">
        <p><strong>Mã Đơn Hàng:</strong> {orderId}</p>
        <p><strong>Ngày:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Tarot Reader:</strong> {tarotReader}</p>
        <p><strong>Trạng Thái Thanh Toán:</strong> {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
      </div>
      <p className="thank-you-message">Cảm ơn bạn đã ủng hộ Meowgic. Đơn hàng của bạn đã được nhận.</p>
      <button className="back-home-button" onClick={handleBackToHome}>
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default OrderSuccessPage;
