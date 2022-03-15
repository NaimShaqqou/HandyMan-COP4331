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
          <div class="emailbox">
            <label class="emailfont">Email/Username:</label>
            <br />
            <br />
            <i class="emaillogo"></i>
            <input type="text"
              id="loginName"
              placeholder="Username"
              ref={(c) => (loginName = c)}
            />
            <br />
          </div>
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <br />
        <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Do It"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{message}</span>
      
    </div>
  );
}

export default Login;
