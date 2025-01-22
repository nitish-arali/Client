import { Card } from "antd";
import React from "react";
import SkillsOverviewByUser from "./SkillsOverviewByUser";

function index() {
  return (
    <div>
      <Card
        style={{
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <SkillsOverviewByUser />
      </Card>
    </div>
  );
}

export default index;
