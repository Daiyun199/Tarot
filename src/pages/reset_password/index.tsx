import { Button, Form, Input } from "antd";
import React from "react";
import "./index.scss";
function ResetPasswordPage() {
  const handleLogin = async () => {};
  return (
    <div className="reset-page-background">
      <div className="reset-page-container">
        <h2>ĐẶT LẠI MẬT KHẨU</h2>
        <p>Vui lòng xác nhận lại mật khẩu cũ để tạo mật khẩu mới</p>

        <Form
          labelCol={{ span: 24 }}
          onFinish={handleLogin}
          className="reset-page-container__form"
        >
          <Form.Item
            name="email"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu cũ " />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Xác nhận mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
          <p>
            Mật khẩu phải có từ 8 - 16 ký tự và bao gồm chữ cái, chữ cái in hoa,
            số và ký tự đặc biệt &, $, #, @, ! (không thể chỉ là số)
          </p>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "20%",
              margin: "0 auto",
              display: "block",
              backgroundColor: "rgb(144, 142, 142)",
            }}
          >
            Xác Nhận
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
