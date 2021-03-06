import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import qs from "qs";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

import Login from '../login'
import { api } from "../../config";


export default function AddPoints() {
  const [msg, setMsg] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const { search } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const urlParams = Object.fromEntries([...new URLSearchParams(search)]);
  const navigate = useNavigate();
  const { control, handleSubmit, watch, reset, resetField, setError, clearErrors, formState : {errors} } = useForm({
    defaultValues: {
      points: urlParams.points || '',
      description: urlParams.event || '',
      EventId: urlParams.EventId || ''
    },
  });

  const onSubmit = async(data) => {
    setDisable(true);
    try {
      let res = await api.post("/propoint", qs.stringify(data));
      enqueueSnackbar(`Successfully added ProPoint : ${res.data.points} - ${res.data.description}`, {variant: 'success'});
      reset({
        EventId: '',
        description: '',
        points: 1
      });
      navigate("/propoints");
    } catch (err) {
      if(err.response.status === 400) {
        enqueueSnackbar("Please enter in correct Event/Course ID");
      }
      if(err.response){
        enqueueSnackbar(err.response.data);
      }
    }
    setDisable(false);
    reset({
      EventId: '',
      description: '',
      points: 1
    });
  };

  const checkEvent = async(value) => {
    try {
      let res = await api.get("/event", {params : {id : value}});
      if(res.data) return true;
      return false;
    } catch (error) {
      return false;
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        margin: 2,
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        borderBottom: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs = {12} md={12}>
          <Controller
          name = "EventId"
          control = {control}
          rules= {{ 
            required: true,
            validate: checkEvent,
            pattern: /^\d+$/,
            message: "Please enter a registed Event ID!"
          }}
          render = { ({field, fieldState}) => 
            <TextField
            {...field}
            type="number"
            label="Event ID"
            error= {Boolean(fieldState.error)}
            disabled={Boolean(urlParams.EventId)}
            helperText={errors?.EventId?.message}
            fullWidth
            required
            />
        }/>
        </Grid>
        <Grid item xs={12}>
          <Controller
          name= "description"
          control = {control}
          render= { ({field, fieldState}) => 
            <TextField
            {...field}
            label= "Event Title or Description"
            multiline
            />
          }/>
        </Grid>
        <Grid item xs={12}>
          <Controller
          name="points"
          control= {control}
          render= { ({field}) => 
            <TextField
            {...field}
            type="number"
            label="ProPoints"
            fullWidth
            disabled={Boolean(urlParams.points)}
            defaultValue={field.defaultValue}
            required
            />
          }/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{msg}</Typography>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            loading={disable}
            sx={{ mt: 2, mb: 2 }}
          >
            Add points
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
