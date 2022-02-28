import * as React from "react";
import QRCode from "react-qr-code";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
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
