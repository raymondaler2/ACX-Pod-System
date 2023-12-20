import {
  Card,
  Button,
  ThemeProvider,
  Grid,
  Box,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Link } from "react-router-dom";
import { Str } from "@supercharge/strings";
import MilestoneDetails from "./MilestoneDetails.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditSop from "./EditSop.jsx";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const SopCardBig = (props) => {
  const { data } = props;
  const { milestones } = data;
  const [editClicked, setEditClicked] = useState(false);
  const [publisher, SetPublisher] = useState("");
  const dateObjectPublished = new Date(data?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDatePublished = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(dateObjectPublished);
  const formattedTimePublished = dateObjectPublished.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dateObjectEdited = new Date(data?.updatedAt);
  const formattedDateEdited = new Intl.DateTimeFormat("en-US", options).format(
    dateObjectEdited
  );
  const formattedTimeEdited = dateObjectEdited.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleEditClick = () => {
    setEditClicked(true);
  };

  const handleClose = () => {
    setEditClicked(false);
  };

  const publisherName = async () => {
    const user = await axios.get(
      `http://localhost:3000/api/user/${data?.user_id}`
    );
    SetPublisher(`${user?.data.work_email}`);
  };

  useEffect(() => {
    publisherName();
  }, []);

  return (
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
      >
        <Button
          startIcon={<ArrowBackIosNewOutlinedIcon />}
          variant="text"
          sx={{
            textTransform: "none",
            color: "black",
          }}
        >
          <Link to={`/Knowledgebase`}>Back to Knowledgebase</Link>
        </Button>
        <IconButton sx={{ marginLeft: "56rem" }} onClick={handleEditClick}>
          <EditOutlinedIcon sx={{ color: "black" }} />
        </IconButton>
        <PerfectScrollbar
          style={{
            maxHeight: "82vh",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "10px",
            }}
          >
            <Grid item xs={8}>
              <Stack direction="row">
                <h1 className="font-black text-[30px]">
                  {Str(data?.sop_title).limit(75, " ...").get()}
                </h1>
                {data.featured ? (
                  <StarOutlinedIcon
                    sx={{
                      color: "#FAC710",
                      marginTop: "15px",
                      marginLeft: "20px",
                    }}
                  />
                ) : (
                  <StarBorderOutlinedIcon
                    sx={{
                      marginTop: "15px",
                      marginLeft: "20px",
                    }}
                  />
                )}
              </Stack>
              <Grid
                sx={{
                  backgroundColor: "#FAC710",
                  marginTop: "10px",
                  marginRight: "85%",
                  padding: "5px 10px",
                  borderRadius: "20px",
                }}
              >
                <p className="text-center text-[14px] font-medium">
                  {Str(data?.service_tag).limit(8, " ...").get()}
                </p>
              </Grid>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                <h2 className="text-[24px] font-bold">Introduction</h2>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                <p className="text-[14px]">{data?.sop_description}</p>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                }}
              >
                {milestones?.map((data) => {
                  return <MilestoneDetails data={data} />;
                })}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  paddingLeft: "50px",
                  paddingRight: "0px",
                }}
              >
                <h2 className="text-[18px] font-bold mb-[2vh]">
                  Document Info
                </h2>
                <Grid container>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] font-bold">Publisher:</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px]">{publisher}</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] font-bold mt-[10px]">
                      Published Date:
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] mt-[10px]">
                      {formattedDatePublished}
                    </h2>
                    <h2 className="text-[14px]">{formattedTimePublished}</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] font-bold mt-[10px]">
                      Last Edited:
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] mt-[10px]">
                      {formattedDateEdited}
                    </h2>
                    <h2 className="text-[14px] ">{formattedTimeEdited}</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] font-bold mt-[10px]">
                      Edited by:
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] mt-[10px]">{publisher}</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] font-bold mt-[10px]">
                      File Version:
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <h2 className="text-[14px] mt-[10px]">{`Version ${
                      data?.__v + 1
                    }`}</h2>
                  </Grid>
                </Grid>
                <h2 className="text-[18px] font-bold mt-[10vh] mb-2">
                  Related SOP
                </h2>
                <List className="mb-5">
                  <ListItem disablePadding>
                    <ListItemButton selected={true}>
                      <ListItemText primary="SOP Title 1" />
                    </ListItemButton>
                  </ListItem>
                </List>
                <h2 className="text-[18px] font-bold mb-2">Tags</h2>
                <Chip label="Service Tag" />
              </Box>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Box>
      <EditSop
        editClicked={editClicked}
        handleClose={handleClose}
        handleEditClick={handleEditClick}
        data={data}
      />
    </Card>
  );
};

export default SopCardBig;
