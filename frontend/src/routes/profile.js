import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link"
import { Container, FormControlLabel, MenuItem } from "@mui/material";
import { useRef } from "react";
import GeneralProfile from "../components/profile/generalProfile";
import StudentProfile from "../components/profile/studentProfile";
import IEEEProfile from "../components/profile/ieeeProfile";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">TTU ECE IEEE student branch</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Profile() {
  return(
    <Stack>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }} >
          <Typography component="h1" variant="h5"> Profile </Typography>
          <Box component="form" sx={{ mt: 3 }} >
            <GeneralProfile />
            <StudentProfile />
            <IEEEProfile />
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Stack>
  );
}