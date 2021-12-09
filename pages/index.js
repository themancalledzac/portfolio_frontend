import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";

function Home() {
  return (
    <div
      style={{
        padding: "5rem",
      }}
    >
      <h1>Launch Page</h1>
      <p>
        We can have a splash page that simply consists of a few things:
        <br></br>
        1. a single card in the middle of a page, with two options:
        <br></br>
        ... a. Web Design
        <br></br>
        ... b. Photography
      </p>
    </div>
  );
}

export default Home;
