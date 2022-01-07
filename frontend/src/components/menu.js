import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router";
import SwipeableViews from "react-swipeable-views";
import { ThemeContext } from "@emotion/react";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="About Us" {...allyProps(0)} />
          <Tab label="Announcements" {...allyProps(1)} />
          <Tab label="Pro Points" {...allyProps(2)} />
        </Tabs>
        <SwipeableViews
          axis={ThemeContext.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {"Stuffs about me" /* Insert a route to a component */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {"Events and stuff" /* Insert a route to a component */}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {"Pro points stuff" /* Insert a route to a component */}
          </TabPanel>
        </SwipeableViews>
      </Box>
      <Outlet />
    </Container>
  );
}
