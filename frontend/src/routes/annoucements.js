import * as React from "react";
import Stack from "@mui/material/Stack";

import Bar from "../components/bar";
import MenuTabs from "../components/menu";
import { Outlet } from "react-router";
import { Typography } from "@mui/material";

export default function Announcement() {
  
  return (
    <Stack>
      <Typography>About us page for IEEE</Typography>
    </Stack>
  );
}
