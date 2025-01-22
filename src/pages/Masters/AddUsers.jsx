import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import {
  urlAddUser,
  urlGetAllDepartments,
  urlgetAllUsers,
} from "../../endpoints";
import axios from "axios";

function AddUsers() {
  const [form] = useForm();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllDepartments();
    getAllUsers();
  }, []);

  async function getAllDepartments() {
    await axios
      .get(urlGetAllDepartments)
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        message.error("Error fetching departments. Try Reloading.");
        setLoading(false);
      });
  }

  async function getAllUsers() {
    await axios
      .get(urlgetAllUsers)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  function handleSubmit(values) {
    axios
      .post(urlAddUser, values)
      .then((response) => {
        message.success(response.data.message);
        form.resetFields();
      })
      .catch((error) => {
        message.error(error);
      });
  }

  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];

  const dataSource = users?.map((user, index) => ({
    key: user._id,
    slno: index + 1,
    userName: user.userName,
    department: user.department,
  }));

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slno",
    },
    {
      title: "Users",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <Form
          style={{ margin: "0 1rem" }}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select a department!" },
                ]}
              >
                <Select
                  options={departments?.map((dept) => ({
                    label: dept.Department,
                    value: dept.Department,
                  }))}
                  placeholder="Select Department"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="User Name"
                name="userName"
                rules={[{ required: true, message: "Please input User Name" }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
            <Form.Item
              label={
                <>
                  <div style={{}}>
                    User ID
                    <Tooltip title="Enter Your Employee ID">
                      <InfoCircleOutlined style={{ marginLeft: "0.5rem" }} />
                    </Tooltip>
                  </div>
                </>
              }
              name="userId"
              rules={[{ required: true, message: "Please input User ID" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
          </Row>
          <Row gutter={16} justify={"end"}>
            <Col>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Col>
            <Col>
              <Button danger>Reset</Button>
            </Col>
          </Row>
        </Form>
        <div style={{ margin: "1rem" }}>
          <Table bordered size="small" dataSource={dataSource} columns={columns} />
        </div>
      </Spin>
    </>
  );
}

export default AddUsers;
