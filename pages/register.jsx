import { useState } from "react";
import Link from "next/link";


export default function SignUp() {

  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registerError, setRegisterError] = useState("");


  const setForm = () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, email: email, password: userpassword, passwordConfirmation: passwordConfirmation })
    };

    fetch('/api/signup', options)
      .then(response => response.json())
      .then(response => handleRegister(response))
      .catch(err => console.error(err));

    setUserPassword("")
    setPasswordConfirmation("")

  };
  const handleRegister = (response) => {
    if (response.message === undefined) {
      return router.push("/home");
    }
    console.log(response)
    return setRegisterError(response.message);
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
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="login__field">
              <input
                className="login__input"
                type="text"
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                className="login__input"
                type="password"
                value={userpassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                className="login__input"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Password Confirmation"
              />
            </div>
            <i className="button__icon fas fa-chevron-right"></i>
            <input
              value={"Sign in"} type={"button"} className="button login__submit" onClick={() => setForm()} />
          </form>
        </div>
      </div>
    </div>
  );
}
