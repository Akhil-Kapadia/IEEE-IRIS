import { Routes, Route } from "react-router-dom";
import * as React from "react";
//components
import Login from "./components/login";
import Bar from "./layouts/layout";
import EventForm from "./components/events";

//routes
import Register from "./components/register";
import Profile from "./routes/profile"
import ProPoints from "./routes/propoint";
import ProPointsAdmin from "./routes/admin/propoints";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";

//layouts
import HomeLayout from "./layouts/homeLayout";

/**
 * Returns user info to be used for auth and restricting route access
 * @returns Object of user stored in session
 */
const authorized = () => {
  let data = sessionStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return { id: "", officer: "" };
  }
};

function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Bar
              base=""
              text={["My Profile", Boolean(authorized().officer) ? "Admin Panel" : ""]}
              routes={["profile", Boolean(authorized().officer)  ? "admin" : ""]}
            />
          }
        >
          <Route element={<HomeLayout />}>
            <Route path="propoints" element={<ProPoints />} />
            <Route path="student-resources" element={"TBI"} />
            <Route path="minecraft" element={"TBI"} />
            <Route path="about-us" element={<AboutUs />} />
            <Route index element={<Announcement />} />
          </Route>
        </Route>
        <Route
          path="/admin"
          element={
            <Bar
              base={"admin"}
              text={[
                "User Management",
                "Manage ProPoints",
                "IEEE Events",
                "Annoucement Posts",
              ]}
              routes={["/users", "/propoints", "/events", "/posts"]}
            />
          }
        >
          <Route path="users" element={<>TBI</>} />
          <Route path="events" element={<EventForm />} />
          <Route path="propoints" element={<ProPointsAdmin /> } />
          <Route path="posts" element={<>TBI</>} />
        </Route>
        <Route
          path="/profile"
          element={
            <Bar
              base={"profile"}
              text={["Account Information", "My Socials", "My Portfolio"]}
              routes={["/user", "/socials", "/portfolio"]}
            />
          }
        >
          <Route path="socials" element={<>TBI</>} />
          <Route path="portfolio" element={<>TBI</>} />
          <Route path="user" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
