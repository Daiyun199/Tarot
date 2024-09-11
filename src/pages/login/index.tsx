import { Button, Col, Form, Image, Input, Row } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import React from "react";
import "./index.scss";

function Login() {
  const handleLogin = async (values) => {};
  return (
    <div className="container">
      <div className="container__box">
        <div className="container__box__left">
          <div className="container__box__left__top">
            <img src="https://i.imgur.com/6xuf2CN.png" alt="" width={700} />
          </div>
          <div className="container__box__left__bottom">
            <img src="https://i.imgur.com/anj8eux.png" alt="" width={500} />
          </div>
        </div>
        <div className="container__box__right">
          <h2>Đăng ký hoặc đăng nhập</h2>
          <p>
            Đăng nhập để nhận các trải bài Tarot từ MEOWGIC và lời khuyên từ các
            reader
          </p>

          <Form
            labelCol={{ span: 24 }}
            onFinish={handleLogin}
            className="container__box__right__form"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input placeholder="Tên Người Dùng" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password placeholder="Mật Khẩu" />
            </Form.Item>
            <p className="forgot-password">Quên mật khẩu</p>
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
              Đăng Nhập
            </Button>
          </Form>
          <p className="space">Or</p>
          <div className="container__box__right__form__facebook-button">
            <FacebookOutlined className="container__box__right__form__facebook-button__icon" />

            <span className="container__box__right__form__facebook-button__text">
              Sign in with Facebook
            </span>
          </div>
          <div className="container__box__right__form__google-button">
            <GoogleOutlined className="container__box__right__form__google-button__icon" />{" "}
            <span className="container__box__right__form__google-button__text">
              Sign up with Google
            </span>
            {/* Text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
