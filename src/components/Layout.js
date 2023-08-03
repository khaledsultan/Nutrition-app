`use client`;

import styled from "styled-components";

const Mainer = styled.div`
  text-align: center;
  /* display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%; */
`;
const Header = styled.h1`
  margin: 50px;
  text-align: center;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header>MyAPP</Header>

      <Mainer>{children}</Mainer>

      <footer></footer>
    </>
  );
}
