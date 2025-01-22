import { Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function ChangePasswordModal({ open, close, onSubmit }) {
  const [form] = Form.useForm();

  function handleCancel() {
    form.resetFields();
    close();
  }
  return (
    <div>
      <Modal
        title="Change Password"
        open={open}
        onOk={onSubmit}
        maskClosable={false}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Update Password"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            console.log(values);
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Current Password!",
                  },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="updatePassword"
                label="Update Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your updated password!",
                  },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="reEnteredUpdatePassword"
                label="Re-Enter Updated Password"
                rules={[
                  {
                    required: true,
                    message: "Please re enter your updated password!",
                  },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
