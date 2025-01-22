import { useEffect } from "react";

import Features from "../Components/Features";
import FeatureMainSection from "../Components/FeatureMainSection";
import { AIFeatures } from "../Data/AIFeaturesData";
import { MLFeatures } from "../Data/MLFeaturesData";
import { AIMLQNA } from "../Data/AIMLQNA";
import "../Styles/index.css";
import { Box, Typography } from "@mui/material";
import DividerLine from "../Components/DividerLine";
import DataList from "../Components/DataList";
import { AIML_HireUsData } from "../Data/AIML_HireUsData";

function AIML() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FeatureMainSection
        title="AI Development Services"
        subTitle="AI & ML"
        description="Empower your AI journey with our comprehensive suite of end-to-end
              AI development services, meticulously crafted to align with your
              distinct project requirements. From crafting bespoke AI strategies
              to fuel business growth and leveraging advanced analytics to
              harness the power of data, to deploying cutting- edge Natural
              Language Processing (NLP) solutions for seamless communication, we
              serve as your dedicated AI talent powerhouse."
        imageURL="/images/ai1.png"
      />
      <Box
        sx={{
          padding: { xs: "1rem 2rem", md: "1rem 5rem", lg: "1rem 10rem" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem !important",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          AI and ML
        </Typography>
        <br />
        <Typography
          variant="p"
          sx={{
            textAlign: "start",
          }}
        >
          Nitai innovations is a progressive AI/ML development company enabling
          businesses globally to harness the limitless power of Artificial
          Intelligence and Machine Learning by delivering end-to-end innovative,
          tailored solutions to help businesses achieve intelligent automation.
        </Typography>
        <br />
        <br />
        <Typography
          variant="p"
          sx={{
            textAlign: "start",
          }}
        >
          Benefit from Nitai innovations expertise in end-to-end AI/ML
          development services and boost your productivity and competitive
          growth.
        </Typography>
        <br />
      </Box>
      <DividerLine />
      <Features data={AIFeatures} />
      <DividerLine />

      <Features data={MLFeatures} imageURL="/images/ml.png" />
      <DividerLine />
      <Box
        sx={{
          padding: { xs: "1rem 2rem", md: "1rem 5rem", lg: "1rem 10rem" },
        }}
      >
        <DataList data={AIML_HireUsData} />
      </Box>
      <DividerLine />

      <Typography
        variant="h2"
        sx={{
          marginTop: "3rem",
          textAlign: "center",
          fontSize: "2rem !important",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Features number={true} data={AIMLQNA} />
    </>
  );
}

export default AIML;
