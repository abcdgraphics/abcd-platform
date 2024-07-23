// src/Login.js
import React, { useState } from "react";
import "../styles/Register.css";
import logo from "../../assets/logos/badge-abcd-logo.svg";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordCheck) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        companyname: companyname,
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setError(result.message);
    }
  };

  const passwordChecker = (pass) => {
    if (pass !== password) {
      setPasswordCheck(true);
      setError("Password does not match");
    } else {
      setPasswordCheck(false);
      setError("");
    }
  };

  return (
    <div className="main-container">
      <div className="register-container">
        <div className="logo badge-abcd-logo">
          <img src={logo} alt="ABCD Logo" />
        </div>
        <h1>Welcome Onboard!</h1>
        <p>To kick things off, we need a bit of info.</p>
        <p>Fill in your details below, and let's get you set up in no time.</p>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              name="companyname"
              type="text"
              value={companyname}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Company Name"
            />
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
            <input
              type="password"
              onChange={(e) => {
                passwordChecker(e.target.value);
              }}
              required
              placeholder="Re-enter Password"
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <div className="formlink-below">
          <ul className="formlinks">
            <li>
              <a href="/login" className="orange-link">
                Login
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
            <ul className={`socialicons flex `}>
              <li className={`socialiconitem `}>
                <div>
                  <a
                    href="https://www.facebook.com"
                    className="socialiconlink flex">
                    <i className="fi fi-brands-facebook"></i>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com"
                    className="socialiconlink flex">
                    <i className="fi fi-brands-linkedin"></i>
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.github.com"
                    className="socialiconlink flex">
                    <i className="fi fi-brands-github"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
