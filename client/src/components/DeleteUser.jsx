import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Alert as MuiAlert,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const DeleteUser = (params) => {
  const { selectedRowsDelete, deleteClicked, handleDeleteClicked } = params;
  const [deleteCount, setDeleteCount] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [snackbarOpenDeleted, setSnackbarOpenDeleted] = useState(false);

  const handleOnDelete = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      setSnackbarOpenDeleted(true);
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
          {isloading && <LinearProgress sx={{ marginTop: "40px" }} />}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isloading}
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
            disabled={isloading}
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
          handleDeleteClicked();
          setTimeout(() => {
            window.location.reload();
          }, 500);
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
            handleDeleteClicked();
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
          severity="success"
        >
          {selectedRowsDelete?.length === 1
            ? "Operation complete. User successfully deleted."
            : "Operation complete. Selected Users successfully deleted."}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default DeleteUser;
