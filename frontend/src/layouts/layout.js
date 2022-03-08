import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import {api} from "../config";



export default function Bar(props) {
  const [anchor, setAnchor] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = async() => {
    if(localStorage.getItem("user")){
      localStorage.clear();
      await api.get("/logout");
      navigate("/")
    } else {
      navigate('/login');
    }
  };
  
  const setIcon = () => {
    if(localStorage.getItem("user")){
      return (<LogoutIcon />);
    } else {
      return (<LoginIcon />);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setAnchor(open);
  };

  const TabPanel = () => (
    <Box
      sx={{ width: 240 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {props.routes.map((route, index) => (
          <ListItem
            button
            component={Link}
            to={`/${props.base}${route}`}
            key={props.text[index]}
          >
            {/* TODO: Add icons */}
            <ListItemText primary={props.text[index]} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Stack sx={{ flexGrow: 1, display: "flex" }}>
      <Box>
        <AppBar position="static" sx={{}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              TTU ECE IEEE Student Branch
            </Typography>
            <IconButton
              component={Link}
              size="large"
              color="inherit"
              aria-label="home"
              to="/"
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="Log out"
              sx={{ ml: 2 }}
              onClick={handleClick}
            >
              {Boolean(localStorage.getItem("user")) && <LogoutIcon />}
              {!Boolean(localStorage.getItem("user")) && <LoginIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
          <Drawer
            anchor="left"
            open={anchor}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                backgroundColor: "lightgray",
              }
            }}
          >
            <Paper>{TabPanel()}</Paper>
          </Drawer>
        </Box>
      </Box>
    <Outlet />
    </Stack>
  );
}