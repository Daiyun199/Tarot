import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Scheduler from "../../components/readerCalendar";
import DeleteSchedule from "../../components/delete_schedule/deleteSchedule";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Notifications = () => <div>Notifications Component</div>;

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: "1",
    label: "Schedule",
  },
  {
    key: "2",
    label: "Home",
  },
];

const items2: MenuProps["items"] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Work Schedule",
  },
  {
    key: "2",
    icon: <LaptopOutlined />,
    label: "Delete Schedule",
  },
  {
    key: "3",
    icon: <NotificationOutlined />,
    label: "Notifications",
  },
];

const ReaderManagement: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    setSelectedContent(e.key);
  };

  const handleNavClick = (e: { key: string }) => {
    if (e.key === "2") {
      navigate("/");
    }
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "1":
        return <Scheduler />;
      case "2":
        return <DeleteSchedule />;
      case "3":
        return <Notifications />;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={["1"]}
          items={items1}
          onClick={handleNavClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: "List" },
              { title: "ReaderManagement" },
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
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ReaderManagement;
