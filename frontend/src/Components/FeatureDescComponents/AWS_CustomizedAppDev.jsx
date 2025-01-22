import React from "react";
import { Typography, List, ListItem } from "@mui/material";
import { CloudServiceData } from "../../Data/CloudServiceData";
import DataList from "../DataList";

function AWS_CustomizedAppDev() {
  return (
    <>
      <Typography
        variant="p"
        color="text.secondary"
        sx={{
          maxWidth: "100%",
          textIndent: "3rem",
          fontWeight: "500",
        }}
      >
        Our expert team of AWS developers and programmers specializes in
        building serverless applications using Amazon Web Services (AWS). By
        following an agile approach, we ensure that your applications are
        scalable, secure, and delivered on time. With hands-on experience in:
      </Typography>
      <DataList data={CloudServiceData} />
    </>
  );
}

export default AWS_CustomizedAppDev;
