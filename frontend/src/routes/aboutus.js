import * as React from "react";
import Stack from "@mui/material/Stack";

import Bar from "../layouts/layout";
import MenuTabs from "../components/menu";
import { Outlet } from "react-router";
import { Typography } from "@mui/material";

export default function AboutUs() {
  
  return (
    <Stack>
      <Typography>Annoucements and Events</Typography>
    </Stack>
  );
}
