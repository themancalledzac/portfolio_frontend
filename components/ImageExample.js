import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { CardMedia } from "@mui/material";

// TODO: Borderradius of image isn't functional currently, also height overlays over next component.

const ImageExample = ({ test, height }) => {
  if (!test) return null;
  return (
    <div>
      <img
        src={test}
        width='400px'
        height='auto'
        sx={{
          borderRadius: "6px",
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
