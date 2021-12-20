import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import { Box, Button, Input } from "@mui/material";
import ImageExample from "./ImageExample";
import styled from "styled-components";
// TODO: Research exifr, see if we can switch to get the lens data.
import exifr from "exifr";
import ImageForm from "./ImageForm";
// https://mutiny.cz/exifr/
// https://github.com/MikeKovarik/exifr

const ImageWrap = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 6px;
  margin-top: 7px;
  background-color: grey;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

// const UploadPage = styled(Box)`
//   display: 'flex',
//   flexWrap: 'wrap',
//   justify-content: center;
//   width: 500px;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const UploadForm = styled(Box)`
//   width: 500px;
// `;

// const InputType = styled(Input)`
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   text-align: center;
//   width: 400px;
// `;

function ImageMeta() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    console.log(preview);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function handleChange({
    target: {
      files: [file],
    },
  }) {
    getData(file);
    getImage(file);
  }

  // display the image
  function getImage(file) {
    if (!file || file.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(file);
  }

  // get MetaData
  function getData(file) {
    if (file && file.name) {
      EXIF.getData(file, function () {
        var exifData = EXIF.pretty(this);
        if (exifData) {
          let make = EXIF.getTag(this, "Make");
          let model = EXIF.getTag(this, "Model");
          let artist = EXIF.getTag(this, "Artist");
          let exposureDenominator = EXIF.getTag(
            this,
            "ExposureTime"
          ).denominator;
          let exposureNumerator = EXIF.getTag(this, "ExposureTime").numerator;
          let exposure = `${exposureNumerator}/${exposureDenominator}`;
          let fNumber =
            EXIF.getTag(this, "FNumber").numerator /
            EXIF.getTag(this, "FNumber").denominator;
          let iso = EXIF.getTag(this, "ISOSpeedRatings");
          let date = EXIF.getTag(this, "DateTimeOriginal").split(" ")[0];
          let time = EXIF.getTag(this, "DateTimeOriginal").split(" ")[1];
          let shutterSpeed = EXIF.getTag(this, "ShutterSpeedValue");
          let focalLength =
            EXIF.getTag(this, "FocalLength").numerator /
            EXIF.getTag(this, "FocalLength").denominator;
          let example = EXIF.getAllTags(this);

          console.log(exifData);
          console.log(example);
          console.log(example.Artist);
        } else {
          console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "1200px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            width: "450px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
          }}
        >
          <Input
            type='file'
            id='file'
            accept='.jpg, .png, .heif, .heic'
            onChange={handleChange}
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "400px",
              height: "40px",
              alignItems: "center",
            }}
          />
          <Box
            sx={{
              width: "400px",
              height: "400px",
              borderRadius: "6px",
              marginTop: "7px",
              backgroundColor: "gray",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {selectedFile && <ImageExample test={preview} />}
          </Box>
        </Box>
        <Box
          sx={{
            width: "450px",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.5rem",
              fontFamily: "sans-serif",
              width: "400px",
              height: "40px",
              justifyContent: "center",
            }}
          >
            Create Image
          </Box>
          <Box
            sx={{
              display: "block",
              width: "400px",
              height: "400px",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "gray",
              borderRadius: "6px",
              marginTop: "7px",
            }}
          >
            <ImageForm />
            <Button>Save Image</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ImageMeta;
