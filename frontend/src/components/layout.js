import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "@emotion/react";

import Bar from "./bar";
import MenuTabs from "./menu";
import axios from "axios";

export default function Layout() {
  const [authorized, setAuth]  = React.useState('false');

  React.useEffect(() => {
    axios
      .get("/api/authorized")
      .then((res) => {
        setAuth(res.data.role);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth("user");
        }
      });
  }, [document.cookie]);
  
  return (
    <Stack>
      <Bar auth = {authorized}/>
      <MenuTabs />
    </Stack>
  );
}
