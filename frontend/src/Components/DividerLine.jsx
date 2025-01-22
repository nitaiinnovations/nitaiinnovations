import { Box, Divider } from "@mui/material";
import React from "react";

export default function DividerLine() {
  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <br />
      <br />
      <Divider sx={{ width: "90%" }} />
      <Divider sx={{ width: "90%" }} />
      <Divider sx={{ width: "90%" }} />
      <br />
      <br />
    </Box>
  );
}
