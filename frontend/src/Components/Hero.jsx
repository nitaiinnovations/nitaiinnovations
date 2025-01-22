import * as React from "react";
import { Element } from "react-scroll";
import "../Styles/index.css";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Element name="homeSection">
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
            pb: { xs: 4, sm: 6 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "90%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                fontFamily: "Times New Roman !important",
                fontWeight: "bold !important",
                fontSize: { xs: "2.8rem !important", md: "4rem !important" },
                marginBottom: "2rem",
              }}
            >
              NITAI INNOVATIONS
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              variant="h2"
              sx={{
                alignSelf: "center",
                fontFamily: "Tinos",
                lineHeight: "2rem !important",
                fontSize: { xs: "1.2rem !important", md: "1.5rem !important" },
              }}
            >
              Welcome to Our Organization! We are passionate about protecting
              your digital life from threats and ensuring your online safety.
              Our mission is to empower individuals and organizations with the
              knowledge and tools to navigate the ever-evolving cybersecurity
              landscape.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {localStorage.getItem("isLogin") == "true" ? (
                <Link to="/createBlog">
                  <Button
                    sx={{
                      fontFamily: "Tinos !important",
                      width: { xs: "15rem", md: "auto" },
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Create Blog
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button
                    sx={{ width: { xs: "15rem", md: "auto" } }}
                    variant="contained"
                    color="primary"
                  >
                    Register Now
                  </Button>
                </Link>
              )}
              <Link to="/" state={{ scrollTo: "contactUsSection" }}>
                <Button
                  sx={{ width: { xs: "15rem", md: "auto" } }}
                  variant="outlined"
                  color="primary"
                >
                  Contact Us
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Element>
  );
}
