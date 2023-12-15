import { Box, Grid } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";
import CreateFilterButton from "./../components/CreateFilterButton.jsx";
import SearchbarWide from "./../components/SearchbarWide.jsx";
import BreakNotifUser from "./../components/BreakNotifUser.jsx";

const Knowledgebase = () => {
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
          <Grid container spacing={2}>
            <Grid item xs={1.5}>
              <CreateFilterButton />
            </Grid>
            <Grid item xs={7.5}>
              <SearchbarWide />
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <BreakNotifUser />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Knowledgebase;
