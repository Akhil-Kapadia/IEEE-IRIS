import * as React from "react";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  Outlet,
} from "react-router-dom";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

export default function PanelLayout(props) {
  const [anchor, setAnchor] = React.useState(false);

  const toggleDrawer = (open) =>  (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open)
  }

  const TabPanel = () => (
    <Box
      sx={{width:250}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {props.routes.map( (text, index)=> (
          <ListItem button component={Link} to={`/${props.base}/${text}`} key={text}>
            {/* TODO: Add icons */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width:{sm:240}, flexShrink: {sm:0}}}>
      <Button onClick={toggleDrawer(true)} >Open</Button>
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
        <Paper>
          {TabPanel()}


          {/* <Tabs
            value={currentTab}
            textColor="primary"
            indicatorColor="secondary"
            orientation="vertical"
          >
            <Button 
              fullWidth 
              onClick={toggleDrawer(anchor, false)}
            >
              <KeyboardArrowRightIcon />
            </Button>
            <Tab 
              label="Users" 
              value="/admin/users" 
              to="/admin/users" 
              component={Link} />
            <Tab 
              label="Events" 
              value="/admin" 
              to="/admim" 
              component={Link} />
            <Tab
              label="Pro Points"
              value="/admin/propoints"
              to="/admin/users"
              component={Link}
            />
            <Tab 
              label="Posts" 
              value="/admin/posts" 
              to="/admin/posts" 
              component={Link} 
            />
          </Tabs> */}
        </Paper>
      </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
