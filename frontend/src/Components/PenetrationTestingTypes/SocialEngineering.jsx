import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Features from "../Features";
import { SocialEngineeringQNA } from "../../Data/SocialEngineeringQNA";

function SocialEngineering() {
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
        Social Engineering Assessments
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Individuals remain a significant vulnerability within an organization’s
        cybersecurity framework. Nitai Innovations social engineering
        penetration testing service encompasses a variety of email phishing
        simulations intended to evaluate both the efficacy of your defensive
        mechanisms and the capacity of your personnel to identify and react to a
        simulated cyber threat.
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
        What is Social Engineering?
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Social engineering is a typical attack vector used by hackers to breach
        an organization's security posture. In Simple terms, it is the practice
        of using psychological manipulation to fool people into disclosing
        sensitive information and doing harmful acts, such as opening infected
        attachments through emails, messages, or calls.
      </Typography>
      <br />
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Social engineering testing can assist in addressing awareness and
        education on the newest phishing trends through repeatable procedures
        that guarantee workers tag, report, and avoid falling prey to emails
        from bad actors.
      </Typography>
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
        Benefits of Social Engineering Testing?
      </Typography>
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        Employees are more likely to take security advice seriously if they are
        often subjected to simulated social engineering assaults. It also allows
        you to focus on particular areas of weakness and prioritize your
        reaction.
      </Typography>
      <br />
      <br />
      <Typography
        variant="p"
        sx={{
          textAlign: "start",
        }}
      >
        A social engineering assessments help you prioritize security measures
        like network segmentation and enhance your incident response. When
        clients, employees, and stakeholders see that you're committed to strong
        security practices, they feel more confident doing business with you,
        knowing their interactions are safer.
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
        Frequently Asked Questions
      </Typography>
      <Features number={true} data={SocialEngineeringQNA} />
    </Box>
  );
}

export default SocialEngineering;
