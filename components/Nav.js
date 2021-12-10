import Link from "next/link";
import styled from "styled-components";
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

export default function Nav() {
  return (
    <NavStyles>
      <Logo>
        <Link href='/photography'>Photography</Link>
      </Logo>
      <Logo>
        <Link href='/instagram'>Instagram</Link>
      </Logo>
    </NavStyles>
  );
}
