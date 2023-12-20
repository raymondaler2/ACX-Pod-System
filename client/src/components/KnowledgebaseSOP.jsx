import { Grid, CircularProgress } from "@mui/material";
import SopCardBig from "./SopCardBig.jsx";
import SopCommentsActLog from "./SopCommentsActLog.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const KnowledgebaseSOP = (props) => {
  const { id } = props;
  const [data, setData] = useState({});

  const fetchSopData = async () => {
    const response = await axios.get(`http://localhost:4000/api/sop/${id}`);
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
        </Grid>
      )}
    </>
  );
};

export default KnowledgebaseSOP;
