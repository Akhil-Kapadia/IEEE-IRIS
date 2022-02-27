import * as React from "react";
import QRCode from "react-qr-code";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { api } from "../App";
import { useSnackbar } from "notistack";

function PointsCode(props) {
  const [qr, setQR] = React.useState(<></>);
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      eventId: "",
      points: 1,
    },
  });

  const onSubmit = () => {
    setOpen(true);
    setQR(<QRCode value="https://ttu-ieee.azurewebsites.net/propoint/" />);
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ p: 2 }}
      >
        <Grid item xs={12}>
          <Controller
            name="eventId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                type="number"
                label="Event ID"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="points"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                type="number"
                label="Points"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Generate ProPoint QR Code
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            p: 2,
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {qr}
        </Paper>
      </Modal>
    </Box>
  );
}

export default function EventForm() {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Description: "",
      location: "",
      Date: moment().format(),
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.Date = moment(data.Date).format();
      let res = await api.post("/event", {
        event: data.Description,
        location: data.location,
        date: data.Date,
      });

      enqueueSnackbar(`Created Event with ID of ${res.data.id}`, {
        variant: "success",
      });
      reset({
        Description: "",
        location: "",
        Date: moment().format(),
      });
    } catch (err) {
      enqueueSnackbar(err.response.data, { variant: "error" });
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3}>
      <Stack>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          spacing={2}
          flexGrow
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            p: 2,
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
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
          <Grid item sm={6}>
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
        <br />
        <br />
        <PointsCode />
      </Stack>
    </Paper>
  );
}
