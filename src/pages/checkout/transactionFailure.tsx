import { useNavigate } from 'react-router-dom';
import './transactionFailure.scss';

function TransactionFailurePage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/checkout-complete'); 
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="transaction-failure-page">
      <h1>Giao Dịch Thất Bại</h1>
      <p>Xin lỗi, giao dịch của bạn đã không thành công. Vui lòng thử lại.</p>
      <button className="retry-button" onClick={handleRetry}>
        Thử Lại
      </button>
      <button className="back-home-button" onClick={handleBackToHome}>
        Quay Lại Trang Chủ
      </button>
    </div>
  );
}

export default TransactionFailurePage;
