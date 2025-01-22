import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Row,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { persistStore } from "redux-persist";
import { store } from "../../store/store.jsx";
import { useDispatch } from "react-redux";
import { updateUserContext } from "../../store/features/UserContext.jsx";
import { update } from "../../store/features/LeftMenuItemSlice.jsx";
import { urlLogin } from "../../endpoints.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const persistor = persistStore(store);

  useEffect(() => {
    dispatch(updateUserContext({}));
    dispatch(update([]));
    persistor.purge();
  }, []);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const response = await axios.post(urlLogin, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Response", response.data);

        Cookies.set("NEC_AccessToken", response.data.Accesstoken);
        dispatch(updateUserContext(response.data.UserContext));
        dispatch(update(response.data.LeftMenu));
        navigate("/");
      } else {
        message.error("Invalid Credentials!");
      }
    } catch (error) {
      console.log(error);

      message.error("Login Failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EEF1FF",
        }}
      >
        <Spin spinning={loading} size="large">
          <Form
            layout="vertical"
            style={{
              padding: "2rem 3rem",
              borderRadius: "1rem",
              backgroundColor: "#fff",
              boxShadow: "rgb(38,57,77) 0px 20px 30px -10px",
            }}
            onFinish={handleSubmit}
          >
            <h1
              style={{
                textAlign: "center",
                color: "#673AB7",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "0 0.5rem" }}>NEC Skillset Tracker</span>
            </h1>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                marginBottom: "0",
                fontWeight: "600",
              }}
            >
              Hi, Welcome
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "1rem",
                margin: "0 0 2rem 0",
              }}
            >
              Enter your credentials to continue
            </p>
            <Form.Item
              name="UserId"
              label="Employee Id"
              rules={[
                {
                  required: true,
                  message: "Please input your User Id!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="User Id"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="Password"
              label="Enter Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: "linear-gradient(90deg,#0062ff,#da61ff)",
                          defaultColor: "#fff",
                          fontWeight: "bold",
                          defaultHoverBg: "#EEF1FF",
                          defaultHoverColor: "#803AB7",
                        },
                      },
                    }}
                  >
                    <Button
                      htmlType="submit"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      Log In
                    </Button>
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    </>
  );
}

export default Login;
