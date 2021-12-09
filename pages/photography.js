import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { useEffect } from "react";

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

function Photography() {
  const { loading, error, data } = useQuery(GET_SINGLE_IMAGE, {
    variables: { imageId: "61a7eebe6c89bcca336cc209" },
  });

  useEffect(() => {
    console.log("effect refreshing with new data");
    console.log(data);
  }, [data]);
  //   data?.console.log(data);
  if (loading) return <p>Loading...</p>;
  return (
    <div className={styles.container}>
      <p>{data?.getImage.title}</p>
    </div>
  );
}

export default Photography;
