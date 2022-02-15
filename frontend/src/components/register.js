import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, MenuItem } from '@mui/material';
import { useRef } from "react";
import axios from 'axios';
import qs from 'qs';
import {Link ,Outlet, useNavigate} from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        TTU ECE IEEE student branch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  // Select and box state
  const [classification, setClassification] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [isValid, setValid] = React.useState([false, false, false]);
  const { control, handleSubmit, watch, reset, formState : {errors} } = useForm({
    defaultValues: {
      firstname: '',
      lastname : '',
      rNum : '',
      email : '',
      password : '',
      passwordconfirm : '',
      classification : classification,
      alumni : checked
    },
  });
  const password = useRef({});
  password.current = watch("password","");

  const handleBox = (event) =>{
    setChecked(event.target.checked);
  }
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
      axios.post(
        "/api/register",
        qs.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          id: data.rNum,
          email: data.email,
          password: data.password,
          classification : classification,
          alumni: checked
        }),
        { timeout: 2000 }
      )
      .then(function (res){
          navigate('/login');
      })
      .catch( function (err) {
        setMsg(err.response.data.msg);
        if(err.response.status === 400){
          console.log([err.response.data.isEmail, err.response.data.isRnum]);
          setValid([err.response.data.Email, err.response.data.Rnum, err.response.data.password]);
        }
      })

    reset({
      firstname: '',
      lastname : '',
      rNum : '',
      email : '',
      password : '',
      passwordconfirm : '',
      classification : classification,
      alumni : checked
    });
  };

   return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box 
            component="form" 
            //noValidate 
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <Controller
                name = "firstName"
                control = {control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  required
                  />
              }/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                name = "lastName"
                control={control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  label= "Last Name"
                  fullWidth
                  required
                  />
                }/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                name= "rNum"
                control = {control}
                rules={{
                  required: "You must specify an R-Number",
                  maxLength: {
                    value: 8,
                    message: "R-Number Error!"
                  }
                }}
                render= { ({field}) => 
                  <TextField
                  {...field}
                  label= "R-Number"
                  helperText = "8-Digit TTU ID. Ex 12345678"
                  fullWidth
                  />
                }/>
                <Typography variant = "body2" sx = {{textAlign : 'left', color:'error.main'}}>
                {errors.rNum && <p>{errors.rNum.message}</p>}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                name="email"
                control= {control}
                rules={{
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
                }}
                render= { ({field}) => 
                  <TextField
                  {...field}
                  label="Email Address"
                  helperText = "TTU email - @ttu.edu"
                  fullWidth
                  required
                  />
                }/>
                <Typography variant = "body2" sx = {{textAlign : 'left', color:'error.main'}}>
                {errors.email && <p>{errors.email.message}</p>}
                </Typography>
              </Grid>
              <Grid item xs = {12} md={12}>
                <Controller
                name = "password"
                control = {control}
                rules={{
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!"
                  }
                }}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  type="password"
                  label="Password"
                  helperText = "Password must be at least 8 characters"
                  fullWidth
                  required
                  />
              }/>
                <Typography variant = "body2" sx = {{textAlign : 'left', color:'error.main'}}>
                {errors.password && <p>{errors.password.message}</p>}
                </Typography>
              </Grid>
              <Grid item xs = {12} md={12}>
                <Controller
                name = "passwordconfirm"
                control = {control}
                // rules={{
                //   validate: value => value === password.current || "Passwords do not match!"
                // }}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  />
                }
                />
                <Typography variant = "body2" sx = {{textAlign : 'left', color:'error.main'}}>
                  {errors.passwordconfirm && <p>{errors.passwordconfirm.message}</p>}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id = "classification">Classification/Major</InputLabel>
                  <Select
                  fullWidth
                  name="Classification"
                  id="classification"
                  label="Class"
                  labelId = "classification"
                  value = {classification}
                  onChange = {(event) => {
                    setClassification(event.target.value);
                  }}
                >
                  <MenuItem value = {'EE'}>Electrical Engineering</MenuItem>
                  <MenuItem value = {'CMPE'}>Computer Engineering</MenuItem>
                  <MenuItem value = {'PHYS'}>Physics</MenuItem>
                  <MenuItem value = {'CS'}>Computer Science</MenuItem>
                  <MenuItem value = {null}>Other</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control = {
                  <Checkbox onChange = {handleBox} />
                } label = "Alumni"/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Box>
                <Link to='/login'>
                  Already have an account? Sign in
                </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}