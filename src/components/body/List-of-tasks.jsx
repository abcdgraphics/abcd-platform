import React, { useState } from 'react';
import '../styles/List-of-tasks.css';

const Tab = ({ label, isActive, onClick }) => (
  <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className='tab-content'>{children}</div>
);

const Listoftasks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleTaskClick = (taskId) => {
    setSelectedTaskIds((prevSelectedTaskIds) =>
      prevSelectedTaskIds.includes(taskId)
        ? prevSelectedTaskIds.filter((id) => id !== taskId)
        : [...prevSelectedTaskIds, taskId]
    );
  };

  const tasks = [
    {
      id: 1,
      text: 'Complete AI Case Study for Retail',
      priority: 'High',
      dateTime: '2024-07-15 10:00 AM',
    },
    {
      id: 2,
      text: 'Develop Media Pitch Note for CPG',
      priority: 'Medium',
      dateTime: '2024-07-16 2:00 PM',
    },
    {
      id: 3,
      text: 'Update Project Plan for Healthcare AI Implementation',
      priority: 'High',
      dateTime: '2024-07-17 11:00 AM',
    },
    {
      id: 4,
      text: 'Prepare Presentation for AI Conference',
      priority: 'Medium',
      dateTime: '2024-07-18 1:00 PM',
    },
    {
      id: 5,
      text: 'Review AI Research Paper',
      priority: 'Low',
      dateTime: '2024-07-19 3:00 PM',
    },
    {
      id: 6,
      text: 'Organize Team Meeting for Project Update',
      priority: 'Low',
      dateTime: '2024-07-20 4:00 PM',
    },
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const activeTasks = tasks.filter(
    (task) => !selectedTaskIds.includes(task.id)
  );
  const completedTasks = tasks.filter((task) =>
    selectedTaskIds.includes(task.id)
  );
  const onHoldTasks = []; // Add your logic for on-hold tasks here

  const tabs = [
    {
      label: 'Active',
      content: (
        <div className='listoftasks-container'>
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className='task-details-taskbox'>
                <div>
                  <span>{task.text}</span>
                  <br />
                  <span className='task-date-time'>
                    {task.dateTime}
                    <i className='fi fi-sr-bullet'></i>
                  </span>
                  <span className='task-priority'>{task.priority}</span>
                </div>
              </div>
              <div className='action-icons'>
                <div className='menuicon'>
                  <i className='fi fi-rr-eye'></i>
                </div>
                <div className='menuicon'>
                  <i className='fi fi-rr-trash'></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Completed',
      content: (
        <div className='listoftasks-container'>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item task-selected`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className='task-details-taskbox'>
                <div>
                  <span className='task-completed'>{task.text}</span>
                  <br />
                  <span className='task-date-time'>
                    Completed on: {getCurrentDateTime()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'On-Hold',
      content: (
        <div className='listoftasks-container'>
          {onHoldTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className='task-details-taskbox'>
                <div>
                  <span>{task.text}</span>
                  <br />
                  <span className='task-date-time'>
                    {task.dateTime}
                    <i className='fi fi-sr-bullet'></i>
                  </span>
                  <span className='task-priority'>{task.priority}</span>
                </div>
              </div>
              <div className='action-icons'>
                <div className='menuicon'>
                  <i className='fi fi-rr-eye'></i>
                </div>
                <div className='menuicon'>
                  <i className='fi fi-rr-trash'></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className='listoftasks'>
      <h3>Your List of Tasks</h3>
      <div className='tasklisttabs'>
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
  );
};

export default Listoftasks;
