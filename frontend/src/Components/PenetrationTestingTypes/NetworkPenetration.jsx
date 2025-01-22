import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Features from "../../Components/Features";
import { PenetrationProcedureData } from "../../Data/PenetrationProcedureData";
import { NetworkPenetrationQNA } from "../../Data/NetworkPenetrationQNA";

function NetworkPenetration() {
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
        Network Penetration Testing
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Nitai Innovations conducts an exhaustive analysis of your network to
        uncover and leverage a diverse array of security vulnerabilities. This
        meticulous process allows us to determine whether critical assets, such
        as data, are at risk of being compromised, evaluate the potential
        threats to your overall cybersecurity posture, prioritize the
        vulnerabilities that need immediate attention, and propose strategic
        measures to mitigate the identified risks.
      </Typography>
      <Divider />
      <Divider />
      <Typography
        variant="h2"
        sx={{
          textAlign: "start",
          marginTop: "2rem",

          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Types of network penetration testing
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          marginTop: "2rem",
          textAlign: "start",
        }}
      >
        Network penetration testing, also known as Infrastructure penetration
        testing, can be performed from two perspectives: inside and outside your
        organisation's network perimeter.
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
          1. Internal penetration testing
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          An internal network penetration test is conducted to assess the
          potential impact of an attacker who has already gained entry to the
          network. This type of test simulates insider threats, whether arising
          from employees who might deliberately or inadvertently engage in
          harmful activities, to evaluate the extent of damage that could be
          inflicted from within the network.
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
          2. External penetration testing
        </Typography>
        <Typography
          variant="p"
          sx={{
            marginTop: "2rem",
            textAlign: "start",
          }}
        >
          An external network penetration test is engineered to evaluate the
          efficacy of perimeter security measures to prevent and identifying
          external attacks. This assessment scrutinizes vulnerabilities in
          internet-facing assets, such as web servers and mail systems, to
          determine how well these controls can prevent and detect potential
          threats.
        </Typography>
      </Box>
      <Divider />
      <Divider />
      <Typography
        variant="h2"
        sx={{
          marginTop: "2rem",
          textAlign: "start",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Network Penetration Testing as a Service Business Benefit
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          marginTop: "2rem",
          textAlign: "start",
        }}
      >
        Our network pentests has covered a wide range of industries, from
        healthcare to supply chains to IT consulting to product development to
        telecommunications. We also use the knowledge we gain from each pentest
        to help us improve our next one.
      </Typography>
      <ul style={{ paddingLeft: "2rem", marginTop: "1rem" }}>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Simulate Attacks to Evaluate Your Security Posture increases the
            quality network administration.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Reduce testing expenses while maintaining security.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Deliver high-quality network security audits while reducing
            compliance costs.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Through Vulnerability Management and upgrades, we remove complexity.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Reduce the time and effort necessary to identify and resolve
            security vulnerabilities.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Training network administrators in remediation reduces the cost of
            security testing.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Monitoring dashboards for the security posture of your network.
          </Typography>
        </li>
      </ul>
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
        Our Network Penetration Testing Procedure
      </Typography>
      <Features number={true} data={PenetrationProcedureData} />
      <Divider />
      <Divider />
      <Typography
        variant="h2"
        sx={{
          marginTop: "2rem",
          textAlign: "start",
          color: (theme) =>
            theme.palette.mode === "light" ? "#0959AA" : "#50a3f7",
        }}
      >
        Why Choose Nitai Innovations Network Penetration Testing?
      </Typography>
      <br />

      <ul style={{ paddingLeft: "2rem", marginTop: "1rem" }}>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Using Vulnerability Management and Patching, you can simplify
            things.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Reduced Costs for Compliance and Continuous Security Monitoring
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Reduce the time needed to identify and address security
            vulnerabilities.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Secure servers from leaking sensitive customer data.
          </Typography>
        </li>
        <li style={{ listStyleType: "disc" }}>
          <Typography variant="p">
            Utilize dashboards to oversee the security posture and historical
            data of penetration tests conducted on the network.
          </Typography>
        </li>
      </ul>
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
      <Features number={true} data={NetworkPenetrationQNA} />
    </Box>
  );
}

export default NetworkPenetration;
