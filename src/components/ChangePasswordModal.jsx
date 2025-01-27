import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { urlChangePassword } from "../endpoints";
import { useSelector } from "react-redux";

function ChangePasswordModal({ open, close, onSubmit }) {
  const [form] = Form.useForm();
  const userContext = useSelector((state) => state.UserContext.value);

  const handleCancel = () => {
    form.resetFields();
    close();
  };

  const handleFinish = (values) => {
    const postData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
      UserId: userContext.UserId,
    };

    axios
      .put(urlChangePassword, postData)
      .then((response) => {
        if (response.status === 201) {
          message.success(response.data.message);
          onSubmit(values); // Pass the form values to the parent handler
          form.resetFields(); // Reset the form fields after successful submission
          debugger;
          close(); // Close the modal
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("E ", error);
        message.error(error.response.data.message);
      });
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      maskClosable={false} // Prevent closing on mask click
      onCancel={handleCancel} // Close the modal on cancel
      footer={null} // Use the form buttons for actions
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="oldPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Current Password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter current password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={16}
          justify={"end"}
          style={{ padding: 0, height: "min-content" }}
        >
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ margin: "0" }}>
                Update Password
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button onClick={handleCancel} danger>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
