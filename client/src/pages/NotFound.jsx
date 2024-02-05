import { Box, CircularProgress, Stack } from "@mui/material";
import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    if (window.location.href.includes("Knowledgebase/")) {
      const timerId = setTimeout(() => {
        window.location.reload();
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, []);

  if (window.location.href.includes("Knowledgebase/")) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <p className="text-red-600 text-center center text-9xl">404</p>
          <p className="text-red-600 text-center center text-9xl">Not Found</p>
        </Stack>
      </Box>
    );
  }
};

export default NotFound;
