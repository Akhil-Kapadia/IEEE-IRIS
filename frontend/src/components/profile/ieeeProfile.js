import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";

export default function IEEEProfile() {
  const {control, handleSubmit, watch, reset, formState: { errors },} = useForm({
    defaultValues: {
      memberID: "",
    },
  });
  
  const onSubmit = (data) => {
  };

  function ieeeRole(){
    if(true==true) return 'none';
    else return '';
  }

  function officerRole(){
    if(true==true) return 'none';
    else return '';
  }

  return(
    /* /////////////////////////IEEE Information///////////////////////// */
    <Box
    component="form"
    display= {ieeeRole()}
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    sx={{ mt: 3 }}
    >
      <Divider
      textAlign="left"
      sx={{ mt: 2}}>
        <Typography variant="subtitle1" color="black"><a href="https://www.ieee.org/" target="_blank">IEEE Information</a></Typography>
      </Divider>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 3 }} xs={12} sm={12}>
          {/*/////// Member ID ///////*/}
          <Controller
          name="memberID"
          control={control}
          render={({ field }) => (
            <TextField 
              label="Member ID" 
              defaultValue = "TBA"
              fullWidth 
              required />
          )}
          />
        </Grid>
        <Grid item display={officerRole()} xs={12} sm={12}>
        {/*/////// Officer Status ///////*/}
          <Controller
          control={control}
          render={({ field }) => (
            <TextField 
              disabled
              label="Officer Status"
              defaultValue = "Current Officer"
              fullWidth />
          )}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
      >
        Update
      </Button>
    </Box>
  );
}