import { Routes, Route, useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

//config
import {api} from "./config";

//components
import Login from "./components/login";
import Bar from "./layouts/layout";

//layouts
import HomeLayout from "./layouts/homeLayout";

//routes
import Register from "./components/register";
import Profile from "./routes/profile";
import ProPoints from "./routes/propoint";
import Announcement from "./routes/annoucements";
import AboutUs from "./routes/aboutus";
import ManageProPoints from "./routes/manage-propoints";
import AddProPoints from "./routes/add-propoints";
import Events from "./routes/events";
import Users from "./routes/users";


export default function App() {
  const [navi, setNavi] = React.useState(false)
  const [tabs, setTabs] = React.useState({text: ["My Profile"], rout: ["profile"]})
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

  React.useEffect( () =>{
    try {
      if(JSON.parse(localStorage.getItem("user")).officer){
        setTabs({text: ["My Profile", "Admin Panel"], rout: ["profile", "admin"]})
        console.log(tabs)
      }
    } catch (error) {}
  },[localStorage.getItem("user")]);
  
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
              text={tabs.text}
              routes={tabs.rout}
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
                "Instructions",
                "User Management",
                "Manage ProPoints",
                "Add ProPoints",
                "IEEE Events",
                "Annoucement Posts",
              ]}
              routes={["/", "/users", "/manage-propoints", "/add-propoints", "/events", "/posts"]}
            />
          }
        >
          <Route path="" element={<>Instructions page to be added. For admin options, open the panel.</>} />
          <Route path="users" element={<Users />} />
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
