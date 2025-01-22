import * as React from "react";
import { Element } from "react-scroll";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChevronRightRounded,
  DevicesRounded,
  EdgesensorHighRounded,
  ViewQuiltRounded,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const items = [
  {
    icon: <EdgesensorHighRounded />,
    title: "Cyber Security - Penetration Testing",
    link: "/cyberSecurity",
    description:
      "Connect with customers in real-time to share brand, product, and service information.",
    imageLight: 'url("images/cs1.png")',
    imageDark: 'url("images/cs1.png")',
  },
  {
    icon: <ViewQuiltRounded />,
    title: "Cloud Services",
    link: "/cloudService",
    description:
      "Our agile approach ensures fast delivery with custom-built, scalable digital solutions.",
    imageLight: 'url("images/aws1.png") ',
    imageDark: 'url("images/aws1.png")',
  },
  {
    icon: <DevicesRounded />,
    title: "AI & ML",
    link: "/AIML",
    description:
      "Inform users that the product is available across web, mobile, and desktop platforms.",
    imageLight: 'url("images/ai1.png")',
    imageDark: 'url("images/ai1.png")',
  },
];

export default function ProductsAndSolutions() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Element name="productsAndSolutionSection">
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        <Typography
          variant="h1"
          color="text.primary"
          sx={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Products and Solutions
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Grid
              container
              item
              gap={2}
              sx={{
                display: { xs: "flex", sm: "none" },
                flexWrap: { xs: "wrap", sm: "none" },
                marginTop: { xs: "1rem", sm: "none" },
                justifyContent: { xs: "center", sm: "none" },
              }}
            >
              {items.map(({ title }, index) => (
                <Chip
                  key={index}
                  label={<Typography variant="p">{title}</Typography>}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    padding: "1.5rem .5rem",
                    borderColor: (theme) => {
                      if (theme.palette.mode === "light") {
                        return selectedItemIndex === index
                          ? "primary.light"
                          : "";
                      }
                      return selectedItemIndex === index ? "primary.light" : "";
                    },
                    background: (theme) => {
                      if (theme.palette.mode === "light") {
                        return selectedItemIndex === index ? "none" : "";
                      }
                      return selectedItemIndex === index ? "none" : "";
                    },
                    backgroundColor:
                      selectedItemIndex === index ? "primary.main" : "",
                    "& .MuiChip-label": {
                      color: selectedItemIndex === index ? "#fff" : "",
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                display: { xs: "auto", sm: "none" },
                mt: 4,
                padding: "1rem",
              }}
            >
              <Box
                sx={{
                  backgroundImage: (theme) =>
                    theme.palette.mode === "light"
                      ? items[selectedItemIndex].imageLight
                      : items[selectedItemIndex].imageDark,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: 280,
                }}
              />
              <Box sx={{ px: 2, pb: 2 }}>
                <Typography
                  color="text.primary"
                  variant="h2"
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  {selectedFeature.title}
                </Typography>
                <Typography color="text.secondary" variant="p" sx={{ my: 0.5 }}>
                  {selectedFeature.description}
                </Typography>
                <br />
                <Link
                  component={RouterLink} // Use React Router Link here
                  to={selectedFeature.link} // Set the `to` prop
                  color="primary"
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    mt: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    "& > svg": { transition: "0.2s" },
                    "&:hover > svg": { transform: "translateX(2px)" },
                  }}
                >
                  <span>Learn more</span>
                  <ChevronRightRounded
                    fontSize="small"
                    sx={{ mt: "1px", ml: "2px" }}
                  />
                </Link>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              useFlexGap
              sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
            >
              {items.map(({ icon, title, description, link }, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 1.5,
                    height: "fit-content",
                    width: "100%",
                    background: "none",
                    backgroundColor:
                      selectedItemIndex === index
                        ? "action.selected"
                        : undefined,
                    borderColor: (theme) => {
                      if (theme.palette.mode === "light") {
                        return selectedItemIndex === index
                          ? "primary.light"
                          : "grey.200";
                      }
                      return selectedItemIndex === index
                        ? "primary.dark"
                        : "grey.800";
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      textAlign: "left",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { md: "center" },
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === "light") {
                            return selectedItemIndex === index
                              ? "primary.main"
                              : "grey.300";
                          }
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.700";
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box sx={{ textTransform: "none" }}>
                      <Typography
                        color="text.primary"
                        variant="h2"
                        fontWeight="bold"
                        sx={{ marginBottom: "1rem" }}
                      >
                        {title}
                      </Typography>
                      <Typography color="text.secondary" variant="p">
                        {description}
                      </Typography>
                      <br />
                      <Link
                        component={RouterLink} // Use React Router Link here
                        to={link} // Set the `to` prop
                        color="primary"
                        variant="p"
                        fontWeight="bold"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          "& > svg": { transition: "0.2s" },
                          "&:hover > svg": { transform: "translateX(2px)" },
                        }}
                      >
                        <span>Learn more</span>
                        <ChevronRightRounded
                          fontSize="small"
                          sx={{ mt: "1px", ml: "2px" }}
                        />
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
          >
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                width: "100%",
                display: { xs: "none", sm: "flex" },
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  m: "auto",
                  width: 420,
                  height: 500,
                  backgroundSize: "contain",
                  backgroundImage: (theme) =>
                    theme.palette.mode === "light"
                      ? items[selectedItemIndex].imageLight
                      : items[selectedItemIndex].imageDark,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Element>
  );
}
