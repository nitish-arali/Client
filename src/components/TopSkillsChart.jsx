import { Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { urlGetTopTenSkills } from "../endpoints";

function TopSkillsChart() {
  const data = [
    { skill: "JavaScript", level1: 5, level2: 10, level3: 3 },
    { skill: "React", level1: 6, level2: 8, level3: 2 },
    { skill: "Node.js", level1: 4, level2: 9, level3: 6 },
    { skill: "CSS", level1: 7, level2: 5, level3: 2 },
    { skill: "HTML", level1: 8, level2: 7, level3: 4 },
    { skill: "Python", level1: 6, level2: 9, level3: 3 },
    { skill: "TypeScript", level1: 5, level2: 8, level3: 4 },
    { skill: "Vue.js", level1: 6, level2: 7, level3: 5 },
    { skill: "Angular", level1: 7, level2: 6, level3: 3 },
    { skill: "GraphQL", level1: 4, level2: 8, level3: 5 },
    { skill: "SQL", level1: 6, level2: 9, level3: 4 },
    { skill: "MongoDB", level1: 5, level2: 7, level3: 6 },
    { skill: "Docker", level1: 4, level2: 6, level3: 5 },
    { skill: "Kubernetes", level1: 3, level2: 5, level3: 7 },
    { skill: "Git", level1: 9, level2: 8, level3: 2 },
    { skill: "jQuery", level1: 6, level2: 5, level3: 3 },
    { skill: "Sass", level1: 7, level2: 6, level3: 4 },
    { skill: "Laravel", level1: 5, level2: 7, level3: 5 },
    { skill: "Ruby on Rails", level1: 4, level2: 6, level3: 5 },
    { skill: "Express.js", level1: 6, level2: 7, level3: 4 },
    { skill: "Flask", level1: 5, level2: 7, level3: 6 },
    { skill: "Swift", level1: 7, level2: 8, level3: 3 },
    { skill: "Java", level1: 8, level2: 9, level3: 4 },
    { skill: "C#", level1: 6, level2: 7, level3: 5 },
    { skill: "C++", level1: 5, level2: 8, level3: 3 },
    { skill: "PHP", level1: 6, level2: 7, level3: 4 },
    { skill: "Rust", level1: 4, level2: 6, level3: 7 },
    { skill: "Android", level1: 7, level2: 8, level3: 5 },
    { skill: "iOS", level1: 8, level2: 6, level3: 4 },
    { skill: "Firebase", level1: 5, level2: 7, level3: 6 },
    { skill: "AWS", level1: 6, level2: 9, level3: 5 },
    { skill: "Azure", level1: 5, level2: 8, level3: 6 },
    { skill: "Google Cloud", level1: 5, level2: 6, level3: 8 },
    { skill: "Terraform", level1: 4, level2: 6, level3: 5 },
    { skill: "Redis", level1: 5, level2: 7, level3: 4 },
    { skill: "Elasticsearch", level1: 6, level2: 8, level3: 3 },
    { skill: "RabbitMQ", level1: 4, level2: 6, level3: 7 },
    { skill: "Jenkins", level1: 5, level2: 8, level3: 4 },
    { skill: "GitHub Actions", level1: 4, level2: 7, level3: 6 },
    { skill: "Vim", level1: 7, level2: 6, level3: 4 },
    { skill: "Nginx", level1: 5, level2: 7, level3: 5 },
    { skill: "Apache", level1: 6, level2: 6, level3: 4 },
    { skill: "Next.js", level1: 6, level2: 7, level3: 3 },
    { skill: "Tailwind CSS", level1: 7, level2: 5, level3: 4 },
    { skill: "Bootstrap", level1: 8, level2: 6, level3: 3 },
    { skill: "Figma", level1: 5, level2: 7, level3: 6 },
    { skill: "WebAssembly", level1: 4, level2: 6, level3: 7 },
    { skill: "Electron", level1: 5, level2: 8, level3: 4 },
    { skill: "Socket.io", level1: 6, level2: 5, level3: 3 },
    { skill: "Apollo Client", level1: 5, level2: 7, level3: 4 },
    { skill: "Redux", level1: 6, level2: 8, level3: 3 },
    { skill: "Django", level1: 6, level2: 7, level3: 4 },
    { skill: "Spring Boot", level1: 5, level2: 8, level3: 6 },
    { skill: "Cassandra", level1: 4, level2: 6, level3: 7 },
    { skill: "MongoDB Atlas", level1: 5, level2: 7, level3: 4 },
    { skill: "PostgreSQL", level1: 6, level2: 8, level3: 4 },
    { skill: "Sequelize", level1: 5, level2: 6, level3: 7 },
    { skill: "Jest", level1: 6, level2: 7, level3: 5 },
    { skill: "Mocha", level1: 4, level2: 6, level3: 7 },
    { skill: "Chai", level1: 5, level2: 7, level3: 6 },
    { skill: "Postman", level1: 7, level2: 6, level3: 3 },
    { skill: "Swagger", level1: 5, level2: 7, level3: 4 },
  ];

  const [skillData, setSkilldata] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(urlGetTopTenSkills);
        setSkilldata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, []);

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
            // textAlign: "center",
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
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem 0.5rem 1.5rem 0",
        borderRadius: "1rem",
        width: "100%",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={skillData}>
          <XAxis dataKey="skill" />
          <YAxis domain={[0, "dataMax + 1"]} tickCount={1} ticks={[3, 6, 9]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Bar for Level 1 */}
          <Bar dataKey="beginner" stackId="a" fill="#FF885B" name="Beginner" />

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
    </div>
  );
}

export default TopSkillsChart;
