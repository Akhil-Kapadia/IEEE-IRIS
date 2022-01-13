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
import { Typography } from "@mui/material";

const authorized = () => {
  let data = localStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return { id: "", officer: "" };
  }
};

// add a propoint form
function AddPoints() {
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState(false);
  const [event, setEvent] = React.useState('');
  const [disable, setDisable] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      points: data.get("propoint"),
      lab: data.get("courseId"),
      description: data.get("description"),
      eventId: data.get("eventId"),
    };
    setDisable(true);
    axios
      .post("/api/propoint", qs.stringify(data))
      .then(function (res) {
        setDisable(false);
        setMsg(`Successfully added ProPoint : ${res.data.id} - ${res.data.description}`);
      })
      .catch((err) => {
        // Unauthorized
        if (err.response.status === 401) {
          localStorage.clear();
          setMsg("Unauthorized. Please refresh the page and login!");
        }
        if(err.response.status === 404) {
          setError(true);
        }
      });
  };

  const handleEvent = (event) => {
    axios
      .get("/api/event", {
        params: {
          id: event.target.value,
        },
      })
      .then(function (res) {
        if (res.data[0]) {
          setEvent(res.data[0].event );
        } else {
          setEvent( "No Matching event ID" );
        }
      })
      .catch(function (err) {
        if (err.response.status === 304) {
          setEvent("No Matching event ID" );
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        margin: 2,
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
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
            onChange={handleEvent}
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
            id="courseId"
            error = {error}
            label="Course ID"
            name="courseId"
            size="small"
            defaultValue={'3331'}
            autoFocus
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            multiline
            id="description"
            label="Event Title or Description"
            name="description"
            value={event ? event : "No Matching event ID"}
            error={Boolean(event == "No Matching event ID")}
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
        <Grid item xs={12} sm={3}>
          <Typography variant='body1'>{msg}</Typography>
          <Button
            type="submit"
            autoFocus
            size="normal"
            fullWidth
            variant="contained"
            color="secondary"
            disabled= {disable}
            sx={{ mt: 2, mb: 2 }}
          >
          Add points
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function ProPoints() {
  return (
    <Paper elevation={3}>
      <Typography>Add ProPoints here!</Typography>
      {authorized().id && <AddPoints />}
    </Paper>
  );
}
