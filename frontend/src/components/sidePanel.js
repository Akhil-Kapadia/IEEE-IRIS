import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

export default function Layout(props) {
  const [anchor, setAnchor] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAnchor(open); 
  };

  const TabPanel = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {props.routes.map((text, index) => (
          <ListItem
            button
            component={Link}
            to={`/${props.base}/${text}`}
            key={text}
          >
            {/* TODO: Add icons */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
        <Drawer
          anchor="left"
          open={anchor}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: "lightgray",
            },
          }}
        >
          <Paper>{TabPanel()}</Paper>
        </Drawer>
      </Box>
    </Box>
  );
}
