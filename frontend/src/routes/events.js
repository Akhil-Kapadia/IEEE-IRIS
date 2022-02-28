import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PointsCode from "../components/event/qrcode";
import EventForm from "../components/event/eventForm";
import EventTable from "../components/event/eventTable";


export default function Events() {

  return (
    <Paper elevation="3" sx={{p:2}}>
      <Stack spacing={2}>
        <Typography>

        </Typography>
        <EventForm />
        <Typography>

        </Typography>
        <PointsCode />
        <Divider />
        <EventTable />
      </Stack>
    </Paper>
  );
}
