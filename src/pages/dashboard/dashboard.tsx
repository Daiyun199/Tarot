import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DashboardContent from "../../components/dashboardContent/dashboard";
import ChartContent from "../../components/chartContent/chart";

const { Header, Content, Sider } = Layout;

const items1 = [
  { key: "dashboard", label: "Dashboard" },
  { key: "chart", label: "Chart" },
];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("dashboard");

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["dashboard"]}
          items={items1}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout style={{ flex: 1 }}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items1}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: selectedKey === "dashboard" ? "Dashboard" : "Chart" },
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
            ) : (
              <ChartContent />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
