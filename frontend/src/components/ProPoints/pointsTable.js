import * as React from "react";
import axios from "axios";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

function PointsData(props) {
  const [data, setData] = React.useState(props.data);
  const columns = [
    { field: "userId", headerName: "R-Number", flex: 0.10 },
    { field: "eventId", headerName: "Event ID", flex:0.05},
    { field: "courseId", headerName: "Course ID", flex: 0.05},
    { field: "description", headerName: "Event Title or Description", flex:0.45},
    { field: 'createdAt', headerName : "Added On", flex : 0.15, valueFormatter :  (params) => {
      return moment(params.value).format('llll');
    }},
    { field: "points", headerName: "Pro Points", flex: 0.05},
    { field: "confirmed", headerName: "Confirmed", flex: 0.10},
  ];
  
  return (
  <div style = {{width:'100%'}}>
    <DataGrid autoHeight columns={columns} rows={props.data} />
  </div>
  );
}

export default function PointsTable() {
  const [points, setPoints] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      eventId: "",
      courseId: "",
      fromDate: moment().subtract(3, "months").format(),
      toDate: moment().format(),
      confirmed: false,
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
          eventId: "",
          courseId: "",
          fromDate: data.fromDate,
          toDate: moment().format(),
          confirmed: data.confirmed,
        });
        setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        flexGrow
        direction="row"
        alignContent="center"
        justifyContent="center"
        spacing={1}
        sx={{ p: 2 }}
      >
        <Grid item xs={2}>
          <Controller
            name="eventId"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="number" label="Event ID" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="number" label="Course ID" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={2}>
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
        <Grid item xs={2}>
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
        <Grid item xs={1}>
          <Controller
            name="confirmed"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...field} size="large" />}
                  label="Confirmed"
                />
              </FormGroup>
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <LoadingButton
            name="submit"
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            loading={loading}
            fullWidth
          >
            Search
          </LoadingButton>
        </Grid>
      </Grid>
    
      <PointsData data={points} />
      </>

  );
}
