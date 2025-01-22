import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Tooltip,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { urlAddSkill, urlGetAllSkills } from "../../endpoints";
import axios from "axios";

function AddSkill() {
  const [skills, setSkills] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    getAllSkills();
  }, []);

  async function getAllSkills() {
    await axios
      .get(urlGetAllSkills)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  const dataSource = skills?.map((skill, index) => ({
    key: skill._id,
    slno: index + 1,
    skill: skill.Skill,
  }));

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slno",
    },
    {
      title: "Skills",
      dataIndex: "skill",
    },
  ];

  function handleSubmit(values) {
    // console.log(values);
    axios
      .post(urlAddSkill, values)
      .then((response) => {
        message.success(response.data.message);
        form.resetFields();
      })
      .catch((error) => {
        message.error(error);
      });
  }

  return (
    <>
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
              label="Skill"
              name="Skill"
              rules={[{ required: true, message: "Please enter a Skill!" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label=" ">
              <Button id="AddSkillButton" htmlType="submit" type="primary">
                Add Skill
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" ">
              <Button danger>Reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table bordered size="small" dataSource={dataSource} columns={columns} />
    </>
  );
}

export default AddSkill;
