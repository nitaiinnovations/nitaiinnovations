import React from "react";
import { alpha } from "@mui/material";
import { Box, Container, Stack, Typography } from "@mui/material";

function FeatureMainSection({
  title = "",
  subTitle = "",
  description = "",
  imageURL = "",
}) {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "80%" } }}>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              display: "flex",
              fontSize: { xs: "2.5rem", md: "3rem" },
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              gap: 1,
              color: (theme) =>
                theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {subTitle}
          </Typography>
          <Typography
            variant="p"
            color="text.secondary"
            sx={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "1.2rem",
            }}
          >
            {description}
          </Typography>
        </Stack>

        <Box
          sx={{
            marginTop: "5rem",
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            component="img"
            src={imageURL}
            alt=""
            sx={{
              width: {
                xs: "90%",
                md: "40%",
              },
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "5rem",
            display: "grid",
            placeItems: "center",
          }}
        ></Stack>
      </Container>
    </Box>
  );
}

export default FeatureMainSection;
