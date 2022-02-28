import * as React from "react";
import QRCode from "react-qr-code";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { api } from "../../App";

export default function PointsCode() {
  const [qr, setQR] = React.useState(<></>);
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      eventId: "",
      points: 1,
    },
  });

  const onSubmit = () => {
    setOpen(true);
    setQR(<QRCode value="https://ttu-ieee.azurewebsites.net/propoint/" />);
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ p: 2 }}
      >
        <Grid item xs={12}>
          <Controller
            name="eventId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                type="number"
                label="Event ID"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="points"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                type="number"
                label="Points"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Generate ProPoint QR Code
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            p: 2,
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {qr}
        </Paper>
      </Modal>
    </Box>
  );
}