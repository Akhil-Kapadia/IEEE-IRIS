import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { useLocation, useSearchParams } from "react-router-dom";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";

import Login from './login'
import { api } from "../App";


export default function AddPoints() {
  const [msg, setMsg] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const { search } = useLocation();
  const urlParams = Object.fromEntries([...new URLSearchParams(search)]);
  const { control, handleSubmit, watch, reset, resetField, setError, clearErrors, formState : {errors} } = useForm({
    defaultValues: {
      points: urlParams.points || '',
      courseId: '',
      description: '',
      EventId: urlParams.eventId || ''
    },
  });

  console.log(urlParams);
  const onSubmit = (data) => {
    setDisable(true);
    api
      .post("/propoint", qs.stringify(data), {timeout: 5000})
      .then(function (res) {
        setDisable(false);
        setMsg(
          `Successfully added ProPoint : ${res.data.id} - ${res.data.description}`
        );
      })
      .catch((err) => {
        if(err.request){
          setMsg("Unable to establish remote server connection.");
          setDisable(false);
        }
        // Unauthorized
        if (err.response.status === 401) {
          sessionStorage.clear();
          setMsg("Unauthorized. Please login!");
        }
        if (err.response.status === 400) {
          setMsg("Please enter in the correct Event/Course ID!");
          setDisable(false);
        }

    });

    reset({
      EventId: '',
      courseId: '',
      description: '',
      points: 1
    });
  };

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
            pattern: /^\d+$/,
            message: "Please enter a registed Event ID!"
          }}
          render = { ({field, fieldState}) => 
            <TextField
            {...field}
            type="number"
            label="Event ID"
            error= {Boolean(fieldState.error)}
            helperText={errors?.EventId?.message}
            fullWidth
            required
            />
        }/>
        </Grid>
        <Grid item xs={12}>
          <Controller
          name = "courseId"
          control={control}
          rules = {{
            required : true,
            minLength: 4,
            pattern: /^\d+$/,
            message: "I.e. Robotics Lab is ECE '3331'"
          }}
          render = { ({field, fieldState}) => 
            <TextField
            {...field}
            type= "number"
            label= "Course Number"  
            placeholder="3331"
            error= {Boolean(fieldState.error)}
            helperText= "I.e. Robotics Lab is ECE '3331'"
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
