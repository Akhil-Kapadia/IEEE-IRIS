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

import {api} from "../config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">TTU ECE IEEE student branch</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Profile() {
  // Select and box state
  const [classification, setClassification] = React.useState("");
  const [courseType, setCourseType] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [isValid, setValid] = React.useState([false, false, false]);
  const {control, handleSubmit, watch, reset, formState: { errors },} = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      rNum: "",
      email: "",
      password: "",
      passwordconfirm: "",
    },
  });
  const password = useRef({});
  password.current = watch("password", "");

  const handleBox = (event) => {
    setChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const onSubmit = (data) => {
    api
      .post(
        "/register",
        qs.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          id: data.rNum,
          email: data.email,
          password: data.password,
          classification: classification,
          alumni: checked,
        })
      )
      .then(function (res) {
        navigate("/login", {replace: true});
      })
      .catch(function (err) {
        setMsg(err.response.data.msg);
      });
  };

  function studentRole(){
    if(true==false) return 'none';
    else return '';
  }

  function ieeeRole(){
    if(true==false) return 'none';
    else return '';
  }

  function officerRole(){
    if(true==false) return 'none';
    else return '';
  }

  return(
    <Stack>
      <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          {/* /////////////////////////General User Information///////////////////////// */}
          <Grid container spacing={2}>
            {/*/////// First Name ///////*/}
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField 
                    label="First Name"
                    defaultValue= "TBA"
                    fullWidth 
                    required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/*/////// Last Name ///////*/}
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <TextField 
                    label="Last Name" 
                    defaultValue = "TBA"
                    fullWidth 
                    required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/*/////// R-Number ///////*/}
              <Controller
                name="rNum"
                control={control}
                render={({ field }) => (
                  <TextField
                    disabled
                    label="R-Number"
                    defaultValue = "TBA"
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.rNum && <p>{errors.rNum.message}</p>}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/*/////// E-Mail ///////*/}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Email Address"
                    defaultValue = "TBA"
                    helperText="TTU email - @ttu.edu"
                    error={errors.email}
                    fullWidth
                    required
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.email && <p>{errors.email.message}</p>}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "error.main" }}
          >
            {msg}
          </Typography>
          {/*/////// General User Update Buttons ///////*/}
          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 3, mb: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Update
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Reset Password
              </Button>
          </Stack>
          {/* /////////////////////////Student Information///////////////////////// */}
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
                      <InputLabel id="classification">
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
          {/* /////////////////////////IEEE Information///////////////////////// */}
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
                  name="memberid"
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
                  name="memberid"
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
        </Box>
      </Box>
    <Copyright sx={{ mt: 5 }} />
    </Container>
  </Stack>
  );
}