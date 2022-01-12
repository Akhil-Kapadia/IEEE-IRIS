import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import axios from "axios";
import qs from "qs";

// add a propoint form
function AddPoints() {
  const [msg, setMsg] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {};
    // eslint-disable-next-line no-console
    axios
      .post("/api/propoint", qs.stringify(data))
      .then(function (res) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        setMsg(err.response.data.msg);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 2,
        mb: 2,
        flexGrow: 1,
        flexDirection: "column",
        justifyContent : 'center',
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="id"
            label="Event ID"
            name="eventId"
            size="small"
            autoFocus
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="lab"
            label="Project Lab"
            name="lab"
            defaultValue="1"
            size="small"
            autoFocus
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Event Title or Description"
            name="description"
            size="small"
            autoFocus
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="points"
            label="ProPoints"
            name="propoint"
            defaultValue="1"
            size="small"
            autoFocus
          />
        </Grid>
        <Grid item xs={4} >
        <Button
        type="submit"
        autoFocus
        size="normal"
        fullWidth
        variant="contained"
        color="secondary"
        sx = {{mt : 2, mb : 2, width:'20%'}}
      >
        Submit
      </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function ProPoints() {
  return (
    <Paper elevation={3} sx={{ alignItems: "center" }}>
      <AddPoints />
    </Paper>
  );
}
