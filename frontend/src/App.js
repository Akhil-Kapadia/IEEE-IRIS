import { Routes, Route, useNavigate } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

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

  api.interceptors.response.use(function (res) {
    return res;
  }, async function (err) {
    if (err.response.status === 401){
      setNavi(true);
    }
    return  Promise.reject(err);
  });

  const handleClick = () => {
    setNavi(false);
    navigate("/login");
  }

  
  return (
    <main>
      <Dialog open={navi} onClose={() => setNavi(false)} >
        <DialogTitle>Unauthorized!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Have you logged in? If you have and still cannot access this resource you may not have the proper authentification level. Please see an IEEE officer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} >Goto login</Button>
        </DialogActions>
      </Dialog>
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
            <Route path="propoints/*" element={<ProPoints />} />
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
