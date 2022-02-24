import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import LocalizationProvider  from "@mui/lab/LocalizationProvider";
import { SnackbarProvider } from 'notistack';
import DateAdapter from '@mui/lab/AdapterMoment';
import theme from "./theme";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
