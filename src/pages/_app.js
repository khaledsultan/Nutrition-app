import "@/styles/globals.css";
import Layout from "../components/Layout.js";
// import { Inter, Handlee, Merriweather, IBM } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
// const ibm = IBM({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
