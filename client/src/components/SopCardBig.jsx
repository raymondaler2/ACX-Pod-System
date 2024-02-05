import {
  Card,
  Button,
  Grid,
  Box,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Chip,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert as MuiAlert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const SopCardBig = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const { milestones } = data;
  const [snackbarOpenDeleted, setSnackbarOpenDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [publisher, SetPublisher] = useState("");
  const [editor, SetEditor] = useState("");
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

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleClose = () => {
    setEditClicked(false);
  };

  const handleOnDelete = async () => {
    const site = import.meta.env.VITE_SITE;
    const result = await axios.delete(
      `http://${site}:4000/api/sop/${data?._id}`
    );

    if (result.status === 200) {
      setSnackbarOpenDeleted(true);
    }
  };

  const publisherName = async () => {
    const site = import.meta.env.VITE_SITE;
    const user = await axios.get(
      `http://${site}:3000/api/user/${data?.user_id}`
    );
    SetPublisher(`${user?.data.first_name} ${user?.data.last_name}`);
  };

  const editorName = async () => {
    if (data?.edit_user_id.length > 0) {
      const site = import.meta.env.VITE_SITE;
      const user = await axios.get(
        `http://${site}:3000/api/user/${data?.edit_user_id}`
      );

      SetEditor(`${user?.data.first_name} ${user?.data.last_name}`);
      return;
    }
    SetEditor(`None`);
  };

  useEffect(() => {
    publisherName();
    editorName();
  }, []);

  useEffect(() => {
    if (publisher.trim().length === 0 && editor.trim().length === 0) {
      const intervalId = setInterval(() => {
        if (
          Object.keys(publisher).length === 0 &&
          Object.keys(editor).length === 0
        ) {
          publisherName();
          editorName();
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [publisher, editor]);

  return (
    <Card
      sx={{
        margin: "25px",
        marginBottom: "0px",
        borderRadius: "40px",
        minHeight: "89vh",
      }}
    >
      <Box
        sx={{
          margin: "45px",
          marginBottom: "0px",
          marginRight: "0px",
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Stack direction="row">
          <Button
            startIcon={<ArrowBackIosNewOutlinedIcon />}
            variant="text"
            sx={{
              minWidth: "13rem",
              maxHeight: "40px",
              textTransform: "none",
              color: "black",
              marginRight: "53.9rem",
            }}
          >
            <Link to={`/Knowledgebase`}>Back to Knowledgebase</Link>
          </Button>
          <IconButton
            color="#f44336"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            <DeleteOutlineOutlinedIcon sx={{ color: "#f44336" }} />
          </IconButton>
          <IconButton
            color="#388e3c"
            variant="contained"
            onClick={handleEditClick}
          >
            <EditOutlinedIcon sx={{ color: "#388e3c" }} />
          </IconButton>
        </Stack>
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
                  {data?.service_tag}
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
                  marginRight: "45px",
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
                    {publisher.trim().length > 0 ? (
                      <h2 className="text-[14px]">{publisher}</h2>
                    ) : (
                      <CircularProgress size={10} />
                    )}
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
                    {editor.trim().length > 0 ? (
                      <h2 className="text-[14px] mt-[10px]">{editor}</h2>
                    ) : (
                      <CircularProgress size={10} sx={{ marginTop: "10px" }} />
                    )}
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
      <Dialog
        open={confirmDelete}
        PaperProps={{
          style: {
            minWidth: "50rem",
            borderRadius: "40px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>
          <p className="font-bold text-[28px] mb-[20px]">Confirmation</p>
        </DialogTitle>
        <DialogContent>
          <p className="mt-[5px] mb-[5px]">
            Are you sure you want to delete this user?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDelete(false);
            }}
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
            }}
          >
            No
          </Button>
          <Button
            onClick={handleOnDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "30px",
              paddingLeft: "30px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpenDeleted}
        autoHideDuration={1000}
        onClose={() => {
          setSnackbarOpenDeleted(false);
          navigate("/Knowledgebase");
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          marginTop: "5rem",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            setSnackbarOpenDeleted(false);
          }}
          severity="success"
        >
          SOP Deleted
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default SopCardBig;
