import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DividerLine from "./DividerLine";

export default function Features({ data, imageURL = "", number = false }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontSize: "2.5rem !important",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          {data.title}
        </Typography>
        {imageURL && (
          <Box
            sx={{
              margin: "1rem !important",
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
                  xs: "70%",
                  md: "20%",
                },
              }}
            />
          </Box>
        )}

        <Typography
          variant="h2"
          color="text.secondary"
          sx={{ textAlign: "center", width: { xs: "90%", sm: "70%" } }}
        >
          {data.description}
        </Typography>
      </div>

      <Container
        id="faq"
        sx={{
          pt: { xs: 2, sm: 6 },
          pb: { xs: 4, sm: 8 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ width: "100%" }}>
          {data.items.map((item, index) => (
            <Accordion
              key={item.title}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                {number && (
                  <Typography
                    component="p"
                    style={{ marginRight: "2rem" }}
                    variant="subtitle2"
                  >
                    {index + 1}.
                  </Typography>
                )}

                <Typography component="h2" variant="subtitle2">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  variant="h2"
                  color="text.secondary"
                  sx={{
                    maxWidth: { sm: "100%", md: "70%" },
                    textIndent: "3rem",
                    fontSize: "1.2rem",
                  }}
                >
                  {item.description}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
}
