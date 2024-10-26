import React from "react";
import "./metricCard.scss";

interface MetricsCardProps {
  title: string;
  value: string;
  percentage: string;
  color: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  percentage,
  color,
}) => {
  return (
    <div className="metrics-card" style={{ backgroundColor: color }}>
      <h3 className="metrics-card-title">{title}</h3>
      <p className="metrics-card-value">{value}</p>
      <span className="metrics-card-percentage">{percentage}</span>
    </div>
  );
};

export default MetricsCard;
