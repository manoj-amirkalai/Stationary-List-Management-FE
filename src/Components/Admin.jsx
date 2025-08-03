import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { adminLogIn } from "../Store/Slice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Admin = () => {
  const { admin } = useSelector((state) => state.store);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (!admin) {
      const { email, password } = values;
      if (
        email === "SenthilPriya@stationary.com" &&
        password === "SPLAstationary"
      ) {
        navigate("/items/allitems");
      dispatch(adminLogIn(true));
        successNotification(true)(); // Show success notification
        // You can navigate or set token here
      } else {
        failureNotification(true)(); // Show failure notification
      }
    } else {
      dispatch(adminLogIn(false));
      loggedOutNotification(true)(); // Show logged out notification
    }
  };

  const successNotification = (pauseOnHover) => () => {
    api.open({
      message: "Admin Login",
      description: "Logged In Successfully.",
      showProgress: true,
      pauseOnHover,
    });
  };
  const failureNotification = (pauseOnHover) => () => {
    api.open({
      message: "Admin Login",
      description: "Invalid Credentials.",
      showProgress: true,
      pauseOnHover,
    });
  };
  const loggedOutNotification = (pauseOnHover) => () => {
    api.open({
      message: "Admin Login",
      description: "Logged Out Successfully.",
      showProgress: true,
      pauseOnHover,
    });
  };

  return (
    <div style={styles.wrapper}>
      {contextHolder}
      <Card bordered={false} style={styles.card}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Login
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          {!admin && (
            <>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {admin ? "Logout" : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    margin: "100px 0 0 0",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.71)",
    borderRadius: "10px",
    padding: "0px 30px",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

export default Admin;
