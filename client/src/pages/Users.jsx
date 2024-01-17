import { Box, Card, Grid } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";

const Users = () => {
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
            </Grid>
          </Grid>
        </Box>
        <Card
          sx={{
            margin: "25px",
            borderRadius: "40px",
            minHeight: "95vh",
          }}
        >
          <Box
            sx={{
              margin: "45px",
              maxHeight: "100%",
              overflowY: "auto",
            }}
          ></Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Users;
