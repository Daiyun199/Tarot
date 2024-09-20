import { Button, Col, Form, Image, Input, Row } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import React from "react";
import "./index.scss";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../config/firebase";

function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        toast.success("Đăng nhập bằng Google thành công!");
        navigate("/"); // Điều hướng về trang chủ sau khi đăng nhập thành công
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đăng nhập bằng Google thất bại.");
      });
  };

  const handleFaceBookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        toast.success("Đăng nhập bằng Facebook thành công");
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đăng nhập bằng Facebook thất bại.");
      });
  };

  const form = useForm();
  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      if (email === "admin" && password === "admin") {
        toast.success("Login successful");

        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
            <p className="forgot-password">
              <Link to="/reset-password">Quên mật khẩu</Link>
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
              Đăng Nhập
            </Button>
          </Form>
          <p className="space">Or</p>
          <button
            className="container__box__right__form__facebook-button"
            onClick={handleFaceBookLogin}
          >
            <FacebookOutlined className="container__box__right__form__facebook-button__icon" />

            <span className="container__box__right__form__facebook-button__text">
              Sign in with Facebook
            </span>
          </button>
          <button
            className="container__box__right__form__google-button"
            onClick={handleGoogleLogin}
          >
            <GoogleOutlined className="container__box__right__form__google-button__icon" />{" "}
            <span className="container__box__right__form__google-button__text">
              Sign up with Google
            </span>
            {/* Text */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
