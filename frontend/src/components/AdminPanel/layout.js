import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router";
import Slide from "@mui/material/Slide";
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';

import EventForm from "./events";

export default function AdminLayout() {

  return (
    <Paper elevation = {2} sx={{flexGrow : 1}}>
      <EventForm />
    </Paper>
  );
}