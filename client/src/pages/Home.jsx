import { Grid, Stack } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}>
        <Stack>
          <div>Homepage PAGE</div>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
