import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";

import { api } from "../../App";
import { useSnackbar } from "notistack";

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
    <Box>
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
    </Box>
  );
}
