import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

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
        ... b.asldkjflkjasdf
      </p>
      <Link href='/photography'>Photography</Link>
    </div>
  );
}

export default Home;
