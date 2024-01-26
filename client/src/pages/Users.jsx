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
import { useEffect, useState } from "react";
import SearchFilter from "./../components/SearchFilter.jsx";
import CreateButtonUsers from "../components/CreateButtonUsers.jsx";
import axios from "axios";

const Users = () => {
  const [rows, SetRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      renderCell: (params) => <strong>{params.row.lastName}</strong>,
      headerClassName: "font-black",
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      renderCell: (params) => <strong>{params.row.firstName}</strong>,
      headerClassName: "font-black",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      renderCell: (params) => <span>{params.row.position}</span>,
      headerClassName: "font-black",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => <span>{params.row.role}</span>,
      headerClassName: "font-black",
    },
    {
      field: "podDesignation",
      headerName: "Pod Designation",
      flex: 1,
      renderCell: (params) => <span>{params.row.podDesignation}</span>,
      headerClassName: "font-black",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "font-black",
    },
  ];

  const mapUserData = (userData) => {
    return userData.map((user, index) => ({
      id: index + 1,
      lastName: user.last_name,
      firstName: user.first_name,
      position: user.position.position,
      role: user.role.role,
      podDesignation: user.pod_designation,
      status: "Active", // TEMP
    }));
  };

  const fetchUsers = async () => {
    try {
      const site = import.meta.env.VITE_SITE;
      const response = await axios.get(`http://${site}:3000/api/user/`);
      const mappedRows = mapUserData(response.data);
      SetRows(mappedRows);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}>
        <Box
          sx={{
            marginTop: "40px",
            marginBottom: "1rem",
            marginLeft: "50px",
          }}
        >
          <p className="text-5xl font-bold mb-4">Users</p>
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              <CreateButtonUsers />
            </Grid>
            <Grid item xs={7.5}></Grid>
            <Grid item xs={3} container justifyContent="flex-end">
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
                  sx={{ border: "none", minHeight: "41.5rem" }}
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
