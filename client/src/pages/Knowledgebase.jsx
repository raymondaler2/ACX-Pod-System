import { Box, Divider, Grid } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";
import CreateFilterButton from "./../components/CreateFilterButton.jsx";
import SearchbarWide from "./../components/SearchbarWide.jsx";
import BreakNotifUser from "./../components/BreakNotifUser.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import SopCard from "./../components/SopCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Knowledgebase = () => {
  const [sopData, setSopData] = useState([]);

  const fetchSopData = async () => {
    const response = await axios.get("http://localhost:4000/api/sop");
    setSopData(response.data);
  };

  useEffect(() => {
    fetchSopData();
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
        <Box>
          <PerfectScrollbar
            style={{
              marginRight: "20px",
            }}
          >
            <Box
              sx={{
                minHeight: "47rem",
                marginLeft: "3rem",
              }}
            >
              <p className="font-bold text-[20px] mb-[20px]">Featured SOP</p>
              {sopData?.length === 0 ? (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minHeight: "50vh" }}
                >
                  <Grid item xs={3}>
                    <h1 className="text-center">No Results</h1>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  rowSpacing={3}
                  columnSpacing={0}
                  sx={{ maxHeight: "50vh" }}
                >
                  {sopData.map((sop) => {
                    if (sop.featured) {
                      return <SopCard sop={sop} />;
                    }
                  })}
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                  {sopData.map((sop) => {
                    if (!sop.featured) {
                      return <SopCard sop={sop} />;
                    }
                  })}
                </Grid>
              )}
            </Box>
          </PerfectScrollbar>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Knowledgebase;
