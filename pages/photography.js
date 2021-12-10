import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { useEffect } from "react";
import { GET_SINGLE_IMAGE } from "../queries/getImage";

function Photography() {
  const { loading, error, data } = useQuery(GET_SINGLE_IMAGE, {
    variables: { imageId: "61b29e68159547710a883c9c" },
  });

  useEffect(() => {
    console.log("effect refreshing with new data");
    console.log({ data });
  }, [data]);
  //   data?.console.log(data);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Image
        src={data?.getImage.imageUrl}
        alt='Picture of the author'
        width={500}
        height={500}
      />
      <h1>{data?.getImage.title}</h1>
    </div>
  );
}

export default Photography;
