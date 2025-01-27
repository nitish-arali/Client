import { Card } from "antd";
import React from "react";
import SkillsOverview from "./SkillsOverview";

function index() {
  return (
    <div>
      <Card
        style={{
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <SkillsOverview />
      </Card>
    </div>
  );
}

export default index;
