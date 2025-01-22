import { Table } from "antd";
import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";

function SkillsTabularView({ Skills }) {
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slno",
    },
    {
      title: "Skills",
      dataIndex: "skillName",
      sorter: (a, b) => a.skillName.localeCompare(b.skillName),
    },
    {
      title: "Learning Source",
      dataIndex: "learningSource",
    },
    {
      title: "Skill Level",
      dataIndex: "currentLevel",
      sorter: (a, b) => a.currentLevel - b.currentLevel,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      align: "center",
      render: (progress) => {
        switch (progress) {
          case "increase":
            return (
              <ArrowUpOutlined style={{ color: "green", fontSize: "1.2rem" }} />
            );
          case "decrease":
            return (
              <ArrowDownOutlined style={{ color: "red", fontSize: "1.2rem" }} />
            );
          default:
            return (
              <SwapOutlined style={{ color: "#0096FF", fontSize: "1.2rem" }} />
            );
        }
      },
    },
  ];

  const dataSource = Skills?.userSkills?.currentMonth?.map((skill, index) => {
    // Find matching skill in previous month
    const previousSkill = Skills?.userSkills?.previousMonth?.find(
      (prevSkill) => prevSkill.skillId === skill.skillId
    );

    return {
      key: skill.skillId,
      slno: index + 1,
      skillName: skill.skill,
      currentLevel: skill.skillLevel,
      previousLevel: previousSkill
        ? previousSkill.skillLevel
        : skill.skillLevel, // If no previous data, use current level
      progress: previousSkill
        ? skill.skillLevel > previousSkill.skillLevel
          ? "increase"
          : skill.skillLevel < previousSkill.skillLevel
          ? "decrease"
          : "same"
        : "same",
    };
  });
  console.log("N ", Skills?.userSkills?.currentMonth[0]?.month);

  return (
    <>
      {Skills?.updatedAt && (
        <p>
          Last Updated at:{" "}
          {new Date(Skills?.updatedAt).toLocaleString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      )}

      <div>
        <Table
          bordered
          size="small"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </>
  );
}

export default SkillsTabularView;
