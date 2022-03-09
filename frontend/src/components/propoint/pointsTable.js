import * as React from 'react';
import {api} from '../../config';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from 'moment';


/**
 * Returns user info to be used for auth and restricting route access.
 * To be replaced by an actual validation scheme
 * @returns Object of user itme
 */
 const authorized = () => {
  let data = localStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return { id: "", officer: "" };
  }
};

export default function PointsTable(props) {
  const [loading, setLoading] = React.useState(false);
  const [points, setPoints] = React.useState(props.data);
  const columns = [
    { field: "UserId", headerName: "R-Number", width: 95 },
    { field: "fullname", headerName: "Full Name", width: 200},
    { field: "EventId", headerName: "Event ID", width: 80},
    { field: "courseId", headerName: "Course ID", width: 90, editable: true},
    { field: "description", headerName: "Event Title or Description", flex:1, editable: true},
    { field: 'createdAt', headerName : "Added On", width : 150, valueFormatter: ( {value} ) => {
      const date = moment(value, "YYYY-MM-DD hh:mm:22.SSS +Z");
      return date.format("l LT");
    }},
    { field: "points", headerName: "Pro Points", width: 100, type: 'number', editable: true},
    { field: "confirmedBy", headerName: "Confirmed By", width: 200},
    { field: "confirmed", headerName: "Confirmed", width: 100, type: 'boolean', editable:authorized().officer },
  ];

  React.useEffect(() => {
    setPoints(props.data);
  }, [props.data]);

  const handleCellCommit = React.useCallback (
    async (params) => {
      try {
        let response;
        
        // api call to update propoint.
        if (params.field === "confirmed") { // If officer confirming
          response = await api.put("/propoint/confirm", {
            id: params.id,
            confirmed: params.value
          });
        } else {
          response = await api.put("/propoint", {
              id: params.id,
              [params.field]: params.value
          });
      }

        //TODO: add snack bar
        setPoints((prev) =>
          prev.map((row) => (row.id === params.id ? response.data : row)),
        );   

      } catch (err) {
        //restore old row
        setPoints( (prev) => [...prev]);
      }
    }, [api]
  );
  
  
  return (
    <Box flexGrow>
  <div style = {{display: 'flex', height:'100%'}}>
    <div style= {{flexGrow: 1}} >
    <DataGrid 
      autoHeight 
      disableSelectionOnClick 
      checkboxSelection
      loading={loading}
      columns={columns} rows={points} 
      components={{Toolbar: GridToolbar}}
      isRowSelectable={ (params) => !params.row.confirmed}
      isCellEditable={ (params) => !params.row.confirmed || authorized().officer } 
      onCellEditCommit={handleCellCommit}
   />
   </div>
  </div>
  </Box>
  );
}