import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CreateUser from "./CreateUser.jsx";

function CreateButtonUsers(props) {
  const { createClicked, setCreateClicked } = props;

  const handleCreateClick = () => {
    setCreateClicked(true);
  };

  const handleClose = () => {
    setCreateClicked(false);
  };

  return (
    <Box className="bg-white  max-w-[120px] py-[10px] px-[20px] rounded-[3.5rem]">
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            textTransform: "none",
            color: "#17A1FA",
            paddingRight: "20px",
          }}
          onClick={handleCreateClick}
        >
          <AddOutlinedIcon />
          Create
        </Button>
        <CreateUser
          createClicked={createClicked}
          handleClose={handleClose}
          handleCreateClick={handleCreateClick}
        />
      </Box>
    </Box>
  );
}

export default CreateButtonUsers;
