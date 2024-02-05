import { Box, CircularProgress, Divider, Grid } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";
import CreateFilterButton from "./../components/CreateFilterButton.jsx";
import SearchbarWide from "./../components/SearchbarWide.jsx";
import BreakNotifUser from "./../components/BreakNotifUser.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import SopCard from "./../components/SopCard.jsx";
import { useEffect, useState } from "react";
import Footer from "./../components/Footer.jsx";
import axios from "axios";

const Knowledgebase = () => {
  const [sopData, setSopData] = useState([]);

  const fetchSopData = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:4000/api/sop`);
    setSopData(response.data);
  };

  useEffect(() => {
    fetchSopData();
  }, []);

  useEffect(() => {
    if (Object.keys(sopData).length === 0) {
      const intervalId = setInterval(() => {
        if (Object.keys(sopData).length === 0) {
          fetchSopData();
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [sopData]);

  const hasFeaturedSop = sopData.some((sop) => sop.featured);

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
            marginLeft: "2rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1.5} justifyContent="flex-start">
              <CreateFilterButton />
            </Grid>
            <Grid item xs={7.5}>
              <SearchbarWide />
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Box sx={{ marginRight: "30px" }}>
                <BreakNotifUser />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <PerfectScrollbar>
            <Box
              sx={
                hasFeaturedSop
                  ? {
                      minHeight: "47rem",
                      marginLeft: "2rem",
                    }
                  : {
                      minHeight: "48.5rem",
                      marginLeft: "2rem",
                    }
              }
            >
              {hasFeaturedSop && (
                <p className="font-bold text-[20px] mb-[20px]">Featured SOP</p>
              )}
              <Grid
                container
                rowSpacing={3}
                columnSpacing={0}
                sx={{ maxHeight: "50vh", minHeight: "50vh" }}
              >
                {sopData.length === 0 && (
                  <Box
                    sx={{
                      marginLeft: "50rem",
                      minHeight: "50rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                {sopData.map((sop) => {
                  if (sop.featured) {
                    return <SopCard sop={sop} />;
                  }
                })}
                {hasFeaturedSop && (
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                )}
                {sopData.map((sop) => {
                  if (!sop.featured) {
                    return <SopCard sop={sop} />;
                  }
                })}
              </Grid>
            </Box>
          </PerfectScrollbar>
        </Box>
        <Box
          sx={{
            marginLeft: "2rem",
          }}
        >
          <Footer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Knowledgebase;
