import { Grid } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";

const UserProfile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}></Grid>
    </Grid>
  );
};

export default UserProfile;
