import * as React from "react";
import axios from "axios";
import qs from "qs";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

import AddPoints from './pointsForm';
import PointsTable from "./pointsTable";

const authorized = () => {
  let data = localStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return { id: "", officer: "" };
  }
};


export default function ProPoints() {
  return (
    <Paper elevation={3}>
      <Typography>Add ProPoints here!</Typography>
      {authorized().id && <AddPoints />}
      <PointsTable/>
    </Paper>
  );
}
