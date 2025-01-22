import React from "react";
import { Element } from "react-scroll";
import { Typography } from "@mui/material";

import "../Styles/aboutUsComp.css";

function AboutUsComp() {
  return (
    <Element name="aboutUsSection">
      <div className="aboutUsComp">
        <div className="leftAboutUs">
          <Typography
            variant="h1"
            color="text.primary"
            sx={{ textAlign: "center", marginBottom: "2rem" }}
          >
            About Us
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            variant="h2"
            sx={{
              alignSelf: "center",
              fontFamily: "Tinos",
            }}
          >
            We're excited to share our story with you. At NITAI INNOVATIONS, we
            are a passionate and dedicated team of professionals with a mission
            to make a difference in the world of Information Technology. Our
            journey began by a shared vision to be successful in handling the
            cyber security threats in the IT Industry.
          </Typography>
        </div>
        <div className="rightAboutUs">
          <img className="aboutUsImage" src="/images/aboutUs.png" alt="" />
        </div>
      </div>
    </Element>
  );
}

export default AboutUsComp;
