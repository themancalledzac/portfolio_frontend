import { gql } from "@apollo/client";

export const GET_SINGLE_IMAGE = gql`
  query GetImage($imageId: ID!) {
    getImage(imageId: $imageId) {
      _id
      title
      author {
        _id
        name
        photo
        instagram
      }
      date
      aperture
      exposure
      focalLength
      isoSpeed
      lens {
        _id
        name
        aperture
        fixedLens
        focalLength
        brand
      }
      horizontal
      googleMapsLink
      imageUrl
      keywords {
        _id
        title
      }
    }
  }
`;
