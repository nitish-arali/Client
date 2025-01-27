import { Divider, Button, Spin } from "antd";
import React, { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

function OverallSkillsGraphicalView({ skillData }) {
  const [loading, setLoading] = useState(false);

  const { segregatedSkills } = skillData;
  const chartRef = useRef(null); // Ref to capture the chart container

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const skillData = payload[0].payload; // Get the data for the hovered skill
      const total =
        skillData.beginner + skillData.intermediate + skillData.expert;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "0.5rem",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong> {label}</strong>
          </p>
          <Divider style={{ margin: 0 }} />
          <p>
            <span>Beginner :</span> {skillData.beginner}
          </p>
          <p>
            <span>Intermediate :</span> {skillData.intermediate}
          </p>
          <p>
            <span>Expert :</span> {skillData.expert}
          </p>
          <p>
            <span>Total :</span> <strong>{total}</strong>
          </p>
        </div>
      );
    }

    return null;
  };

  // Function to handle chart download
  const handleDownloadChart = () => {
    if (chartRef.current) {
      setLoading(true); // Start loading
      html2canvas(chartRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png"); // Convert canvas to image URL
        const link = document.createElement("a");
        link.href = image;
        link.download = "Skills_Data_Chart.png"; // Set the file name
        link.click(); // Trigger the download
        // Add a small delay to ensure the download is complete
        setTimeout(() => {
          setLoading(false); // Stop loading after the download is complete
        }, 500); // Adjust the delay as needed
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem 0.5rem 1.5rem 0",
        borderRadius: "1rem",
        width: "100%",
      }}
    >
      {/* Download Button */}
      <div
        style={{
          textAlign: "right",
          marginTop: "-3rem",
        }}
      >
        <Button
          icon={<DownloadOutlined style={{ fontSize: "1.2rem" }} />}
          type="primary"
          onClick={handleDownloadChart}
          style={{
            backgroundColor: "#22bb33",
            border: "none",
            fontWeight: "500",
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          Download Chart as PNG
        </Button>
      </div>

      {/* Chart Container */}
      <div ref={chartRef}>
        {/* Heading for the Chart */}
        <h2
          style={{
            textAlign: "center",
            marginTop: "-2rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#1414A0",
          }}
        >
          Overall Skills Distribution
        </h2>

        {/* Chart */}
        <Spin spinning={loading}>
          <ResponsiveContainer width="100%" height={480}>
            <BarChart data={segregatedSkills}>
              {/* XAxis with vertical labels */}
              <XAxis
                dataKey="skill"
                angle={-90} // Rotate labels by -90 degrees
                textAnchor="end" // Align text to the end
                interval={0} // Show all labels
                height={150} // Increase height to accommodate vertical labels
              />
              <YAxis
                domain={[1, "dataMax + 5"]}
                tickCount={20} // Show ticks at every integer
                interval={1}
                label={{
                  value: "Skill Level", // Y-axis label text
                  angle: -90, // Rotate the label vertically
                  position: "insideLeft", // Position the label inside the Y-axis
                  offset: 10, // Adjust the position of the label
                  style: { textAnchor: "middle", fontSize: "14px" }, // Style the label
                }}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {/* Bar for Level 1 */}
              <Bar
                dataKey="beginner"
                stackId="a"
                fill="#FF885B"
                name="Beginner"
              />
              {/* Bar for Level 2 */}
              <Bar
                dataKey="intermediate"
                stackId="a"
                fill="#8884d8"
                name="Intermediate"
              />
              {/* Bar for Level 3 */}
              <Bar dataKey="expert" stackId="a" fill="#82ca9d" name="Expert" />
            </BarChart>
          </ResponsiveContainer>
        </Spin>
      </div>
    </div>
  );
}

export default OverallSkillsGraphicalView;

const data = [
  {
    skill: "JavaScript",
    beginner: 5,
    intermediate: 10,
    expert: 3,
  },
  {
    skill: "React",
    beginner: 6, // level1 -> beginner
    intermediate: 8, // level2 -> intermediate
    expert: 2, // level3 -> expert
  },
  {
    skill: "Node.js",
    beginner: 4,
    intermediate: 9,
    expert: 6,
  },
  {
    skill: "CSS",
    beginner: 7,
    intermediate: 5,
    expert: 2,
  },
  {
    skill: "HTML",
    beginner: 8,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Python",
    beginner: 6,
    intermediate: 9,
    expert: 3,
  },
  {
    skill: "TypeScript",
    beginner: 5,
    intermediate: 8,
    expert: 4,
  },
  {
    skill: "Vue.js",
    beginner: 6,
    intermediate: 7,
    expert: 5,
  },
  {
    skill: "Angular",
    beginner: 7,
    intermediate: 6,
    expert: 3,
  },
  {
    skill: "GraphQL",
    beginner: 4,
    intermediate: 8,
    expert: 5,
  },
  {
    skill: "SQL",
    beginner: 6,
    intermediate: 9,
    expert: 4,
  },
  {
    skill: "MongoDB",
    beginner: 5,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "Docker",
    beginner: 4,
    intermediate: 6,
    expert: 5,
  },
  {
    skill: "Kubernetes",
    beginner: 3,
    intermediate: 5,
    expert: 7,
  },
  {
    skill: "Git",
    beginner: 9,
    intermediate: 8,
    expert: 2,
  },
  {
    skill: "jQuery",
    beginner: 6,
    intermediate: 5,
    expert: 3,
  },
  {
    skill: "Sass",
    beginner: 7,
    intermediate: 6,
    expert: 4,
  },
  {
    skill: "Laravel",
    beginner: 5,
    intermediate: 7,
    expert: 5,
  },
  {
    skill: "Ruby on Rails",
    beginner: 4,
    intermediate: 6,
    expert: 5,
  },
  {
    skill: "Express.js",
    beginner: 6,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Flask",
    beginner: 5,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "Swift",
    beginner: 7,
    intermediate: 8,
    expert: 3,
  },
  {
    skill: "Java",
    beginner: 8,
    intermediate: 9,
    expert: 4,
  },
  {
    skill: "C#",
    beginner: 6,
    intermediate: 7,
    expert: 5,
  },
  {
    skill: "C++",
    beginner: 5,
    intermediate: 8,
    expert: 3,
  },
  {
    skill: "PHP",
    beginner: 6,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Rust",
    beginner: 4,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "Android",
    beginner: 7,
    intermediate: 8,
    expert: 5,
  },
  {
    skill: "iOS",
    beginner: 8,
    intermediate: 6,
    expert: 4,
  },
  {
    skill: "Firebase",
    beginner: 5,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "AWS",
    beginner: 6,
    intermediate: 9,
    expert: 5,
  },
  {
    skill: "Azure",
    beginner: 5,
    intermediate: 8,
    expert: 6,
  },
  {
    skill: "Google Cloud",
    beginner: 5,
    intermediate: 6,
    expert: 8,
  },
  {
    skill: "Terraform",
    beginner: 4,
    intermediate: 6,
    expert: 5,
  },
  {
    skill: "Redis",
    beginner: 5,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Elasticsearch",
    beginner: 6,
    intermediate: 8,
    expert: 3,
  },
  {
    skill: "RabbitMQ",
    beginner: 4,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "Jenkins",
    beginner: 5,
    intermediate: 8,
    expert: 4,
  },
  {
    skill: "GitHub Actions",
    beginner: 4,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "Vim",
    beginner: 7,
    intermediate: 6,
    expert: 4,
  },
  {
    skill: "Nginx",
    beginner: 5,
    intermediate: 7,
    expert: 5,
  },
  {
    skill: "Apache",
    beginner: 6,
    intermediate: 6,
    expert: 4,
  },
  {
    skill: "Next.js",
    beginner: 6,
    intermediate: 7,
    expert: 3,
  },
  {
    skill: "Tailwind CSS",
    beginner: 7,
    intermediate: 5,
    expert: 4,
  },
  {
    skill: "Bootstrap",
    beginner: 8,
    intermediate: 6,
    expert: 3,
  },
  {
    skill: "Figma",
    beginner: 5,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "WebAssembly",
    beginner: 4,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "Electron",
    beginner: 5,
    intermediate: 8,
    expert: 4,
  },
  {
    skill: "Socket.io",
    beginner: 6,
    intermediate: 5,
    expert: 3,
  },
  {
    skill: "Apollo Client",
    beginner: 5,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Redux",
    beginner: 6,
    intermediate: 8,
    expert: 3,
  },
  {
    skill: "Django",
    beginner: 6,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "Spring Boot",
    beginner: 5,
    intermediate: 8,
    expert: 6,
  },
  {
    skill: "Cassandra",
    beginner: 4,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "MongoDB Atlas",
    beginner: 5,
    intermediate: 7,
    expert: 4,
  },
  {
    skill: "PostgreSQL",
    beginner: 6,
    intermediate: 8,
    expert: 4,
  },
  {
    skill: "Sequelize",
    beginner: 5,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "Jest",
    beginner: 6,
    intermediate: 7,
    expert: 5,
  },
  {
    skill: "Mocha",
    beginner: 4,
    intermediate: 6,
    expert: 7,
  },
  {
    skill: "Chai",
    beginner: 5,
    intermediate: 7,
    expert: 6,
  },
  {
    skill: "Postman",
    beginner: 7,
    intermediate: 6,
    expert: 3,
  },
  {
    skill: "Swagger",
    beginner: 5,
    intermediate: 7,
    expert: 4,
  },
];
