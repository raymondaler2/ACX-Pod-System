import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)({
  borderRadius: "20px",
  padding: "10px",
});

const CreateSop = (props) => {
  const { createClicked, handleClose } = props;

  const [sopData, setSopData] = useState({
    sop_title: "",
    service_tag: "",
    sop_description: "",
    user_id: "",
    milestones: [],
    comments: [],
  });

  const handleSopTitleChange = (e) => {
    setSopData({ ...sopData, sop_title: e.target.value });
  };

  const handleServiceTagChange = (e) => {
    setSopData({ ...sopData, service_tag: e.target.value });
  };

  const handleSopDescriptionChange = (e) => {
    setSopData({ ...sopData, sop_description: e.target.value });
  };

  const handleUserIdChange = (e) => {
    setSopData({ ...sopData, user_id: e.target.value });
  };

  const handleMilestonesChange = (e) => {
    setSopData({ ...sopData, milestones: e.target.value });
  };

  const handleCommentsChange = (e) => {
    setSopData({ ...sopData, comments: e.target.value });
  };

  const handleSubmit = () => {
    console.log(sopData);
  };

  return (
    <>
      <Dialog
        open={createClicked}
        onClose={handleClose}
        PaperComponent={(props) => <StyledPaper {...props} />}
      >
        <DialogTitle>
          <p className="font-bold text-[20px] mb-[20px]">Create SOP</p>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="SOP Title"
            value={sopData.sop_title}
            onChange={handleSopTitleChange}
          />
          <TextField
            variant="outlined"
            label="Service Tag"
            value={sopData.service_tag}
            onChange={handleServiceTagChange}
          />
          <TextField
            variant="outlined"
            label="SOP Description"
            value={sopData.sop_description}
            onChange={handleSopDescriptionChange}
          />
          <TextField
            variant="outlined"
            label="User ID"
            value={sopData.user_id}
            onChange={handleUserIdChange}
          />
          <TextField
            variant="outlined"
            label="Milestones"
            value={sopData.milestones}
            onChange={handleMilestonesChange}
          />
          <TextField
            variant="outlined"
            label="Comments"
            value={sopData.comments}
            onChange={handleCommentsChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateSop;
