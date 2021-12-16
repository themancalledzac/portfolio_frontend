import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import Router from "next/router";
import { usePageState } from "../lib/pageState";
import { useEffect } from "react";
import styled from "styled-components";
import LandingBox from "../components/LandingBox.js";

const Homepage = styled.div`
  max-width: 95%;
  background-color: var(--lightGray);
`;

// const Container = styled.div`
//   max-width: 800px;
//   color: white;
//   background-color: grey;
//   display: flex;
//   padding: 20px;
//   border: 1px solid #000000;
//   margin-left: auto;
//   margin-right: auto;
// `;

export default function Home() {
  const {
    indexPageState,
    photoPageState,
    webPageState,
    togglePhoto,
    toggleWeb,
  } = usePageState();

  useEffect(() => {
    if (photoPageState) {
      return Router.push("/photography");
    }
    if (webPageState) {
      return Router.push("/web");
    }
  }, [indexPageState, photoPageState, webPageState]);

  async function selectPage(page) {
    if (page === "web") {
      await toggleWeb();
      return Router.push("/web");
    } else if (page === "photo") {
      await togglePhoto();
      return Router.push("/photography");
    }
  }

  return (
    <Homepage
      style={{
        padding: "5rem",
      }}
    >
      <LandingBox />
    </Homepage>
  );
}
