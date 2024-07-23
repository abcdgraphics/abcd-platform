// src/Login.js
import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import logo from "../../assets/logos/badge-abcd-logo.svg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          try {
            const response = await fetch("http://localhost:3002/google/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(res.data),
            });

            if (response.ok) {
              const data = await response.json();
              localStorage.setItem("token", data.token);
              window.location.replace("/");
            } else {
              console.error("Failed to authenticate");
            }
          } catch (error) {
            console.error("Error during authentication:", error);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setError(result.message);
    if (result.success) {
      localStorage.setItem("token", result.token);
      window.location.replace("/");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const loginWithGitHub = () => {
    const clientID = "Ov23liTFIkaoPr70w9Zx";
    const redirectURI = "http://localhost:3002/github/callback";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo badge-abcd-logo">
          <img src={logo} alt="ABCD Logo" />
        </div>
        <h1>Welcome Back</h1>
        <p>For secure access to your account, please enter your credentials.</p>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="formlink-below">
          <ul className="formlinks">
            <li>
              <a href="/register" className="orange-link">
                Create Account
              </a>
            </li>
            <li>
              <a href="/" className="orange-link">
                Forget Password?
              </a>
            </li>
          </ul>
        </div>
        <div className="social-login">
          <div className="or-divider">
            <ul className="or-divider-listitems">
              <li className="or-divider-listitem">
                <hr />
              </li>
              <li className="or-divider-listitem">
                <span className="or-divider-line">OR</span>
              </li>
              <li className="or-divider-listitem">
                <hr />
              </li>
            </ul>
          </div>
          <div className="socialicons-container flex">
            <ul className={`socialicons flex`}>
              <li className={`socialiconitem`}>
                <div>
                  <a
                    href="https://www.facebook.com"
                    className="socialiconlink flex">
                    <i className="fi fi-brands-facebook"></i>
                  </a>
                </div>
                <div onClick={login} className="socialiconlink flex">
                  <i className="fi fi-brands-linkedin"></i>
                </div>
                <div onClick={loginWithGitHub} className="socialiconlink flex">
                  <i className="fi fi-brands-github"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
    </div>
  );
}

export default Login;
