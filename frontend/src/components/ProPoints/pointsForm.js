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
    let data = new FormData(eve.currentTarget);
    data = {
      points: data.get("propoint"),
      courseId : data.get("courseId"),
      description: data.get("description") || event,
      eventId: data.get("eventId"),
    };
    setDisable(true);
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
        if (err.response.status === 404) {
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
        console.log(res.data);
        if (res.data[0]) {
          setEvent(res.data[0].event);
        } else {
          setEvent("No Matching event ID");
        }
      })
      .catch(function (err) {
        if (err.response.status === 304) {
          setEvent("No Matching event ID");
        }
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
            error={Boolean(event == "No Matching event ID")}
            id="id"
            label="Event ID"
            name="eventId"
            size="small"
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="courseId"
            label="Course ID"
            name="courseId"
            size="small"
            placeholder="3331"
            autoFocus
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            margin="normal"
            fullWidth
            multiline
            id="description"
            label="Event Title or Description"
            name="description"
            placeholder={event}
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
          <Typography variant="body1">
            {msg}
          </Typography>
          <LoadingButton
            type="submit"
            autoFocus
            size="normal"
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
