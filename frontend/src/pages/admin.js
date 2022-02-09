import * as React from "react";
import Paper from '@mui/material/Paper';

import EventForm from "../components/events";

export default function AdminLayout() {

  return (
    <Paper elevation = {2} sx={{flexGrow : 1}}>
      <EventForm />
    </Paper>
  );
}