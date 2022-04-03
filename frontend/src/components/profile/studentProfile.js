import * as React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from '@mui/material/Divider';
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link"
import { Container, FormControlLabel, MenuItem } from "@mui/material";
import { useRef } from "react";
import qs from "qs";
import { Outlet, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { api } from "../../config";

export default function StudentProfile() {
  const [classification, setClassification] = React.useState("");
  const [courseType, setCourseType] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const {control, handleSubmit, watch, reset, formState: { errors },} = useForm({
    defaultValues: {
      courseID: "",
      courseSec: "",
    },
  });

  const handleBox = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (data) => {
  };

  function studentRole(){
    if(true==true) return 'none';
    else return '';
  }

  return(
    /* /////////////////////////Student Information///////////////////////// */
    <Box
    component="form"
    display= {studentRole()}
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    sx={{ mt: 3 }}
    >
      <Divider
      textAlign="left"
      sx={{ mt: 4}}>
        Student Info
      </Divider>
      <Grid container spacing={2}>
        {/*/////// Classification List ///////*/}
        <Grid item sx={{ mt: 3 }} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="classification">
              Classification/Major
            </InputLabel>
            <Select
              fullWidth
              name="Classification"
              id="classification"
              label="Class"
              labelId="classification"
              value={classification}
              onChange={(event) => {
                setClassification(event.target.value);
              }}>
              <MenuItem value={"EE"}>Electrical Engineering</MenuItem>
              <MenuItem value={"CMPE"}>Computer Engineering</MenuItem>
              <MenuItem value={"PHYS"}>Physics</MenuItem>
              <MenuItem value={"CS"}>Computer Science</MenuItem>
              <MenuItem value={null}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
        {/*/////// Course Info ///////*/}
            <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 3, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="courseType">
                  Course Type
                </InputLabel>
                <Select
                fullWidth
                required
                name="Course Type"
                id="courseType"
                label="courseType"
                labelId="courseType"
                value={courseType}
                onChange={(event) => {
                  setCourseType(event.target.value);
                }}>
                <MenuItem value={"ECE"}>ECE</MenuItem>
                <MenuItem value={"PHYS"}>PHYS</MenuItem>
                <MenuItem value={"CS"}>CS</MenuItem> 
                <MenuItem value={null}>Other</MenuItem>
              </Select>
            </FormControl>
            <Controller
            name="courseID"
            control={control}
            render={({ field }) => (
              <TextField 
                label="Course ID" 
                defaultValue = "TBA"
                helperText = "E.X. 3334"
                fullWidth 
                required />
            )}
            />
            <Controller
            name="courseSec"
            control={control}
            render={({ field }) => (
              <TextField 
                label="Course Section" 
                defaultValue = "TBA"
                helperText = "E.X. 101"
                fullWidth 
                required />
            )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/*/////// Alumni Status ///////*/}
          <FormControlLabel
            control={<Checkbox onChange={handleBox} />}
            label="Alumni"
          />
        </Grid>
      </Grid>
      {/*/////// Student Info Update Buttons ///////*/}
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