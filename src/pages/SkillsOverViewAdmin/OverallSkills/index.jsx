import { Flex, Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import OverallSkillsGraphicalView from "./OverallSkillsGraphicalView";
import OverallSkillsTabularView from "./OverallSkillsTabularView";
import { urlGetOverallUserSkills } from "../../../endpoints";
import axios from "axios";

function OverallSkills() {
  const [view, setView] = useState("Graphical");
  const [skillData, setSkilldata] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleViewChange(e) {
    setView(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    const fetchSkills = async () => {
      try {
        const response = await axios.get(urlGetOverallUserSkills);
        setSkilldata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
    setLoading(false);
  }, []);

  return (
    <div>
      <Spin spinning={loading}>
        <Flex style={{ margin: "0rem 0rem" }}>
          <Radio.Group
            defaultValue={view}
            buttonStyle="solid"
            onChange={handleViewChange}
          >
            <Radio.Button value="Graphical">Graphical</Radio.Button>
            <Radio.Button value="Tabular">Tabular</Radio.Button>
          </Radio.Group>
        </Flex>
        {view === "Graphical" ? (
          <OverallSkillsGraphicalView skillData={skillData} />
        ) : (
          <OverallSkillsTabularView skillData={skillData} />
        )}
      </Spin>
    </div>
  );
}

export default OverallSkills;
