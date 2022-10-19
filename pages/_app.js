import "../styles/globals.css";
import Menu from "./menu";
import Foot from "./foot";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Menu />
      <Component {...pageProps} />
      <Foot />
    </div>
  );
}

export default MyApp;
