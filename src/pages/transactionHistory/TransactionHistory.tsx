import { useState } from "react";
import "./transactionHistory.scss";

interface Transaction {
  id: number;
  code: string;
  time: string;
  servicePackage: string;
  price: string;
  status: string;
}

function TransactionHistory() {
  const [search, setSearch] = useState("");
  const transactions: Transaction[] = [
    {
      id: 1,
      code: "#1234",
      time: "2024-10-21 10:30",
      servicePackage: "Premium Tarot",
      price: "500.000 VND",
      status: "Hoàn tất",
    },
    {
      id: 2,
      code: "#6543",
      time: "2024-10-20 09:00",
      servicePackage: "Basic Tarot",
      price: "200.000 VND",
      status: "Đang thực hiện",
    },
    {
      id: 3,
      code: "#6544",
      time: "2024-10-20 11:00",
      servicePackage: "Basic Tarot",
      price: "100.000 VND",
      status: "Hủy",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.code.includes(search)
  );

  return (
    <div className="transaction-history">
      <h1>Lịch Sử Giao Dịch</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Mã giao dịch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <table className="transaction-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã GD</th>
            <th>Thời gian</th>
            <th>Gói dịch vụ</th>
            <th>Giá</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.code}</td>
              <td>{transaction.time}</td>
              <td>{transaction.servicePackage}</td>
              <td>{transaction.price}</td>
              <td>
                <div
                  className={`status ${
                    transaction.status === "Hoàn tất"
                      ? "status-success"
                      : transaction.status === "Hủy"
                      ? "status-cancelled"
                      : "status-pending"
                  }`}
                >
                  {transaction.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-button-container">
        <button className="order-button">Đặt hàng</button>
      </div>
    </div>
  );
}

export default TransactionHistory;
