import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import Router from "next/router";
import { usePageState } from "../lib/pageState";
import { useEffect } from "react";

function Home() {
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
  function selectPage(page) {
    if (page === "web") {
      toggleWeb();
    } else if (page === "photo") {
      togglePhoto();
    }
  }

  return (
    <div
      style={{
        padding: "5rem",
      }}
    >
      <h1>Launch Page</h1>

      <button onClick={selectPage("web")} href='/web'>
        Web Design
      </button>
      <button onClick={selectPage("photo")} href='/photography'>
        Photography
      </button>
    </div>
  );
}

export default Home;
