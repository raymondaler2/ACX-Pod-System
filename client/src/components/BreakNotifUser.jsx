import { Avatar, Box, Button, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Divider from "@mui/material/Divider";
import user from "./../assets/user.png";
import { Link } from "react-router-dom";
import UserProfile from "./../pages/UserProfile.jsx";

const BreakNotifUser = () => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            paddingRight: "40px",
            paddingLeft: "40px",
            paddingTop: "0px",
            paddingBottom: "0px",
            marginRight: "30px",
            backgroundColor: "#F05524",
            "&:hover": {
              backgroundColor: "#F05524",
            },
          }}
          variant="contained"
        >
          On A Break
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton
          aria-label="filter"
          style={{
            marginLeft: "10px",
            color: "black",
          }}
          onClick={() => {}}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="filter"
          style={{
            marginLeft: "10px",
          }}
          onClick={() => {}}
        >
          <Link to={`/UserProfile`}>
            <Avatar alt="User" src={user} />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};

export default BreakNotifUser;
