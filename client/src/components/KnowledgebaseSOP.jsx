import { Grid, Box } from "@mui/material";
import SopCardBig from "./SopCardBig.jsx";
import SopCommentsActLog from "./SopCommentsActLog.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./../components/Footer.jsx";

const KnowledgebaseSOP = (props) => {
  const { id } = props;
  const [data, setData] = useState({});

  const fetchSopData = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:4000/api/sop/${id}`);
    setData(response.data);
  };

  useEffect(() => {
    fetchSopData();
  }, []);

  return (
    <>
      {!(Object.keys(data).length === 0) && (
        <Grid container>
          <Grid item xs={8}>
            <SopCardBig data={data} />
          </Grid>
          <Grid item xs={4}>
            <SopCommentsActLog data={data} />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                marginLeft: "2rem",
              }}
            >
              <Footer />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default KnowledgebaseSOP;
