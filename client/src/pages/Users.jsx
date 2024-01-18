import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NavSideBar from "./../components/NavSideBar.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useState } from "react";
import SearchFilter from './../components/SearchFilter.jsx';

const Users = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = [
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "podDesignation", headerName: "Pod Designation", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Doe",
      firstName: "John",
      position: "Developer",
      role: "Engineer",
      podDesignation: "Pod A",
      status: "Active",
    },
    {
      id: 2,
      lastName: "Smith",
      firstName: "Jane",
      position: "Designer",
      role: "Designer",
      podDesignation: "Pod B",
      status: "Inactive",
    },
    {
      id: 3,
      lastName: "Johnson",
      firstName: "Bob",
      position: "Manager",
      role: "Manager",
      podDesignation: "Pod C",
      status: "Active",
    },
    // Add more rows as needed
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}>
        <Box
          sx={{
            marginTop: "40px",
            marginBottom: "30px",
            marginLeft: "50px",
          }}
        >
          <p className="text-5xl font-bold">Users</p>
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              {/* <CreateFilterButton /> */}
            </Grid>
            <Grid item xs={7.5}>
              {/* <SearchbarWide /> */}
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              {/* <BreakNotifUser /> */}
              <SearchFilter />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <PerfectScrollbar
            style={{
              marginRight: "20px",
            }}
          >
            <Box
              sx={{
                minHeight: "47rem",
                marginLeft: "2rem",
              }}
            >
              <Card
                sx={{
                  borderRadius: "40px",
                  padding: "20px",
                }}
              >
                <DataGrid
                  columns={columns}
                  rows={rows}
                  checkboxSelection
                  onRowClick={handleRowClick}
                  sx={{ border: "none", minHeight: "46rem" }}
                  disableRowSelectionOnClick
                />
              </Card>
            </Box>
          </PerfectScrollbar>
        </Box>
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <p>Last Name: {selectedRow.lastName}</p>
              <p>First Name: {selectedRow.firstName}</p>
              <p>Position: {selectedRow.position}</p>
              <p>Role: {selectedRow.role}</p>
              <p>Pod Designation: {selectedRow.podDesignation}</p>
              <p>Status: {selectedRow.status}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Users;
