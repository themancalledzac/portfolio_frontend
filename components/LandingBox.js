import Router from "next/router";
import { usePageState } from "../lib/pageState";
import Box from "@mui/material/Box";
import LandingBoxPageSelector from "./LandingBoxPageSelector";
import Container from "@mui/material/Container";
// const { default: Tilty } =
//   await import('react-tilty', { assert: { type: 'module'}})
// TODO: Fix our Tilty issue
// import Tilty from "react-tilty";

// TODO: ApolloGraphQL Query for images
// for the photography image, i guess we could pick 1 to be the main, or we could technically pick at random everytime? shouldn't be that important since this page will hopefully only be seen once.

export default function LandingBox() {
  const { toggleWeb, togglePhoto } = usePageState();

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
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        <span
          style={{
            backgroundColor: "grey",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Launch
        </span>{" "}
        Page
      </h1>
      <Container
        sx={{
          // maxWidth: "600px",
          backgroundColor: "lightGrey",
          borderRadius: "8px",
          padding: "10px 10px",

          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <LandingBoxPageSelector
          prop='web'
          name='Web Engineering'
          paragraph='Web Engineering portfolio which includes some of my more recent work.'
        />
        <LandingBoxPageSelector
          prop='photo'
          name='Photography'
          paragraph='Photography portfolio, including different projects, along with a blog of current adventures.'
        />
      </Container>
    </>
  );
}
