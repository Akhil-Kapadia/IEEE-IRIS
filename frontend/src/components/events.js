import * as React from "react";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { api } from "../App";

export default function EventForm() {
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Description: "",
      Date: moment().format(),
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    data.Date = moment(data.Date).format();
    api
      .post("/event", {
        event: data.Description,
        date: data.Date,
        participants: 0,
      })
      .then(function (res) {
        setMsg(`Created Event "${res.data.event}" with ID : ${res.data.id} on ${moment(res.data.date).format('llll')}.`);
        reset({
          Description: "",
          Date: moment().format(),
        });
        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
      <Grid
        container
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        spacing={1}
        flexGrow
        direction = 'column'
        justifyContent="center"
        alignItems="center"
        sx={{
          margin: 2,
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid item xs={10}>
          <Controller
            name="Description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                label="Event Title or Description"
                autoFocus
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="Date"
            control={control}
            render={({ field }) => (
              <MobileDateTimePicker
                {...field}
                renderInput={(props) => <TextField {...props} />}
                label="Date of Event"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">{msg}</Typography>
          <LoadingButton
            type="submit"
            autoFocus
            size="normal"
            fullWidth
            variant="contained"
            color="secondary"
            loading={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            Create Event
          </LoadingButton>
        </Grid>
      </Grid>
  );
}
