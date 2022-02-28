import { Routes, Route, useNavigate } from "react-router-dom";
import * as React from "react";
import axios from "axios";

//components
import Login from "./components/login";
import Bar from "./layouts/layout";

//layouts
import HomeLayout from "./layouts/homeLayout";

//routes
import Register from "./components/register";
import Profile from "./routes/profile"
import ProPoints from "./routes/propoint";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";
import ManageProPoints from "./routes/manage-propoints";
import AddProPoints from "./routes/add-propoints";
import Events from "./routes/events";


const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

export default function App() {
  const [navi, setNavi] = React.useState(false)
  const navigate = useNavigate();

  // TODO: Implement a better way routing 401 status that doesn't leak mem.
  api.interceptors.response.use(function (res) {
    return res;
  }, async function (err) {
    if (err.response.status === 401){
      setNavi(true);
    }
    return  Promise.reject(err);
  });

  React.useEffect( () => {
    if(navi === true){
      setNavi(false);
      navigate("/login");
    }
  }, [navi])

  
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Bar
              base=""
              text={["My Profile", "Admin Panel"]}
              routes={["profile", "admin"]}
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
                "Add ProPoints",
                "IEEE Events",
                "Annoucement Posts",
              ]}
              routes={["/users", "/manage-propoints", "/add-propoints", "/events", "/posts"]}
            />
          }
        >
          <Route path="users" element={<>TBI</>} />
          <Route path="events" element={<Events />} />
          <Route path="manage-propoints" element={<ManageProPoints /> } />
          <Route path="add-propoints" element={<AddProPoints />} />
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

export {api};
