import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Scheduler from "../../components/readerCalendar";
import DeleteSchedule from "../../components/delete-schedule/deleteSchedule";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Notifications = () => <div>Notifications Component</div>;

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: "1",
    label: "Schedule", // Thay đổi tiêu đề thành Schedule
  },
  {
    key: "2",
    label: "Home", // Thay đổi tiêu đề thành Home
  },
];

// Các mục điều hướng trong Sidebar
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
  const [selectedContent, setSelectedContent] = useState<string>("1"); // Mặc định chọn Schedule (key: "1")
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Hàm để thay đổi component khi chọn menu trong Sidebar
  const handleMenuClick = (e: { key: string }) => {
    setSelectedContent(e.key); // Cập nhật option được chọn
  };

  // Hàm để điều hướng khi click vào menu trên Header
  const handleNavClick = (e: { key: string }) => {
    if (e.key === "2") {
      navigate("/"); // Điều hướng đến trang "/"
    }
  };

  // Hàm render component dựa trên option được chọn
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
          defaultSelectedKeys={["1"]} // Đặt mặc định là "Schedule"
          selectedKeys={["1"]} // Luôn chọn mục Schedule khi vào trang
          items={items1}
          onClick={handleNavClick} // Gọi khi chọn mục từ Header
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]} // Mặc định chọn mục đầu tiên ở Sidebar
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick} // Gọi khi chọn item
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
            {/* Render component dựa trên mục được chọn */}
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ReaderManagement;
