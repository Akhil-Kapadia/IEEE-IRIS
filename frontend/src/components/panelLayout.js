import { Drawer, Paper } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router";

export default function PanelLayout() {
  
  return (
    <Drawer
    variant="permanent"
    anchor="left"
      sx={{
        width:240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }
      }}
      PaperProps={{
        sx: {
          backgroundColor: "lightgray",
        }
      }}
    >
      <Paper>

      </Paper>
    </Drawer>

  );
}
