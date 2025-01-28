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
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { urlAddSkill, urlGetAllSkills } from "../../endpoints";
import axios from "axios";

function AddSkill() {
  const [skills, setSkills] = useState([]);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllSkills();
  }, []);

  async function getAllSkills() {
    setLoading(true);
    await axios
      .get(urlGetAllSkills)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const dataSource = skills?.map((skill, index) => ({
    key: skill._id,
    slno: index + 1,
    skill: skill.Skill,
    isProjectRelated: skill.isProjectRelated ? "Yes" : "No",
  }));

function handleReset(){
form.resetFields();
}

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slno",
    },
    {
      title: "Skills",
      dataIndex: "skill",
    },
    {
      title: "Project Related Skill",
      dataIndex: "isProjectRelated",
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
      })
      .finally(() => {
        getAllSkills();
      });
  }

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
                label="Skill"
                name="Skill"
                rules={[{ required: true, message: "Please enter a Skill!" }]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Project Related Skill"
                name="isProjectRelated"
                rules={[{ required: true, message: "Please enter a Skill!" }]}
              >
                <Select
                  placeholder="Is this Project Related Skill?"
                  style={{ width: "100%" }}
                  options={[
                    {
                      label: "Yes",
                      value: true,
                    },
                    {
                      label: "No",
                      value: false,
                    },
                  ]}
                />
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
                                <Button onClick={handleReset} danger>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          bordered
          size="small"
          dataSource={dataSource}
          columns={columns}
        />
      </Spin>
    </>
  );
}

export default AddSkill;
