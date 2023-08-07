import React from "react";
import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <nav>
      <div>
        <Link href="/"> HOME PAGE </Link>
      </div>
      <div>
        <Link href="/aboutYou"> ABOUT YOU </Link>
      </div>
    </nav>
  );
}
