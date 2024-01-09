import { Grid, Paper, Stack, TextField, Button } from "@mui/material";
import NavSideBar from "./../components/NavSideBar.jsx";

const CreateUser = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1.9}>
        <NavSideBar />
      </Grid>
      <Grid item xs={10.1}>
        <Paper
          elevation={3}
          sx={{
            padding: 16,
            marginTop: "1.25rem",
            marginLeft: 4,
            marginRight: 4,
            borderRadius: "3.5rem",
          }}
        >
          <Stack spacing={2}>
            {/* User Creation Form */}
            <TextField label="First Name" variant="outlined" fullWidth />
            <TextField label="Last Name" variant="outlined" fullWidth />
            <TextField
              label="Birthday"
              variant="outlined"
              type="date"
              fullWidth
            />
            <TextField label="Email Address" variant="outlined" fullWidth />
            <TextField label="Contact Number" variant="outlined" fullWidth />
            <TextField label="Emergency Number" variant="outlined" fullWidth />
            <TextField label="Username" variant="outlined" fullWidth />
            <TextField label="Position" variant="outlined" fullWidth />
            <Button variant="contained" color="primary">
              Create User
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
