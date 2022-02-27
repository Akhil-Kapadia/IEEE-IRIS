import * as React from "react";
import axios from "axios";
import qs from "qs";
import QRCode from "react-qr-code";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import Card from "@mui/material/Card";
import Button from "@mui/material/button";

function qrCode() {
  const [qr, setQR] = React.useState(<></>);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      points: 1
    },
  });

  const generateQr = () => {};

  return;
  <Box container sx={{flexGrow:1, flexDirection:"column", justifyContent:"center" }}>
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        margin: 2,
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <Grid item>
        <Controller
          name="points"
          control={control}
          render={ ({field}) =>
            <TextField
            {...field}
            required
            type="number"
            label="Points"
            />}
        />
        </Grid
        <Grid item>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          size="large"
          fullWidth
          variant="contained"
          color="secondary"
        >
          Generate ProPoint QR Code
        </Button>
      </Grid>
    </Grid>
  </Box>;
}

export default function EventForm() {
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Description: "",
      location: "",
      Date: moment().format(),
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    data.Date = moment(data.Date).format();
    axios
      .post("/api/event", {
        event: data.Description,
        date: data.Date,
        participants: 0,
      })
      .then(function (res) {
        setMsg(
          `Created Event "${res.data.event}" with ID : ${
            res.data.id
          } on ${moment(res.data.date).format("llll")}.`
        );
        reset({
          Description: "",
          Date: moment().format(),
        });
        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <Stack>
      <Paper>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          spacing={1}
          flexGrow
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            margin: 2,
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  label="Location of Event"
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
      </Paper>
    </Stack>
  );
}
