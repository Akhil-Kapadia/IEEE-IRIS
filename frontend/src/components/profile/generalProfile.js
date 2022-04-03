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

export default function GeneralProfile() {
  // Select and box state
  const [navi, setNavi] = React.useState(false)
  const [msg, setMsg] = React.useState("");
  const {control, handleSubmit, watch, reset, formState: { errors },} = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });
  const navigate = useNavigate();
  const handlePswdRstButton = () => {
    setNavi(false);
    navigate("/password-reset"); // This should navigate to the password reset page
  }

  const onSubmit = (data) => {
  };

  return (
    /* /////////////////////////General User Information///////////////////////// */
    /*/////// First Name ///////*/
    <Box
    component="form"
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
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
        onClick={handlePswdRstButton}
        >
          Reset Password
        </Button>
      </Stack>
    </Box>
  );
}