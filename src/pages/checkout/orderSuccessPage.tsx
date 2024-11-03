import { useNavigate } from 'react-router-dom';
import './orderSuccess.scss';

function OrderSuccessPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="order-success-page">
      <h1>Đơn Hàng Hoàn Tất</h1>
      <p className="thank-you-message">Cảm ơn bạn đã ủng hộ Meowgic. Đơn hàng của bạn đã được nhận.</p>
      <button className="back-home-button" onClick={handleBackToHome}>
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default OrderSuccessPage;
