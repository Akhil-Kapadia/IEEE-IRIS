import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router";
import Slide from "@mui/material/Slide";
import SwipableViews from "react-swipeable-views";

import ProPoints from "./propoint";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function MenuTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (event, index) => {
    setValue(index);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "grey.500", flexGrow: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="secondary"
        >
          <Tab label="About Us" {...allyProps(0)} />
          <Tab label="Announcements" {...allyProps(1)} />
          <Tab label="Pro Points" {...allyProps(2)} />
        </Tabs>
      </Box>
      <SwipableViews axis='x' index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <Typography>Testing</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Hello</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProPoints />
        </TabPanel>
      </SwipableViews>
      <Outlet />
    </Box>
  );
}
