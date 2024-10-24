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
  const [googleUser, setGoogleUser] = useState({});

  useEffect(() => {
    if (googleUser.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
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
  }, [googleUser]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:3002/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
            }
          });
      }
      getAccessToken();
    }
  }, []);

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

  const loginWithFacebook = () => {
    window.location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=1566103984258098&redirect_uri=http://localhost:3000&state=12345`;
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const loginWithGitHub = () => {
    const clientID = "Ov23lia1FIzzPuqHoJeN";
    const redirectURI = "http://localhost:3000/login";
    const scope = "user:email read:user";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${encodeURIComponent(
      scope
    )}`;
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
                  <div
                    onClick={loginWithFacebook}
                    className="socialiconlink flex">
                    <i className="fi fi-brands-facebook"></i>
                  </div>
                </div>
                <div onClick={loginWithGoogle} className="socialiconlink flex">
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
    </div>
  );
}

export default Login;
