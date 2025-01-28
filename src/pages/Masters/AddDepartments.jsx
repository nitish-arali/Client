import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  Tooltip,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { urlAddDepartment, urlGetAllDepartments } from "../../endpoints";
import axios from "axios";

function AddDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  useEffect(() => {
    getAllDepartments();
  }, []);

  async function getAllDepartments() {
    setLoading(true);
    await axios
      .get(urlGetAllDepartments)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

function handleReset(){
form.resetFields();
}

  function handleSubmit(values) {
    setLoading(true);
    axios
      .post(urlAddDepartment, values)
      .then((response) => {
        message.success(response.data.message);
        form.resetFields();
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setLoading(false);
        getAllDepartments();
      });
  }

  const dataSource = departments?.map((dept, index) => ({
    key: dept._id,
    slno: index + 1,
    department: dept.Department,
  }));

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slno",
    },
    {
      title: "Department",
      dataIndex: "department",
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
            <Col span={8}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please enter a department!" },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label=" ">
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label=" ">
                <Button onClick={handleReset} danger>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div style={{ margin: "1rem" }}>
          <Table
            bordered
            size="small"
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </Spin>
    </>
  );
}

export default AddDepartments;
