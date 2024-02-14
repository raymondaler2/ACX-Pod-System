import { Box, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteUser from "./DeleteUser.jsx";
import { useState } from "react";

const DeleteButtonUsers = (params) => {
  const { selectedRowsDelete } = params;
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDeleteClicked = () => {
    setDeleteClicked(!deleteClicked);
  };

  return (
    <Box className="bg-white ml-2 py-[10px] px-[10px] rounded-[3.5rem]">
      <IconButton
        disabled={!selectedRowsDelete.length}
        onClick={handleDeleteClicked}
      >
        <DeleteOutlineOutlinedIcon
          sx={{
            color: !selectedRowsDelete.length ? "gray" : "#f44336",
          }}
        />
        <DeleteUser
          selectedRowsDelete={selectedRowsDelete}
          deleteClicked={deleteClicked}
          handleDeleteClicked={handleDeleteClicked}
        />
      </IconButton>
    </Box>
  );
};

export default DeleteButtonUsers;
