import React from 'react';
import '../styles/Body.css';
import Projectstab from './Project-tabs';
import Listoftasks from './List-of-tasks';
import Metrics from './Metrics';

const Body = () => {
  return (
    <div className='mainContent'>
      <div className='contentContainer'>
        <div className='overview-info'>
          <div className='overview-text'>
            <h1>Overview</h1>
          </div>
          <div className='buttons'>
            <button className='btn'>New Project</button>
            <button className='btn'>Add Task</button>
          </div>
        </div>
        <Metrics />
        <div class='projectgrid-container'>
          <div class='grid-item item-1'>
            <Projectstab />
          </div>
          <div class='grid-item item-2'>
            <Listoftasks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
