import { Box, Button, Grid, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        marginRight: "2rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={1.5} justifyContent="flex-start">
          <p className="text-gray-400 mt-[2rem]">Version 1.0</p>
        </Grid>
        <Grid item xs={10.5} container justifyContent="flex-end">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "1.5rem",
            }}
          >
            <Button
              variant="text"
              sx={{
                textTransform: "none",
              }}
            >
              <Link to={location.pathname}>
                <p className="text-gray-400">Developers</p>
              </Link>
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
              }}
            >
              <Link to={location.pathname}>
                <p className="text-gray-400">Terms & Conditions</p>
              </Link>
            </Button>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
              }}
            >
              <Link to={location.pathname}>
                <p className="text-gray-400">Privacy Policy</p>
              </Link>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
