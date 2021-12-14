import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { usePageState } from "../lib/pageState";
import NavStyles from "./styles/NavStyles";

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
          <a onClick={togglePhoto} href='/web'>
            Web Design
          </a>
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
          <a onClick={toggleWeb} href='/photography'>
            Photography
          </a>
        </Logo>
      </NavStyles>
    );
  }
}
