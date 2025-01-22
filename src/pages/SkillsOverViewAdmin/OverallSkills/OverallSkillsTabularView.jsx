import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ArrowUpOutlined, SwapOutlined } from "@ant-design/icons";

function OverallSkillsTabularView({ skillData }) {
  const [dataSource, setDataSource] = useState([]);

  const renderProgressWithIcon = (value, progress) => {
    const icon =
      progress > 0 ? (
        <ArrowUpOutlined
          style={{ color: "green", fontSize: "1rem", marginLeft: "0px" }}
        />
      ) : (
        <SwapOutlined
          style={{ color: "#0096FF", fontSize: "1rem", marginLeft: "0px" }}
        />
      );
    return (
      <span>
        <b style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>{value}</b> (
        {icon}
        <span style={{ fontSize: "0.8rem" }}>
          {progress > 0 ? progress : ""}
        </span>
        )
      </span>
    );
  };

  useEffect(() => {
    const { memberCount, segregatedSkills, progressTrack } = skillData;

    const combinedData = memberCount?.map((item, index) => {
      const skillDetails = segregatedSkills?.find(
        (segSkill) => segSkill.skill === item.skillName
      );
      const progressDetails = progressTrack?.find(
        (progress) => progress.skill === item.skillName
      );

      const totalProgress = progressDetails
        ? progressDetails.newLearners +
          progressDetails.beginnerToIntermediate +
          progressDetails.intermediateToExpert
        : 0;

      return {
        key: index + 1,
        slno: index + 1,
        skillName: item.skillName,
        memberCount: {
          value: item.count,
          progress: totalProgress,
        },
        beginner: {
          value: skillDetails?.beginner || 0,
          progress: skillDetails?.beginner
            ? progressDetails?.newLearners
            : "" || 0,
        },
        intermediate: {
          value: skillDetails?.intermediate || 0,
          progress: progressDetails?.beginnerToIntermediate || 0,
        },
        expert: {
          value: skillDetails?.expert || 0,
          progress: progressDetails?.intermediateToExpert || 0,
        },
      };
    });

    setDataSource(combinedData);
  }, []);

  console.log("DataSource ", dataSource);

  const columns = [
    { title: "Sl. No.", dataIndex: "slno", align: "center" },
    { title: "Skills", dataIndex: "skillName", align: "center" },
    {
      title: "Members With Skills (Total Progress)",
      dataIndex: "memberCount",
      align: "center",
      render: (record) => renderProgressWithIcon(record.value, record.progress),
    },
    {
      title: "Beginner (New Learners)",
      dataIndex: "beginner",
      align: "center",
      render: (record) => renderProgressWithIcon(record.value, record.progress),
    },
    {
      title: "Intermediate (Beginner → Intermediate)",
      dataIndex: "intermediate",
      align: "center",
      render: (record) => renderProgressWithIcon(record.value, record.progress),
    },
    {
      title: "Expert (Intermediate → Expert)",
      dataIndex: "expert",
      align: "center",
      render: (record) => renderProgressWithIcon(record.value, record.progress),
    },
  ];

  return (
    <div style={{ padding: "1rem 0" }}>
      <Table
        bordered
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default OverallSkillsTabularView;

//   const dataSource = [
//     {
//       key: "1",
//       slno: "1",
//       skillName: "React Js",
//       memberCount: 32,
//       beginner: "10",
//       intermediate: "11",
//       expert: "11",
//     },
//     {
//       key: "2",
//       slno: "2",
//       skillName: "Node Js",
//       memberCount: 25,
//       beginner: "8",
//       intermediate: "12",
//       expert: "5",
//     },
//     {
//       key: "3",
//       slno: "3",
//       skillName: "JavaScript",
//       memberCount: 40,
//       beginner: "12",
//       intermediate: "18",
//       expert: "10",
//     },
//     {
//       key: "4",
//       slno: "4",
//       skillName: "Python",
//       memberCount: 35,
//       beginner: "9",
//       intermediate: "15",
//       expert: "11",
//     },
//     {
//       key: "5",
//       slno: "5",
//       skillName: "Java",
//       memberCount: 30,
//       beginner: "7",
//       intermediate: "18",
//       expert: "5",
//     },
//     {
//       key: "6",
//       slno: "6",
//       skillName: "Ruby",
//       memberCount: 22,
//       beginner: "6",
//       intermediate: "10",
//       expert: "6",
//     },
//     {
//       key: "7",
//       slno: "7",
//       skillName: "PHP",
//       memberCount: 28,
//       beginner: "5",
//       intermediate: "15",
//       expert: "8",
//     },
//     {
//       key: "8",
//       slno: "8",
//       skillName: "C++",
//       memberCount: 18,
//       beginner: "4",
//       intermediate: "10",
//       expert: "4",
//     },
//     {
//       key: "9",
//       slno: "9",
//       skillName: "Swift",
//       memberCount: 20,
//       beginner: "6",
//       intermediate: "10",
//       expert: "4",
//     },
//     {
//       key: "10",
//       slno: "10",
//       skillName: "Go",
//       memberCount: 15,
//       beginner: "4",
//       intermediate: "7",
//       expert: "4",
//     },
//     {
//       key: "11",
//       slno: "11",
//       skillName: "Django",
//       memberCount: 27,
//       beginner: "8",
//       intermediate: "12",
//       expert: "7",
//     },
//     {
//       key: "12",
//       slno: "12",
//       skillName: "Kotlin",
//       memberCount: 24,
//       beginner: "6",
//       intermediate: "12",
//       expert: "6",
//     },
//     {
//       key: "13",
//       slno: "13",
//       skillName: "Angular",
//       memberCount: 22,
//       beginner: "7",
//       intermediate: "9",
//       expert: "6",
//     },
//     {
//       key: "14",
//       slno: "14",
//       skillName: "Vue.js",
//       memberCount: 19,
//       beginner: "5",
//       intermediate: "9",
//       expert: "5",
//     },
//     {
//       key: "15",
//       slno: "15",
//       skillName: "C#",
//       memberCount: 31,
//       beginner: "10",
//       intermediate: "15",
//       expert: "6",
//     },
//   ];
