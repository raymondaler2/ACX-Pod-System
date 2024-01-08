import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputLabel,
  Grid,
  Stack,
  Autocomplete,
  IconButton,
  Divider,
  InputAdornment,
  Snackbar,
  Alert as MuiAlert,
  ToggleButton,
} from "@mui/material";
import axios from "axios";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Textarea from "@mui/joy/Textarea";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const EditSop = (props) => {
  const filter = createFilterOptions();
  const { editClicked, handleClose, handleEditClick, data } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [serviceTag, setServiceTag] = useState([]);
  const [sopFeatured, setSopFeatured] = useState(false);
  const [sopTitle, setSopTitle] = useState("");
  const [sopServiceTag, setSopServiceTag] = useState("");
  const [sopDescription, setSopDescription] = useState("");
  const [sopPageTwo, setSopPageTwo] = useState(false);
  const [sopMilestones, setSopMilestones] = useState([
    {
      title: "",
      description: "",
      checklists: [
        {
          title: "",
        },
      ],
    },
  ]);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [checklistTitle, setChecklistTitle] = useState("");

  const handleSave = async () => {
    const sop = {
      user_id: localStorage.getItem("_id"),
      featured: sopFeatured,
      sop_title: sopTitle,
      service_tag: sopServiceTag.service_tag,
      sop_description: sopDescription,
      milestones: sopMilestones.map((milestone) => ({
        milestone_title: milestone.title,
        milestone_description: milestone.description,
        checklist: milestone.checklists.map((checklist) => ({
          checklist_title: checklist.title,
          checklist_status: false,
        })),
      })),
    };

    const site = import.meta.env.VITE_SITE;
    const result = await axios.put(
      `http://${site}:4000/api/sop/${data._id}`,
      sop
    );
    if (result.status === 200) {
      setSopPageTwo(false);
      setSnackbarOpen(true);
    }
  };

  const handleFeatured = () => {
    setSopFeatured(!sopFeatured);
  };

  const handleAddChecklist = (milestoneIndex) => {
    const newChecklist = { title: checklistTitle };
    const updatedMilestones = [...sopMilestones];
    updatedMilestones[milestoneIndex].checklists.push(newChecklist);
    setSopMilestones(updatedMilestones);
    setChecklistTitle("");
  };

  const handleRemoveChecklist = (milestoneIndex, checklistIndex) => {
    const updatedMilestones = [...sopMilestones];
    updatedMilestones[milestoneIndex].checklists.splice(checklistIndex, 1);
    setSopMilestones(updatedMilestones);
  };

  const handleChecklistChange = (milestoneIndex, checklistIndex, value) => {
    const updatedMilestones = [...sopMilestones];
    updatedMilestones[milestoneIndex].checklists[checklistIndex].title = value;
    setSopMilestones(updatedMilestones);
  };

  const handleMilestoneButtonClick = (index) => {
    setActiveMilestone(index);
    setMilestoneDescription(sopMilestones[index]?.description || "");
  };

  const handleMilestoneDescriptionChange = (e) => {
    setMilestoneDescription(e.target.value);

    const updatedMilestones = [...sopMilestones];
    updatedMilestones[activeMilestone].description = e.target.value;
    setSopMilestones(updatedMilestones);
  };

  const handleSopTitleChange = (e) => {
    setSopTitle(e.target.value);
  };

  const handleSopDescriptionChange = (e) => {
    setSopDescription(e.target.value);
  };

  const handleNext = () => {
    handleClose();
    setSopPageTwo(true);
  };

  const handleAddMilestone = () => {
    setSopMilestones([
      ...sopMilestones,
      { title: "", description: "", checklists: [{ title: "" }] },
    ]);
  };

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = [...sopMilestones];
    updatedMilestones.splice(index, 1);
    setSopMilestones(updatedMilestones);
  };

  const handleMilestoneChange = (index, value) => {
    const updatedMilestones = [...sopMilestones];
    updatedMilestones[index].title = value;
    setSopMilestones(updatedMilestones);
  };

  const handleCancelclick = () => {
    fetchSopData();
    handleClose();
  };

  const handleCancelclickPageTwo = () => {
    setSopPageTwo(false);
    fetchSopData();
  };

  const fetchServiceTag = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:4000/api/sopServiceTag`);
    setServiceTag(response.data);
  };

  const fetchSopData = () => {
    setSopFeatured(data.featured);
    setSopTitle(data.sop_title);
    setSopServiceTag(data.service_tag);
    setSopDescription(data.sop_description);
    const transformedMilestones = data.milestones.map((milestone, index) => {
      if (index === 0) {
        setMilestoneDescription(milestone.milestone_description);
      }
      return {
        title: milestone.milestone_title,
        description: milestone.milestone_description,
        checklists: milestone.checklist.map((checklist) => ({
          title: checklist.checklist_title,
        })),
      };
    });
    setSopMilestones(transformedMilestones);
  };

  useEffect(() => {
    fetchServiceTag();
    fetchSopData();
  }, []);

  const customDialogStyles = {
    borderRadius: "40px",
    padding: "10px",
    minWidth: "80rem",
  };

  return (
    <>
      {serviceTag && (
        <Dialog
          maxWidth="xl"
          open={editClicked}
          PaperProps={{ style: customDialogStyles }}
        >
          <DialogTitle>
            <Grid container>
              <Grid item xs={11.7}>
                <Stack direction="row">
                  <p className="font-bold text-[28px] mb-[20px]">Edit SOP</p>
                  <ToggleButton
                    onClick={handleFeatured}
                    sx={{
                      marginBottom: "20px",
                      border: "none",
                    }}
                  >
                    {!sopFeatured ? (
                      <StarBorderOutlinedIcon />
                    ) : (
                      <StarOutlinedIcon
                        sx={{
                          color: "#FAC710",
                        }}
                      />
                    )}
                  </ToggleButton>
                </Stack>
              </Grid>
              <Grid item xs={0.1}>
                <IconButton
                  color="black"
                  variant="contained"
                  onClick={handleCancelclick}
                >
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack>
                  <InputLabel
                    htmlFor="sop-title"
                    sx={{
                      fontWeight: "Bold",
                      marginBottom: "5px",
                    }}
                  >
                    SOP Title
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="sop-title"
                    variant="outlined"
                    label="Enter Title"
                    value={sopTitle}
                    onChange={handleSopTitleChange}
                  />
                  <InputLabel
                    htmlFor="service-tag"
                    sx={{
                      fontWeight: "Bold",
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    Service Tag
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    id="sop-service-tag"
                    value={sopServiceTag}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        setSopServiceTag({
                          service_tag: newValue,
                        });
                      } else if (newValue && newValue.inputValue) {
                        setSopServiceTag({
                          service_tag: newValue.inputValue,
                        });
                      } else {
                        setSopServiceTag(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      const isExisting = options.some(
                        (option) => inputValue === option.service_tag
                      );

                      if (inputValue !== "" && !isExisting) {
                        filtered.push({
                          inputValue,
                          service_tag: `Add "${inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={serviceTag}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.service_tag;
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option.service_tag}</li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Tag"
                      />
                    )}
                  />
                  <InputLabel
                    htmlFor="sop-description"
                    sx={{
                      fontWeight: "Bold",
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    SOP Description
                  </InputLabel>
                  <Textarea
                    minRows={2}
                    maxRows={4}
                    placeholder="Enter Description"
                    size="lg"
                    onChange={handleSopDescriptionChange}
                    value={sopDescription}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  <Grid container>
                    <Grid item xs={10.75}>
                      <InputLabel
                        htmlFor="milestones"
                        sx={{
                          fontWeight: "Bold",
                          marginBottom: "5px",
                        }}
                      >
                        Milestones
                      </InputLabel>
                    </Grid>
                    <Grid item xs={1.25}>
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={handleAddMilestone}
                        sx={{
                          marginTop: "-15px",
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {sopMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center mb-5">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label={`Enter Milestone ${index + 1} Title`}
                        value={milestone.title}
                        onChange={(e) =>
                          handleMilestoneChange(index, e.target.value)
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => handleRemoveMilestone(index)}
                        className="cursor-pointer ml-2"
                      />
                    </div>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "flex-start", marginBottom: "20px" }}
          >
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                paddingRight: "40px",
                paddingLeft: "40px",
                paddingTop: "5px",
                paddingBottom: "5px",
                marginLeft: "15px",
                backgroundColor: "#B3B3B3",
                "&:hover": {
                  backgroundColor: "#B3B3B3",
                },
              }}
            >
              Next
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                paddingRight: "40px",
                paddingLeft: "40px",
                paddingTop: "5px",
                paddingBottom: "5px",
                marginLeft: "15px",
                backgroundColor: "#17A1FA",
                "&:hover": {
                  backgroundColor: "#17A1FA",
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        maxWidth="xl"
        open={sopPageTwo}
        PaperProps={{ style: customDialogStyles }}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={11.7}>
              <Stack direction="row">
                <p className="font-bold text-[28px] mb-[20px]">Edit SOP</p>
                <ToggleButton
                  onClick={handleFeatured}
                  sx={{
                    marginBottom: "20px",
                    border: "none",
                  }}
                >
                  {!sopFeatured ? (
                    <StarBorderOutlinedIcon />
                  ) : (
                    <StarOutlinedIcon
                      sx={{
                        color: "#FAC710",
                      }}
                    />
                  )}
                </ToggleButton>
              </Stack>
            </Grid>
            <Grid item xs={0.1}>
              <IconButton
                color="black"
                variant="contained"
                onClick={handleCancelclickPageTwo}
              >
                <CloseIcon sx={{ color: "black" }} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row">
            <Stack
              sx={{
                maxWidth: "30rem",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "0px",
                paddingRight: "40px",
              }}
            >
              <p className="font-bold text-[22px] mb-[5px]">{sopTitle}</p>
              <Grid
                sx={{
                  backgroundColor: "#FAC710",
                  maxWidth: "100px",
                  padding: "5px 10px",
                  borderRadius: "20px",
                }}
              >
                <p className="text-center text-[10px] font-bold">
                  {sopServiceTag?.service_tag || sopServiceTag}
                </p>
              </Grid>
              <p className="mt-[40px] mb-[40px]">{sopDescription}</p>
              <InputLabel
                sx={{
                  fontWeight: "Bold",
                  marginBottom: "5px",
                }}
              >
                Milestones
              </InputLabel>
              <Stack>
                {sopMilestones.map((milestone, index) => (
                  <Stack direction="row">
                    <Button
                      key={index}
                      variant={index === activeMilestone ? "contained" : "text"}
                      onClick={() => handleMilestoneButtonClick(index)}
                      sx={{
                        color: index === activeMilestone ? "white" : "black",
                        fontWeight: "bold",
                        alignContent: "left",
                        alignSelf: "left",
                        justifyContent: "left",
                        justifySelf: "left",
                        textAlign: "left",
                        marginBottom: "5px",
                        textTransform: "none",
                        minWidth: "24rem",
                        backgroundColor:
                          index === activeMilestone ? "#17A1FA" : "white",
                        "&:hover": {
                          backgroundColor:
                            index === activeMilestone ? "#17A1FA" : "white",
                        },
                      }}
                    >
                      {milestone.title}
                    </Button>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleRemoveMilestone(index)}
                      className="cursor-pointer mt-1 ml-5"
                    />
                  </Stack>
                ))}
              </Stack>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
              sx={{
                maxWidth: "50rem",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "60px",
              }}
            >
              {sopMilestones[activeMilestone] && (
                <Stack>
                  <p className="font-bold text-[22px] mb-[5px]">
                    {sopMilestones[activeMilestone].title}
                  </p>
                  <InputLabel
                    sx={{
                      fontWeight: "Bold",
                      marginBottom: "5px",
                    }}
                  >
                    Description
                  </InputLabel>
                  <Textarea
                    minRows={2}
                    maxRows={4}
                    placeholder="Enter Description"
                    size="lg"
                    onChange={handleMilestoneDescriptionChange}
                    value={milestoneDescription}
                    sx={{
                      minWidth: "40rem",
                      minHeight: "10rem",
                    }}
                  />
                  <InputLabel
                    sx={{
                      fontWeight: "Bold",
                      marginBottom: "5px",
                      marginTop: "20px",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={10.75}>
                        <InputLabel
                          sx={{
                            fontWeight: "Bold",
                            marginBottom: "5px",
                          }}
                        >
                          Checklist
                        </InputLabel>
                      </Grid>
                      <Grid item xs={1.25}>
                        <AddIcon
                          color="primary"
                          onClick={() => handleAddChecklist(activeMilestone)}
                          className="cursor-pointer ml-2"
                        />
                      </Grid>
                    </Grid>
                  </InputLabel>
                  <Stack>
                    {sopMilestones[activeMilestone].checklists.map(
                      (checklist, index) => (
                        <div key={index} className="flex items-center mb-5">
                          <TextField
                            fullWidth
                            variant="outlined"
                            label={`Enter Checklist ${index + 1} Title`}
                            value={checklist.title}
                            onChange={(e) =>
                              handleChecklistChange(
                                activeMilestone,
                                index,
                                e.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <TaskAltIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <DeleteIcon
                            color="error"
                            onClick={() =>
                              handleRemoveChecklist(activeMilestone, index)
                            }
                            className="cursor-pointer ml-4"
                          />
                        </div>
                      )
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "flex-start", marginBottom: "20px" }}
        >
          <Button
            onClick={() => {
              handleEditClick();
              setSopPageTwo(false);
            }}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
              backgroundColor: "#B3B3B3",
              "&:hover": {
                backgroundColor: "#B3B3B3",
              },
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              paddingRight: "40px",
              paddingLeft: "40px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginLeft: "15px",
              backgroundColor: "#17A1FA",
              "&:hover": {
                backgroundColor: "#17A1FA",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => {
          setSnackbarOpen(false);
          window.location.reload();
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
            setSnackbarOpen(false);
          }}
          severity="success"
        >
          SOP Sucessfully Edited
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default EditSop;
