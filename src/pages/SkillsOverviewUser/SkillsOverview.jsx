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
import GraphicalView from "../../components/GraphicalView.jsx";
import { urlgetAllUsers, urlGetSkillsForUser } from "../../endpoints.js";
import axios from "axios";
import SkillsTabularView from "../../components/SkillsTabularView.jsx";
import { useSelector } from "react-redux";

function SkillsOverview() {
  const [form] = useForm();
  const [users, setUsers] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [userSkills, setUserSkills] = useState([]);

  const LoggedInUser = useSelector((state) => state.UserContext.value);
  console.log("Logged In User", LoggedInUser);

  useEffect(() => {
    getUserSkills();
  }, []);

  async function getUserSkills() {
    setUserSkills([]);
    setSkillsLoading(true);
    await axios
      .get(`${urlGetSkillsForUser}/${LoggedInUser.UserId}`)
      .then((response) => {
        console.log("User Skill ", response.data.userSkills);
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
    console.log(key);
  };

  return (
    <>
      <Spin spinning={skillsLoading}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Spin>
    </>
  );
}

export default SkillsOverview;
