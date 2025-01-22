import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  urlAddSkill,
  urlAddSkills,
  urlGetAllDepartments,
  urlGetAllSkills,
  urlgetAllUsers,
  urlGetSkillsForUser,
  urlGetUsersByDepartment,
  urlModifyUserSkills,
} from "../../endpoints";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function AddUserSkills() {
  const [form] = useForm();
  const [generalLoading, setGeneralLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [updatedSkills, setUpdatedSkills] = useState([]);
  const [submitButton, setSubmitButton] = useState("Submit");
  const [newUserSkills, setNewUserSkills] = useState([]);

  useEffect(() => {
    setGeneralLoading(true);
    getAllSkills();
    setGeneralLoading(false);
    loadExistingSkills();
    // form.setFieldsValue({ Month: dayjs().format("MMMM YYYY") });
    // form.setFieldsValue({
    //   Month: dayjs().subtract(1, "month").format("MMMM YYYY"), // Format to 'Month Year' (e.g., 'October 2024')
    // });
  }, []);

  const LoggedInUser = useSelector((state) => state.UserContext.value);

  const SkillLevels = [
    {
      value: 1,
      label: "Level 1",
    },
    {
      value: 2,
      label: "Level 2",
    },
    {
      value: 3,
      label: "Level 3",
    },
  ];

  function getAllSkills() {
    axios
      .get(urlGetAllSkills)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  function loadExistingSkills() {
    axios
      .get(`${urlGetSkillsForUser}/${LoggedInUser.UserId}`)
      .then((response) => {
        if (response.data.userSkills.currentMonth.length > 0) {
          console.log(
            "User Skills from db : ",
            response.data.userSkills.currentMonth
          );

          setSubmitButton("Update");

          const dataSource = response.data.userSkills.currentMonth.map(
            (skill) => ({
              key: skill.skillId,
              skill: skill.skill,
              skillLevel: skill.skillLevel,
            })
          );

          setUserSkills(dataSource);
        }
      })
      .catch((e) => {
        message.warning(e.response.data.message);
      });
  }
  console.log("updated Skills ", updatedSkills);

  function handleSubmit(values) {
    if (submitButton === "Submit") {
      if (newUserSkills.length <= 0) {
        message.error("Please add skills");
        return;
      }

      const updatedUserSkills = newUserSkills.map((skill) => {
        return {
          ...skill,
          skillId: skill.key,
          skillLevel: skill.skillLevel,
          key: undefined,
          month: dayjs().format("MMMM YYYY"),
          // month: dayjs().add(1, "month").format("MMMM YYYY"),
        };
      });

      const postData = {
        UserId: LoggedInUser.UserId,
        UserName: LoggedInUser.UserName,
        userSkills: updatedUserSkills,
      };

      axios
        .post(urlAddSkills, postData)
        .then((response) => {
          message.success(response.data.message);
          form.resetFields();
          setNewUserSkills([]);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } else {
      if (userSkills.length <= 0) {
        message.error("Please add skills");
        return;
      }

      console.log("user Skills from db : ", userSkills);

      const updatedExistingUserSkills = userSkills.map((skill) => {
        // Find the matching updated skill by key
        const updatedSkill = updatedSkills.find(
          (updated) => updated.key === skill.key // Changed from skill.skillId to skill.key
        );

        // If a matching skill is found, update the skillLevel
        if (updatedSkill) {
          return {
            ...skill,
            skillLevel: updatedSkill.updatedLevel,
          };
        }

        // If no matching skill is found, return the skill unchanged
        return skill;
      });

      console.log("Updated User Skills:", updatedExistingUserSkills);

      console.log("updatedExistingUserSkills ", updatedExistingUserSkills);

      const updatedNewUserSkills = newUserSkills.map((skill) => {
        return {
          ...skill,
          skillId: skill.key,
          skillLevel: skill.skillLevel,
          key: undefined,
          month: dayjs().format("MMMM YYYY"),
          // month: dayjs().add(1, "month").format("MMMM YYYY"),
        };
      });

      const transformedUpdatedExistingUserSkills =
        updatedExistingUserSkills.map((LatestSkill) => {
          return {
            skill: LatestSkill.skill,
            skillId: LatestSkill.key,
            skillLevel: LatestSkill.skillLevel,
            key: undefined,
            month: dayjs().format("MMMM YYYY"),
            // month: dayjs().add(1, "month").format("MMMM YYYY"),
          };
        });

      console.log(
        "modified updated skills ",
        transformedUpdatedExistingUserSkills
      );
      console.log("Newly added skills ", updatedNewUserSkills);

      const combinedSkills =
        transformedUpdatedExistingUserSkills.concat(updatedNewUserSkills);

      const postData = {
        UserId: LoggedInUser.UserId,
        userSkills: combinedSkills,
      };

      console.log("Post Data ", postData);

      axios
        .put(urlModifyUserSkills, postData)
        .then((response) => {
          message.success(response.data.message);
          form.resetFields();
          setUserSkills([]);
          setNewUserSkills([]);
          loadExistingSkills();
          setUpdatedSkills([]);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }

  function handleReset() {
    form.resetFields();
  }

  function handleNewSkillDelete(key) {
    const updatedSkills = newUserSkills?.filter((skill) => skill.key !== key);
    setNewUserSkills(updatedSkills);
  }
  function handleExistingSkillDelete(key) {
    const updatedSkills = userSkills?.filter((skill) => skill.key !== key);
    setUserSkills(updatedSkills);
  }

  const newSkillColumns = [
    {
      title: "Skill",
      dataIndex: "skill",
      key: "1",
      width: 250,
    },
    {
      title: "Level",
      dataIndex: "skillLevel",
      key: "2",
      width: 70,
    },
    {
      title: "Action",
      key: "3",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleNewSkillDelete(record.key)}
        >
          <Button size="small" danger>
            <DeleteOutlined style={{ fontSize: "1rem" }} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const modifySkillColumns = [
    {
      title: "Skills",
      dataIndex: "skill",
      key: "1",
      width: 250,
    },
    {
      title: "Current Level",
      dataIndex: "skillLevel",
      key: "2",
      width: 120,
      align: "center",
    },
    {
      title: "Update Progress",
      key: "4",
      width: 130,
      render: (text, record) => {
        return (
          <Select
            style={{ width: "100%" }}
            options={SkillLevels?.map((level) => ({
              label: level.label,
              value: level.value,
            }))}
            onChange={(e) => handleLevelChange(e, record.key)}
          />
        );
      },
    },
    {
      title: "Action",
      key: "3",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleExistingSkillDelete(record.key)}
        >
          <Button size="small" danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  function handleLevelChange(e, key) {
    const skillName = userSkills.find((skill) => {
      return skill.key === key;
    });

    const updatedSkillData = {
      key: key,
      updatedLevel: e,
      skill: skillName.skill,
    };

    setUpdatedSkills((prevSkills) => {
      // Remove any existing entry for this skill
      const filteredSkills = prevSkills.filter((skill) => skill.key !== key);
      // Add the new update
      return [...filteredSkills, updatedSkillData];
    });
  }

  function handleAdd() {
    form.validateFields();
    const obj = form.getFieldsValue();

    const selectedSkill = skills.find((skill) => skill.Skill === obj?.Skills);

    if (selectedSkill) {
      const skillObj = {
        key: selectedSkill._id,
        skill: obj?.Skills,
        skillLevel: obj?.SkillLevel,
      };
      setNewUserSkills((prev) => [...prev, skillObj]);
    } else {
      message.error("Selected skill not found in skills list.");
    }

    form.resetFields(["Skills", "SkillLevel"]);
  }

  function handleNewSkillChange(e) {
    setNewSkill(e.target.value);
  }

  function handleAddNewSkill() {
    const value = { Skill: newSkill };
    axios
      .post(urlAddSkill, value)
      .then(() => {
        message.success("New skill added successfully");
        getAllSkills();
        form.setFieldsValue({ Skills: newSkill });
        setNewSkill("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          margin: "1rem",
        }}
      >
        <Card
          style={{
            width: "35rem",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            height: "22rem",
          }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Row justify={"center"}>
              <Col>
                <p
                  style={{
                    fontSize: "1.2rem",
                    margin: 0,
                    textDecoration: "underline",
                  }}
                >
                  Add New Skills
                </p>
              </Col>
            </Row>
            {/* <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item
                  label="Department"
                  name="Department"
                  rules={[
                    { required: true, message: "Please select a department!" },
                  ]}
                >
                  <Select
                    placeholder="Select Department"
                    options={departments?.map((dept) => ({
                      label: dept.Department,
                      value: dept.Department,
                    }))}
                    onChange={handleDepartmentChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row> */}

            {/* <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item
                  label="User"
                  name="User"
                  rules={[{ required: true, message: "Please select a user!" }]}
                >
                  <Select
                    placeholder="Select User"
                    options={users?.map((user) => ({
                      label: user.userName,
                      value: user._id,
                    }))}
                    style={{ width: "100%" }}
                    onChange={handleUserChange}
                  />
                </Form.Item>
              </Col>
            </Row> */}

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Month" name="Month">
                  <Input
                    defaultValue={dayjs().format("MMMM YYYY")}
                    // defaultValue={dayjs().add(1, "month").format("MMMM YYYY")}
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Skills" name="Skills">
                  <Select
                    showSearch
                    allowClear
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Row style={{ padding: "0 8px 4px" }} justify={"end"}>
                          <Col span={24}>
                            <Input
                              size="small"
                              style={{ width: "100%" }}
                              placeholder="New Skill"
                              value={newSkill}
                              onChange={handleNewSkillChange}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </Col>
                          <Col style={{ marginTop: "0.5rem" }}>
                            <Button
                              size="small"
                              color="primary"
                              // type="link"
                              variant="outlined"
                              icon={<PlusOutlined />}
                              onClick={handleAddNewSkill}
                            >
                              Add Skill
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                    placeholder="Select Skills"
                    options={skills?.map((skill) => ({
                      label: skill.Skill,
                      value: skill.Skill,
                    }))}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={18}>
                <Form.Item label="Skill Level" name="SkillLevel">
                  <Select
                    placeholder="Select Level"
                    options={SkillLevels?.map((level) => ({
                      label: level.label,
                      value: level.value,
                    }))}
                    style={{ width: "100%" }}
                    // onChange={handleUserChange}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label=" ">
                  <Button
                    style={{
                      backgroundColor: "#5cb85c",
                      color: "#fff",
                      width: "100%",
                    }}
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify="center">
              <Col>
                <Button type="primary" htmlType="submit">
                  {submitButton}
                </Button>
              </Col>
              <Col>
                <Button danger onClick={handleReset}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Flex vertical gap={10}>
          {newUserSkills.length > 0 && (
            <Table
              title={() => "New Skills"}
              size="small"
              bordered
              dataSource={newUserSkills}
              columns={newSkillColumns}
            />
          )}
          {submitButton == "Update" && (
            <Table
              title={() => "Existing Skills"}
              size="small"
              bordered
              dataSource={userSkills}
              columns={modifySkillColumns}
            />
          )}
        </Flex>
      </div>
    </>
  );
}

export default AddUserSkills;
