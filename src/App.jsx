import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AddSkill from "./pages/AddUserSkills/AddUserSkills";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import SkillsOverview from "./pages/SkillsOverviewUser/index";
import Masters from "./pages/Masters/Masters";
import Login from "./pages/Login/login";
import "./App.css";
import SkillsOverviewAdmin from "./pages/SkillsOverViewAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="addNewSkills" element={<AddSkill />} />

            <Route path="skillsOverview" element={<SkillsOverview />} />
            <Route
              path="skillsOverviewAdmin"
              element={<SkillsOverviewAdmin />}
            />
            <Route path="masters" element={<Masters />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <AddSkill /> */}
    </>
  );
}

export default App;
