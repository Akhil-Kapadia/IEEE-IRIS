import { Routes, Route } from "react-router-dom";
import * as React from "react";
//components
import SignIn from "./components/SignIn";
import Bar from "./layouts/layout";
import EventForm from "./components/events";

//routes
import Register from "./components/register";

import ProPoints from "./routes/propoint";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";

//layouts
import HomeLayout from "./layouts/homeLayout";

/**
 * Returns user info to be used for auth and restricting route access
 * @returns Object of user itme
 */
const authorized = () => {
  let data = localStorage.getItem("user");
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
            <Route path="announcements" element={<Announcement />} />
            <Route path="student-resources" element={"TBI"} />
            <Route path="minecraft" element={"TBI"} />
            <Route index element={<AboutUs />} />
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
          <Route path="propoints" element={<>TBI</>} />
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
          <Route path="user" element={<>TBI</>} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </main>
  );
}

export default App;
