import React from "react";
import ImageMeta from "../components/EXIF-data";

const upload = () => {
  return (
    <>
      <ImageMeta />
    </>
  );
};

export default upload;

// TODO: Our ImageMeta component functions to console.log our EXIF data.
// 01. We need to work with the cloudinary api linked below to call the api upload
// https://cloudinary.com/documentation/image_upload_api_reference

// 02. Our upload Image function needs to do a few things.
// i. First thing is we need to choose image (aka select image)
// ii. After image is selected, we will run the cloudinary api to successfully upload image.
// iii. If upload is successful, we need to make sure we get back the URL for the image.
// iv. We also need to work on uploading 2 images, a regular and the square. wonder if there's a way we can add the second image later, and pass the first image's graphql _id to the second upload(?)
// v. If uploaded successfully, we will pass the metadata to a custom function which will return the data we are looking for (aka, we will massage the data to get the data we are looking for in, I would assume an object format?)
// vi. THEN, we pass our data to our graphQL mutation, which will add the item to our database
// 03. We need to work on the logic of how we connect the two images, regular and smaller square.
// i. Do we upload each separate, each with it's own metadata, and then connect them later?
// ii. ALTERNATIVELY, we have 2 upload components, one for our regular size image, one for our square image. we can upload the reg without the square, but not the other way around.
// iii. This means, that we have both next to each other, and after selecting each image (image might pop on page, some metadata immediately available/visible), we have a button below that says, UPLOAD TO DATABASE/CLOUDINARY
