import React from "react";
import "../styles/Topbar.css";

const Topbar = () => {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  return (
    <div className="topbar_container">
      <div className="pagename">
        <div className="pagename-smalltext">DASHBOARD</div>
        <div className="welcomemessage">
          <h3>Hi, Jonathan! Welcome Back.</h3>
        </div>
      </div>
      <div className="search-and-userdetails">
        <div className="searchbar">
          <input type="search" placeholder="Search" />
        </div>
        <div className="userdetails">
          <ul className="usersettings">
            <li className="usersettings-items">
              <div className="user-list-item">
                <a href="/settings">
                  <i class="fi fi-rr-settings"></i>
                </a>
              </div>
              <div className="user-list-item">
                <a href="/">
                  <i class="fi fi-rr-bell"></i>
                </a>
              </div>
              <div className="user-list-item">
                <div className="logout" onClick={() => handleLogout()}>
                  <i class="fi fi-rr-power"></i>
                </div>
              </div>
              <div className="user-list-item">
                <a href="/user-profile">
                  <i class="fi fi-sr-user user-photo"></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
