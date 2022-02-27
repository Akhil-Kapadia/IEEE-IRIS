import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddPoints from "../components/pointsForm";
import UserPoints from "../components/userPoints";

export default function ProPoints() {
  return (
    <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
      <Typography>Add ProPoints here!</Typography>
        <AddPoints />
      <Typography>See your points here!</Typography>
        <UserPoints />
    </Paper>
  );
}
