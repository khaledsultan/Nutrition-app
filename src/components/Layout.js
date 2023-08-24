import Navigation from "./Navigation.js";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <p className="head">FIT BOARD</p>
      </header>

      <main>{children}</main>

      <Navigation />
    </>
  );
}
