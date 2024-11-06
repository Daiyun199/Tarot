import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardContent from "../../components/dashboardContent/dashboard";
import ChartContent from "../../components/chartContent/chart";
import PaymentHistoryTable from "../../components/payment_statistics_table/paymentStatisticsTable";

const { Header, Content, Sider } = Layout;

const items1 = [
  { key: "home", label: "Home" },
  { key: "dashboard", label: "Dashboard" },
  { key: "chart", label: "Chart" },
  { key: "payment", label: "Payment Statistics" },
];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    if (e.key === "home") {
      navigate("/"); // Navigate to the Home page
    } else {
      setSelectedKey(e.key);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]} // Đồng bộ với selectedKey
          items={items1}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            position: "sticky", // Giữ menu cố định khi cuộn
            top: 0, // Đảm bảo Sider giữ nguyên vị trí khi cuộn trang
            height: "100vh", // Đảm bảo chiều cao của Sider bằng chiều cao của trang
            overflow: "auto", // Cho phép cuộn nội dung nếu cần
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]} // Đồng bộ với selectedKey
            style={{ height: "100%", borderRight: 0 }}
            items={items1}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
          <Breadcrumb
            items={[
              { title: "Home" },
              {
                title:
                  selectedKey === "dashboard"
                    ? "Dashboard"
                    : selectedKey === "chart"
                      ? "Chart"
                      : "Payment Statistics",
              },
            ]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedKey === "dashboard" ? (
              <DashboardContent />
            ) : selectedKey === "chart" ? (
              <ChartContent />
            ) : (
              <PaymentHistoryTable />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
