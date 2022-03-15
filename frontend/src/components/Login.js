import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../LoginBox.css'

function Login() {
  var bp = require("./Path.js");
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");
  
  const doLogin = async (event) => {
    event.preventDefault();
    
    var obj = { login: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        var storage = require("../tokenStorage.js");
        var user = jwt_decode(res)
        localStorage.setItem("user_data", JSON.stringify(user))
        storage.storeToken(res);
        setMessage("");
        window.location.href = "/cards";
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span class="log" id="inner-title">Log In</span>
        <br />
          <div class="innerbox">
            <label class="epfont">Email/Username:</label>
            <img alt="User" width="16" height="16" src="url('https://tinyimg.io/i/PlEqXGd.png')" />
            <input class="input1" type="text"
              id="loginName"
              placeholder="Username/Email Address"
              ref={(c) => (loginName = c)}
            />
            <hr />
            <label class="epfont">Password:</label>
            
            <i class="emaillogo"></i>
            <input class="input1"
              type="password"
              id="loginPassword"
              placeholder="Password"
              ref={(c) => (loginPassword = c)}
            />
            <br />
            <hr />
          </div>
          <div class="inner2box">
        <input type="submit"
          id="loginButton"
          class="buttons"
          value="Do It"
          onClick={doLogin}
        />
        <p class="alignbot">New to Handler? <a href="https://www.google.com">Create a New Account!</a></p>
        </div>
      </form>
      <span id="loginResult">{message}</span>
      
    </div>
  );
}

export default Login;
