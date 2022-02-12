import * as React from "react";
import Stack from "@mui/material/Stack";

import Bar from "./layout";
import MenuTabs from "../components/menu";
import { Outlet } from "react-router";

export default function HomeLayout() {
  
  return (
    <Stack>
      {/* Insert slideshow of images here */}
      <MenuTabs />
      {/* Add footer here with social media contacts */}
    </Stack>
  );
}
