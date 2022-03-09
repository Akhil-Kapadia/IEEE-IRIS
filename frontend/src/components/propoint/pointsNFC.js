import React from "react";
import moment from "moment";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { api } from "../../config";


export default function PointsNFC() {
  const [tag, setTag] = React.useState({})
  const ndef = new NDEFReader();

  const createTag = async() => {
    let date = {
      fromDate: moment().subtract(1, "month").format()
    }
    let res = await api.get("/propoint")
  }

  return (
    <Box>

    </Box>
  )
}