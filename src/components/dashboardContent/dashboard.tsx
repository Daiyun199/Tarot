// DashboardContent.tsx
import React from "react";
import MetricsCard from "../metricCard/metricCard";
import SocialMetrics from "../SocialMetric";
import TrafficSalesAnalysis from "../traficSaleAnalytic";
import UserActivityTable from "../UserActivity";
import "./dashboard.scss";
const DashboardContent: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="metrics-cards">
        <div className="metrics-card-container">
          <MetricsCard
            title="Visitors"
            value="26K"
            percentage="+12.4%"
            color="#6a5acd"
          />
          <MetricsCard
            title="Income"
            value="$6,200"
            percentage="+9%"
            color="#4682b4"
          />
          <MetricsCard
            title="Conversion Rate"
            value="2.49%"
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
      <SocialMetrics />
      <TrafficSalesAnalysis />
      <UserActivityTable />
    </div>
  );
};

export default DashboardContent;
