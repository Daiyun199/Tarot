// TrafficChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", visits: 2400, unique: 1400, pageViews: 800 },
  { month: "Feb", visits: 2200, unique: 1200, pageViews: 1000 },
  // Add more data as needed
];

const TrafficChart: React.FC = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="visits" stroke="#8884d8" />
      <Line type="monotone" dataKey="unique" stroke="#82ca9d" />
    </LineChart>
  );
};

export default TrafficChart;
