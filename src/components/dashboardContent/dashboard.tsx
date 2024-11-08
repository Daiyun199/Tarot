// DashboardContent.tsx
import React, { useEffect, useState } from "react";
import MetricsCard from "../metricCard/metricCard";
import SocialMetrics from "../SocialMetric";
import TrafficSalesAnalysis from "../traficSaleAnalytic";
import UserActivityTable from "../UserActivity";
import "./dashboard.scss";
import api from "../../config/axios";
import { toast } from "react-toastify";
const DashboardContent: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubtotal, setTotalSubtotal] = useState<number>(0);
  const [totalTransaction, setTotalTransaction] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTotalSubtotal = async () => {
      try {
        const response = await api.get("Order/order-detail/get-all");
        const paymentData = response.data.data || [];
        const total = paymentData.reduce(
          (acc: number, payment: any) => acc + payment.subtotal,
          0
        );

        setTotalTransaction(response.data.data.length || 0);
        setTotalSubtotal(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await api.get("Account/active");
        setTotalUsers(response.data.length);
      } catch (err: any) {
        toast.error(err);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchTotalSubtotal(), fetchUserData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-content">
      <div className="metrics-cards">
        <div className="metrics-card-container">
          <MetricsCard
            title="Visitors"
            value={totalUsers.toString()}
            percentage="+12.4%"
            color="#6a5acd"
          />
          <MetricsCard
            title="Total Revenue"
            value={totalSubtotal.toLocaleString().toString()}
            percentage="+9%"
            color="#4682b4"
          />
          <MetricsCard
            title="Total Transactions"
            value={totalTransaction.toString()}
            percentage="-0.7%"
            color="#f0e68c"
          />
          <MetricsCard
            title="Sessions"
            value="44K"
            percentage="+6.7%"
            color="#fa8072"
          />
        </div>
      </div>
      <TrafficSalesAnalysis />
      <UserActivityTable />
    </div>
  );
};

export default DashboardContent;
