import { Flex, Radio } from "antd";
import React, { useEffect, useState } from "react";
import OverallSkillsGraphicalView from "./OverallSkillsGraphicalView";
import OverallSkillsTabularView from "./OverallSkillsTabularView";
import { urlGetOverallUserSkills } from "../../../endpoints";
import axios from "axios";

function OverallSkills() {
  const [view, setView] = useState("Graphical");
  const [skillData, setSkilldata] = useState([]);

  function handleViewChange(e) {
    setView(e.target.value);
  }

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(urlGetOverallUserSkills);
        setSkilldata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default OverallSkills;
