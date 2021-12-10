import Link from "next/link";
import styled from "styled-components";

const Logo = styled.h1`
  background: var(--red);
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    color: var(--white || white);
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;

export default function Header() {
  return (
    <div>
      <Logo>
        <Link href='/'>Logo</Link>
      </Logo>
      <div>
        <p>Searching</p>
      </div>
    </div>
  );
}
