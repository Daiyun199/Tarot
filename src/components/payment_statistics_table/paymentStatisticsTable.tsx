import React, { useState, useEffect } from "react";
import "./PaymentHistoryTable.scss";
import { paymentDataProps } from "../../model/paymentData";
import api from "../../config/axios";

type ApiResponse<T> = {
  data: T;
  isSuccess: boolean;
};

type AccountDetail = {
  email: string;
  imgUrl: string;
};

const PaymentHistoryTable: React.FC = () => {
  const [detailedPaymentData, setDetailedPaymentData] = useState<
    (paymentDataProps & AccountDetail)[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await api.get<ApiResponse<paymentDataProps[]>>(
          "Order/order-detail/get-all"
        );
        const paymentData = response.data.data;
        console.log(paymentData);
        const accountDetails = await Promise.all(
          paymentData.map(async (payment) => {
            const accountResponse = await api.get<ApiResponse<AccountDetail>>(
              `Account/detail-info/${payment.createBy}`
            );

            const { email, imgUrl } = accountResponse.data.data;

            return {
              ...payment,
              email,
              imgUrl,
            };
          })
        );

        setDetailedPaymentData(accountDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = detailedPaymentData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(detailedPaymentData.length / itemsPerPage);

  // Hàm chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="payment-history-container">
      <h2>Payment History</h2>

      <div className="payment-history-table-wrapper">
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Date</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Service Type</th>
              <th>Total Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="payment-history-body">
            {currentItems.map((payment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{payment.date}</td>
                <td className="recipient">
                  <img
                    src={
                      payment.imgUrl ||
                      "https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/avatar-meo-10-1724730902.jpg"
                    }
                    alt={payment.createBy}
                  />
                </td>
                <td>{payment.email}</td>
                <td>{payment.serviceName}</td>
                <td>{payment.subtotal}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= detailedPaymentData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
