/* import React from "react";

function Home() {
  return <div>HomePage</div>;
}

export default Home; */

import React from "react";
import { Card, Row, Col, Button } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import TopSkillsChart from "../../components/TopSkillsChart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userContext = useSelector((state) => state.UserContext.value);
  const navigate = useNavigate();
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/* Welcome Banner */}

      {/* Quick Navigation */}
      <Row
        gutter={[16, 16]}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Add New Skills"
            bordered={false}
            actions={[
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/addNewSkills")}
              />,
            ]}
          >
            <p style={{ height: "2.5rem" }}>
              Add new skills to the system effortlessly.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Skill Overview"
            bordered={false}
            actions={[
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => navigate("/skillsOverview")}
              />,
            ]}
          >
            <p style={{ height: "2.5rem" }}>
              View detailed statistics and insights about skills.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            title="Modify Skills"
            bordered={false}
            actions={[
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate("/addNewSkills")}
              />,
            ]}
          >
            <p style={{ height: "2.5rem" }}>
              Update or edit existing skills in your database.
            </p>
          </Card>
        </Col>
        {userContext.isAdmin && (
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              title="Masters"
              bordered={false}
              actions={[
                <Button
                  type="primary"
                  icon={<SettingOutlined />}
                  onClick={() => navigate("/masters")}
                />,
              ]}
            >
              <p style={{ height: "2.5rem" }}>
                Manage master data for consistent tracking.
              </p>
            </Card>
          </Col>
        )}
      </Row>

      <Row gutter={16} style={{ margin: "1rem 0" }}>
        <Col span={24}>
          <Card hoverable title="Top Ten Skills" bordered={false}>
            <TopSkillsChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
