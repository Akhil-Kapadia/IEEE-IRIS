import * as React from "react";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { api } from "../config";

let pattern = /[0-9].{7}/;

function PointsDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {control, reset, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      rNum: ""
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      let userId = pattern.exec(data.rNum)[0];
      let res = await api.post("/propoint/admin", qs.stringify({
          userId: userId,
          eventId: props.event,
          points: props.points,
          description: "Submitted by Officer",
        })
      );
      let msg = `Added ${props.points} for ${res.data.firstname} ${res.data.lastname}.`;
      enqueueSnackbar(msg, {variant: "success"});
      reset({ rNum: "" });
    } catch (err) {
      if(err.response.status === 401){
        enqueueSnackbar(err.response.data.msg, {variant: "error"});
      }
      if(err.response.status === 404){
        enqueueSnackbar(err.response.data.msg, {variant: "error"});
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add ProPoint</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <DialogContentText>
            Type or Swipe card to enter R-Number and add {props.points}{" "}
            ProPoints.
          </DialogContentText>
          <Controller
            name="rNum"
            control={control}
            rules={{ 
              required: true,
              validate: (value) => pattern.test(value)
             }}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                required
                error={Boolean(errors.rNum)}
                margin="dense"
                label="R-Number"
                fullWidth
                variant="standard"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button name="submit" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default function AddProPoints() {
  const [pts, setPts] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventId: "",
      points: 1,
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.get("/event", { params: { event: data.eventId } });
      setPts({ points: data.points, event: data.eventId });
      setOpen(true);
    } catch (err) {
      reset({ eventId: "", points: 1 });
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3} divider={<Divider orientation="vertical" flexItem />}>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          flexGrow
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Grid item>
            <Controller
              name="eventId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Event ID"
                  type="number"
                  error={Boolean(errors.eventId)}
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="points"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pro Points"
                  type="number"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              name="submit"
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Start Adding!
            </Button>
          </Grid>
        </Grid>
        <PointsDialog open={open} points={pts.points} event={pts.event} />
      </Stack>
    </Paper>
  );
}
