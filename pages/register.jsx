import { useState } from "react";

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
    <div className="signupMain">
      <div className="box registerBox">
        <form className="loginRegister" autoComplete="off">
          <h2>Create an Account</h2>
          <div className="inputBox">
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="text"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <input className="inputLogin" value={"Register"} type={"button"} onClick={() => setForm()}></input>
          <p>{registerError}</p>
        </form>
      </div>
    </div>
  );
}
