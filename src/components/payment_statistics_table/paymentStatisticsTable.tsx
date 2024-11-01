import React from "react";
import "./PaymentHistoryTable.scss";

const paymentData = [
  {
    id: "#123412451",
    date: "June 1, 2020, 08:22 AM",
    recipient: "XYZ Store ID",
    email: "xyzstore@mail.com",
    serviceType: "Server Maintenance",
    status: "Completed",
    profileImage: "path/to/image1.jpg",
  },
  {
    id: "#123412451",
    date: "June 1, 2020, 08:22 AM",
    recipient: "David Oconner",
    email: "davidocon@mail.com",
    serviceType: "Clean Up",
    status: "Pending",
    profileImage: "path/to/image2.jpg",
  },
  // Add more entries as needed
];

const PaymentHistoryTable: React.FC = () => (
  <div className="payment-history-container">
    <h2>Payment History</h2>
    <p>Lorem ipsum dolor sit amet, consectetur</p>
    <table className="payment-history-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>ID Invoice</th>
          <th>Date</th>
          <th>Recipient</th>
          <th>Email</th>
          <th>Service Type</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {paymentData.map((payment, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Auto-incrementing serial number */}
            <td>{payment.id}</td>
            <td>{payment.date}</td>
            <td className="recipient">
              <img src={payment.profileImage} alt={payment.recipient} />
              <div>
                <span className="name">{payment.recipient}</span>
                <span className="subtext">Online Shop</span>
              </div>
            </td>
            <td>{payment.email}</td>
            <td>{payment.serviceType}</td>
            <td className={`status ${payment.status.toLowerCase()}`}>
              {payment.status}
            </td>
            <td className="options">⋮</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PaymentHistoryTable;
