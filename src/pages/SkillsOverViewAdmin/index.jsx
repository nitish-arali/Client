import { Card, Col, Form, Row, Select, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { urlgetAllUsers, urlGetSkillsForUser } from "../../endpoints";
import OverallSkills from "./OverallSkills";
import SkillsOverviewByUser from "./SkillsOverViewByUser/SkillsOverviewByUser";

const SkillsOverviewAdmin = () => {
  const [form] = useForm();
  const [users, setUsers] = useState();
  const [userSkills, setUserSkills] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(false);

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
        const transformedData = response?.data?.map((item) => ({
          skill: item.skill, // Get the skill name before any space (e.g., "React" from "React Js")
          updatedLevel: item.skillLevel[0].updatedLevel, // Extract the updated level
        }));
        setUserSkills(transformedData);

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
      label: "Overall Skills",
      children: <OverallSkills />,
    },
    {
      key: "2",
      label: "Skills By User",
      children: <SkillsOverviewByUser />,
    },
    // {
    //   key: "3",
    //   label: "Skills By Department",
    //   // children: <GraphicalView Skills={userSkills} />,
    // },
  ];

  return (
    <>
      <Card
        style={{
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
        <Form form={form}>
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <Col span={8}>
              <Form.Item
                // label="Select User"
                name="User"
              >
                <Select
                  loading={userLoading}
                  // showSearch
                  allowClear
                  placeholder="Select User"
                  options={users?.map((user) => ({
                    label: user.userName,
                    value: user._id,
                  }))}
                  onChange={handleUserClick}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default SkillsOverviewAdmin;
