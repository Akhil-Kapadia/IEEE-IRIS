import React from "react";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { api } from "../../App";

export default function EventTable() {
  const [events, setEvent] = React.useState([]);

  React.useEffect(async () => {
    try {
      let res = await api.get("/event/all");
      setEvent(res.data);
    } catch (err) {
      setEvent([]);
    }
  }, []);

  const columns = [
    { field: "id", headerName: "Event Id", width: 80 },
    { field: "event", headerName: "Event Name", flex: 1 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "date",
      headerName: "Date of Event",
      width: 150,
      valueFormatter: ({ value }) => {
        const date = moment(value, "YYYY-MM-DD hh:mm:22.SSS +Z");
        return date.format("l LT");
      },
    },
    { field: "participants", headerName: "Participants", width: 120 },
  ];

  return (
    <Box style={{ display: "flex", height: "100%" }}>
      <Box style={{ flexGrow: 1 }}>
        <DataGrid autoHeight rows={events} columns={columns} />
      </Box>
    </Box>
  );
}
