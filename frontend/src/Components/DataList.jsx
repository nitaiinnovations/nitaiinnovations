import { Box, Typography } from "@mui/material";
import React from "react";

function DataList({ data }) {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: "2.2rem !important",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        {data.title}
      </Typography>
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        {data.description}
      </Typography>
      <br />
      <Box sx={{ paddingLeft: "2rem" }}>
        <ul>
          {data.items.map((item, index) => (
            <Box key={index}>
              <li style={{ listStyleType: "disc", color: "#0959AA" }}>
                <Typography
                  variant="h2"
                  sx={{
                    marginTop: "1rem",
                    textIndent: "0rem !important",
                    color: (theme) =>
                      theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
                  }}
                >
                  {item.title}
                </Typography>
              </li>
              <Typography
                variant="p"
                sx={{
                  marginTop: "2rem",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </ul>
      </Box>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        {data.conclusion}
      </Typography>
    </Box>
  );
}

export default DataList;
