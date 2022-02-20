import * as React from 'react';
import api from '../config';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


/**
 * Returns user info to be used for auth and restricting route access.
 * To be replaced by an actual validation scheme
 * @returns Object of user itme
 */
 const authorized = () => {
  let data = sessionStorage.getItem("user");
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
    { field: "UserId", headerName: "R-Number", width: 100 },
    { field: "userName", headerName: "Full Name", width: 200},
    { field: "EventId", headerName: "Event ID", width: 100},
    { field: "courseId", headerName: "Course ID", width: 100, editable: true},
    { field: "description", headerName: "Event Title or Description", flex:1, editable: true},
    { field: 'createdAt', headerName : "Added On", width : 200, type: 'dateTime', valueGetter: ({ value }) => value && Date(value)},
    { field: "points", headerName: "Pro Points", width: 100, type: 'number', editable: true},
    { field: "confirmed", headerName: "Confirmed", width: 100, type: 'boolean', editable:authorized().officer },
  ];

  React.useEffect(() => {
    setPoints(props.data);
  }, [props.data]);

  const handleCellCommit = React.useCallback (
    async (params) => {
      try {
      
        // api call to update propoint.
        let response = await api.put("/propoint", {
            id: params.id,
            [params.field]: params.value
        });

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
  <div style = {{display: 'flex', width:'100%'}}>
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
  );
}