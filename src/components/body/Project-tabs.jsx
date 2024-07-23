import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import '../styles/Projectstab.css';

const Tab = ({ label, isActive, onClick }) => (
  <button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className='tab-content'>{children}</div>
);

const formatTime = (time) => {
  const date = new Date(time);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projectData, setProjectData] = useState([]);

  const allProjects = [
    {
      id: 1,
      name: 'Project Alpha',
      owner: 'Alice',
      team: 'Development',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 3600000, // 1 hour from now
    },
    {
      id: 2,
      name: 'Project Beta',
      owner: 'Bob',
      team: 'Marketing',
      status: 'Completed',
      deliveredTime: new Date().getTime() - 7200000, // 2 hours ago
    },
    {
      id: 3,
      name: 'Project Gamma',
      owner: 'Charlie',
      team: 'Support',
      status: 'On-Hold',
      estimatedTime: new Date().getTime() + 10800000, // 3 hours from now
    },
    {
      id: 4,
      name: 'Project Delta',
      owner: 'David',
      team: 'Finance',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 5400000, // 1.5 hours from now
    },
    {
      id: 5,
      name: 'Project Epsilon',
      owner: 'Eve',
      team: 'Development',
      status: 'Completed',
      deliveredTime: new Date().getTime() - 86400000, // 1 day ago
    },
    {
      id: 6,
      name: 'Project Zeta',
      owner: 'Frank',
      team: 'HR',
      status: 'On-Hold',
      estimatedTime: new Date().getTime() + 43200000, // 12 hours from now
    },
    {
      id: 7,
      name: 'Project Eta',
      owner: 'Grace',
      team: 'Operations',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 7200000, // 2 hours from now
    },
    {
      id: 8,
      name: 'Project Theta',
      owner: 'Hank',
      team: 'IT',
      status: 'Completed',
      deliveredTime: new Date().getTime() - 259200000, // 3 days ago
    },
    {
      id: 9,
      name: 'Project Iota',
      owner: 'Ivy',
      team: 'Legal',
      status: 'On-Hold',
      estimatedTime: new Date().getTime() + 14400000, // 4 hours from now
    },
    {
      id: 10,
      name: 'Project Kappa',
      owner: 'Jack',
      team: 'Development',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 36000000, // 10 hours from now
    },
    {
      id: 11,
      name: 'Project Lambda',
      owner: 'Liam',
      team: 'Research',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 18000000, // 5 hours from now
    },
    {
      id: 12,
      name: 'Project Mu',
      owner: 'Mia',
      team: 'Sales',
      status: 'Completed',
      deliveredTime: new Date().getTime() - 172800000, // 2 days ago
    },
    {
      id: 13,
      name: 'Project Nu',
      owner: 'Noah',
      team: 'Customer Service',
      status: 'On-Hold',
      estimatedTime: new Date().getTime() + 21600000, // 6 hours from now
    },
    {
      id: 14,
      name: 'Project Xi',
      owner: 'Olivia',
      team: 'Engineering',
      status: 'On-Going',
      estimatedTime: new Date().getTime() + 25200000, // 7 hours from now
    },
    {
      id: 15,
      name: 'Project Omicron',
      owner: 'Oscar',
      team: 'Administration',
      status: 'Completed',
      deliveredTime: new Date().getTime() - 345600000, // 4 days ago
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectData(
        allProjects.map((project) => {
          if (project.status === 'On-Going') {
            const remainingTime = project.estimatedTime - new Date().getTime();
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            return {
              ...project,
              remainingTime: `${String(hours).padStart(2, '0')}:${String(
                minutes
              ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
            };
          }
          if (project.status === 'On-Hold') {
            return {
              ...project,
              remainingTime: formatTime(project.estimatedTime),
            };
          }
          if (project.status === 'Completed') {
            return {
              ...project,
              deliveredTime: formatTime(project.deliveredTime),
            };
          }
          return project;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ongoingProjects = projectData.filter(
    (project) => project.status === 'On-Going'
  );
  const completedProjects = projectData.filter(
    (project) => project.status === 'Completed'
  );
  const onHoldProjects = projectData.filter(
    (project) => project.status === 'On-Hold'
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0, headerAlign: 'center' },
    { field: 'name', headerName: 'Project Name', flex: 2, headerAlign: 'left' },
    { field: 'owner', headerName: 'Owner', flex: 1, headerAlign: 'center' },
    { field: 'team', headerName: 'Team', flex: 1, headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'On-Going'
              ? 'primary'
              : params.value === 'On-Hold'
              ? 'warning'
              : 'default'
          }
        />
      ),
    },
  ];

  const onGoingColumns = [
    ...columns,
    {
      field: 'remainingTime',
      headerName: 'Estimated Time',
      flex: 1.5,
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      renderCell: () => (
        <div className='action-icons'>
          <div className='menuicon'>
            <i className='fi fi-rr-eye'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-clone'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-trash'></i>
          </div>
        </div>
      ),
    },
  ];

  const completedColumns = [
    ...columns,
    {
      field: 'deliveredTime',
      headerName: 'Delivered',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      renderCell: () => (
        <div className='action-icons'>
          <div className='menuicon'>
            <i className='fi fi-rr-eye'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-clone'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-trash'></i>
          </div>
        </div>
      ),
    },
  ];

  const onHoldColumns = [
    ...columns,
    {
      field: 'remainingTime',
      headerName: 'Estimated Time',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      renderCell: () => (
        <div className='action-icons'>
          <div className='menuicon'>
            <i className='fi fi-rr-eye'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-clone'></i>
          </div>
          <div className='menuicon'>
            <i className='fi fi-rr-trash'></i>
          </div>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      label: 'On-Going',
      content: (
        <DataGrid
          rows={ongoingProjects}
          columns={onGoingColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            '& .MuiDataGrid-root': {
              width: '100%',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#d0d0d0',
            },
            '& .MuiDataGrid-cell[data-field="name"]': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="name"]': {
              textAlign: 'left',
            },
          }}
        />
      ),
    },
    {
      label: 'Completed',
      content: (
        <DataGrid
          rows={completedProjects}
          columns={completedColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            '& .MuiDataGrid-root': {
              width: '100%',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#d0d0d0',
            },
            '& .MuiDataGrid-cell[data-field="name"]': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="name"]': {
              textAlign: 'left',
            },
          }}
        />
      ),
    },
    {
      label: 'On-Hold',
      content: (
        <DataGrid
          rows={onHoldProjects}
          columns={onHoldColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            '& .MuiDataGrid-root': {
              width: '100%',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#e0e0e0',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#d0d0d0',
            },
            '& .MuiDataGrid-cell[data-field="name"]': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="name"]': {
              textAlign: 'left',
            },
          }}
        />
      ),
    },
  ];

  return (
    <div className='projectslist'>
      <h3>Your Projects</h3>
      <div className='Projectstab'>
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

export default ProjectTabs;
