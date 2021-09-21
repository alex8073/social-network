import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";

const Preloader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Preloader;
