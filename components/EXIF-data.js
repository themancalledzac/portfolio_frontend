import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import { Card } from "@mui/material";
import ImageExample from "./ImageExample";
import styled from "styled-components";

const ImageWrap = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 6px;
  margin-top: 7px;
  background-color: grey;
`;

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

          //   console.log(exifData);
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
      <input
        type='file'
        id='file'
        accept='.jpg, .png, .heif, .heic'
        onChange={handleChange}
      />
      <ImageWrap>{selectedFile && <ImageExample test={preview} />}</ImageWrap>
    </>
  );
}

export default ImageMeta;
