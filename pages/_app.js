import "../styles/globals.css";
import Menu from "./menu";
import Foot from "./foot";
import { useState } from "react";
import Alerta from "./alerta";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Menu />
      <Component {...pageProps} />
      <Alerta />
    </div>
  );
}

export default MyApp;
