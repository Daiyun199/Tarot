import { useState } from "react";
import { Button, Form, Input, message } from "antd";

import "./index.scss";
import AudioPlayer from "../../components/music";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handler to send OTP
  const handleSendOTP = async (values: any) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/Account/sendOTPResetPassword",
        JSON.stringify(values.email) // Chuyển đổi email thành chuỗi JSON
      );
      if (response.status === 200) {
        message.success("OTP đã được gửi đến email của bạn.");
        setEmail(values.email);
        setCurrentStep(2);
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      if (error.response) {
        // Máy chủ phản hồi với một mã trạng thái khác 2xx
        message.error(
          error.response.data.message || "Gửi OTP thất bại. Vui lòng thử lại."
        );
      } else if (error.request) {
        // Yêu cầu được gửi nhưng không có phản hồi
        message.error("Không nhận được phản hồi từ máy chủ.");
      } else {
        // Lỗi khác
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Handler to reset password
  const handleResetPassword = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        email: email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        otpResetPassword: values.otp,
      };
      const response = await api.post("Account/resetPassword", payload);
      if (response.status === 200) {
        message.success("Đặt lại mật khẩu thành công.");
        // Optionally, redirect to login page
      }
      navigate("/login");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      message.error(error.response?.data || "Đặt lại mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page-background">
      <AudioPlayer />
      <div className="reset-page-container">
        <h2>ĐẶT LẠI MẬT KHẨU</h2>
        {currentStep === 1 && (
          <>
            <p>Vui lòng nhập email để nhận mã OTP.</p>
            <Form
              layout="vertical"
              onFinish={handleSendOTP}
              className="reset-page-container__form"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn.",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ.",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: "20%",
                  margin: "0 auto",
                  display: "block",
                  backgroundColor: "rgb(144, 142, 142)",
                }}
              >
                Gửi OTP
              </Button>
            </Form>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Vui lòng nhập OTP và mật khẩu mới.</p>
            <Form
              layout="vertical"
              onFinish={handleResetPassword}
              className="reset-page-container__form"
            >
              <Form.Item
                name="otp"
                label="Mã OTP"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã OTP.",
                  },
                ]}
              >
                <Input placeholder="Mã OTP" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới.",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&$#@!])[A-Za-z\d&$#@!]{8,16}$/,
                    message:
                      "Mật khẩu phải có từ 8 - 16 ký tự và bao gồm chữ cái, chữ cái in hoa, số và ký tự đặc biệt &, $, #, @, !",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Mật khẩu mới" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu mới.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu không khớp.")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
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
            <p>
              Mật khẩu phải có từ 8 - 16 ký tự và bao gồm chữ cái, chữ cái in
              hoa, số và ký tự đặc biệt &, $, #, @, ! (không thể chỉ là số)
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
