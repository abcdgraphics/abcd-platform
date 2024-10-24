import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import "../styles/TicketSystemTabs.css";
import { get } from "../../services/api.js";

const Tab = ({ label, isActive, onClick }) => (
  <button className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
    {label}
  </button>
);

const TabContent = ({ children }) => (
  <div className="tab-content">{children}</div>
);

const TicketSystemTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    async function getAllTickets() {
      const response = await get("tickets");
      if (response.success) {
        const data = response.data;
        data.forEach((element) => {
          element.created_on = timeAgo(element.created_on);
        });
        console.log(data);
        setAllRows(data);
      }
    }

    getAllTickets();
  }, []);

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (diff < minute) {
      return `${Math.floor(diff / 1000)} seconds ago`;
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)} minutes ago`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)} hours ago`;
    } else if (diff < month) {
      return `${Math.floor(diff / day)} days ago`;
    } else if (diff < year) {
      return `${Math.floor(diff / month)} months ago`;
    } else {
      return `${Math.floor(diff / year)} years ago`;
    }
  }

  // const allRows = [
  //   {
  //     id: 1,
  //     subject: "Help with account setup",
  //     requester: "Jane Doe",
  //     assignee: "You",
  //     group: "Support",
  //     status: "In Progress",
  //     updated: "1 hour ago",
  //   },
  //   {
  //     id: 2,
  //     subject: "Can't find the download link",
  //     requester: "John Smith",
  //     assignee: "You",
  //     group: "Support",
  //     status: "New",
  //     updated: "2 hours ago",
  //   },
  //   {
  //     id: 3,
  //     subject: "Error when trying to log in",
  //     requester: "Samuel Lee",
  //     assignee: "You",
  //     group: "Support",
  //     status: "In Progress",
  //     updated: "3 hours ago",
  //   },
  //   {
  //     id: 4,
  //     subject: "Billing question",
  //     requester: "Emily Davis",
  //     assignee: "You",
  //     group: "Support",
  //     status: "New",
  //     updated: "4 hours ago",
  //   },
  //   {
  //     id: 5,
  //     subject: "Product feature request",
  //     requester: "Michael Johnson",
  //     assignee: "You",
  //     group: "Support",
  //     status: "In Progress",
  //     updated: "5 hours ago",
  //   },
  //   {
  //     id: 6,
  //     subject: "Completed task example",
  //     requester: "Jane Doe",
  //     assignee: "You",
  //     group: "Support",
  //     status: "Completed",
  //     updated: "6 hours ago",
  //   },
  //   {
  //     id: 7,
  //     subject: "Issue with payment",
  //     requester: "Alice Brown",
  //     assignee: "You",
  //     group: "Finance",
  //     status: "On Hold",
  //     updated: "2 days ago",
  //   },
  //   {
  //     id: 8,
  //     subject: "Feature enhancement request",
  //     requester: "Bob Green",
  //     assignee: "You",
  //     group: "Development",
  //     status: "On Hold",
  //     updated: "3 days ago",
  //   },
  //   {
  //     id: 9,
  //     subject: "System crash issue",
  //     requester: "Charlie White",
  //     assignee: "You",
  //     group: "Support",
  //     status: "In Progress",
  //     updated: "1 hour ago",
  //   },
  //   {
  //     id: 10,
  //     subject: "Login problem",
  //     requester: "David Black",
  //     assignee: "You",
  //     group: "Support",
  //     status: "New",
  //     updated: "2 hours ago",
  //   },
  // ];

  const openTickets = allRows.filter(
    (row) => row.status !== "Completed" && row.status !== "On Hold"
  );
  const completedTickets = allRows.filter((row) => row.status === "Completed");
  const onHoldTickets = allRows.filter((row) => row.status === "On Hold");

  const columns = [
    { field: "id", headerName: "ID", flex: 0, headerAlign: "center" },
    {
      field: "subject",
      headerName: "Ticket Title",
      flex: 3.3,
      headerAlign: "left",
    },
    {
      field: "requester",
      headerName: "Assigned By",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "group",
      headerName: "Support Type",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "In Progress"
              ? "primary"
              : params.value === "On Hold"
              ? "warning"
              : "default"
          }
        />
      ),
    },
    {
      field: "created_on",
      headerName: "Date & Time",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      renderCell: () => (
        <div className="action-icons">
          <div className="menuicon">
            <i className="fi fi-rr-eye"></i>
          </div>
          <div className="menuicon">
            <i className="fi fi-rr-clone"></i>
          </div>
          <div className="menuicon">
            <i className="fi fi-rr-trash"></i>
          </div>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      label: "Open Tickets",
      content: (
        <DataGrid
          rows={openTickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            "& .MuiDataGrid-root": {
              width: "100%",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#d0d0d0",
            },
            '& .MuiDataGrid-cell[data-field="subject"]': {
              textAlign: "left",
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="subject"]': {
              textAlign: "left",
            },
          }}
        />
      ),
    },
    {
      label: "Completed Tickets",
      content: (
        <DataGrid
          rows={completedTickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            "& .MuiDataGrid-root": {
              width: "100%",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#d0d0d0",
            },
            '& .MuiDataGrid-cell[data-field="subject"]': {
              textAlign: "left",
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="subject"]': {
              textAlign: "left",
            },
          }}
        />
      ),
    },
    {
      label: "On-hold Tickets",
      content: (
        <DataGrid
          rows={onHoldTickets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          sx={{
            "& .MuiDataGrid-root": {
              width: "100%",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#e0e0e0",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#d0d0d0",
            },
            '& .MuiDataGrid-cell[data-field="subject"]': {
              textAlign: "left",
            },
            '& .MuiDataGrid-columnHeaderTitle[data-field="subject"]': {
              textAlign: "left",
            },
          }}
        />
      ),
    },
  ];

  return (
    <div className="ticket-system-container">
      <div className="contentContainer">
        <div className="overview-info">
          <div className="overview-text">
            <h1>Support Tickets</h1>
          </div>
          <div className="buttons">
            <button className="btn">Create Ticket</button>
          </div>
        </div>
        <div className="grid-container" style={{ width: "100%" }}>
          <div className="grid-item" style={{ width: "100%" }}>
            <div className="TicketSystemTabs">
              <div className="tabs">
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
      </div>
    </div>
  );
};

export default TicketSystemTabs;
