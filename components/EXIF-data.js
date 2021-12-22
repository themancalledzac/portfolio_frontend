import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import { Box, TextField, Input, Paper, Button } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
// TODO: Research exifr, see if we can switch to get the lens data.
import exifr from "exifr";
import ImageForm from "./ImageForm";
// https://mutiny.cz/exifr/
// https://github.com/MikeKovarik/exifr

// GQL QUERY SEARCH FOR LENSES
const ALL_LENS_QUERY = gql`
  query getLensQuery {
    getLenses {
      _id
      name
      aperture
      fixedLens
      focalLength
      brand
    }
  }
`;

// STYLED COMPONENTS
const ImageHor = styled.img`
  text-align: left;
  border-radius: 6px 6px 0px 0px;
`;
const ImageVer = styled.img`
  text-align: left;
  border-radius: 6px 0px 0px 6px;
`;

function ImageMeta() {
  // our useQuery to get our Lens data
  const { loading, error, data } = useQuery(ALL_LENS_QUERY);
  // ------------------------------------------------
  // OUR LOCAL STATE FOR THIS PAGE
  // ------------------------------------------------
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imgWidth, setImgWidth] = useState();
  const [imgHeight, setImgHeight] = useState();
  const [imgDirection, setImgDirection] = useState();
  const [imageData, setImageData] = useState();

  // ------------------------------------------------
  // OUR USESTATES to update our state
  // ------------------------------------------------
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

  useEffect(() => {
    if (imgWidth > imgHeight) {
      setImgDirection("horizontal");
    } else {
      setImgDirection("vertical");
    }
    console.log(
      `Our Image Width: ${imgWidth} and our Image Height: ${imgHeight}, our direction is ${imgDirection}`
    );
  }, [imgWidth, imgHeight, imgDirection]);

  // ------------------------------------------------
  // OUR component functions
  // ------------------------------------------------
  function handleChange({
    target: {
      files: [file],
    },
  }) {
    getData(file);
    getImage(file);
  }

  function imgDimensions({ target: img }) {
    console.log(img);
    console.log(img.offsetWidth);
    setImgHeight(img.offsetHeight);
    setImgWidth(img.offsetWidth);
  }

  // ------------------------------------------------
  // Display the Image
  // ------------------------------------------------
  function getImage(file) {
    if (!file || file.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(file);
  }

  // ------------------------------------------------
  // Get MetaData
  // ------------------------------------------------
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
        {/* Our FULL Component when we have a HORIZONTAL image */}
        {imgDirection != "vertical" && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
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
            {/* Our comp with horizontal image and data */}
            {selectedFile && (
              <Paper
                elevation={3}
                sx={{
                  width: "400px",
                  height: "670px",
                  borderRadius: "6px",
                  marginTop: "7px",
                  backgroundColor: "gray",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {!imgWidth && (
                  <ImageHor
                    src={preview}
                    width={"auto"}
                    height={"250px"}
                    textAlign='left'
                    sx={{
                      borderRadius: "6px",
                      textAlign: "left",
                    }}
                    onLoad={imgDimensions}
                  />
                )}
                {imgDirection === "vertical" && (
                  <ImageVer
                    src={preview}
                    width={"auto"}
                    height={"400px"}
                    onLoad={imgDimensions}
                  />
                )}
                {imgDirection === "horizontal" && (
                  <ImageHor
                    src={preview}
                    width={"400px"}
                    height={"auto"}
                    onLoad={imgDimensions}
                  />
                )}
                <Box
                  sx={{
                    backgroundColor: "white",
                    alignItems: "center",
                    width: "82%",
                    height: "278px",
                    /* offset-x, offset-y, blur-radius, color, inside */
                    boxShadow: "0px 1px 3px gray inset",
                    borderRadius: "6px",
                    padding: "15px",
                    marginTop: "15px",
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "flex",
                  }}
                >
                  {/* Our div containing the FORM */}
                  <div
                    style={{
                      width: "100%",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {/* Here we have our FORM COMPONENT */}
                    <Box
                      sx={{
                        backgroundColor: "white",
                        justifyContent: "space-between",
                        marginRight: "auto",
                        marginLeft: "auto",
                        display: "flex",
                      }}
                    >
                      {/* Title of the Image, must be filled out */}
                      <TextField
                        required
                        id='title'
                        label='Title'
                        defaultValue='Title of Image'
                        sx={{
                          width: "150px",
                          marginRight: "auto",
                          marginLeft: "auto",
                        }}
                      />
                      {/* Author of the Image, auto me, could change? */}
                      <TextField
                        required
                        id='author'
                        label='Author'
                        defaultValue='Zechariah Edens'
                        sx={{
                          width: "150px",
                          marginRight: "auto",
                          marginLeft: "auto",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        display: "flex",
                      }}
                    >
                      {/* Lens - Needs to be a dropdown with all available lenses? fml */}
                      <TextField
                        id='lens'
                        select
                        label='Lens'
                        defaultValue='Dropdown of Lenses'
                        sx={{
                          width: "150px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "96%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        display: "flex",
                      }}
                    >
                      {/* Google Map link, required, must be filled out */}
                      <TextField
                        required
                        id='google'
                        label='Google Maps Link'
                        defaultValue='Please share link'
                        sx={{
                          width: "150px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "96%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        display: "flex",
                      }}
                    >
                      <TextField
                        required
                        id='title'
                        label='Title'
                        defaultValue='Title of Image'
                        sx={{
                          width: "150px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "96%",
                        }}
                      />
                    </Box>
                  </div>
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {/* TODO: Change Color to a main color */}
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      width: "90%",
                      padding: "15px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Save Image
                  </Button>
                </div>
              </Paper>
            )}
          </Box>
        )}
        {/* Our FULL Component when we have a VERTICAL image */}
        {imgDirection === "vertical" && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "650px",
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
            {/* Our comp with vertical image and data */}
            {selectedFile && (
              <Paper
                elevation={3}
                sx={{
                  width: "600px",
                  height: "400px",
                  borderRadius: "6px",
                  marginTop: "7px",
                  backgroundColor: "gray",
                  justifyContent: "left",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                }}
              >
                {!imgWidth && (
                  <ImageHor
                    src={preview}
                    width={"auto"}
                    height={"250px"}
                    textAlign='left'
                    sx={{
                      borderRadius: "6px",
                      textAlign: "left",
                    }}
                    onLoad={imgDimensions}
                  />
                )}
                {imgDirection === "vertical" && (
                  <ImageVer
                    src={preview}
                    width={"auto"}
                    height={"400px"}
                    onLoad={imgDimensions}
                  />
                )}
                {imgDirection === "horizontal" && (
                  <ImageHor
                    src={preview}
                    width={"400px"}
                    height={"auto"}
                    onLoad={imgDimensions}
                  />
                )}
                <Box
                  sx={{
                    backgroundColor: "white",
                    justifyContent: "space-between",
                    width: "250px",
                    height: "325px",
                    /* offset-x, offset-y, blur-radius, color, inside */
                    boxShadow: "0px 1px 3px gray inset",
                    borderRadius: "6px",
                    padding: "15px",
                    marginTop: "20px",
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "flex",
                  }}
                >
                  {/* Here we have our FORM COMPONENT */}
                  <TextField
                    required
                    id='title'
                    label='Title'
                    defaultValue='Title of Image'
                    sx={{
                      width: "150px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                  <TextField
                    required
                    id='author'
                    label='Author'
                    defaultValue='Zechariah Edens'
                    sx={{
                      width: "150px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                </Box>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default ImageMeta;
