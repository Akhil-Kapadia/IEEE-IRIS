import { Routes, Route } from "react-router-dom";
import * as React from "react";

import Register from "./components/register";
import SignIn from "./components/SignIn";
import HomeLayout from "./routes/home";
import AdminLayout from "./pages/admin";
import Bar from "./components/bar";
import ProPoints from "./routes/propoint";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";
import PanelLayout from "./components/panelLayout"

function App() {

  return (
  <main>
    <Routes>
      <Route path="/" element={<Bar />} >
        <Route element={<HomeLayout />} >
          <Route path="propoints" element={<ProPoints />} />
          <Route path="announcements" element={<Announcement />} />
          <Route path="student-resources" element={"TBI"} />
          <Route path="minecraft" element={"TBI"}/>
          <Route index element={<AboutUs />} />
        </Route>
        <Route element={<PanelLayout />} >
          <Route path="admin" element={<AdminLayout/>}/>
        </Route>
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  </main>
  );
}

export default App;
