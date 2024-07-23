import React from 'react';
import '../styles/Metrics.css';

const Metrics = () => {
  return (
    <div className='metrics-container'>
      <div className='metrics'>
        <div className='metrics-item noof-design-projects'>
          <div className='metrics-item-info'>
            <p>Design Projects</p>
            <h1>12</h1>
          </div>
          <div className='progress-metrics'>
            <span>85%</span> Completed
          </div>
        </div>
        <div className='metrics-icon'>
          <i class='fi fi-rr-vector-alt icon'></i>
        </div>
      </div>

      <div className='metrics'>
        <div className='metrics-item noof-projects'>
          <div className='metrics-item-info'>
            <p>Development Projects</p>
            <h1>03</h1>
          </div>
          <div className='progress-metrics'>
            <span>25%</span> Completed
          </div>
        </div>
        <div className='metrics-icon'>
          <i class='fi fi-rr-display-code icon'></i>
        </div>
      </div>

      <div className='metrics'>
        <div className='metrics-item noof-tasks'>
          <div className='metrics-item-info'>
            <p>Total Tasks</p>
            <h1>42</h1>
          </div>
          <div className='progress-metrics'>
            <span>45%</span> Completed
          </div>
        </div>
        <div className='metrics-icon'>
          <i class='fi fi-rr-to-do icon'></i>
        </div>
      </div>

      <div className='metrics'>
        <div className='metrics-item total-payments'>
          <div className='metrics-item-info'>
            <p>Total Payments</p>
            <h1>03</h1>
          </div>
          <div className='progress-metrics'>
            <span>60%</span> Completed
          </div>
        </div>
        <div className='metrics-icon'>
          <i class='fi fi-rr-checklist-task-budget icon'></i>
        </div>
      </div>

      <div className='metrics'>
        <div className='metrics-item noof-tickets'>
          <div className='metrics-item-info'>
            <p>Total Tickets</p>
            <h1>07</h1>
          </div>
          <div className='progress-metrics'>
            <span>45%</span> Completed
          </div>
        </div>
        <div className='metrics-icon'>
          <i class='fi fi-rr-ticket-alt icon'></i>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
