import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  Outlet,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Stack } from "@mui/material";

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return "/";
}

export default function MenuTabs() {
  const routeMatch = useRouteMatch([
    "/",
    "/announcements",
    "/propoints",
    "/student-resources",
    "/minecraft",
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Stack>
      <Box sx={{ borderBottom: 1, borderColor: "grey.500", flexGrow: 1 }}>
        <Tabs
          value={currentTab}
          centered
          textColor="primary"
          indicatorColor="secondary"
        >
          <Tab label="About Us" value="/" to="/" component={Link} />
          <Tab
            label="Announcements"
            value="/announcements"
            to="/announcements"
            component={Link}
          />
          <Tab
            label="Pro Points"
            value="/propoints"
            to="/propoints"
            component={Link}
          />
          <Tab
            label="Student Resources"
            value="/student-resources"
            to="/student-resources"
            component={Link}
          />
          <Tab
            label="MineCraft"
            value="/minecraft"
            to="/minecraft"
            component={Link}
          />
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Stack>
  );
}
