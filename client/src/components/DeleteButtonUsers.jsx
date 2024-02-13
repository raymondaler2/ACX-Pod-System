import { Box, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const DeleteButtonUsers = (params) => {
  const { selectedRowsDelete } = params;
  return (
    <Box className="bg-white ml-2 py-[10px] px-[10px] rounded-[3.5rem]">
      <IconButton disabled={!selectedRowsDelete.length}>
        <DeleteOutlineOutlinedIcon
          sx={{
            color: !selectedRowsDelete.length ? "gray" : "#f44336",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default DeleteButtonUsers;
