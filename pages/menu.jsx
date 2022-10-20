import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLogged } from "./login";
import { useEffect } from "react";
import logo from "../public/icones/logo/MyCattery_logo_white.png"

/* Icons */

import {FaCat} from "react-icons/fa"
import {RiNumbersFill} from "react-icons/ri"
import {MdSpaceDashboard} from "react-icons/md"
import Image from "next/image";

export function refreshPage() {
  window.location.reload();
}

export default function Menu() {
  const [userToken, setUserToken] = useState();
  const [user, setUser] = useState({ username: "" });
  const router = useRouter();

  const handleLogout = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken }),
    };
    fetch("/api/logout", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    localStorage.clear();
    refreshPage();
  };

  const getUserAll = () => {
    if (userToken === null || userToken === undefined) {
      return;
    }
    const options = { method: "GET", headers: { token: userToken } };
    fetch("/api/login", options)
      .then((response) => response.json())
      .then((response) => setUser(response.user))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    getUserAll();
  }, [userToken]);

  useEffect(() => {
    setTimeout(() => {
      setUserToken(localStorage.getItem("token"));
    }, 10);
  }, [router.asPath]);

  return (
    <div className="menu">
      <Image src={logo} className="logo" alt="logo" width="100px" height="100px"/>
      <div className="abas">
        <Link href="/home">
          <a>
            <button disabled={router.asPath === "/home"}><MdSpaceDashboard className="iconMenu"/> Dashboard</button>
          </a>
        </Link>
        <Link href="/cats">
          <a>
            <button disabled={router.asPath === "/cats"}><FaCat className="iconMenu"/> Cats</button>
          </a>
        </Link>
        <Link href="/stock">
          <a>
            <button disabled={router.asPath === "/stock"}><RiNumbersFill className="iconMenu"/> Stock</button>
          </a>
        </Link>
      </div>
      {!userToken ? (
        <div className="auth">
          <Link href="/login">
            <a>
              <button disabled={router.asPath === "/login"}>Login</button>
            </a>
          </Link>
          <Link href="/register">
            <a>
              <button disabled={router.asPath === "/register"}>Register</button>
            </a>
          </Link>
        </div>
      ) : (
        <div className="isLoggedIn">
          <button disabled>{user.username}</button>
          <Link href="/home">
            <a>
              <button onClick={() => handleLogout()}>Logout</button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
