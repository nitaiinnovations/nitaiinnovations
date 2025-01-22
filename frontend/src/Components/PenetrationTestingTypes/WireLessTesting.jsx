import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Features from "../Features";
import { WireLessTestingQNA } from "../../Data/WireLessTestingQNA";

function WireLessTesting() {
  return (
    <Box sx={{ height: "70vh", overflowY: "scroll" }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "start",
          fontSize: "2rem !important",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Wireless Network Testing
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Unsecured wireless networks can provide a gateway for attackers to
        infiltrate your network and exfiltrate sensitive data. Wireless
        penetration testing detects vulnerabilities within these networks,
        assesses the potential impact of such weaknesses, and outlines effective
        remediation strategies.
      </Typography>
      <br />
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Wireless penetration testing, or Wi-Fi pen-testing, involves checking
        your wireless systems, like Wi-Fi networks, Bluetooth devices, and other
        wireless gadgets (such as printers, mice, and keyboards), to find and
        fix any security weaknesses.
      </Typography>
      <br />

      <Divider />
      <Divider />
      <br />

      <Typography
        variant="h2"
        sx={{
          textAlign: "start",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Benefits of Wireless Penetration Testing
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Securing your wireless networks and devices is crucial for identifying
        vulnerabilities within your external infrastructure that could
        potentially be exploited by attackers to gain unauthorized access to
        your corporate network. Early detection of such threats enables you to
        fortify your security measures before an actual attack occurs, thereby
        enhancing your overall security posture, safeguarding business
        integrity, and ensuring compliance with data protection and security
        regulations to avoid significant financial penalties for non-
        compliance.
      </Typography>
      <Box sx={{ paddingLeft: "2rem" }}>
        <Typography
          variant="h2"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          Scope
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          Our team of wireless security experts will work with you to figure out
          what kind of test you need and how thorough it should be. We’ll create
          a customized plan based on your specific needs.
        </Typography>
        <Typography
          variant="h2"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          Review
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          We will collect detailed information about your wireless network using
          the latest methods and our years of experience.
        </Typography>
        <Typography
          variant="h2"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
            color: (theme) =>
              theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          }}
        >
          Report
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          After the test is done and we find any security issues, we will write
          a detailed report. This report will explain the problems and guide
          your technical team on how to fix them, making your wireless networks
          and devices more secure.
        </Typography>
      </Box>
      <Divider />
      <Divider />
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
      <Features number={true} data={WireLessTestingQNA} />
    </Box>
  );
}

export default WireLessTesting;
