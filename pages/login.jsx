import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { refreshPage } from "./menu";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const setForm = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernameOrEmail: usernameOrEmail,
        password: userpassword,
      }),
    };

    fetch("/api/login", options)
      .then((response) => response.json())
      .then((response) => handleLogin(response))
      .catch((err) => console.error(err));

    setUserPassword("");
  };

  const handleLogin = (response) => {
    if (response.message === undefined) {
      localStorage.setItem("token", response.token);
      router.push("/home");
    }
    return setLoginError(response.message);
  };

  return (
    <div className="containerLogin">
      <div className="screen">
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <input
                className="login__input"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Username / Email"
              />
            </div>
            <div className="login__field">

              <i className="login__icon fas fa-lock"> <PersonIcon/> </i>
              <input
                className="login__input"
                type="password"
                value={userpassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <i className="button__icon fas fa-chevron-right"> <LockIcon/> </i>
            <input
              value={"Log In Now"} type={"button"} className="button login__submit" onClick={() => setForm()} />

          </form>
          <div className="links">
            <a href="#">Forgot Password ?</a>
            <Link href="/register">
              <a>Signup</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
