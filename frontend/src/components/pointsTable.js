import * as React from "react";
import axios from "axios";
import qs from "qs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Pointsearch() {
  const [value, setValue] = React.useState(new Date());
  const [points, setPoints] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    let params = {

    };
    console.log(...data);
    axios
      .get("/api/propoint", {
        params: {
          eventId: data.get("Event ID"),
          fromDate: data.get("fromDate"),
          toDate: data.get("toDate"),
          lab: data.get("Course ID"),
          confirmed: data.get("confirm"),
        },
      })
      .then(function (res) {
        setPoints(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {});
    event.target.reset();
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      noValidate
      flexGrow
      direction="row"
      alignContent="center"
      justifyContent="center"
      spacing={1}
      sx={{ p: 2 }}
    >
      <Grid item flexGrow>
        <TextField
          id="eventId"
          name="Event ID"
          type="number"
          label="Event ID"
          fullWidth
        />
      </Grid>
      <Grid item flexGrow>
        <TextField
          id="courseId"
          name="Course ID"
          type="number"
          label="Course ID"
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <MobileDateTimePicker
          renderInput={(props) => <TextField {...props} />}
          name="fromDate"
          label="From:"
          fullWidth
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </Grid>
      <Grid item flexGrow>
        <MobileDateTimePicker
          renderInput={(props) => <TextField {...props} />}
          id='toDate'
          name="toDate"
          label="To:"
          fullWidth
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </Grid>
      <Grid item flexGrow>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox size="large"/>}
            label="Confirmed"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={2}>
        <LoadingButton
          name="submit"
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
        >
          Search
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default function PointsTable() {
  return <Pointsearch />;
}
