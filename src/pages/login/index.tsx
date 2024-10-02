import { Button, Form, Input } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

import "./index.scss";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../config/firebase";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
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
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
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

  // const form = useForm();
  const handleLogin = async (values: any) => {
    try {
      const response = await api.post("Auth/login", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Successfully logged in");
      dispatch(login(response.data));
      navigate("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__box">
        <div className="login-container__box__left">
          <div className="login-container__box__left__top">
            <img src="https://i.imgur.com/6xuf2CN.png" alt="" width={700} />
          </div>
          <div className="login-container__box__left__bottom">
            <img src="https://i.imgur.com/anj8eux.png" alt="" width={500} />
          </div>
        </div>
        <div className="login-container__box__right">
          <h2>Đăng ký hoặc đăng nhập</h2>
          <p>
            Đăng nhập để nhận các trải bài Tarot từ MEOWGIC và lời khuyên từ các
            reader
          </p>

          <Form
            labelCol={{ span: 24 }}
            onFinish={handleLogin}
            className="login-container__box__right__form"
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
                width: "30%",
                fontSize: "18px",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
                lineHeight: "normal",
                backgroundColor: "rgb(144, 142, 142)",
              }}
            >
              Đăng Nhập
            </Button>
          </Form>
          <p className="space">Or</p>
          <button
            className="login-container__box__right__form__facebook-button"
            onClick={handleFaceBookLogin}
          >
            <FacebookOutlined className="login-container__box__right__form__facebook-button__icon" />

            <span className="login-container__box__right__form__facebook-button__text">
              Sign in with Facebook
            </span>
          </button>
          <button
            className="login-container__box__right__form__google-button"
            onClick={handleGoogleLogin}
          >
            <GoogleOutlined className="login-container__box__right__form__google-button__icon" />{" "}
            <span className="login-container__box__right__form__google-button__text">
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
