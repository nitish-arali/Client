import React, { useState } from "react";
import logo from "../assets/NEC-logo.png";
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Modal, Popover, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
const { Header, Sider, Content } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { updateUserContext } from "../store/features/UserContext";
import { persistor } from "../store/store";
import Cookies from "js-cookie";
import { update } from "../store/features/LeftMenuItemSlice";
import ChangePasswordModal from "./ChangePasswordModal";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.LeftMenuItems?.value);
  const userContext = useSelector((state) => state.UserContext.value);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  function logout() {
    Cookies.remove("NEC_AccessToken");
    dispatch(updateUserContext({}));
    dispatch(update({}));
    persistor.purge();
    navigate("/login");
  }

  const headerItems = [
    {
      key: 1,
      label: (
        <Popover
          content={
            <>
              <Space.Compact direction="vertical">
                <Button
                  type="text"
                  onClick={() => setChangePasswordModalOpen(true)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <LockOutlined />
                  Change Password
                </Button>
                <Button
                  type="text"
                  onClick={logout}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <LogoutOutlined />
                  Logout
                </Button>
              </Space.Compact>
            </>
          }
          trigger={"click"}
          style={{ inset: "64px auto auto 1110px" }}
        >
          <Space style={{ fontWeight: "500" }}>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <span
              style={{
                fontSize: "1rem",
                textTransform: "capitalize",
                color: "#fff",
              }}
            >
              Hi, {userContext?.UserName}
            </span>
            <DownOutlined style={{ color: "#fff", fontWeight: "900" }} />
          </Space>
        </Popover>
      ),
    },
  ];

  const handleMenuClick = (route) => {
    navigate(route); // Navigate to the selected route
  };

  function handleChangePasswordSubmit(values) {
    console.log("Change Password Modal Submit Values ", values);
  }

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider
        theme="light"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* NEC Logo Section */}
        <div
          style={{
            height: "64px", // Matches the height of the Header (default in Ant Design)
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            borderBottom: "1px solid #ddd", // Optional: Adds a divider below the logo
          }}
        >
          <img
            src={logo}
            alt="NEC Logo"
            style={{
              height: "80%", // Adjust as needed to fit within the navbar height
              width: "auto",
            }}
          />
        </div>

        {/* Menu Section */}
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          style={{
            flex: 1, // Ensures the menu fills the remaining space
            textAlign: "left", // Aligns menu items to the left
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={() => handleMenuClick(item.route)} // Handle click and navigate
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "darkblue",
          }}
        >
          <h1 style={{ color: "white", padding: "0 1rem" }}>
            Skillset Tracker
          </h1>
          <Menu
            theme="light"
            mode="horizontal"
            items={headerItems}
            style={{
              backgroundColor: "inherit",
              minWidth: 0,
              justifyContent: "end",
              padding: "0 1rem",
              fontSize: "1rem",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "0rem",
            padding: "1rem",
            width: "100%",
            minHeight: "280px",
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            overflowY: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <ChangePasswordModal
        open={changePasswordModalOpen}
        close={() => setChangePasswordModalOpen(false)}
        onSubmit={handleChangePasswordSubmit}
      />
    </Layout>
  );
};

export default MainLayout;
