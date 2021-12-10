import Link from "next/link";
import styled from "styled-components";
import Nav from "./Nav";

const Logo = styled.div`
  background: var(--grey);
  font-size: 4rem;
  margin-bottom: 1.5rem;
  border-radius: 0.3rem;
  position: relative;
  z-index: 2;
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;

const NavBar = styled.header`
  padding: 1.5rem;
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 2px solid var(--black, black);
  }
`;

export default function Header() {
  return (
    <NavBar>
      <div className='bar'>
        <Logo>
          <Link href='/'>Logo</Link>
        </Logo>
        <Nav />
      </div>
      <div className='sub-bar'>
        <p>Searching</p>
      </div>
    </NavBar>
  );
}
