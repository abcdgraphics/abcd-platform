import React, { useState } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import '../styles/Profile.css';

const Tab = ({ label, isActive, onClick }) => (
  <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className='tab-content'>{children}</div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  const tabs = [
    {
      label: 'My Profile',
      content: (
        <div className='profile-cont-div'>
          <div className='container-div justify-spacebtw'>
            <div className='profilesettings-photo'>
              <div className='profile-photo'>
                <i className='fi fi-sr-user user-photo'></i>
              </div>
              <div>
                <h3>Full Name</h3>
                <p>Designation</p>
                <p>Location, Country.</p>
              </div>
            </div>
            <button className='btn'>Upload Photo</button>
          </div>
          <div className='container-div personal-info'>
            <div>
              <h3>Personal Details</h3>
              <p>
                Update your personal details. Ensure that the information
                provided is accurate and up to date to seamless communication.
              </p>
            </div>
            <div className='personal-info-grid'>
              <div className='input-field'>
                <input type='text' placeholder='First Name' />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Last Name' />
              </div>
              <div className='input-field'>
                <input type='email' placeholder='Email Address' />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Phone Number' />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Company Name' />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Department' />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Designation' />
              </div>
            </div>
          </div>
          <div className='container-div personal-info'>
            <div>
              <h3>Location Address</h3>
              <p>
                Here you can update your personal details. Please ensure that
                the information provided is accurate and up to date. Keeping
                your details current helps us serve you better and ensures
                seamless communication.
              </p>
            </div>
            <div className='personal-info-grid'>
              <div className='input-field'>
                <input type='text' placeholder='Location' />
              </div>
              <div className='input-field'>
                <h6>Country</h6>
                <CountrySelect
                  onChange={(e) => {
                    setCountryId(e.id);
                  }}
                  placeHolder='Select Country'
                />
              </div>
              <div className='input-field'>
                <h6>State</h6>
                <StateSelect
                  countryId={countryId}
                  onChange={(e) => {
                    setStateId(e.id);
                  }}
                  placeHolder='Select State'
                />
              </div>
              <div className='input-field'>
                <h6>City</h6>
                <CitySelect
                  countryId={countryId}
                  stateId={stateId}
                  onChange={(e) => {
                    console.log(e);
                  }}
                  placeHolder='Select City'
                />
              </div>
              <div className='input-field'>
                <input type='text' placeholder='Pincode/Zipcode' />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Members',
      content: (
        <div>
          <h2>Members</h2>
        </div>
      ),
    },
    {
      label: 'Change Password',
      content: (
        <div>
          <h2>Password</h2>
        </div>
      ),
    },
  ];

  return (
    <div className='profile-container'>
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
  );
};

export default Profile;
