import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const DeleteUser = (params) => {
  const { selectedRowsDelete, deleteClicked, handleDeleteClicked } = params;
  const [deleteCount, setDeleteCount] = useState(0);

  const handleOnDelete = async () => {
    Promise.all(
      await selectedRowsDelete.map(async (user_id) => {
        const site = import.meta.env.VITE_SITE;
        const result = await axios.delete(
          `http://${site}:3000/api/user/${user_id}`
        );

        if (result.status === 200) {
          setDeleteCount(deleteCount + 1);
        }
      })
    ).then(() => {
      handleDeleteClicked();
      window.location.reload();
    });
  };

  return (
    <>
      <Dialog
        open={deleteClicked}
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
            {selectedRowsDelete?.length === 1
              ? "Are you sure you want to delete this user?"
              : "Are you sure you want to delete the selected users?"}
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClicked}
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
    </>
  );
};

export default DeleteUser;
