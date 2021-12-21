import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { CardMedia } from "@mui/material";

// TODO: Borderradius of image isn't functional currently, also height overlays over next component.

const ImageNew = styled.img`
  text-align: left;
`;

const ImageExample = ({ test, height }) => {
  if (!test) return null;
  return (
    <div>
      <ImageNew
        src={test}
        width='auto'
        height='200px'
        textAlign='left'
        sx={{
          borderRadius: "6px",
          textAlign: "left",
        }}
      />
    </div>
  );
};

export default ImageExample;

// <CardMedia
//   component='img'
//   src={test}
//   sx={{
//     width: "400px",
//     height: "auto",
//     borderRadius: "6px",
//   }}
// />;
