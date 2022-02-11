import { Routes, Route } from "react-router-dom";
import * as React from "react";
//components
import SignIn from "./components/SignIn";
import Bar from "./components/bar";
import EventForm from "./components/events";

//routes
import Register from "./components/register";

import ProPoints from "./routes/propoint";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";

//layouts
import PanelLayout from "./layouts/panelLayout";
import HomeLayout from "./layouts/homeLayout";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Bar />}>
          <Route element={<HomeLayout />}>
            <Route path="propoints" element={<ProPoints />} />
            <Route path="announcements" element={<Announcement />} />
            <Route path="student-resources" element={"TBI"} />
            <Route path="minecraft" element={"TBI"} />
            <Route index element={<AboutUs />} />
          </Route>
          <Route path="admin" element={<PanelLayout base={"admin"} routes={[
            "users", "propoints", "events", "posts"
          ]} />} >
            <Route path="users" element={<>TBI</>} />
            <Route path="events" element={<EventForm />} />
            <Route path="propoints" element={<>TBI</>} />
            <Route path="posts" element={<>TBI</>} />
          </Route>
          <Route path="profile" element={<PanelLayout base={"profile"} routes={[
            "user", "socials", "portfolio"
          ]} />} >
            <Route path="socials" element={<>TBI</>} />
            <Route path="portfolio" element={<>TBI</>} />
            <Route path="user" element={<>TBI</>} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </main>
  );
}

export default App;
