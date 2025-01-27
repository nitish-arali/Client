import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GraphicalChart({ Skills }) {
  const data = Skills?.userSkills?.currentMonth?.map((skill) => {
    return {
      SkillName: skill.skill,
      SkillLevel: skill.skillLevel,
    };
  });

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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="SkillName" />
            <YAxis domain={[0, "dataMax + 1"]} ticks={[1, 2, 3]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="SkillLevel" fill="#0096FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default GraphicalChart;
