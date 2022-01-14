import * as React from 'react'
import axios from "axios";
import qs from "qs";
import {useForm, Controller} from 'react-hook-form';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function Pointsearch () {
  const {handleSubmit, control, reset, formState:{errors} } = useForm();

  const onSubmit = React.useCallback((values) => {
    console.log(values);
    reset();
  });
  
  return(
  <Grid
  container
  component = 'form'
  onSubmit = {handleSubmit(onSubmit)}
  direction = 'row'
  alignContent='center'
  justifyContent='center'
  sx = {{margin : 2}}
  >
    <Grid item xs={4}>
      <Controller 
        name="eventId"
        control = {control}
        render={ ({field}) => {
          <TextField
            {...field}
            />
        }}
      
      
      />
    </Grid>

  </Grid>
  )
}

export default function PointsTable() {

  return (
    <Pointsearch/>
  )
}