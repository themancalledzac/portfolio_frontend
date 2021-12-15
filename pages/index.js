import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import Router from "next/router";
import { usePageState } from "../lib/pageState";
import { useEffect } from "react";

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
    <div
      style={{
        padding: "5rem",
      }}
    >
      <h1>Launch Page</h1>

      <a onClick={() => selectPage("web")}>Web Design</a>
      <a onClick={() => selectPage("photo")}>Photography</a>
    </div>
  );
}
