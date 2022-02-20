import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import PointsTable from "../components/pointsTable";
import api from "../config";

export default function ManageProPoints() {
  const { control, reset, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      eventId: "",
      fromDate: moment().subtract(4, "months").format(),
      toDate: moment().format(),
    }});
  const [msg, setMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [points, setPoints] = React.useState([]);

  const onSubmit = async(data) => {
    setLoading(true);
    setMsg('');
    data.toDate = moment(data.toDate).format();
    data.fromDate = moment(data.fromDate).format();

    try {
      let res =  await api.get("/propoint/all", {
        params: data
      });
      setPoints(res.data);
      reset({
        eventId: '',
        fromDate: data.fromDate,
        toDate: moment().format(),
      });
    } catch(err) {
      if(err.response.status === 401) {
        setMsg(err.response.data.msg);
      }
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack spacing={3} divider={<Divider variant="middle" flexItem />}>
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
          <Grid item xs={12}>
            <Controller
              name="eventId"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Event ID" fullWidth />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="fromDate"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  renderInput={(props) => <TextField {...props} />}
                  label="From:"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="toDate"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  renderInput={(props) => <TextField {...props} />}
                  label="To:"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{msg}</Typography>
            <LoadingButton
              name="submit"
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              loading={loading}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
        <Box>
          <PointsTable data={points}/>
        </Box>
      </Stack>
    </Paper>
  );
}
