import { Box, Button, CircularProgress, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import acx_icon_nav from "./../assets/acx_icon_nav.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const NavSideBar = () => {
  const [userData, setUserData] = useState({});
  const user_id = localStorage.getItem("_id");

  const fetchUser = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:3000/api/user/${user_id}`);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      const intervalId = setInterval(() => {
        if (Object.keys(userData).length === 0) {
          fetchUser();
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [userData]);

  return (
    <Paper
      elevation={3}
      className="bg-white my-5 w-full "
      sx={{
        borderTopLeftRadius: "3.5rem",
        borderTopRightRadius: "3.5rem",
        marginTop: "1.25rem",
        marginLeft: "1.5rem",
        marginRight: "2rem",
        minHeight: "100vh",
      }}
    >
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Stack>
          <Stack justifyContent="center" alignItems="center" pt={10} pb={10}>
            <img src={acx_icon_nav} alt="acx_icon_nav" />
          </Stack>
          <Box>
            {Object.entries(userData).length > 0 ? (
              <>
                <Stack direction="row" width="100%">
                  <Button
                    component={Link}
                    to="/"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <HomeOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Home
                    </span>
                  </Button>
                </Stack>
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/Portfolio"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <FolderOpenOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Portfolio
                    </span>
                  </Button>
                </Stack>
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/Knowledgebase"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <AutoStoriesOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Knowledgebase
                    </span>
                  </Button>
                </Stack>
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/Clients"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <PeopleAltOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Clients
                    </span>
                  </Button>
                </Stack>
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/Reports"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <FlagOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Reports
                    </span>
                  </Button>
                </Stack>
                {Object.entries(userData).length > 0 &&
                userData?.role.role === "Admin" ? (
                  <Stack direction="row" width="100%" pt={1} pb={1}>
                    <Button
                      component={Link}
                      to="/Users"
                      sx={{ textTransform: "none", color: "black" }}
                    >
                      <AccountCircleOutlinedIcon />
                      <span
                        className="font-bold ml-[20px] text-base"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Users
                      </span>
                    </Button>
                  </Stack>
                ) : (
                  <></>
                )}
                {Object.entries(userData).length > 0 &&
                userData?.role.role === "Admin" ? (
                  <div className="mt-[29.6vh]">&nbsp;</div>
                ) : (
                  <div className="mt-[35vh]">&nbsp;</div>
                )}
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/HelpAndSupport"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <SupportOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Help & Support
                    </span>
                  </Button>
                </Stack>
                <Stack direction="row" width="100%" pt={1} pb={1}>
                  <Button
                    component={Link}
                    to="/Settings"
                    sx={{ textTransform: "none", color: "black" }}
                  >
                    <SettingsOutlinedIcon />
                    <span
                      className="font-bold ml-[20px] text-base"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Settings
                    </span>
                  </Button>
                </Stack>
              </>
            ) : (
              <Box
                sx={{
                  minHeight: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NavSideBar;
