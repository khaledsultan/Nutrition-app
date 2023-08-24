import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <div>
        <Link href="/">BOARD 📝 </Link>
      </div>
      <div>
        <Link href="/aboutYou">ABOUT YOU 🫵 </Link>
      </div>
    </nav>
  );
}
