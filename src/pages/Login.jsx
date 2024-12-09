import React, { useState } from "react";
import "../styles/Login.css";

// review what this is doing
const baseurl = window.location.origin + "/CSCI201-Final-Project-Server/LoginServlet";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recover, setRecover] = useState("");

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
    /*const url = new URL("LoginServlet", baseurl);
    console.log(baseurl);*/
    const params = new URLSearchParams({ uname: username, pass: password });
    const url = `/CSCI201-Final-Project-Server/LoginServlet?${params.toString()}`;


    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // if valid user
        if (text > 0) {
          // Valid login, update session and redirect
          console.log(text);
          setUserSession(text);
          window.location.href = "/";
        } else if (text === -1) {
          // Wrong password
          document.getElementById("wrong-p").style.display="block";
        } else if (text === -2) {
          // Invalid username
          document.getElementById("wrong-u").style.display="block";
        }
      });
  };

  // const forgotPassword = () => {
  //   document.getElementById("loginform").style.display="none";
  //   document.getElementById("recoverform").style.display="flex";
  // };

  // const retrievePassword = async (e) => {
  //   document.getElementById("loginform").style.display="flex";
  //   document.getElementById("recoverform").style.display="none";
  //   console.log(recover);
  //   var response = await fetch(baseurl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ "email": recover}),
  //   });

  //   console.log(response.json());
  // };

  return (
    <div>
    <p className="maintitle"></p>
    <div className="login-form" id="loginform">
        <p className="login-title">Enter your username and password</p>

        <input type="text" id="uname" className="login-input" placeholder="Username" value={username} onChange= {(e) => setUsername(e.target.value)}/>

        <p className="login-error-message" id="wrong-u" name="error-message">Incorrect username</p>
        <p className="login-error-message" id="missing-u" name="error-message">Enter username</p>

        <input type="password" id="pword" className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p className="login-error-message" id="wrong-p" name="error-message">Incorrect password</p>
        <p className="login-error-message" id="missing-p" name="error-message">Enter password</p>

        <button type="submit" className="submitbutton" onClick={handleLogin}>Login</button>
        {/* <button className="submitbutton extra-bottom"  onClick={forgotPassword}>Forgot Password</button> */}
    </div>
    {/* <div className="recover-form" id="recoverform">
      <p className="login-title">Enter the email associated with your account.</p>
      <input type="text" id="email" className="login-input" placeholder="Enter email" value={recover} onChange= {(e) => setRecover(e.target.value)}/>
      <button type="submit" className="submitbutton" onClick={retrievePassword}>Submit</button>
    </div> */}

</div>
  );
};

export default Login;
