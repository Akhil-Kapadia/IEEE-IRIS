import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

import axios from "axios";
import qs from "qs";

export default function AddPoints() {
  const [msg, setMsg] = React.useState("");
  const [event, setEvent] = React.useState("");
  const [disable, setDisable] = React.useState(false);

  const handleSubmit = (eve) => {
    eve.preventDefault();
    setDisable(true);
    let data = new FormData(eve.currentTarget);
    data = {
      points: data.get("propoint"),
      courseId: data.get("courseId"),
      description: data.get("description") || event,
      EventId: data.get("eventId"),
    };

    axios
      .post("/api/propoint", qs.stringify(data))
      .then(function (res) {
        setDisable(false);
        eve.target.reset();
        setMsg(
          `Successfully added ProPoint : ${res.data.id} - ${res.data.description}`
        );
      })
      .catch((err) => {
        // Unauthorized
        if (err.response.status === 401) {
          localStorage.clear();
          setMsg("Unauthorized. Please refresh the page and login!");
        }
        if (err.response.status === 400) {
          setMsg("Please enter in the correct Event/Course ID!");
          setDisable(false);
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
        if (res.data) {
          setEvent(res.data.event);
        } else {
          setEvent("No Matching event ID");
        }
      })
      .catch(function (err) {
        if (err.response.status === 401) {
          localStorage.clear();
          setMsg("Unauthorized. Please refresh the page and login!");
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
        borderBottom: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs = {12} md={12}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            onChange={handleEvent}
            error={Boolean(event == "No Matching event ID")}
            id="id"
            label="Event ID"
            name="eventId"
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="courseId"
            label="Course ID"
            name="courseId"
            placeholder="3331"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            multiline
            id="description"
            label="Event Title or Description"
            name="description"
            placeholder={event}
            error={Boolean(event == "No Matching event ID")}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="points"
            label="ProPoints"
            name="propoint"
            defaultValue="1"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{msg}</Typography>
          <LoadingButton
            type="submit"
            autoFocus
            fullWidth
            variant="contained"
            color="secondary"
            loading={disable}
            sx={{ mt: 2, mb: 2 }}
          >
            Add points
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
