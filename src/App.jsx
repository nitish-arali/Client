import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AddSkill from "./pages/AddUserSkills/AddUserSkills";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import SkillsOverview from "./pages/SkillsOverviewUser/index";
import Masters from "./pages/Masters/Masters";
import Login from "./pages/Login/login";
import "./App.css";
import SkillsOverviewAdmin from "./pages/SkillsOverViewAdmin";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = Cookies.get("NEC_AccessToken");

  if (!token) {
    // If the JWT token is not there, redirect to the login page
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token and check its expiration time
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // If the token has expired, redirect to the login page
      return <Navigate to="/login" />;
    }
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return <Navigate to="/login" />;
  }

  // If the token is valid, render the requested component
  return children;
}
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
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="addNewSkills"
              element={
                <ProtectedRoute>
                  <AddSkill />
                </ProtectedRoute>
              }
            />

            <Route
              path="skillsOverview"
              element={
                <ProtectedRoute>
                  <SkillsOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="skillsOverviewAdmin"
              element={
                <ProtectedRoute>
                  <SkillsOverviewAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="masters"
              element={
                <ProtectedRoute>
                  <Masters />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <AddSkill /> */}
    </>
  );
}

export default App;
