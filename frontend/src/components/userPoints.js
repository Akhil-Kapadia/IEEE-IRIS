import * as React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { Typography } from "@mui/material";
import PointsTable from "./pointsTable";


export default function UserPoints() {
  const [points, setPoints] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fromDate: moment().subtract(3, "months").format(),
      toDate: moment().format(),
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    data.toDate = moment(data.toDate).format();
    data.fromDate = moment(data.fromDate).format();

    axios
      .get("/api/propoint", {
        params: data,
      })
      .then(function (res) {
        setPoints(res.data);
        reset({
          fromDate: data.fromDate,
          toDate: moment().format(),
        });
        setMsg('');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if(err.request){
          setMsg('Unable to establish database connection');
        }
        if (err.response.status === 401) {
          sessionStorage.clear();
        }
      });
  };

  return (
    <Box sx={{flexGrow:1}}>
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
        sx={{ p: 2}}
      >
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
      <PointsTable admin={false} data={points} />
      </Box>

  );
}
