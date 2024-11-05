import { useState } from "react";
import { Button, Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import "./register.scss";
import AudioPlayer from "../../components/music";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";
import { toast } from "react-toastify";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    if (!values.terms) {
      message.error("Bạn phải đồng ý với điều khoản và điều kiện.");
      return;
    }
    setLoading(true);
    try {
      const year = parseInt(values.year, 10);
      const month = parseInt(values.month, 10) - 1;
      const day = parseInt(values.day, 10);
      if (
        isNaN(year) ||
        isNaN(month) ||
        isNaN(day) ||
        day < 1 ||
        day > 31 ||
        month < 0 ||
        month > 11
      ) {
        toast.error("Ngày sinh không hợp lệ.");
        setLoading(false);
        return;
      }

      const dob = new Date(year, month, day);

      if (isNaN(dob.getTime())) {
        toast.error("Ngày sinh không hợp lệ.");
        setLoading(false);
        return;
      }
      const payload = {
        email: values.email,
        password: values.newPassword,
        name: `${values.firstName} ${values.lastName}`,
        phone: values.phoneNumber,
        gender: values.gender,
        dob: dob,
        roles: 0,
      };
      const response = await api.post("Auth/register", payload);
      if (response.status === 200) {
        message.success("Tạo tài khoản mới");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      message.error(error.response?.data || "Tạo tài khoản thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-background">
      <AudioPlayer />
      <div className="register-page-container">
        <h2>Tạo tài khoản mới</h2>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="register-page-container__form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Họ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ của bạn",
                  },
                ]}
              >
                <Input placeholder="Họ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên của bạn",
                  },
                ]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="day"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <Select placeholder="Ngày sinh">
                  {[...Array(31).keys()].map((day) => (
                    <Option
                      key={(day + 1).toString()}
                      value={(day + 1).toString()}
                    >
                      {day + 1}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="month"
                label="Tháng"
                rules={[{ required: true, message: "Vui lòng chọn tháng" }]}
              >
                <Select>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <Option key={month.toString()} value={month.toString()}>
                      Tháng {month}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="year"
                label="Năm"
                rules={[{ required: true, message: "Vui lòng chọn năm" }]}
              >
                <Select>
                  {Array.from({ length: 50 }, (_, i) => 1970 + i).map(
                    (year) => (
                      <Option key={year.toString()} value={year.toString()}>
                        {year}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Select placeholder="Nam">
              <Option value="Male">Nam</Option>
              <Option value="Female">Nữ</Option>
              <Option value="other">Khác</Option>
            </Select>
          </Form.Item>
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
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn.",
              },
              {
                pattern: /^(?:(\+84)|0)\d{9,10}$/, // regex cho số điện thoại Việt Nam
                message: "Số điện thoại không hợp lệ.",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu ",
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
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu "
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu ",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Hai mật khẩu không khớp."));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Bạn phải đồng ý với điều khoản và điều kiện."
                        )
                      ),
              },
            ]}
          >
            <Checkbox>
              Bằng cách tiếp tục, bạn đồng ý với{" "}
              <a href="#">Điều khoản & Điều kiện</a> và{" "}
              <a href="#">Chính sách Quyền riêng tư</a> của Meowgic
            </Checkbox>
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
      </div>
    </div>
  );
}

export default Register;
