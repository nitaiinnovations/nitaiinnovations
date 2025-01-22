import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Features from "../Features";
import { WebAppPenetrationData } from "../../Data/WebAppPenetrationData";
import { WebPenetrationQNA } from "../../Data/WebPenetrationQNA";

function WebAppPenetration() {
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
        Web Application Penetration Testing
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Protect your web applications from latest cyber security risks
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          marginTop: "2rem",
          textAlign: "start",
        }}
      >
        We Can Help You In
      </Typography>
      <ul style={{ paddingLeft: "2rem", marginTop: "1rem" }}>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">Secure your web application</Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">Find and track vulnerabilities</Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Help you in fixing the vulnerability
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Help you in standard and regulatory compliance
          </Typography>
        </li>
      </ul>
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
        What Is Web Application Penetration Testing?
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Web Application penetration testing is a crucial process for assessing
        the security of Web applications and uncovering potential
        vulnerabilities and weaknesses. This comprehensive evaluation involves
        various techniques and tools aimed at identifying defects, bugs, and
        other security risks within the application and the Web operating system
        itself. By conducting Web Application penetration testing, organizations
        can ensure the strength and reliability of their Web applications,
        safeguard user data, and bolster overall security.
      </Typography>
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
        Why Do You Need Web Application Penetration Testing?
      </Typography>
      <Features data={WebAppPenetrationData} />
      <Divider />
      <Divider />
      <Typography
        variant="h2"
        sx={{
          marginTop: "2rem",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
          textAlign: "start",
        }}
      >
        Web App Penetration Testing - What We Provide
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
          1. Deep penetration testing
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          Our pen testers ensure to conduct web application penetration testing
          in a way that stimulates cyberattacks to identify vulnerabilities in
          your organization's web application. We start by scanning and
          evaluating the app using a mix of automated tools, in-house tools, and
          manual testing to ensure accuracy and keep costs down. The final step
          involves the exploitation of implementation mistakes and business
          logic.
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
          2. Daily reports
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          Throughout the testing process, Our Company provides daily progress
          and descriptive reports to maintain effective communication and keep
          you informed regarding the vulnerabilities identified in your web
          application. Moreover, daily reporting helps balance transparency and
          customer data security during penetration testing.
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
      <Features number={true} data={WebPenetrationQNA} />
    </Box>
  );
}

export default WebAppPenetration;
