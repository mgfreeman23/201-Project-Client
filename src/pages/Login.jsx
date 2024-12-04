import React, { useState } from "react";
import "../styles/Login.css";

// review what this is doing
const baseurl = window.location.origin + "/insert-proj-filename-here";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Set user's session
  const setUserSession = (uid) => {
    localStorage.setItem("uid", uid);
  };

  // Main login function
  const handleLogin = () => {

    // first clear all error messages if any
    let errors = document.getElementsByName("error-message");
    for(let i = 0; i < errors.length; i++){
        errors[i].style.display="none";
    }

    // Validate user inputs
    let invalidInputs = false;
    // if missing username entry, display error
    if (!username) {
      document.getElementById("missing-u").style.display="block";
      invalidInputs = true;
    }
    // if missing password entry, display error
    if (!password) {
      document.getElementById("missing-p").style.display="block";
      invalidInputs = true;
    }

    if (invalidInputs) {
      return;
    }

    // Make call to servlet and receive status
    const url = new URL("LoginServlet", baseurl);
    const params = { uname: username, pass: password };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // if valid user
        if (parseInt(text, 10) > 0) {
          // Valid login, update session and redirect
          setUserSession(text);
          window.location = "index.html";
        } else if (text === "-1") {
          // Wrong password
          document.getElementById("wrong-p").style.display="block";
        } else if (text === "-2") {
          // Invalid username
          document.getElementById("wrong-u").style.display="block";
        }
      });
  };

  return (
    <div>
    <p className="maintitle"></p>
    <div className="login-form">
        <p className="login-title">Enter your username and password</p>

        <input type="text" id="uname" className="login-input" placeholder="Username"/>

        <p className="login-error-message" id="wrong-u" name="error-message">Incorrect username</p>
        <p className="login-error-message" id="missing-u" name="error-message">Enter username</p>

        <input type="text" id="pword" className="login-input" placeholder="Password"/>
        <p className="login-error-message" id="wrong-p" name="error-message">Incorrect password</p>
        <p className="login-error-message" id="missing-p" name="error-message">Enter password</p>

        <button type="submit" className="submitbutton" onClick={handleLogin}>Login</button>
    </div>
</div>
  );
};

export default Login;
