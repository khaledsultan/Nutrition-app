import React from "react";
import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledNav>
      <StyledLink href="/">HOME PAGE</StyledLink>
      <StyledLink href="/aboutYou">ABOUT YOU</StyledLink>
    </StyledNav>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 30px;
  text-shadow: #fc0 10px 0 10px;
  &:hover {
    color: #cddce6;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 30px 30px;
`;
