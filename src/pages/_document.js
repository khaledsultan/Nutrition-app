import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Link rel="preconnect" href="https://fonts.googleapis.com"></Link>
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></Link>
      <Link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Gochi+Hand&display=swap"
        rel="stylesheet"
      ></Link>

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
