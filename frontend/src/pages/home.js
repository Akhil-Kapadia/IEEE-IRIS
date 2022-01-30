import * as React from "react";
import Stack from "@mui/material/Stack";

import Bar from "../components/bar";
import MenuTabs from "../components/menu";

export default function Layout() {
  
  return (
    <Stack>
      <Bar />
      <MenuTabs />
    </Stack>
  );
}
