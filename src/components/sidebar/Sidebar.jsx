import React, { useState } from 'react';
import '../styles/Sidebar.css';
import expandedLogo from '../../assets/logos/complete-abcd-logo.svg'; // Logo for expanded state
import collapsedLogo from '../../assets/logos/badge-abcd-logo.svg'; // Logo for collapsed state
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebarContainer ${isOpen ? 'collapsed' : ''}`}>
      <div className='topmenu-section'>
        <div className='complete-abcd-logo'>
          <img src={isOpen ? collapsedLogo : expandedLogo} alt='ABCD Logo' />
        </div>
        <div className='loginandcollapse'>
          <div className={`loginas ${isOpen ? 'collapsed' : ''}`}>
            <p>Access As Manager</p>
          </div>
          <div className='collapsemenu'>
            <div className='collapseicon' onClick={toggleMenu}>
              <i
                className={`fi fi-sr-arrow-${
                  isOpen ? 'up' : 'down'
                }-to-dotted-line`}
              ></i>
            </div>
          </div>
        </div>
        <div className='navbarContainerDiv'>
          <div className={`navmenu ${isOpen ? 'collapsed' : ''}`}>
            <ul className='menulists grid'>
              <li className='listitem'>
                <Link to='/' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-dashboard-monitor'></i>
                    <span className='smallText'>Dashboard</span>
                  </div>
                </Link>
              </li>
              <li className='listitem'>
                <Link to='/projects' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-blueprint'></i>
                    <span className='smallText'>Projects</span>
                  </div>
                </Link>
              </li>
              <li className='listitem'>
                <Link to='/files' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-folder-tree'></i>
                    <span className='smallText'>Files</span>
                  </div>
                </Link>
              </li>
              <li className='listitem'>
                <Link to='/messages' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-messages'></i>
                    <span className='smallText'>Messages</span>
                    <div className='messagecount'>03</div>
                  </div>
                </Link>
              </li>
              <li className='listitem'>
                <Link to='/payments' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-payroll-check'></i>
                    <span className='smallText'>Payments</span>
                  </div>
                </Link>
              </li>
              <li className='listitem'>
                <Link to='/reports' className='menulink grid'>
                  <div className='menuicon'>
                    <i className='fi fi-rr-newspaper'></i>
                    <span className='smallText'>Reports</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bottommenu-section'>
        <div className={`helpcenterbox ${isOpen ? 'collapsed' : ''}`}>
          <Link to='/support-ticket'>
            <i className='fi fi-rr-life-ring helpicon'></i>
          </Link>
          <h3>Need Help?</h3>
          <p>Go-to resource for any assistance.</p>
          <Link to='/support-ticket' className='btn'>
            Support Ticket
          </Link>
        </div>
        <div className='socialicons-container flex'>
          <ul className={`socialicons flex ${isOpen ? 'collapsed' : ''}`}>
            <li className={`socialiconitem ${isOpen ? 'collapsed' : ''}`}>
              <div>
                <a
                  href='https://www.facebook.com'
                  className='socialiconlink flex'
                >
                  <i className='fi fi-brands-facebook'></i>
                </a>
              </div>
              <div>
                <a
                  href='https://www.behance.net'
                  className='socialiconlink flex'
                >
                  <i className='fi fi-brands-behance'></i>
                </a>
              </div>
              <div>
                <a
                  href='https://www.linkedin.com'
                  className='socialiconlink flex'
                >
                  <i className='fi fi-brands-linkedin'></i>
                </a>
              </div>
              <div>
                <a
                  href='https://www.github.com'
                  className='socialiconlink flex'
                >
                  <i className='fi fi-brands-github'></i>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
