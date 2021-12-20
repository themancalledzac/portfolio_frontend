import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { usePageState } from "../lib/pageState";
import NavStyles from "./styles/NavStyles";
import Router from "next/router";

// https://mui.com/components/app-bar/

const Logo = styled.div`
  background: var(--lightGrey);
  color: var(--grey);
  font-size: 4rem;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
  position: relative;
  z-index: 2;
  border-radius: 0.3rem;
  a {
    color: var(--grey);
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;
// TODO: --------------------------------------------------
//       --- As A User,
//       --- I want to have access to:
//           --- Github
//           --- LinkedIn
//           --- Web Design Page / Photography page

// TODO: --------------------------------------------------

export default function Nav() {
  const { photoPageState, webPageState, toggleWeb, togglePhoto } =
    usePageState();

  async function selectPage(page) {
    if (page === "web") {
      await toggleWeb();
      return Router.push("/web");
    } else if (page === "photo") {
      await togglePhoto();
      return Router.push("/photography");
    }
  }

  if (!photoPageState && !webPageState) return <p>Loading...</p>;

  if (photoPageState) {
    return (
      <NavStyles>
        <Logo>
          <a href='https://github.com/themancalledzac'>Github</a>
        </Logo>
        <Logo>
          <Link href='https://linkedin.com/in/zacedens'>LinkedIn</Link>
        </Logo>
        <Logo>
          <a onClick={() => selectPage("web")}>Web Design</a>
        </Logo>
      </NavStyles>
    );
  } else if (webPageState) {
    return (
      <NavStyles>
        <Logo>
          <Link href='https://github.com/themancalledzac'>Github</Link>
        </Logo>
        <Logo>
          <Link href='https://linkedin.com/in/zacedens'>LinkedIn</Link>
        </Logo>
        <Logo>
          <a onClick={() => selectPage("photo")}>Photography</a>
        </Logo>
      </NavStyles>
    );
  }
}
