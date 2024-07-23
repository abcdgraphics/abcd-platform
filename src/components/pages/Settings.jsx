import React, { useState } from 'react';
import '../styles/internal.css';
import Profile from '../body/Profile';
import Payments from '../body/Payments';
import Storage from '../body/Storage';

const Tab = ({ label, isActive, onClick }) => (
  <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className='tab-content'>{children}</div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'My Profile',
      content: (
        <div>
          <Profile />
        </div>
      ),
    },
    {
      label: 'Payments',
      content: (
        <div>
          <Payments />
        </div>
      ),
    },
    {
      label: 'Storage',
      content: (
        <div>
          <Storage />
        </div>
      ),
    },
    {
      label: 'Notifications',
      content: (
        <div>
          <h2>Notifications Settings</h2>
          {/* Add your Notifications settings content here */}
        </div>
      ),
    },
    {
      label: 'Integrations',
      content: (
        <div>
          <h2>Integrations Settings</h2>
          {/* Add your Integrations settings content here */}
        </div>
      ),
    },
    {
      label: 'API',
      content: (
        <div>
          <h2>API Settings</h2>
          {/* Add your API settings content here */}
        </div>
      ),
    },
  ];

  return (
    <div className='settings-container'>
      <div className='overview-info'>
        <div className='overview-text'>
          <h1>Settings</h1>
        </div>
        <div className='buttons'>
          <button className='btn-nofocus'>Cancel</button>
          <button className='btn'>Save</button>
        </div>
      </div>
      <div className='content-cont'>
        <div className='navbarContainerDiv'>
          <div className='tabs'>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                isActive={index === activeTab}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>
          <TabContent>{tabs[activeTab].content}</TabContent>
        </div>
      </div>
    </div>
  );
};

export default Settings;
