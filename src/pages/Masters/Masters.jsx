import React from "react";
import { Layout, Tabs } from "antd";
import AddUsers from "./AddUsers";
import AddDepartments from "./AddDepartments";
import AddSkill from "./AddSkill";

const Masters = () => {
  // Define the handleChange function outside the return statement
  function handleChange(key) {
    console.log(key);
  }

  // Define the items for the tabs
  const items = [
    {
      key: "1",
      label: "Add Users",
      children: <AddUsers />,
    },
    {
      key: "2",
      label: "Add Departments",
      children: <AddDepartments />,
    },
    {
      key: "3",
      label: "Add Skills",
      children: <AddSkill />,
    },
  ];

  return (
    <>
      <Layout
        style={{
          background: "#fff",
          padding: "0.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={handleChange} />
      </Layout>
    </>
  );
};

export default Masters;
