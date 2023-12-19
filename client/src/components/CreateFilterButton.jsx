import { Box, Button, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import CreateSop from "./CreateSop.jsx";

const CreateFilterButton = () => {
  const [createClicked, setCreateClicked] = useState(false);

  const handleCreateClick = () => {
    setCreateClicked(true);
  };

  const handleClose = () => {
    setCreateClicked(false);
  };

  return (
    <Box className="bg-white  max-w-[170px] py-[10px] px-[20px] rounded-[3.5rem]">
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{ textTransform: "none", color: "#17A1FA", paddingRight: "20px" }}
          onClick={handleCreateClick}
        >
          <AddOutlinedIcon />
          Create
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton
          color="black"
          aria-label="filter"
          style={{
            marginLeft: "5px",
          }}
          onClick={() => {}}
        >
          <FilterAltOutlinedIcon sx={{ color: "black" }} />
        </IconButton>
        <CreateSop
          createClicked={createClicked}
          handleClose={handleClose}
          handleCreateClick={handleCreateClick}
        />
      </Box>
    </Box>
  );
};

export default CreateFilterButton;
