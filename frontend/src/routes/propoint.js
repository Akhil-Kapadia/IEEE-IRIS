import * as React from "react";
import axios from "axios";
import qs from "qs";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AddPoints from "../components/pointsForm";
import PointsTable from "../components/pointsTable";

export default function ProPoints() {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography>Add ProPoints here!</Typography>
        <AddPoints />
      <Typography>See your points here!</Typography>
        <PointsTable />
    </Paper>
  );
}