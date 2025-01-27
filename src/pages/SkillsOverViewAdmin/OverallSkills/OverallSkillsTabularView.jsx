import React, { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";
import {
  ArrowUpOutlined,
  SwapOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx"; // Import the xlsx library

function OverallSkillsTabularView({ skillData }) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for Excel export

  // Function to render progress with icons
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

  // Function to export data to Excel
  const exportToExcel = () => {
    setLoading(true); // Start loading

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert dataSource to a worksheet
    const worksheetData = dataSource.map((item) => ({
      "Sl. No.": item.slno,
      Skills: item.skillName,
      "Members With Skills (Total Progress)": `${item.memberCount.value} (${item.memberCount.progress})`,
      "Beginner (New Learners)": `${item.beginner.value} (${item.beginner.progress})`,
      "Intermediate (Beginner → Intermediate)": `${item.intermediate.value} (${item.intermediate.progress})`,
      "Expert (Intermediate → Expert)": `${item.expert.value} (${item.expert.progress})`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Skills Data");

    // Write the workbook to a file and trigger download
    XLSX.writeFile(workbook, "Skills_Data_Table.xlsx");

    // Simulate a delay to ensure the loading spinner is visible
    setTimeout(() => {
      setLoading(false); // Stop loading after the file is downloaded
    }, 500); // Adjust the delay as needed
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
  }, [skillData]);

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
      {/* Download Button */}
      <Button
        icon={<DownloadOutlined style={{ fontSize: "1.2rem" }} />}
        onClick={exportToExcel}
        style={{
          float: "right",
          marginTop: "-3rem",
          backgroundColor: "#22bb33",
          border: "none",
          fontWeight: "500",
          color: "#fff",
          letterSpacing: "0.5px",
        }}
      >
        Download as Excel
      </Button>

      {/* Table with Loading Spinner */}
      <Spin spinning={loading}>
        <Table
          bordered
          size="small"
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
}

export default OverallSkillsTabularView;
