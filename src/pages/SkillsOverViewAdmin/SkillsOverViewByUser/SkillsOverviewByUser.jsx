import {
  Card,
  Col,
  Flex,
  Form,
  message,
  Progress,
  Row,
  Select,
  Spin,
  Tabs,
  Tag,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import GraphicalView from "../../../components/GraphicalView.jsx";
import { urlgetAllUsers, urlGetSkillsForUser } from "../../../endpoints.js";
import axios from "axios";
import SkillsTabularView from "../../../components/SkillsTabularView.jsx";

function SkillsOverviewByUser() {
  const [form] = useForm();
  const [users, setUsers] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    axios
      .get(urlgetAllUsers)
      .then((response) => {
        setUsers(response.data);
        setUserLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        message.error("Error fetching users. Try reloading.");
        setUserLoading(false);
      });
  }, []);

  async function handleUserClick(values) {
    setUserSkills([]);
    setSkillsLoading(true);
    await axios
      .get(`${urlGetSkillsForUser}/${values}`)
      .then((response) => {
        setUserSkills(response.data);
      })
      .catch((error) => {
        if (error.status == 404) {
          message.warning("No skills found for the user, Please add skills");
        }
        console.log(error);
      });
    setSkillsLoading(false);
  }

  const items = [
    {
      key: "1",
      label: "Tabular View",
      children: <SkillsTabularView Skills={userSkills} />,
    },
    {
      key: "2",
      label: "Graphical View",

      children: <GraphicalView Skills={userSkills} />,
    },
  ];

  const onChange = (key) => {
   
  };

  return (
    <>
      <Spin spinning={skillsLoading}>
        <Form form={form}>
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col span={8}>
              <Form.Item name="User">
                <Select
                  loading={userLoading}
                  placeholder="Select User"
                  options={users?.map((user) => ({
                    label: user.userName,
                    value: user._id,
                  }))}
                  onChange={handleUserClick}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Spin>
    </>
  );
}

export default SkillsOverviewByUser;
