import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { isLogged } from "./login";
import { useEffect } from "react";

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
      <div className="abas">
        <Link href="/home">
          <a>
            <button disabled={router.asPath === "/home"}>Home</button>
          </a>
        </Link>
        <Link href="/page1">
          <a>
            <button disabled={router.asPath === "/page1"}>Page 1</button>
          </a>
        </Link>
        <Link href="/page2">
          <a>
            <button disabled={router.asPath === "/page2"}>Page 2</button>
          </a>
        </Link>
        <Link href="/page3">
          <a>
            <button disabled={router.asPath === "/page3"}>Page 3</button>
          </a>
        </Link>
        <Link href="/page4">
          <a>
            <button disabled={router.asPath === "/page4"}>Page 4</button>
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
