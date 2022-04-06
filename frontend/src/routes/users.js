import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import OfficerForm from "../components/user/officerForm";


export default function Users() {

  return (
    <Paper elevation={3} sx={{p:2}}>
      <Stack spacing={2}>
        <Typography>
      
        </Typography>
        <OfficerForm />
        <Divider />
        <Typography>
          
        </Typography>\
      </Stack>
    </Paper>
  );
}
