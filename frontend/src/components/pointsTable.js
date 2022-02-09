import * as React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import Grid from "@mui/material/Grid";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";

function PointsData(props) {
  const columns = [
    { field: "UserId", headerName: "R-Number", flex: 0.10 },
    { field: "EventId", headerName: "Event ID", flex:0.05},
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
  const [msg, setMsg] = React.useState('');
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
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
          fromDate: data.fromDate,
          toDate: moment().format(),
          confirmed: data.confirmed,
        });
        setLoading(false);
        setMsg('');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          setMsg("Unauthorized. Please refresh the page and login!");
        }
      });
  };

  return (
    <>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        flexGrow
        direction="column"
        alignContent="center"
        justifyContent="center"
        spacing={2}
        sx={{ p: 2 }}
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
        <Grid item xs={12}>
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
        <Grid item xs={6}>
          <LoadingButton
            name="submit"
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            alignContent = 'center'
            loading={loading}
            fullWidth
          >
            {msg || "Search"}
          </LoadingButton>
        </Grid>
      </Grid>
    
      <PointsData data={points} />
      </>

  );
}
